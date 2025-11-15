import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    console.log('Setting up demo therapist account...');

    const email = 'therapist@demo.com';
    const password = '0001';

    // First, check if profile already exists by querying the database directly
    const { data: existingProfile, error: profileQueryError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, is_therapist')
      .eq('email', email)
      .maybeSingle();

    if (profileQueryError) {
      console.error('Error querying existing profile:', profileQueryError);
    }

    // If profile exists, delete the auth user by ID (more reliable than listUsers)
    if (existingProfile) {
      console.log('Found existing profile with ID:', existingProfile.id);
      console.log('Deleting existing auth user by ID...');
      
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(existingProfile.id);
      
      if (deleteError) {
        console.error('Error deleting user:', deleteError);
        // Continue anyway - the user might already be deleted from auth but profile remains
      } else {
        console.log('Auth user deleted successfully');
      }

      // Delete the profile record
      console.log('Deleting existing profile...');
      await supabaseAdmin
        .from('profiles')
        .delete()
        .eq('id', existingProfile.id);
    }

    // Delete any therapist records associated with this email
    console.log('Cleaning up therapist records...');
    await supabaseAdmin
      .from('therapists')
      .delete()
      .eq('name', 'Dr. Sarah Mitchell');

    // Create new therapist user with correct password
    console.log('Creating new therapist user...');
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        display_name: 'Dr. Sarah Mitchell'
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    }

    console.log('Therapist user created:', authData.user.id);

    // Update or create profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email: email,
        display_name: 'Dr. Sarah Mitchell',
        is_therapist: true,
        onboarding_completed: true
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('Profile error:', profileError);
      throw profileError;
    }

    console.log('Profile updated successfully');

    // Ensure therapist record exists
    const { error: therapistError } = await supabaseAdmin
      .from('therapists')
      .insert({
        user_id: authData.user.id,
        name: 'Dr. Sarah Mitchell',
        title: 'Clinical Psychologist',
        bio: 'Specialized in trauma and anxiety disorders with 15+ years of experience.',
        specialties: ['Trauma', 'Anxiety', 'Depression', 'PTSD'],
        hourly_rate: 150,
        experience_years: 15,
        is_active: true
      });

    if (therapistError) {
      console.error('Therapist record error:', therapistError);
      throw therapistError;
    }

    console.log('Setup complete!');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Demo therapist account created successfully. You can now login with email: 0001 and password: 0001',
        userId: authData.user.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in setup-demo-therapist:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});
