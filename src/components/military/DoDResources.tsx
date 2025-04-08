
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download, Book, Briefcase, Video, HeartPulse, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DoDResources = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [downloadPercentage, setDownloadPercentage] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [resourceName, setResourceName] = useState<string>("");
  
  const handleResourceDownload = (name: string) => {
    setResourceName(name);
    setIsDownloading(true);
    setDownloadPercentage(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadPercentage(prev => {
        const newValue = prev + Math.floor(Math.random() * 15) + 5;
        if (newValue >= 100) {
          clearInterval(interval);
          
          setTimeout(() => {
            toast({
              title: "Download Complete",
              description: `"${name}" has been downloaded to your device`,
              duration: 3000
            });
            setIsDownloading(false);
          }, 500);
          
          return 100;
        }
        return newValue;
      });
    }, 300);
  };
  
  const handleOpenResource = (resourceId: string, title: string) => {
    toast({
      title: "Opening Resource",
      description: `Loading ${title}...`,
      duration: 1500,
    });
    
    navigate("/resource-library", {
      state: {
        resourceId,
        resourceTitle: title,
        preventTutorial: true,
        returnToPortal: "/dod-portal"
      }
    });
  };

  // Play button component for videos
  const Play = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );

  return (
    <div className="space-y-8">
      {/* Resource Categories */}
      <div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 mb-6">
          Military Mental Health Resources
        </h2>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Combat Stress Resources */}
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="p-3 bg-blue-900/20 w-fit rounded-lg mb-3">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl text-white">Combat Stress Resources</CardTitle>
              <CardDescription>
                Tools and content for managing post-combat stress and PTSD
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#0F1319] rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">PTSD Recovery Guide</p>
                    <p className="text-xs text-gray-400">PDF - 4.2 MB</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500/50 text-blue-300"
                  onClick={() => handleResourceDownload("PTSD Recovery Guide")}
                  disabled={isDownloading && resourceName === "PTSD Recovery Guide"}
                >
                  {isDownloading && resourceName === "PTSD Recovery Guide" ? (
                    <span>{downloadPercentage}%</span>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-[#0F1319] rounded-lg">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Recovery Techniques</p>
                    <p className="text-xs text-gray-400">Video - 18:35</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500/50 text-blue-300"
                  onClick={() => {
                    navigate("/resource-library", {
                      state: { 
                        videoId: "recovery-techniques",
                        videoTitle: "Recovery Techniques",
                        preventTutorial: true,
                        returnToPortal: "/dod-portal",
                        autoPlay: true
                      }
                    });
                  }}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleOpenResource("combat-stress", "Combat Stress Resources")}
              >
                View All Combat Resources
              </Button>
            </CardFooter>
          </Card>
          
          {/* Transition Resources */}
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="p-3 bg-blue-900/20 w-fit rounded-lg mb-3">
                <Briefcase className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl text-white">Transition Resources</CardTitle>
              <CardDescription>
                Support for transitioning from military to civilian life
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#0F1319] rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Career Transition Guide</p>
                    <p className="text-xs text-gray-400">PDF - 3.8 MB</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500/50 text-blue-300"
                  onClick={() => handleResourceDownload("Career Transition Guide")}
                  disabled={isDownloading && resourceName === "Career Transition Guide"}
                >
                  {isDownloading && resourceName === "Career Transition Guide" ? (
                    <span>{downloadPercentage}%</span>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-[#0F1319] rounded-lg">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Transition Success Stories</p>
                    <p className="text-xs text-gray-400">Video - 12:45</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500/50 text-blue-300"
                  onClick={() => {
                    navigate("/resource-library", {
                      state: { 
                        videoId: "transition-success",
                        videoTitle: "Transition Success Stories",
                        preventTutorial: true,
                        returnToPortal: "/dod-portal",
                        autoPlay: true
                      }
                    });
                  }}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleOpenResource("transition", "Transition Resources")}
              >
                View All Transition Resources
              </Button>
            </CardFooter>
          </Card>
          
          {/* Family Resources */}
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="p-3 bg-blue-900/20 w-fit rounded-lg mb-3">
                <HeartPulse className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl text-white">Family Resources</CardTitle>
              <CardDescription>
                Support for military families during deployments and beyond
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#0F1319] rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Family Deployment Guide</p>
                    <p className="text-xs text-gray-400">PDF - 5.1 MB</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500/50 text-blue-300"
                  onClick={() => handleResourceDownload("Family Deployment Guide")}
                  disabled={isDownloading && resourceName === "Family Deployment Guide"}
                >
                  {isDownloading && resourceName === "Family Deployment Guide" ? (
                    <span>{downloadPercentage}%</span>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-[#0F1319] rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Family Support Groups</p>
                    <p className="text-xs text-gray-400">Directory</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500/50 text-blue-300"
                  onClick={() => {
                    navigate("/community-support", {
                      state: { 
                        groupType: "family",
                        preventTutorial: true,
                        returnToPortal: "/dod-portal"
                      }
                    });
                  }}
                >
                  View
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleOpenResource("family", "Family Resources")}
              >
                View All Family Resources
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Featured Resources */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Book className="h-5 w-5 text-blue-400" />
          Featured Resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#141921] border-blue-900/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Mental Health Field Guide</h4>
                    <p className="text-sm text-white/60">Comprehensive resource for service members</p>
                    <p className="text-xs text-white/40 mt-1">PDF - 8.5 MB</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                  onClick={() => handleResourceDownload("Mental Health Field Guide")}
                  disabled={isDownloading}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
              {isDownloading && resourceName === "Mental Health Field Guide" && (
                <div className="w-full bg-blue-900/30 rounded-full h-2 mt-4">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${downloadPercentage}%` }}
                  ></div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-[#141921] border-blue-900/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <Video className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Resilience Training Series</h4>
                    <p className="text-sm text-white/60">Building mental strength for military challenges</p>
                    <p className="text-xs text-white/40 mt-1">Video Series - 5 videos</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                  onClick={() => {
                    navigate("/resource-library", {
                      state: { 
                        seriesId: "resilience-training",
                        seriesTitle: "Resilience Training Series",
                        preventTutorial: true,
                        returnToPortal: "/dod-portal"
                      }
                    });
                  }}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Search Resources */}
      <Card className="bg-[#0F1319] border-blue-900/30">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Search All Resources</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by keyword..."
              className="flex-grow py-2 px-4 bg-[#0c1016] border border-blue-900/30 rounded-md text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => {
                navigate("/resource-library", {
                  state: { 
                    searchQuery: "military",
                    preventTutorial: true,
                    returnToPortal: "/dod-portal"
                  }
                });
                toast({
                  title: "Searching Resources",
                  description: "Finding relevant military mental health resources",
                  duration: 2000
                });
              }}
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoDResources;
