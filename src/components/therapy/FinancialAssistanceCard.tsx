import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, DollarSign, Users, HandHelping } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function FinancialAssistanceCard() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                Need Financial Help? We're Here For You
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mental health care should be accessible to everyone. If the cost of therapy is a barrier, 
                we offer flexible options to make sessions affordable.
              </p>

              <div className="grid md:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Sliding Scale</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Community Service</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HandHelping className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Payment Plans</span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/app/barter-application")}
                className="w-full sm:w-auto"
              >
                Apply for Financial Assistance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}