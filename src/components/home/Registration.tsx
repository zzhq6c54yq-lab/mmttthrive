
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface RegistrationProps {
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onBack, onContinue, onSkip }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() || email.trim()) {
      toast({
        title: "Registration Saved",
        description: "You can complete your profile anytime.",
      });
    }
    
    onContinue();
  };

  return (
    <div className="min-h-screen bg-[#1a1a20] flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-md bg-[#2a2a30] rounded-lg p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#B87333] p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold text-center copper-text flex items-center">
            <UserPlus className="mr-2 h-6 w-6 text-[#B87333]" />
            Join Us
          </h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
        
        <p className="text-gray-400 mb-8 text-center">
          Register to save your vision board and track your progress
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#3a3a40] border-[#4a4a50] text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#3a3a40] border-[#4a4a50] text-white"
            />
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <Button type="submit" variant="bronze">
              Register & Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              type="button" 
              variant="outline_copper" 
              onClick={onSkip}
              className="mt-2"
            >
              Skip for Now
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onBack}
              className="text-[#B87333] mt-4 mx-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
