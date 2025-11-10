import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, Calendar, Image, ListTodo, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ConnectionManager from './network/ConnectionManager';
import SharedCalendar from './network/SharedCalendar';
import MediaGallery from './network/MediaGallery';
import ActivityManager from './network/ActivityManager';

const ParentNetworkTab: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'connections' | 'calendar' | 'media' | 'activities'>('overview');
  const [connectionCount, setConnectionCount] = useState(0);
  const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);
  const [pendingActivitiesCount, setPendingActivitiesCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get connection count
      const { count: connCount } = await supabase
        .from('parent_connections')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'accepted')
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`);
      
      setConnectionCount(connCount || 0);

      // Get upcoming events count (next 7 days)
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      
      const { count: eventCount } = await supabase
        .from('shared_calendar_events')
        .select('*', { count: 'exact', head: true })
        .gte('start_time', new Date().toISOString())
        .lte('start_time', sevenDaysFromNow.toISOString());
      
      setUpcomingEventsCount(eventCount || 0);

      // Get pending activities count
      const { count: activityCount } = await supabase
        .from('shared_activities')
        .select('*', { count: 'exact', head: true })
        .eq('completed', false);
      
      setPendingActivitiesCount(activityCount || 0);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (activeView === 'connections') {
    return (
      <div>
        <Button variant="outline" onClick={() => setActiveView('overview')} className="mb-4">
          ← Back to Overview
        </Button>
        <ConnectionManager />
      </div>
    );
  }

  if (activeView === 'calendar') {
    return (
      <div>
        <Button variant="outline" onClick={() => setActiveView('overview')} className="mb-4">
          ← Back to Overview
        </Button>
        <SharedCalendar />
      </div>
    );
  }

  if (activeView === 'media') {
    return (
      <div>
        <Button variant="outline" onClick={() => setActiveView('overview')} className="mb-4">
          ← Back to Overview
        </Button>
        <MediaGallery />
      </div>
    );
  }

  if (activeView === 'activities') {
    return (
      <div>
        <Button variant="outline" onClick={() => setActiveView('overview')} className="mb-4">
          ← Back to Overview
        </Button>
        <ActivityManager />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Parent Network</h2>
          <p className="text-muted-foreground">Connect, share, and coordinate with other parents</p>
        </div>
        <Button onClick={() => setActiveView('connections')}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Connection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('connections')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-900/30">
                <Users className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{connectionCount}</p>
                <p className="text-sm text-muted-foreground">Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('calendar')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingEventsCount}</p>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('media')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Image className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Gallery</p>
                <p className="text-sm text-muted-foreground">Shared Photos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('activities')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <ListTodo className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingActivitiesCount}</p>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-rose-600" />
              Recent Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with other single parents or co-parents to share calendars, photos, and coordinate activities.
            </p>
            <Button variant="outline" className="w-full" onClick={() => setActiveView('connections')}>
              Manage Connections
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Shared Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Coordinate sports events, school assignments, pickup/dropoff schedules, and more with connected parents.
            </p>
            <Button variant="outline" className="w-full" onClick={() => setActiveView('calendar')}>
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentNetworkTab;