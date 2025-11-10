import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { focus, mood, anxiety, energy, tags, userTextPrimary, userTextSecondary, urgeLevel } = await req.json();

    console.log('Mini-session request:', { focus, mood, anxiety, energy, urgeLevel });

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // System prompt - emphasizes NOT being a therapist
    const systemPrompt = `You are a supportive companion for someone between therapy sessions. You are NOT a therapist, counselor, or medical professional. Never diagnose, prescribe, or give medical advice.

Your role is to:
- Help them organize their thoughts
- Offer grounding techniques
- Reflect back what they share
- Suggest tiny, practical actions
- Remind them to bring important insights to their therapist

Always be warm, non-judgmental, and brief (2-3 paragraphs max).`;

    // Build user prompt based on focus area
    let userPrompt = '';
    let isCrisisDetected = false;

    // Crisis detection
    if (urgeLevel && urgeLevel >= 8) {
      isCrisisDetected = true;
    }
    if (anxiety >= 9) {
      isCrisisDetected = true;
    }

    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'not worth living', 'harm myself'];
    const containsCrisisKeyword = crisisKeywords.some(keyword => 
      userTextPrimary?.toLowerCase().includes(keyword) || userTextSecondary?.toLowerCase().includes(keyword)
    );
    if (containsCrisisKeyword) {
      isCrisisDetected = true;
    }

    // Focus-specific prompts
    switch (focus) {
      case 'racing_thoughts':
        userPrompt = `The person is experiencing racing thoughts. Mood: ${mood}/10, Anxiety: ${anxiety}/10, Energy: ${energy}/10.
Tags: ${tags?.join(', ') || 'none'}

What's racing through their mind: "${userTextPrimary}"

Help them:
1. Acknowledge the overwhelm
2. Guide them to pick ONE thought to examine
3. Ask: What evidence supports/challenges this thought?
4. Offer a grounding technique
5. Suggest one tiny action

Keep it brief and practical.`;
        break;

      case 'conflict':
        userPrompt = `The person had a conflict. Mood: ${mood}/10, Anxiety: ${anxiety}/10.
Tags: ${tags?.join(', ') || 'none'}

Conflict description: "${userTextPrimary}"
Their underlying need: "${userTextSecondary}"

Help them:
1. Validate their feelings
2. Reflect back their need
3. Offer a "I feel/need/request" communication script
4. Remind them: this is for their therapist too
5. One tiny action to move forward

Be compassionate and practical.`;
        break;

      case 'low_mood':
        userPrompt = `The person is experiencing low mood. Mood: ${mood}/10, Anxiety: ${anxiety}/10, Energy: ${energy}/10.
Tags: ${tags?.join(', ') || 'none'}

What's weighing on them: "${userTextPrimary}"
One thing they did well recently: "${userTextSecondary}"

Help them:
1. Acknowledge the difficulty without toxic positivity
2. Reflect back their strength from what they shared
3. Offer self-compassion language
4. Suggest one tiny pleasure or accomplishment
5. Remind them to share this with their therapist

Keep it gentle and validating.`;
        break;

      case 'urge':
        userPrompt = `The person is managing an urge. Urge level: ${urgeLevel}/10. Mood: ${mood}/10, Anxiety: ${anxiety}/10.
Tags: ${tags?.join(', ') || 'none'}

What triggered the urge: "${userTextPrimary}"
Harm reduction strategy they tried: "${userTextSecondary}"

CRITICAL: Do NOT give medical advice. Do NOT diagnose. Do NOT prescribe.

Help them:
1. Validate that urges are temporary
2. Acknowledge any harm reduction they're doing
3. Offer ONE grounding technique (5 senses, cold water, movement)
4. Remind them: contact their provider if urges intensify
5. Encourage documenting this for next session

If urge is severe (8+), strongly encourage calling crisis line: 988 (US).`;
        break;

      case 'process_therapy':
        userPrompt = `The person wants to process their last therapy session. Mood: ${mood}/10.
Tags: ${tags?.join(', ') || 'none'}

Key insight from session: "${userTextPrimary}"
Question for next session: "${userTextSecondary}"

Help them:
1. Reflect back their insight
2. Help them articulate why it matters
3. Validate their question
4. Suggest one small practice related to the insight
5. Remind them to bring the question to next session

Keep it reflective and organizing.`;
        break;

      default:
        userPrompt = `The person is checking in. Mood: ${mood}/10, Anxiety: ${anxiety}/10, Energy: ${energy}/10.
Tags: ${tags?.join(', ') || 'none'}

What they shared: "${userTextPrimary}"

Provide brief, supportive reflection and one tiny action suggestion.`;
    }

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const coaching = data.choices[0].message.content;

    // Generate brief summary
    const summary = `${focus.replace('_', ' ')} session - Mood: ${mood}/10, Anxiety: ${anxiety}/10${urgeLevel ? `, Urge: ${urgeLevel}/10` : ''}`;

    return new Response(
      JSON.stringify({ 
        coaching, 
        summary,
        isCrisisDetected 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in mini-session function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        coaching: "I'm having trouble connecting right now. Please try again, or if you're in crisis, call 988 (US) immediately.",
        summary: "Technical error occurred"
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
