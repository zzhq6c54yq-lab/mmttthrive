import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { provider, healthData } = await req.json();

    console.log(`Syncing health data for user ${user.id} from provider ${provider}`);

    // Validate provider
    if (!['apple_health', 'google_fit', 'fitbit'].includes(provider)) {
      return new Response(JSON.stringify({ error: 'Invalid provider' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get connection details
    const { data: connection, error: connectionError } = await supabaseClient
      .from('user_health_connections')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', provider)
      .eq('enabled', true)
      .single();

    if (connectionError || !connection) {
      return new Response(JSON.stringify({ error: 'Connection not found or disabled' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Store health data in wearable_data table
    const wearableDataRecords = healthData.map((item: any) => ({
      user_id: user.id,
      source: provider,
      data_type: item.type, // 'sleep', 'steps', 'heart_rate', etc.
      value: item.value,
      unit: item.unit,
      recorded_at: item.timestamp,
      synced_at: new Date().toISOString(),
    }));

    const { error: insertError } = await supabaseClient
      .from('wearable_data')
      .insert(wearableDataRecords);

    if (insertError) {
      console.error('Error inserting wearable data:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to store health data' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update last_sync_at timestamp
    await supabaseClient
      .from('user_health_connections')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('id', connection.id);

    console.log(`Successfully synced ${healthData.length} health data records`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        recordsSynced: healthData.length,
        lastSyncAt: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in sync-health-data function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
