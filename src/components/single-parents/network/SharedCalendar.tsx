import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Plus, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  start_time: string;
  end_time: string | null;
  location: string | null;
  child_name: string | null;
  color: string;
  creator_id: string;
}

const eventTypeColors: Record<string, string> = {
  sports: 'bg-blue-500',
  school_assignment: 'bg-green-500',
  activity: 'bg-purple-500',
  appointment: 'bg-red-500',
  pickup_dropoff: 'bg-orange-500',
  other: 'bg-gray-500',
};

const SharedCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'other',
    start_time: '',
    end_time: '',
    location: '',
    child_name: '',
    connection_id: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchConnections();
    fetchEvents();
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

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('shared_calendar_events')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const createEvent = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (!formData.title || !formData.start_time || !formData.connection_id) {
        toast({
          title: 'Missing information',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('shared_calendar_events')
        .insert({
          creator_id: user.id,
          connection_id: formData.connection_id,
          title: formData.title,
          description: formData.description || null,
          event_type: formData.event_type,
          start_time: formData.start_time,
          end_time: formData.end_time || null,
          location: formData.location || null,
          child_name: formData.child_name || null,
          color: eventTypeColors[formData.event_type] || '#6b7280',
        });

      if (error) throw error;

      toast({
        title: 'Event created!',
        description: 'The event has been added to the shared calendar',
      });

      setIsDialogOpen(false);
      setFormData({
        title: '',
        description: '',
        event_type: 'other',
        start_time: '',
        end_time: '',
        location: '',
        child_name: '',
        connection_id: '',
      });
      fetchEvents();
    } catch (error: any) {
      console.error('Error creating event:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create event',
        variant: 'destructive',
      });
    }
  };

  const selectedDateEvents = events.filter((event) => {
    if (!selectedDate) return false;
    const eventDate = new Date(event.start_time);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Shared Calendar</h3>
          <p className="text-sm text-muted-foreground">Coordinate schedules with connected parents</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={connections.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Calendar Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
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
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Soccer practice"
                />
              </div>
              <div>
                <Label htmlFor="type">Event Type</Label>
                <Select value={formData.event_type} onValueChange={(value) => setFormData({ ...formData, event_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="school_assignment">School Assignment</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="pickup_dropoff">Pickup/Dropoff</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start">Start Time</Label>
                  <Input
                    id="start"
                    type="datetime-local"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end">End Time (Optional)</Label>
                  <Input
                    id="end"
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  />
                </div>
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
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Main Street Park"
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
              <Button onClick={createEvent} className="w-full">Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {connections.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">No connections yet</p>
            <p className="text-sm text-muted-foreground">
              Add connections to start sharing calendar events
            </p>
          </CardContent>
        </Card>
      )}

      {connections.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No events for this date</p>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className={`w-1 h-full ${eventTypeColors[event.event_type]} rounded-full`} />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{event.title}</h4>
                          {event.child_name && (
                            <p className="text-sm text-muted-foreground">For: {event.child_name}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {format(new Date(event.start_time), 'h:mm a')}
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                            )}
                          </div>
                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SharedCalendar;