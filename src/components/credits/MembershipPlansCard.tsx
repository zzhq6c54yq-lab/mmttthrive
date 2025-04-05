
import React from "react";
import { User, Trophy, Gem, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MembershipPlansCardProps {
  currentPlan: string;
  handleUpgradePlan: (plan: string) => void;
}

const MembershipPlansCard: React.FC<MembershipPlansCardProps> = ({ 
  currentPlan, 
  handleUpgradePlan 
}) => {
  return (
    <Card className="bg-gradient-to-b from-amber-50 to-white border border-amber-200 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-200 border-b border-amber-200">
        <CardTitle className="text-2xl text-amber-800 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-600" />
          Your Membership Plan
        </CardTitle>
        <CardDescription className="text-gray-700">Upgrade your plan to earn more co-pay credits and access exclusive features</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-full ${currentPlan === "basic" ? "bg-gray-200" : currentPlan === "gold" ? "bg-amber-200" : "bg-purple-200"}`}>
              {currentPlan === "basic" ? (
                <User className="h-6 w-6 text-gray-700" />
              ) : currentPlan === "gold" ? (
                <Trophy className="h-6 w-6 text-amber-700" />
              ) : (
                <Gem className="h-6 w-6 text-purple-700" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                Current Plan: {currentPlan === "basic" ? "Basic" : currentPlan === "gold" ? "Gold" : "Platinum"} Membership
              </h3>
              <p className="text-gray-600">
                {currentPlan === "basic" 
                  ? "You're on the free Basic plan. Upgrade for more benefits!" 
                  : currentPlan === "gold" 
                    ? "You're earning 5% back in co-pay credits with our Gold plan" 
                    : "You're earning 10% back in co-pay credits with our premium Platinum plan"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <Card className={`border ${currentPlan === "basic" ? "border-gray-400 ring-2 ring-gray-300" : "border-gray-200"} h-full transform transition-all relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-24 h-24">
              <div className="absolute transform rotate-45 bg-gray-500 text-xs text-white font-bold py-1 right-[-35px] top-[20px] w-[135px] text-center">
                Current Plan
              </div>
            </div>
            <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 pb-3">
              <CardTitle className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span>Basic</span>
                </div>
                <span className="text-lg font-normal">Free</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">•</span>
                  <span className="text-gray-600">Access to essential mental wellness tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">•</span>
                  <span className="text-gray-600">Join virtual meetings and classes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">•</span>
                  <span className="text-gray-600">Limited workshop access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">•</span>
                  <span className="text-gray-600">No co-pay credits back</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                disabled
                variant="outline" 
                className="w-full text-black border-gray-300"
              >
                Current Plan
              </Button>
            </CardFooter>
          </Card>

          {/* Gold Plan */}
          <Card className={`border ${currentPlan === "gold" ? "border-amber-400 ring-2 ring-amber-300" : "border-amber-200"} h-full transform transition-all hover:shadow-lg relative overflow-hidden`}>
            {currentPlan === "gold" && (
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute transform rotate-45 bg-amber-500 text-xs text-white font-bold py-1 right-[-35px] top-[20px] w-[135px] text-center">
                  Current Plan
                </div>
              </div>
            )}
            <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-200 pb-3">
              <CardTitle className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-600" />
                  <span>Gold</span>
                </div>
                <span className="text-lg font-normal">$5/month</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-800 font-medium">5% back in co-pay credits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-800">Access to all mental wellness tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-800">Extended workshop library</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-800">Personalized wellness plan</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              {currentPlan === "gold" ? (
                <Button 
                  disabled
                  variant="amber"
                  className="w-full text-black bg-amber-400 hover:bg-amber-500"
                >
                  Current Plan
                </Button>
              ) : (
                <Button 
                  onClick={() => handleUpgradePlan("gold")}
                  className="w-full text-black bg-amber-500 hover:bg-amber-600 font-medium shadow-md"
                >
                  Upgrade for $5 Credits
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Platinum Plan */}
          <Card className={`border ${currentPlan === "platinum" ? "border-purple-400 ring-2 ring-purple-300" : "border-purple-200"} h-full transform transition-all hover:shadow-lg relative overflow-hidden`}>
            {currentPlan === "platinum" && (
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute transform rotate-45 bg-purple-500 text-xs text-white font-bold py-1 right-[-35px] top-[20px] w-[135px] text-center">
                  Current Plan
                </div>
              </div>
            )}
            <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-200 pb-3">
              <CardTitle className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Gem className="h-5 w-5 text-purple-600" />
                  <span>Platinum</span>
                </div>
                <span className="text-lg font-normal">$10/month</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-800 font-medium">10% back in co-pay credits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-800">Unlimited access to all platform features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-800">Premium workshop content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-800">Early access to new features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold mt-0.5">✓</span>
                  <span className="text-gray-800">Personalized wellness roadmap</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              {currentPlan === "platinum" ? (
                <Button 
                  disabled
                  className="w-full text-black bg-purple-400 hover:bg-purple-500"
                >
                  Current Plan
                </Button>
              ) : (
                <Button 
                  onClick={() => handleUpgradePlan("platinum")}
                  className="w-full text-white bg-purple-600 hover:bg-purple-700 font-medium shadow-md"
                >
                  {currentPlan === "basic" ? "Upgrade for $10 Credits" : "Upgrade for $5 Credits"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-3">
            <ArrowUpRight className="h-5 w-5 text-amber-600" />
            <p className="text-gray-700">
              <span className="font-medium">Upgrade today</span> and start earning more co-pay credits that can be redeemed for therapy sessions or at <a href="https://thrive-apparel.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline">thrive-apparel.com</a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipPlansCard;
