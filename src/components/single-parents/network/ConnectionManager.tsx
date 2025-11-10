import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Check, X, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Connection {
  id: string;
  requester_id: string;
  recipient_id: string;
  status: string;
  connection_type: string;
  nickname: string | null;
  created_at: string;
}

const ConnectionManager: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Connection[]>([]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [connectionType, setConnectionType] = useState('support_friend');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch accepted connections
      const { data: acceptedData, error: acceptedError } = await supabase
        .from('parent_connections')
        .select('*')
        .eq('status', 'accepted')
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`);

      if (acceptedError) throw acceptedError;
      setConnections(acceptedData || []);

      // Fetch pending requests (where current user is recipient)
      const { data: pendingData, error: pendingError } = await supabase
        .from('parent_connections')
        .select('*')
        .eq('status', 'pending')
        .eq('recipient_id', user.id);

      if (pendingError) throw pendingError;
      setPendingRequests(pendingData || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
      toast({
        title: 'Error',
        description: 'Failed to load connections',
        variant: 'destructive',
      });
    }
  };

  const sendConnectionRequest = async () => {
    if (!recipientEmail.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Find recipient by email
      const { data: recipientData, error: recipientError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', recipientEmail) // Note: This is simplified - in production, you'd need a proper user search
        .single();

      if (recipientError) {
        toast({
          title: 'User not found',
          description: 'No user found with that email address',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('parent_connections')
        .insert({
          requester_id: user.id,
          recipient_id: recipientData.id,
          connection_type: connectionType,
          nickname: nickname.trim() || null,
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: 'Request sent!',
        description: 'Your connection request has been sent',
      });

      setRecipientEmail('');
      setNickname('');
      setIsDialogOpen(false);
      fetchConnections();
    } catch (error: any) {
      console.error('Error sending request:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to send connection request',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (connectionId: string, action: 'accepted' | 'declined') => {
    try {
      const updates: any = { status: action };
      if (action === 'accepted') {
        updates.accepted_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('parent_connections')
        .update(updates)
        .eq('id', connectionId);

      if (error) throw error;

      toast({
        title: action === 'accepted' ? 'Connection accepted!' : 'Request declined',
        description: action === 'accepted' 
          ? 'You can now share calendars and photos' 
          : 'The connection request has been declined',
      });

      fetchConnections();
    } catch (error) {
      console.error('Error handling request:', error);
      toast({
        title: 'Error',
        description: 'Failed to process request',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Connection Manager</h3>
          <p className="text-sm text-muted-foreground">Connect with other parents to share calendars and photos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Connection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Connection Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="email">Parent's Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="parent@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="type">Connection Type</Label>
                <Select value={connectionType} onValueChange={setConnectionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="co_parent">Co-Parent</SelectItem>
                    <SelectItem value="support_friend">Support Friend</SelectItem>
                    <SelectItem value="emergency_contact">Emergency Contact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="nickname">Nickname (Optional)</Label>
                <Input
                  id="nickname"
                  placeholder="e.g., Mom, Dad, Sarah's mom"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              <Button onClick={sendConnectionRequest} disabled={loading} className="w-full">
                {loading ? 'Sending...' : 'Send Request'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">New connection request</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {request.connection_type.replace('_', ' ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleRequest(request.id, 'accepted')}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRequest(request.id, 'declined')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connections.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No connections yet</p>
              <p className="text-sm text-muted-foreground">
                Send connection requests to other parents to start sharing calendars and photos
              </p>
            </CardContent>
          </Card>
        ) : (
          connections.map((connection) => (
            <Card key={connection.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-900/30">
                    <UserPlus className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {connection.nickname || 'Connected Parent'}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {connection.connection_type.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ConnectionManager;