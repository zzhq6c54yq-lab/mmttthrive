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
    const therapistUserId = '00000000-0000-0000-0000-000000000001';

    // Check if profile exists
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', therapistUserId)
      .maybeSingle();

    // Delete existing auth user if exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingTherapist = existingUsers?.users?.find(u => u.email === email);
    
    if (existingTherapist) {
      console.log('Deleting existing auth user...');
      await supabaseAdmin.auth.admin.deleteUser(existingTherapist.id);
    }

    // Delete profile if it exists and isn't the correct one
    if (existingProfile && existingProfile.id !== therapistUserId) {
      console.log('Deleting incorrect profile...');
      await supabaseAdmin
        .from('profiles')
        .delete()
        .eq('id', existingProfile.id);
    }

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
      .upsert({
        id: '550e8400-e29b-41d4-a716-446655440000',
        user_id: authData.user.id,
        name: 'Dr. Sarah Mitchell',
        title: 'Clinical Psychologist',
        bio: 'Specialized in trauma and anxiety disorders with 15+ years of experience.',
        specialties: ['Trauma', 'Anxiety', 'Depression', 'PTSD'],
        hourly_rate: 150,
        experience_years: 15,
        is_active: true
      }, {
        onConflict: 'id'
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
