
import React, { useState } from "react";
import { useSupportWall } from "@/hooks/useSupportWall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Send, Users } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { formatDistanceToNow } from "date-fns";

const CommunitySupportWall: React.FC = () => {
  const { posts, postMessage, toggleHeart, loading } = useSupportWall();
  const [newMessage, setNewMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setIsPosting(true);
    try {
      await postMessage(newMessage);
      setNewMessage("");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Users className="h-8 w-8 text-purple-400" />
            Community Support Wall
          </CardTitle>
          <p className="text-purple-200 mt-2">
            Share encouragement, celebrate wins, and support each other anonymously
          </p>
        </CardHeader>
        <CardContent>
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share a word of encouragement, a personal win, or support for others..."
                className="min-h-[100px] bg-white/5 border-purple-500/30 text-white placeholder:text-purple-200"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-300">
                  {newMessage.length}/500 characters
                </span>
                <Button
                  type="submit"
                  disabled={!newMessage.trim() || isPosting}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isPosting ? "Posting..." : "Post Anonymously"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-purple-200 mb-4">
                Sign in to share encouragement with the community
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Sign In
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
            <p className="text-purple-200 mt-2">Loading community messages...</p>
          </div>
        ) : posts.length === 0 ? (
          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 text-lg mb-2">No messages yet</p>
              <p className="text-slate-400">Be the first to share some encouragement!</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card
              key={post.id}
              className="bg-slate-800/50 border-l-4 border-purple-500 hover:bg-slate-800/70 transition-colors"
            >
              <CardContent className="p-6">
                <blockquote className="text-white text-lg italic mb-4 leading-relaxed">
                  "{post.content}"
                </blockquote>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleHeart(post.id)}
                      className={`text-sm ${
                        post.user_has_hearted
                          ? "text-red-400 hover:text-red-300"
                          : "text-slate-400 hover:text-red-400"
                      }`}
                      disabled={!user}
                    >
                      <Heart
                        className={`h-4 w-4 mr-1 ${
                          post.user_has_hearted ? "fill-current" : ""
                        }`}
                      />
                      {post.hearts}
                    </Button>
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

export default CommunitySupportWall;
