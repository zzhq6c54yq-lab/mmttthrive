import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Watch, Zap, Check, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HealthConnection {
  id: string;
  provider: 'apple_health' | 'google_fit' | 'fitbit';
  enabled: boolean;
  last_sync_at: string | null;
}

const HealthSyncWidget: React.FC = () => {
  const [connections, setConnections] = useState<HealthConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const { toast } = useToast();

  const providers = [
    { id: 'apple_health', name: 'Apple Health', icon: Smartphone, color: 'text-pink-400' },
    { id: 'google_fit', name: 'Google Fit', icon: Watch, color: 'text-blue-400' },
    { id: 'fitbit', name: 'Fitbit', icon: Zap, color: 'text-green-400' },
  ];

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const { data, error } = await supabase
        .from('user_health_connections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConnections((data as HealthConnection[]) || []);
    } catch (error) {
      console.error('Error loading health connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (provider: string) => {
    try {
      setSyncing(provider);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to connect health providers',
          variant: 'destructive',
        });
        return;
      }

      // In a real implementation, this would open OAuth flow or health kit permission dialog
      // For now, we'll create a placeholder connection
      const { error } = await supabase
        .from('user_health_connections')
        .insert([{
          user_id: user.id,
          provider: provider as 'apple_health' | 'google_fit' | 'fitbit',
          enabled: true,
          last_sync_at: new Date().toISOString(),
        }]);

      if (error) throw error;

      toast({
        title: 'Connected!',
        description: `Successfully connected to ${providers.find(p => p.id === provider)?.name}`,
      });

      loadConnections();
    } catch (error: any) {
      toast({
        title: 'Connection failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSyncing(null);
    }
  };

  const handleSync = async (connection: HealthConnection) => {
    try {
      setSyncing(connection.provider);

      // In a real implementation, this would fetch actual health data from the provider
      // For demo, we'll simulate a sync
      const mockHealthData = [
        { type: 'sleep', value: 7.5, unit: 'hours', timestamp: new Date().toISOString() },
        { type: 'steps', value: 8234, unit: 'count', timestamp: new Date().toISOString() },
        { type: 'heart_rate', value: 72, unit: 'bpm', timestamp: new Date().toISOString() },
      ];

      const { error } = await supabase.functions.invoke('sync-health-data', {
        body: {
          provider: connection.provider,
          healthData: mockHealthData,
        },
      });

      if (error) throw error;

      toast({
        title: 'Synced!',
        description: `Successfully synced data from ${providers.find(p => p.id === connection.provider)?.name}`,
      });

      loadConnections();
    } catch (error: any) {
      toast({
        title: 'Sync failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSyncing(null);
    }
  };

  const isConnected = (providerId: string) =>
    connections.some(c => c.provider === providerId && c.enabled);

  const getConnection = (providerId: string) =>
    connections.find(c => c.provider === providerId && c.enabled);

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:border-[#D4AF37]/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">Health Integrations</h3>
            <p className="text-sm text-muted-foreground">Sync your health data</p>
          </div>
          <Watch className="w-8 h-8 text-[#D4AF37]" />
        </div>

        <div className="space-y-3">
          {providers.map((provider) => {
            const connection = getConnection(provider.id);
            const connected = isConnected(provider.id);
            const Icon = provider.icon;

            return (
              <motion.div
                key={provider.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${provider.color}`} />
                  <div>
                    <div className="font-medium text-foreground">{provider.name}</div>
                    {connection?.last_sync_at && (
                      <div className="text-xs text-muted-foreground">
                        Last sync: {new Date(connection.last_sync_at).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>

                {connected ? (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => connection && handleSync(connection)}
                      disabled={syncing === provider.id}
                    >
                      {syncing === provider.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleConnect(provider.id)}
                    disabled={syncing === provider.id}
                  >
                    {syncing === provider.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Connect'
                    )}
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
};

export default HealthSyncWidget;
