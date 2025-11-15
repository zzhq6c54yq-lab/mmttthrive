import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VALID_ACCESS_CODE = "0001";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { accessCode } = await req.json();
    
    console.log('Access code validation attempt');
    
    // Validate access code
    if (accessCode !== VALID_ACCESS_CODE) {
      console.log('Invalid access code provided');
      return new Response(
        JSON.stringify({ error: 'Invalid access code' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    console.log('Looking up therapist profile directly from database');

    // Query profiles table directly instead of listing all users
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, is_therapist')
      .eq('email', 'therapist@demo.com')
      .eq('is_therapist', true)
      .maybeSingle();
    
    if (profileError) {
      console.error('Error querying profiles:', profileError);
      throw profileError;
    }

    // If profile doesn't exist, call setup function to create it
    if (!profileData) {
      console.log('Therapist profile not found, setting up demo therapist...');
      
      try {
        const setupResponse = await fetch(
          `${Deno.env.get('SUPABASE_URL')}/functions/v1/setup-demo-therapist`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!setupResponse.ok) {
          const errorText = await setupResponse.text();
          console.error('Setup demo therapist failed:', errorText);
          throw new Error('Failed to setup demo therapist');
        }

        console.log('Demo therapist setup complete');
        
        // Query the profile again after creation
        const { data: newProfileData, error: refetchError } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('email', 'therapist@demo.com')
          .eq('is_therapist', true)
          .single();
        
        if (refetchError || !newProfileData) {
          console.error('Error refetching profile:', refetchError);
          throw new Error('Therapist profile not found after setup');
        }

        console.log('Creating session for therapist user:', newProfileData.id);

        // Create a session for the newly created user
        const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.createSession({
          userId: newProfileData.id,
        });

        if (sessionError) {
          console.error('Error creating session:', sessionError);
          throw sessionError;
        }

        console.log('Session created successfully');

        return new Response(
          JSON.stringify({ 
            access_token: sessionData.access_token,
            refresh_token: sessionData.refresh_token,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (setupError) {
        console.error('Error setting up therapist:', setupError);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to setup therapist account. Please try again.' 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log('Creating session for therapist user:', profileData.id);

    // Create a session for the existing user
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.createSession({
      userId: profileData.id,
    });

    if (sessionError) {
      console.error('Error creating session:', sessionError);
      throw sessionError;
    }

    console.log('Session created successfully');

    return new Response(
      JSON.stringify({ 
        access_token: sessionData.access_token,
        refresh_token: sessionData.refresh_token,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in therapist-access function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
