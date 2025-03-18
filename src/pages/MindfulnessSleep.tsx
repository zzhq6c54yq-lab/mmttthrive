
import React from "react";
import { Moon, Sun, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Page from "@/components/Page";

const MindfulnessSleep = () => {
  return (
    <Page title="Mindfulness & Sleep">
      <div className="container px-4 py-6 max-w-6xl mx-auto">
        <Tabs defaultValue="mindfulness" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mindfulness" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Sun className="h-5 w-5 text-orange-500" />
                    Morning Meditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Start your day with clarity and intention through a guided morning meditation.</p>
                  <Button className="w-full">Begin Practice</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Heart className="h-5 w-5 text-red-500" />
                    Loving-Kindness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Cultivate compassion for yourself and others with this heart-centered practice.</p>
                  <Button className="w-full">Begin Practice</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Mindful Moments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Short practices you can integrate throughout your day for moments of presence.</p>
                  <Button className="w-full">Begin Practice</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Moon className="h-5 w-5 text-purple-500" />
                    Sleep Meditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Gentle guidance to help you relax and prepare for restful sleep.</p>
                  <Button className="w-full">Begin Practice</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Sleep Hygiene
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Build healthy sleep habits with these evidence-based recommendations.</p>
                  <Button className="w-full">Learn More</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Moon className="h-5 w-5 text-indigo-500" />
                    Sleep Sounds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Soothing ambient sounds to help you fall asleep and stay asleep.</p>
                  <Button className="w-full">Browse Sounds</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default MindfulnessSleep;
