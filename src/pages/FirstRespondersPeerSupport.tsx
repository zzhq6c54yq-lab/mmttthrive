
import React from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MessageSquare, Video, Download, FileText } from "lucide-react";
import PortalBackButton from "@/components/navigation/PortalBackButton";
import ActionButton from "@/components/navigation/ActionButton";
import { useToast } from "@/components/ui/use-toast";
import { saveAs } from "file-saver";

const FirstRespondersPeerSupport = () => {
  const { toast } = useToast();
  
  const supportGroups = [
    {
      title: "Fire Service Support Group",
      description: "Weekly online meetings for firefighters and fire service personnel",
      nextMeeting: "Apr 22, 2025 · 7:00 PM",
      participants: 12,
      type: "join"
    },
    {
      title: "EMT/Paramedic Circle",
      description: "Biweekly discussions about challenges faced by emergency medical technicians",
      nextMeeting: "Apr 25, 2025 · 8:00 PM",
      participants: 8,
      type: "join"
    },
    {
      title: "Police Officers Support Network",
      description: "Monthly peer support meetings for law enforcement personnel",
      nextMeeting: "Apr 29, 2025 · 7:30 PM",
      participants: 15,
      type: "join"
    },
    {
      title: "Dispatch & Communications Personnel",
      description: "Support group focusing on the unique stresses of emergency dispatchers",
      nextMeeting: "Apr 24, 2025 · 6:00 PM",
      participants: 10,
      type: "join"
    }
  ];

  // Handle new group request
  const handleNewGroupRequest = () => {
    toast({
      title: "Request Received",
      description: "Your request to start a new support group has been submitted. A coordinator will contact you to discuss details.",
      duration: 3000,
    });
  };

  // Handle resource download
  const handleResourceDownload = (title) => {
    try {
      // Create a blob with text content to simulate PDF download
      const blob = new Blob(
        [
          `# ${title}\n\n` +
          `This is a simulated download of the ${title} resource.\n\n` +
          `For First Responders use only.\n\n` +
          `© ${new Date().getFullYear()} Thrive Mental Health Platform`
        ], 
        { type: "application/pdf" }
      );
      
      // Use file-saver to trigger download
      saveAs(blob, `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      
      // Show success toast
      toast({
        title: "Download Started",
        description: `${title} is being downloaded.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Download error:", error);
      
      // Show error toast
      toast({
        title: "Download Failed",
        description: "There was an error downloading the resource. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Page title="Peer Support Network" showBackButton={false}>
      <div className="mb-4">
        <PortalBackButton returnPath="/first-responders-portal" />
      </div>

      <div className="bg-gradient-to-r from-red-950 to-red-900 p-4 rounded-lg mb-6 border border-red-800">
        <h2 className="text-xl font-bold text-white mb-2">First Responders Peer Support</h2>
        <p className="text-red-200">
          Connect with fellow emergency service professionals who understand your unique challenges and experiences.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <Button 
          variant="outline"
          className="border-red-500 text-red-300 hover:bg-red-900/50 flex items-center gap-2"
          onClick={() => handleResourceDownload("Peer Support Best Practices Guide")}
        >
          <Download className="h-4 w-4" />
          Download Peer Support Guide
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportGroups.map((group, index) => (
          <Card key={index} className="bg-[#141921] border-red-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-500" />
                {group.title}
              </CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm mb-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-red-400 mr-2" />
                  <span className="text-white/80">{group.nextMeeting}</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 text-red-400 mr-2" />
                <span className="text-white/80">{group.participants} participants</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <ActionButton
                type="join"
                title="Join Meeting"
                path="/first-responders/virtual-meeting"
                variant="default" 
                className="bg-red-700 hover:bg-red-800 text-white"
              />
              <ActionButton
                type="discussion"
                title="Message Group"
                path="/first-responders/discussions"
                variant="outline" 
                className="border-red-500 text-red-300 hover:bg-red-900/50"
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-black/20 p-4 rounded-lg border border-red-900/20">
        <h3 className="text-lg font-medium mb-3 text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-red-500" />
          Start a New Support Group
        </h3>
        <p className="text-white/80 mb-4">
          If you're interested in starting a new peer support group for your specific service area or region, we can help you get started.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button 
            className="bg-red-700 hover:bg-red-800 text-white"
            onClick={handleNewGroupRequest}
          >
            Request New Group
          </Button>
          <Button 
            variant="outline"
            className="border-red-500 text-red-300 hover:bg-red-900/50 flex items-center gap-2"
            onClick={() => handleResourceDownload("Peer Support Group Guidelines")}
          >
            <FileText className="h-4 w-4" />
            Download Guidelines
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default FirstRespondersPeerSupport;
