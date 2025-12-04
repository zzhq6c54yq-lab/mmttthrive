import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Users, DollarSign, HandHelping, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface FinancialHelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FinancialHelpModal({ open, onOpenChange }: FinancialHelpModalProps) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleClose = () => {
    setStep(1);
    onOpenChange(false);
  };

  const handleApply = () => {
    handleClose();
    navigate("/app/barter-application");
  };

  const handleLearnMore = () => {
    handleClose();
    navigate("/app/barter-system");
  };

  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center py-8 px-4"
          >
            {/* Heart animation */}
            <motion.div
              className="mx-auto mb-8"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[hsl(var(--primary))]/20 rounded-full blur-2xl scale-150" />
                <div className="relative p-6 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[#D4AF37]/20 rounded-full">
                  <Heart className="w-16 h-16 text-[hsl(var(--primary))]" fill="currentColor" />
                </div>
              </div>
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              We See You. We Understand.
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Taking the first step to ask for help takes courage. We're honored you're here, and we want you to know — you're not alone in this.
            </motion.p>

            <Button 
              onClick={() => setStep(2)}
              size="lg"
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#D4AF37] hover:opacity-90 font-semibold"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center py-8 px-4"
          >
            <motion.div
              className="mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                Mental Health Isn't a Luxury
              </h2>
              <p className="text-xl md:text-2xl font-semibold mb-6" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                It's a Fundamental Right and Necessity
              </p>
            </motion.div>

            <motion.div
              className="bg-muted/50 rounded-xl p-6 mb-8 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-muted-foreground italic">
                "We believe that healing shouldn't depend on your bank account. Every person deserves compassionate, professional care — and we're committed to making that possible for you."
              </p>
            </motion.div>

            <Button 
              onClick={() => setStep(3)}
              size="lg"
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#D4AF37] hover:opacity-90 font-semibold"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center py-8 px-4"
          >
            <motion.div
              className="mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <div className="p-4 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[#D4AF37]/20 rounded-full inline-block">
                <Users className="w-12 h-12 text-[hsl(var(--primary))]" />
              </div>
            </motion.div>

            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              We're In This Journey With You
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-muted/50 rounded-xl p-4">
                <DollarSign className="w-8 h-8 text-[hsl(var(--primary))] mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Sliding Scale</h3>
                <p className="text-sm text-muted-foreground">Pay what you can afford</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <Users className="w-8 h-8 text-[hsl(var(--primary))] mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Community Service</h3>
                <p className="text-sm text-muted-foreground">Earn credits by giving back</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <HandHelping className="w-8 h-8 text-[hsl(var(--primary))] mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Payment Plans</h3>
                <p className="text-sm text-muted-foreground">Flexible monthly options</p>
              </div>
            </motion.div>

            <motion.p
              className="text-muted-foreground max-w-lg mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Our barter system allows you to contribute what you can and earn therapy credits through community service. Together, we'll find a way that works for you.
            </motion.p>

            <Button 
              onClick={() => setStep(4)}
              size="lg"
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#D4AF37] hover:opacity-90 font-semibold"
            >
              See How to Apply
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center py-8 px-4"
          >
            <motion.div
              className="mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-[#D4AF37]/20 rounded-full inline-block">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </motion.div>

            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ready to Take the Next Step?
            </motion.h2>

            <motion.p
              className="text-muted-foreground max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Applications are reviewed within 2 business days. Our team is here to help you find the right path to care.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={handleApply}
                size="lg"
                className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#D4AF37] hover:opacity-90 font-semibold"
              >
                <Heart className="w-4 h-4 mr-2" />
                Apply for Financial Assistance
              </Button>
              <Button 
                onClick={handleLearnMore}
                variant="outline"
                size="lg"
                className="border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--primary))]/10"
              >
                Learn More About Barter System
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Not ready yet? That's okay.{" "}
              <button 
                onClick={handleClose}
                className="text-[hsl(var(--primary))] hover:underline"
              >
                You can always come back
              </button>
            </motion.p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl p-0 overflow-hidden border-[hsl(var(--primary))]/20">
        <VisuallyHidden>
          <DialogTitle>Financial Assistance</DialogTitle>
        </VisuallyHidden>
        
        {/* Progress indicators */}
        <div className="flex gap-2 px-6 pt-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                s <= step 
                  ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[#D4AF37]" 
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
