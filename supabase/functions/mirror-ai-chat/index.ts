import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callMirrorAI(userMessage: string, systemPrompt: string): Promise<string> {
  const togetherApiKey = Deno.env.get('TOGETHER_API_KEY');
  
  if (!togetherApiKey) {
    throw new Error('TOGETHER_API_KEY not configured');
  }

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage }
  ];

  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${togetherApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages,
      max_tokens: 600,
      temperature: 0.7,
      top_p: 0.9,
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Together.xyz API error:', response.status, errorText);
    throw new Error(`Together.xyz API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "I'm sorry, I'm having trouble responding right now. Please try again.";
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, systemPrompt } = await req.json();

    if (!message) {
      throw new Error('No message provided');
    }

    const defaultSystemPrompt = "You are a kind, trauma-informed psychiatrist named MirrorAI inside ThriveMT. Your goal is to help users process emotions with compassion and clarity.";
    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;

    console.log('MirrorAI processing message:', message.substring(0, 100) + '...');
    
    const response = await callMirrorAI(message, finalSystemPrompt);
    
    console.log('MirrorAI response generated successfully');

    return new Response(
      JSON.stringify({ response }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in mirror-ai-chat function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: "I'm experiencing some technical difficulties. Please try again, or if this persists, consider reaching out to a mental health professional directly."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});