import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { questionId, questionText, category } = await req.json();
    const togetherApiKey = Deno.env.get('TOGETHER_API_KEY');
    
    if (!togetherApiKey) {
      throw new Error('TOGETHER_API_KEY not configured');
    }

    // Generate AI response using Together.xyz
    const systemPrompt = `You are Henry, a compassionate mental health columnist writing for "Dear Henry" - a supportive advice column. 

Your writing style:
- Warm, empathetic, and professional
- Uses personal stories when appropriate
- Provides actionable advice
- Validates the person's feelings
- Offers hope and perspective
- Keeps responses 200-400 words
- Ends with an encouraging note

Topic: ${category}

Write a heartfelt, editorial-style response that would appear in a mental health advice column.`;

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${togetherApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: questionText }
        ],
        max_tokens: 600,
        temperature: 0.8,
        top_p: 0.95,
      })
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const answerText = data.choices?.[0]?.message?.content;

    if (!answerText) {
      throw new Error('No answer generated');
    }

    // Save answer to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: answerData, error: answerError } = await supabase
      .from('henry_answers')
      .insert({
        question_id: questionId,
        answer_text: answerText,
        author: 'Henry'
      })
      .select()
      .single();

    if (answerError) throw answerError;

    // Update question status to 'answered'
    const { error: updateError } = await supabase
      .from('henry_questions')
      .update({ status: 'answered' })
      .eq('id', questionId);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ answer: answerData }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error generating answer:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
