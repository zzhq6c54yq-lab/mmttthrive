import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VALID_ACCESS_CODE = "0001";
const THERAPIST_EMAIL = "therapist@demo.com";
const THERAPIST_PASSWORD = "0001";

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

    console.log('Access code valid, setting up therapist account');

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

    // First, check if user exists by trying to get them
    const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000
    });

    const existingUser = users?.find(u => u.email === THERAPIST_EMAIL);

    if (existingUser) {
      console.log('Therapist user exists, updating password');
      
      // Update the existing user's password
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        existingUser.id,
        { password: THERAPIST_PASSWORD }
      );

      if (updateError) {
        console.error('Error updating password:', updateError);
        throw new Error('Failed to update therapist password');
      }

      // Ensure profile exists
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: existingUser.id,
          email: THERAPIST_EMAIL,
          display_name: 'Demo Therapist',
          is_therapist: true,
        });

      if (profileError) {
        console.error('Error upserting profile:', profileError);
      }

      // Ensure therapist record exists
      const { error: therapistError } = await supabaseAdmin
        .from('therapists')
        .upsert({
          user_id: existingUser.id,
          name: 'Demo Therapist',
          title: 'Licensed Therapist',
          bio: 'Demo therapist account for testing',
          specialties: ['General Counseling'],
          hourly_rate: 150,
          is_active: true,
        });

      if (therapistError) {
        console.error('Error upserting therapist record:', therapistError);
      }

      console.log('Therapist account updated, signing in');
    } else {
      console.log('Therapist user does not exist, creating it');
      
      // Create the user
      const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: THERAPIST_EMAIL,
        password: THERAPIST_PASSWORD,
        email_confirm: true,
      });

      if (createError) {
        console.error('Error creating therapist user:', createError);
        throw new Error('Failed to create therapist account');
      }

      console.log('Therapist user created:', userData.user.id);

      // Create profile
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: userData.user.id,
          email: THERAPIST_EMAIL,
          display_name: 'Demo Therapist',
          is_therapist: true,
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }

      // Create therapist record
      const { error: therapistError } = await supabaseAdmin
        .from('therapists')
        .insert({
          user_id: userData.user.id,
          name: 'Demo Therapist',
          title: 'Licensed Therapist',
          bio: 'Demo therapist account for testing',
          specialties: ['General Counseling'],
          hourly_rate: 150,
          is_active: true,
        });

      if (therapistError) {
        console.error('Error creating therapist record:', therapistError);
      }

      console.log('Therapist account created');
    }

    // Now sign in with the correct password
    console.log('Signing in as therapist');
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: THERAPIST_EMAIL,
      password: THERAPIST_PASSWORD,
    });

    if (signInError || !signInData.session) {
      console.error('Error signing in:', signInError);
      throw signInError || new Error('No session returned from sign in');
    }

    console.log('Sign in successful');

    return new Response(
      JSON.stringify({ 
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
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
