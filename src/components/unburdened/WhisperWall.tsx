import { AnimatePresence, motion } from "framer-motion";
import { useUnburden } from "@/hooks/useUnburden";
import EmotionPortal from "./EmotionPortal";
import MirrorReflection from "./MirrorReflection";
import Heartboard from "./Heartboard";
import { Button } from "@/components/ui/button";

export default function WhisperWall() {
  const {
    view,
    setView,
    posts,
    submitUnburden,
    reflection,
    reflectionLoading,
    lastPost,
    sortBy,
    setSortBy,
    toggleHeart,
    addReply,
    userHearts,
    loading,
  } = useUnburden();

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Navigation Tabs */}
      <nav className="flex gap-2 border-b border-border pb-2">
        <Button
          variant={view === "portal" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("portal")}
        >
          Let it Out
        </Button>
        <Button
          variant={view === "heartboard" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("heartboard")}
        >
          Heartboard
        </Button>
        {reflection && (
          <Button
            variant={view === "reflection" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("reflection")}
          >
            Reflection
          </Button>
        )}
      </nav>

      {/* View Content */}
      <AnimatePresence mode="wait">
        {view === "portal" && (
          <motion.div key="portal" {...fadeAnimation}>
            <EmotionPortal onSubmit={submitUnburden} />
          </motion.div>
        )}

        {view === "reflection" && lastPost && (
          <motion.div key="reflection" {...fadeAnimation}>
            <MirrorReflection
              text={lastPost.content}
              mood={lastPost.mood || "sad"}
              reflection={reflection || ""}
              loading={reflectionLoading}
              onContinue={() => setView("heartboard")}
            />
          </motion.div>
        )}

        {view === "heartboard" && (
          <motion.div key="heartboard" {...fadeAnimation}>
            <Heartboard
              posts={posts}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onHeart={toggleHeart}
              onReply={addReply}
              userHearts={userHearts}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
