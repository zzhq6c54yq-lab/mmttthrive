import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function WhisperWall() {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<{ [key: string]: string }>({});

  // Fetch all whispers
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("whispers")
      .select("id, content, created_at, hearts, replies(content)")
      .order("created_at", { ascending: false });
    if (!error) setPosts(data || []);
  };

  useEffect(() => {
    fetchPosts();
    const channel = supabase
      .channel("realtime:whispers")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "whispers" },
        fetchPosts
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createPost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    await supabase.from("whispers").insert([{ content }]);
    setContent("");
    setLoading(false);
  };

  const createReply = async (postId: string) => {
    if (!reply[postId]?.trim()) return;
    await supabase.from("replies").insert([{ whisper_id: postId, content: reply[postId] }]);
    setReply((prev) => ({ ...prev, [postId]: "" }));
  };

  const toggleHeart = async (postId: string, hearts: number) => {
    await supabase
      .from("whispers")
      .update({ hearts: hearts + 1 })
      .eq("id", postId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-white flex flex-col items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-5 mb-4"
      >
        <textarea
          placeholder="Speak your heart... 💬"
          className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-pink-300"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
        <button
          onClick={createPost}
          disabled={loading}
          className="mt-3 w-full bg-pink-500 text-white rounded-lg py-2 font-semibold hover:bg-pink-600 transition"
        >
          {loading ? "Sending..." : "Post Anonymously"}
        </button>
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow rounded-xl p-4 border border-pink-100"
          >
            <p className="text-gray-800 text-base mb-2">{post.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{new Date(post.created_at).toLocaleString()}</span>
              <button
                onClick={() => toggleHeart(post.id, post.hearts || 0)}
                className="flex items-center space-x-1 text-pink-500 hover:text-pink-600"
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                <span>{post.hearts || 0}</span>
              </button>
            </div>

            {/* Replies */}
            <div className="mt-3 ml-4 space-y-2">
              {post.replies?.map((r: any, i: number) => (
                <div key={i} className="bg-pink-50 p-2 rounded-md text-gray-700 text-sm">
                  {r.content}
                </div>
              ))}
            </div>

            {/* Add Reply */}
            <div className="mt-3 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Comment anonymously..."
                className="flex-grow border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-pink-200"
                value={reply[post.id] || ""}
                onChange={(e) =>
                  setReply((prev) => ({ ...prev, [post.id]: e.target.value }))
                }
              />
              <button
                onClick={() => createReply(post.id)}
                className="text-pink-600 font-bold text-xl"
              >
                ➤
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
