import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, CheckCircle, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Activity {
  id: string;
  title: string;
  description: string | null;
  activity_type: string;
  priority: string;
  due_date: string | null;
  completed: boolean;
  child_name: string | null;
  assigned_to: string | null;
}

const priorityColors: Record<string, string> = {
  low: 'border-l-4 border-l-gray-400',
  medium: 'border-l-4 border-l-blue-500',
  high: 'border-l-4 border-l-orange-500',
  urgent: 'border-l-4 border-l-red-500',
};

const ActivityManager: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    activity_type: 'responsibility',
    priority: 'medium',
    due_date: '',
    child_name: '',
    connection_id: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchConnections();
    fetchActivities();
  }, []);

  const fetchConnections = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('parent_connections')
        .select('*')
        .eq('status', 'accepted')
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`);

      if (error) throw error;
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('shared_activities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const createActivity = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (!formData.title || !formData.connection_id) {
        toast({
          title: 'Missing information',
          description: 'Please fill in required fields',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('shared_activities')
        .insert({
          creator_id: user.id,
          connection_id: formData.connection_id,
          title: formData.title,
          description: formData.description || null,
          activity_type: formData.activity_type,
          priority: formData.priority,
          due_date: formData.due_date || null,
          child_name: formData.child_name || null,
        });

      if (error) throw error;

      toast({
        title: 'Activity created!',
        description: 'The activity has been added',
      });

      setIsDialogOpen(false);
      setFormData({
        title: '',
        description: '',
        activity_type: 'responsibility',
        priority: 'medium',
        due_date: '',
        child_name: '',
        connection_id: '',
      });
      fetchActivities();
    } catch (error: any) {
      console.error('Error creating activity:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create activity',
        variant: 'destructive',
      });
    }
  };

  const toggleComplete = async (activityId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('shared_activities')
        .update({ 
          completed: !currentStatus,
          completed_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', activityId);

      if (error) throw error;

      toast({
        title: !currentStatus ? 'Completed!' : 'Reopened',
        description: !currentStatus ? 'Activity marked as complete' : 'Activity reopened',
      });

      fetchActivities();
    } catch (error) {
      console.error('Error toggling activity:', error);
    }
  };

  const todoActivities = activities.filter(a => !a.completed);
  const completedActivities = activities.filter(a => a.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Activity Manager</h3>
          <p className="text-sm text-muted-foreground">Track responsibilities and co-parenting tasks</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={connections.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="connection">Share with Connection</Label>
                <Select value={formData.connection_id} onValueChange={(value) => setFormData({ ...formData, connection_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select connection" />
                  </SelectTrigger>
                  <SelectContent>
                    {connections.map((conn) => (
                      <SelectItem key={conn.id} value={conn.id}>
                        {conn.nickname || 'Connected Parent'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Activity Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Pick up from soccer practice"
                />
              </div>
              <div>
                <Label htmlFor="type">Activity Type</Label>
                <Select value={formData.activity_type} onValueChange={(value) => setFormData({ ...formData, activity_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="responsibility">Responsibility</SelectItem>
                    <SelectItem value="milestone">Milestone</SelectItem>
                    <SelectItem value="achievement">Achievement</SelectItem>
                    <SelectItem value="challenge">Challenge</SelectItem>
                    <SelectItem value="boundary_setting">Boundary Setting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="due">Due Date (Optional)</Label>
                <Input
                  id="due"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="child">Child Name (Optional)</Label>
                <Input
                  id="child"
                  value={formData.child_name}
                  onChange={(e) => setFormData({ ...formData, child_name: e.target.value })}
                  placeholder="Emma"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details..."
                />
              </div>
              <Button onClick={createActivity} className="w-full">Create Activity</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {connections.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">No connections yet</p>
            <p className="text-sm text-muted-foreground">
              Add connections to start tracking shared activities
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">To Do ({todoActivities.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todoActivities.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No pending activities</p>
              ) : (
                todoActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 bg-muted rounded-lg ${priorityColors[activity.priority]}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{activity.title}</h4>
                        {activity.child_name && (
                          <p className="text-sm text-muted-foreground">For: {activity.child_name}</p>
                        )}
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs px-2 py-1 bg-background rounded capitalize">
                            {activity.activity_type.replace('_', ' ')}
                          </span>
                          <span className={`text-xs px-2 py-1 bg-background rounded capitalize ${
                            activity.priority === 'urgent' ? 'text-red-600' : 
                            activity.priority === 'high' ? 'text-orange-600' : ''
                          }`}>
                            {activity.priority}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleComplete(activity.id, activity.completed)}
                      >
                        <Circle className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completed ({completedActivities.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedActivities.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No completed activities</p>
              ) : (
                completedActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 bg-muted rounded-lg opacity-75"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground line-through">{activity.title}</h4>
                        {activity.child_name && (
                          <p className="text-sm text-muted-foreground">For: {activity.child_name}</p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleComplete(activity.id, activity.completed)}
                      >
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ActivityManager;