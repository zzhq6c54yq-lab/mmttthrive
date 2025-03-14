
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Video, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const SelfHelpResources = () => {
  const resources = [
    {
      title: "Understanding Anxiety",
      type: "Guide",
      format: "PDF",
      description: "Learn about different types of anxiety and evidence-based coping strategies."
    },
    {
      title: "Depression Recovery Workbook",
      type: "Workbook",
      format: "PDF",
      description: "Interactive exercises to help manage symptoms of depression."
    },
    {
      title: "Stress Management Techniques",
      type: "Video Series",
      format: "Video",
      description: "A collection of videos demonstrating effective stress reduction techniques."
    },
    {
      title: "Building Healthy Relationships",
      type: "Guide",
      format: "PDF",
      description: "Strategies for improving communication and boundaries in relationships."
    },
    {
      title: "Mindfulness for Beginners",
      type: "Audio Course",
      format: "Audio",
      description: "A gentle introduction to mindfulness practices for everyday life."
    },
    {
      title: "Sleep Improvement Plan",
      type: "Workbook",
      format: "PDF",
      description: "A structured approach to addressing sleep problems and improving sleep quality."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Self-Help Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Evidence-based tools and materials to support your mental health journey.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {resource.type}
                  </span>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500">
                  {resource.format === "PDF" && <FileText className="h-4 w-4 mr-2" />}
                  {resource.format === "Video" && <Video className="h-4 w-4 mr-2" />}
                  {resource.format === "Audio" && <BookOpen className="h-4 w-4 mr-2" />}
                  {resource.format}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-light mb-6 text-center">Custom Resource Requests</h2>
          <p className="text-gray-700 mb-6 text-center">
            Don't see what you're looking for? We can create customized resources tailored to your specific needs.
          </p>
          <div className="flex justify-center">
            <Button size="lg">Request Resources</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfHelpResources;
