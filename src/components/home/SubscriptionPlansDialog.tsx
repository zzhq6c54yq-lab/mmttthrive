
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, ArrowLeft } from "lucide-react";
import SubscriptionCard from "@/components/SubscriptionCard";

interface SubscriptionPlan {
  title: string;
  price: string;
  coPayCredit: string;
  features: { text: string }[];
  recommended?: boolean;
  buttonVariant: any;
  buttonText?: string;
}

interface SubscriptionPlansDialogProps {
  plans: SubscriptionPlan[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscriptionPlansDialog: React.FC<SubscriptionPlansDialogProps> = ({
  plans,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="animated_bronze" size="lg" className="px-8 mb-8">
          View Subscription Plans <Crown className="ml-2" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl" size="default">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl text-white mb-2">
            Choose Your Mental Wellness Plan
          </DialogTitle>
          <DialogDescription>
            Select the plan that best fits your needs and recovery journey
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {plans.map((plan) => (
            <SubscriptionCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              coPayCredit={plan.coPayCredit}
              recommended={plan.recommended}
              buttonVariant={plan.buttonVariant}
              buttonText={plan.buttonText}
            />
          ))}
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPlansDialog;
