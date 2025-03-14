
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, GiftIcon, CreditCard, Coins, Gift, Upload, ClipboardCheck, Download, Heart, User, Users, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const CoPayCredits = () => {
  const { toast } = useToast();
  const [credits, setCredits] = useState(75);

  const handleEarnCredits = (amount: number, source: string) => {
    setCredits(prev => prev + amount);
    toast({
      title: `Earned ${amount} Credits!`,
      description: `You've earned ${amount} copay credits from ${source}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-amber-400/30 via-amber-300/20 to-amber-200/10 transform -skew-y-3"></div>
          <div className="absolute top-10 left-0 right-0 h-28 bg-gradient-to-r from-amber-200/10 via-amber-300/20 to-amber-400/30 transform skew-y-3"></div>
        </div>
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <CreditCard className="h-8 w-8 text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-light">Copay Credits</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">Earn and use credits to reduce or eliminate your therapy session copays.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="md:col-span-2 border-amber-200/40 bg-gradient-to-br from-amber-50 to-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Your Copay Credits</CardTitle>
              <CardDescription>Use these credits to reduce your therapy session costs</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-4xl font-bold text-amber-500">{credits}</span>
                  <span className="text-gray-500 ml-2">credits available</span>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600">Use Credits</Button>
              </div>
              <Progress value={credits} max={100} className="h-3 bg-amber-100">
                <div className="h-full bg-amber-500 rounded-full"></div>
              </Progress>
              <p className="text-sm text-gray-500 mt-3">
                {credits >= 100 ? "You have enough credits for a free session!" : `${100 - credits} more credits needed for a free session`}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-amber-200/40 bg-gradient-to-br from-amber-50 to-white">
            <CardHeader className="pb-4">
              <CardTitle>Credit History</CardTitle>
              <CardDescription>Your recent transactions</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="space-y-3">
                {[
                  { date: "Mar 12, 2024", action: "Used for session", amount: -25 },
                  { date: "Mar 10, 2024", action: "Wellness challenge", amount: 15 },
                  { date: "Mar 5, 2024", action: "Referral bonus", amount: 30 },
                  { date: "Feb 28, 2024", action: "Used for session", amount: -25 }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b last:border-0">
                    <div>
                      <div className="text-sm font-medium">{item.action}</div>
                      <div className="text-xs text-gray-500">{item.date}</div>
                    </div>
                    <div className={`font-medium ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.amount > 0 ? `+${item.amount}` : item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button variant="outline" className="w-full text-amber-600 border-amber-200 hover:bg-amber-50">
                <Download className="h-4 w-4 mr-2" />
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="earn" className="w-full">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="earn" className="flex-1">Earn Credits</TabsTrigger>
            <TabsTrigger value="redeem" className="flex-1">Redeem Credits</TabsTrigger>
            <TabsTrigger value="info" className="flex-1">How It Works</TabsTrigger>
          </TabsList>
          
          <TabsContent value="earn" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    Complete Wellness Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Earn credits by completing daily wellness challenges, practicing mindfulness, or tracking your mood.
                  </p>
                  <div className="bg-amber-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Daily Wellness Challenge</span>
                      <span className="text-amber-600 font-bold">+5 credits</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => handleEarnCredits(5, "Daily Wellness Challenge")}
                  >
                    Complete Challenge
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Refer Friends & Family
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Invite others to Thrive MT and earn credits when they sign up or attend their first session.
                  </p>
                  <div className="bg-amber-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">New Member Referral</span>
                      <span className="text-amber-600 font-bold">+30 credits</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => handleEarnCredits(30, "Friend Referral")}
                  >
                    Invite Friends
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-green-500" />
                    Participate in Research
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Contribute to mental health research by participating in surveys and studies.
                  </p>
                  <div className="bg-amber-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Quarterly Survey</span>
                      <span className="text-amber-600 font-bold">+20 credits</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => handleEarnCredits(20, "Research Participation")}
                  >
                    Take Survey
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>More Ways to Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 flex items-start gap-3">
                    <Users className="h-5 w-5 text-amber-500 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Community Engagement</h3>
                      <p className="text-sm text-gray-600">Participate in forums, group sessions, or peer support activities.</p>
                      <p className="text-amber-600 font-medium text-sm mt-1">+5-15 credits per activity</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex items-start gap-3">
                    <Star className="h-5 w-5 text-amber-500 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Therapy Milestone Rewards</h3>
                      <p className="text-sm text-gray-600">Celebrate therapy milestones and consistent attendance.</p>
                      <p className="text-amber-600 font-medium text-sm mt-1">+10-50 credits per milestone</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex items-start gap-3">
                    <Gift className="h-5 w-5 text-amber-500 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Special Promotions</h3>
                      <p className="text-sm text-gray-600">Seasonal or special event promotions with bonus credit opportunities.</p>
                      <p className="text-amber-600 font-medium text-sm mt-1">Varies by promotion</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex items-start gap-3">
                    <Upload className="h-5 w-5 text-amber-500 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Testimonials & Reviews</h3>
                      <p className="text-sm text-gray-600">Share your experience to help others find mental health support.</p>
                      <p className="text-amber-600 font-medium text-sm mt-1">+25 credits per approved review</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="redeem" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-all border-amber-200/50">
                <CardHeader className="bg-amber-50 rounded-t-lg">
                  <CardTitle>Standard Session Credit</CardTitle>
                  <CardDescription>Reduce your copay for individual therapy</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-amber-500">25</span>
                    <span className="text-gray-500 ml-2">credits</span>
                  </div>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      Reduce standard session copay by $25
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      Valid for any individual therapy session
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      No limit on usage (with available credits)
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">
                    Redeem 25 Credits
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all border-amber-200/50">
                <CardHeader className="bg-amber-50 rounded-t-lg">
                  <CardTitle>Full Session Coverage</CardTitle>
                  <CardDescription>Completely eliminate your copay</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-amber-500">100</span>
                    <span className="text-gray-500 ml-2">credits</span>
                  </div>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      Cover your entire session copay
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      Premium therapist sessions included
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      Best value for your credits
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">
                    Redeem 100 Credits
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Other Redemption Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <User className="h-4 w-4 text-amber-500 mr-2" />
                      Group Therapy Session
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Attend a therapeutic group session.</p>
                    <p className="text-amber-600 font-medium">15 credits</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <PiggyBank className="h-4 w-4 text-amber-500 mr-2" />
                      Premium Resources
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Access premium wellness resources.</p>
                    <p className="text-amber-600 font-medium">10 credits</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <GiftIcon className="h-4 w-4 text-amber-500 mr-2" />
                      Donate to Scholarship
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Help others access mental health care.</p>
                    <p className="text-amber-600 font-medium">Any amount</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Copay Credits</CardTitle>
                <CardDescription>How our credit system works</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">What are Copay Credits?</h3>
                    <p className="text-gray-700">
                      Copay Credits are a unique feature of Thrive MT that allows you to earn credits through various activities and redeem them to reduce or eliminate your therapy session copays. This system makes mental health care more accessible and rewards your engagement in your wellness journey.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">How to Earn Credits</h3>
                    <p className="text-gray-700 mb-3">
                      You can earn credits in multiple ways:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Completing wellness challenges and activities</li>
                      <li>Referring friends and family to Thrive MT</li>
                      <li>Participating in mental health research and surveys</li>
                      <li>Engaging with the Thrive MT community</li>
                      <li>Reaching therapy and wellness milestones</li>
                      <li>Sharing testimonials and reviews</li>
                      <li>Taking advantage of special promotions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">How to Redeem Credits</h3>
                    <p className="text-gray-700 mb-3">
                      Credits can be redeemed at checkout when scheduling therapy sessions or through your account dashboard. The redemption options include:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>25 credits: Reduce your standard session copay by $25</li>
                      <li>100 credits: Get a fully covered session with no copay</li>
                      <li>15 credits: Join a group therapy session</li>
                      <li>10 credits: Access premium resources and tools</li>
                      <li>Any amount: Donate to our scholarship fund to help others</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Credit Policy</h3>
                    <p className="text-gray-700">
                      Credits do not expire as long as your account remains active. You must have a session within a 6-month period to maintain an active account status. Credits cannot be transferred between accounts and have no cash value. Thrive MT reserves the right to modify the credit program with advance notice to members.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Do credits expire?</h3>
                    <p className="text-gray-700">
                      No, credits do not expire as long as your account remains active with at least one session every 6 months.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Can I transfer credits to someone else?</h3>
                    <p className="text-gray-700">
                      Currently, credits cannot be transferred between accounts, but you can donate credits to our scholarship fund.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">How many credits can I earn per month?</h3>
                    <p className="text-gray-700">
                      There is no hard limit on credits earned per month, but certain activities have frequency limits (e.g., daily wellness challenges can only be completed once per day).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Can I combine credits with insurance?</h3>
                    <p className="text-gray-700">
                      Yes, credits reduce your out-of-pocket copay after insurance has been applied.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CoPayCredits;
