
import React from "react";
import { BadgePercent, Wallet, PercentIcon, Shield, ShoppingBag, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface CreditOverviewCardProps {
  credits: number;
  handleCashOut: (amount: number) => void;
  handleUpgradePlan: (plan: string) => void;
}

const CreditOverviewCard: React.FC<CreditOverviewCardProps> = ({ 
  credits, 
  handleCashOut,
  handleUpgradePlan 
}) => {
  const { toast } = useToast();
  
  return (
    <Card className="bg-white shadow-md border border-amber-200">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
        <CardTitle className="text-2xl flex items-center gap-2 text-amber-800">
          <BadgePercent className="h-6 w-6 text-amber-600" />
          Your Co-Pay Credits
        </CardTitle>
        <CardDescription className="text-gray-600">Use these dollar-value credits for therapy sessions or Thrive Apparel</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-4xl font-bold text-amber-600">${credits}</span>
            <span className="text-gray-500 ml-2">credits available</span>
          </div>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-black font-medium shadow-md"
            onClick={() => handleCashOut(5)}
          >
            Use Credits
          </Button>
        </div>
        <div className="mb-3">
          <Progress value={credits} max={100} className="h-3 bg-gray-100">
            <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
          </Progress>
        </div>
        
        {/* Credit Cashout Section */}
        <div className="mt-8 p-6 rounded-lg border border-amber-300 shadow-md bg-gradient-to-r from-amber-50 to-amber-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-amber-200">
              <Wallet className="h-6 w-6 text-amber-700" />
            </div>
            <h4 className="font-semibold text-gray-800 text-lg">Cash Out Credits</h4>
          </div>
          <p className="text-gray-600 mb-6">
            Convert your earned credits to usable Thrive credits in $5 increments. Available for immediate use.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[5, 10, 15, 20, 25].map((amount) => (
              <Button 
                key={amount}
                onClick={() => handleCashOut(amount)}
                disabled={credits < amount}
                className={`${credits >= amount ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'bg-gray-200 text-gray-500'} font-semibold`}
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-amber-100">
                <PercentIcon className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-lg">Gold Membership</h4>
            </div>
            <p className="text-gray-600 pl-12">Earn $5 back on every $100 spent on therapy costs and monthly subscriptions.</p>
            <Button 
              className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-sm"
              onClick={() => handleUpgradePlan("gold")}
            >
              Get Started
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-300 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-amber-200">
                <Shield className="h-6 w-6 text-amber-700" />
              </div>
              <h4 className="font-semibold text-gray-800 text-lg">Platinum Membership</h4>
            </div>
            <p className="text-gray-600 pl-12">Enjoy greater rewards with $10 back on every $100 spent, designed for those who want to maximize benefits.</p>
            <Button 
              className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold shadow-sm"
              onClick={() => handleUpgradePlan("platinum")}
            >
              Upgrade Now
            </Button>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg border border-amber-300 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-amber-50 to-amber-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-amber-200">
              <ShoppingBag className="h-6 w-6 text-amber-700" />
            </div>
            <h4 className="font-semibold text-gray-800 text-lg">Thrive Apparel Shop</h4>
          </div>
          <p className="text-gray-600 mb-4">Redeem your credits for exclusive mental wellness merchandise and apparel. Each credit equals one dollar toward your purchase.</p>
          <div className="flex justify-end">
            <a href="https://thrive-apparel.com" target="_blank" rel="noopener noreferrer">
              <Button className="bg-amber-600 hover:bg-amber-700 text-black font-semibold shadow-md">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop with Credits
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditOverviewCard;
