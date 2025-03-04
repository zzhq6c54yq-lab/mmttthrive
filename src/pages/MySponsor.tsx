
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Book, Calendar, HeartHandshake, Users, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SponsorChatbot from "@/components/SponsorChatbot";
import HomeButton from "@/components/HomeButton";

const twelveSteps = [
  "We admitted we were powerless over our addiction, that our lives had become unmanageable.",
  "Came to believe that a Power greater than ourselves could restore us to sanity.",
  "Made a decision to turn our will and our lives over to the care of God as we understood Him.",
  "Made a searching and fearless moral inventory of ourselves.",
  "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
  "Were entirely ready to have God remove all these defects of character.",
  "Humbly asked Him to remove our shortcomings.",
  "Made a list of all persons we had harmed, and became willing to make amends to them all.",
  "Made direct amends to such people wherever possible, except when to do so would injure them or others.",
  "Continued to take personal inventory and when we were wrong promptly admitted it.",
  "Sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out.",
  "Having had a spiritual awakening as a result of these steps, we tried to carry this message to addicts, and to practice these principles in all our affairs."
];

const traditions = [
  "Our common welfare should come first; personal recovery depends on NA unity.",
  "For our group purpose there is but one ultimate authority—a loving God as He may express Himself in our group conscience. Our leaders are but trusted servants; they do not govern.",
  "The only requirement for membership is a desire to stop using.",
  "Each group should be autonomous except in matters affecting other groups or NA as a whole.",
  "Each group has but one primary purpose—to carry the message to the addict who still suffers.",
  "An NA group ought never endorse, finance, or lend the NA name to any related facility or outside enterprise, lest problems of money, property, or prestige divert us from our primary purpose.",
  "Every NA group ought to be fully self-supporting, declining outside contributions.",
  "Narcotics Anonymous should remain forever nonprofessional, but our service centers may employ special workers.",
  "NA, as such, ought never be organized, but we may create service boards or committees directly responsible to those they serve.",
  "Narcotics Anonymous has no opinion on outside issues; hence the NA name ought never be drawn into public controversy.",
  "Our public relations policy is based on attraction rather than promotion; we need always maintain personal anonymity at the level of press, radio, and films.",
  "Anonymity is the spiritual foundation of all our Traditions, ever reminding us to place principles before personalities."
];

const MySponsor = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white p-6">
      <HomeButton />
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-4">
            My <span className="gradient-heading">Sponsor</span>
          </h1>
          <p className="text-gray-300">Your digital support system for recovery</p>
        </div>

        <Tabs defaultValue="sponsor" className="space-y-6">
          <TabsList className="bg-white/5 border border-[#B87333]/20">
            <TabsTrigger value="sponsor" className="data-[state=active]:bg-[#B87333]">
              <MessageCircle className="h-4 w-4 mr-2" />
              Digital Sponsor
            </TabsTrigger>
            <TabsTrigger value="steps" className="data-[state=active]:bg-[#B87333]">
              <Book className="h-4 w-4 mr-2" />
              12 Steps
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sponsor" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SponsorChatbot />
              </div>
              <div className="space-y-4">
                <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h3 className="text-lg font-medium mb-2">Digital Sponsor Features</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <HeartHandshake className="h-4 w-4 mr-2 text-[#B87333]" />
                      24/7 Support and Guidance
                    </li>
                    <li className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2 text-[#B87333]" />
                      Recovery-focused Conversations
                    </li>
                    <li className="flex items-center">
                      <Book className="h-4 w-4 mr-2 text-[#B87333]" />
                      Step Work Support
                    </li>
                    <li className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-[#B87333]" />
                      Community Connection
                    </li>
                  </ul>
                </Card>
                
                {/* 12 Traditions Card */}
                <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h3 className="text-lg font-medium mb-2">12 Traditions</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Explore the guiding principles that keep our fellowship united.
                  </p>
                  <div className="flex">
                    <Button 
                      variant="outline" 
                      className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                      onClick={() => document.querySelector('[data-value="traditions"]')?.click()}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View Traditions
                    </Button>
                  </div>
                </Card>
                
                {/* Find Meetings Card */}
                <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h3 className="text-lg font-medium mb-2">Find Meetings</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Connect with local and online NA meetings.
                  </p>
                  <div className="flex">
                    <Button 
                      variant="outline" 
                      className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                      onClick={() => document.querySelector('[data-value="meetings"]')?.click()}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Find Meetings
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="steps">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {twelveSteps.map((step, index) => (
                <Card key={index} className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h3 className="text-lg font-medium mb-2 text-[#B87333]">Step {index + 1}</h3>
                  <p className="text-sm text-gray-300">{step}</p>
                </Card>
              ))}
            </div>
            
            {/* 12 Traditions Card */}
            <div className="mt-6">
              <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                <h3 className="text-lg font-medium mb-2">12 Traditions</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Explore the guiding principles that keep our fellowship united.
                </p>
                <div className="flex">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                    onClick={() => document.querySelector('[data-value="traditions"]')?.click()}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View Traditions
                  </Button>
                </div>
              </Card>
            </div>
            
            {/* Find Meetings Card */}
            <div className="mt-4">
              <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                <h3 className="text-lg font-medium mb-2">Find Meetings</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Connect with local and online NA meetings.
                </p>
                <div className="flex">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                    onClick={() => document.querySelector('[data-value="meetings"]')?.click()}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Find Meetings
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Hidden tabs that are accessible via buttons */}
          <TabsTrigger value="traditions" className="hidden" data-value="traditions" />
          <TabsContent value="traditions">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {traditions.map((tradition, index) => (
                <Card key={index} className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h3 className="text-lg font-medium mb-2 text-[#B87333]">Tradition {index + 1}</h3>
                  <p className="text-sm text-gray-300">{tradition}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsTrigger value="meetings" className="hidden" data-value="meetings" />
          <TabsContent value="meetings">
            <Card className="p-6 border border-[#B87333]/20 bg-white/5">
              <h3 className="text-2xl font-medium mb-4">Find NA Meetings</h3>
              <p className="text-gray-300 mb-4">
                Connect with your local NA community or join virtual meetings worldwide.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h4 className="text-lg font-medium mb-2">Local Meetings</h4>
                  <p className="text-sm text-gray-300 mb-4">
                    Find in-person meetings in your area.
                  </p>
                  <Button 
                    className="w-full bg-[#B87333] hover:bg-[#B87333]/80"
                    onClick={() => window.open("https://www.na.org/meetingsearch/", "_blank")}
                  >
                    Search Local Meetings
                  </Button>
                </Card>
                <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h4 className="text-lg font-medium mb-2">Virtual Meetings</h4>
                  <p className="text-sm text-gray-300 mb-4">
                    Join online meetings from anywhere.
                  </p>
                  <Button 
                    className="w-full bg-[#B87333] hover:bg-[#B87333]/80"
                    onClick={() => window.open("https://virtual-na.org/", "_blank")}
                  >
                    Join Virtual Meetings
                  </Button>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MySponsor;
