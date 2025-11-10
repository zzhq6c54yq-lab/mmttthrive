import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Media {
  id: string;
  title: string | null;
  description: string | null;
  media_type: string;
  file_url: string;
  child_name: string | null;
  event_date: string | null;
  tags: string[] | null;
  created_at: string;
}

const MediaGallery: React.FC = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    child_name: '',
    event_date: '',
    connection_id: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchConnections();
    fetchMedia();
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

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('shared_media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadMedia = async () => {
    if (!selectedFile || !formData.connection_id) {
      toast({
        title: 'Missing information',
        description: 'Please select a file and connection',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload file to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('parent-network-media')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('parent-network-media')
        .getPublicUrl(fileName);

      // Determine media type
      const mediaType = selectedFile.type.startsWith('image/') ? 'photo' : 
                        selectedFile.type.startsWith('video/') ? 'video' : 'document';

      // Insert media record
      const { error: insertError } = await supabase
        .from('shared_media')
        .insert({
          uploader_id: user.id,
          connection_id: formData.connection_id,
          media_type: mediaType,
          file_url: urlData.publicUrl,
          title: formData.title || null,
          description: formData.description || null,
          child_name: formData.child_name || null,
          event_date: formData.event_date || null,
        });

      if (insertError) throw insertError;

      toast({
        title: 'Upload successful!',
        description: 'Your media has been shared',
      });

      setIsDialogOpen(false);
      setSelectedFile(null);
      setFormData({
        title: '',
        description: '',
        child_name: '',
        event_date: '',
        connection_id: '',
      });
      fetchMedia();
    } catch (error: any) {
      console.error('Error uploading media:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload media',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Photo & Media Gallery</h3>
          <p className="text-sm text-muted-foreground">Share photos and videos with connected parents</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={connections.length === 0}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
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
                <Label htmlFor="file">Select File</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="First day of school"
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
                <Label htmlFor="date">Event Date (Optional)</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add details..."
                />
              </div>
              <Button onClick={uploadMedia} disabled={uploading} className="w-full">
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {connections.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">No connections yet</p>
            <p className="text-sm text-muted-foreground">
              Add connections to start sharing photos and videos
            </p>
          </CardContent>
        </Card>
      ) : media.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">No media shared yet</p>
            <p className="text-sm text-muted-foreground">
              Upload photos and videos to share with connected parents
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square bg-muted relative">
                {item.media_type === 'photo' ? (
                  <img
                    src={item.file_url}
                    alt={item.title || 'Shared photo'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              {(item.title || item.child_name) && (
                <CardContent className="p-3">
                  {item.title && (
                    <p className="font-medium text-sm text-foreground truncate">{item.title}</p>
                  )}
                  {item.child_name && (
                    <p className="text-xs text-muted-foreground">{item.child_name}</p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;