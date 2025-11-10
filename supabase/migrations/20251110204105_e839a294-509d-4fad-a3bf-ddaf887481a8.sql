-- Create parent_connections table
CREATE TABLE parent_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  connection_type TEXT NOT NULL CHECK (connection_type IN ('co_parent', 'support_friend', 'emergency_contact')),
  nickname TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  notes TEXT,
  UNIQUE(requester_id, recipient_id)
);

-- Create shared_calendar_events table
CREATE TABLE shared_calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_id UUID NOT NULL REFERENCES parent_connections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('sports', 'school_assignment', 'activity', 'appointment', 'pickup_dropoff', 'other')),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  location TEXT,
  child_name TEXT,
  reminder_minutes INTEGER DEFAULT 60,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT,
  color TEXT DEFAULT '#f43f5e',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create shared_media table
CREATE TABLE shared_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_id UUID NOT NULL REFERENCES parent_connections(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video', 'document')),
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  child_name TEXT,
  event_date DATE,
  tags TEXT[],
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create shared_activities table
CREATE TABLE shared_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  connection_id UUID NOT NULL REFERENCES parent_connections(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('responsibility', 'milestone', 'achievement', 'challenge', 'boundary_setting')),
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES auth.users(id),
  due_date DATE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  child_name TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE parent_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for parent_connections
CREATE POLICY "Users can view own connections"
  ON parent_connections FOR SELECT
  USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create connection requests"
  ON parent_connections FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update received requests"
  ON parent_connections FOR UPDATE
  USING (auth.uid() = recipient_id OR auth.uid() = requester_id);

-- RLS Policies for shared_calendar_events
CREATE POLICY "Users can view events from their connections"
  ON shared_calendar_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM parent_connections
      WHERE id = connection_id
      AND status = 'accepted'
      AND (requester_id = auth.uid() OR recipient_id = auth.uid())
    )
  );

CREATE POLICY "Users can create events for their connections"
  ON shared_calendar_events FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own events"
  ON shared_calendar_events FOR UPDATE
  USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete own events"
  ON shared_calendar_events FOR DELETE
  USING (auth.uid() = creator_id);

-- RLS Policies for shared_media
CREATE POLICY "Users can view media from their connections"
  ON shared_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM parent_connections
      WHERE id = connection_id
      AND status = 'accepted'
      AND (requester_id = auth.uid() OR recipient_id = auth.uid())
    )
  );

CREATE POLICY "Users can upload media to their connections"
  ON shared_media FOR INSERT
  WITH CHECK (auth.uid() = uploader_id);

CREATE POLICY "Users can delete own media"
  ON shared_media FOR DELETE
  USING (auth.uid() = uploader_id);

-- RLS Policies for shared_activities
CREATE POLICY "Users can view activities from their connections"
  ON shared_activities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM parent_connections
      WHERE id = connection_id
      AND status = 'accepted'
      AND (requester_id = auth.uid() OR recipient_id = auth.uid())
    )
  );

CREATE POLICY "Users can create activities for their connections"
  ON shared_activities FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update activities in their connections"
  ON shared_activities FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM parent_connections
      WHERE id = connection_id
      AND status = 'accepted'
      AND (requester_id = auth.uid() OR recipient_id = auth.uid())
    )
  );

-- Create storage bucket for shared media
INSERT INTO storage.buckets (id, name, public)
VALUES ('parent-network-media', 'parent-network-media', false);

-- Storage RLS Policies
CREATE POLICY "Users can upload media to their folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'parent-network-media' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view media from their connections"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'parent-network-media'
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR EXISTS (
      SELECT 1 FROM parent_connections
      WHERE status = 'accepted'
      AND (
        (requester_id = auth.uid() AND recipient_id::text = (storage.foldername(name))[1])
        OR (recipient_id = auth.uid() AND requester_id::text = (storage.foldername(name))[1])
      )
    )
  )
);

CREATE POLICY "Users can delete own media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'parent-network-media'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create updated_at triggers
CREATE TRIGGER update_shared_calendar_events_updated_at
BEFORE UPDATE ON shared_calendar_events
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_shared_activities_updated_at
BEFORE UPDATE ON shared_activities
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();