
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Bell, Lock, Eye, Globe, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const UserSettings = () => {
  const { toast } = useToast();

  const handleToggle = (setting: string) => {
    toast({
      title: `${setting} setting updated`,
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Settings</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Customize your experience and preferences.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-500" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-medium">Personal Information</h3>
                  <p className="text-sm text-gray-500">Update your name, email, and other account details</p>
                  <Button variant="outline" className="mt-2">Edit Profile</Button>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium">Change Password</h3>
                  <p className="text-sm text-gray-500">Update your password for added security</p>
                  <Button variant="outline" className="mt-2">Change Password</Button>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium">Connected Accounts</h3>
                  <p className="text-sm text-gray-500">Manage connections to other services</p>
                  <Button variant="outline" className="mt-2">Manage Connections</Button>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                  <Button variant="destructive" className="mt-2">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-500" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Control when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch onCheckedChange={() => handleToggle("Email notifications")} />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Appointment Reminders</h3>
                      <p className="text-sm text-gray-500">Get reminded about upcoming therapy sessions</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => handleToggle("Appointment reminders")} />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Wellness Reminders</h3>
                      <p className="text-sm text-gray-500">Regular reminders for wellness activities</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => handleToggle("Wellness reminders")} />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Community Updates</h3>
                      <p className="text-sm text-gray-500">Notifications about community events and posts</p>
                    </div>
                    <Switch onCheckedChange={() => handleToggle("Community updates")} />
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium">Marketing Communications</h3>
                      <p className="text-sm text-gray-500">Receive promotional content and offers</p>
                    </div>
                    <Switch onCheckedChange={() => handleToggle("Marketing communications")} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-blue-500" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control your data and privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-gray-500">Control who can see your profile information</p>
                    </div>
                    <Button variant="outline" onClick={() => handleToggle("Profile visibility")}>
                      <Eye className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Data Usage</h3>
                      <p className="text-sm text-gray-500">Control how your data is used to improve services</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => handleToggle("Data usage")} />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Cookie Preferences</h3>
                      <p className="text-sm text-gray-500">Manage cookie settings for your browsing experience</p>
                    </div>
                    <Button variant="outline" onClick={() => handleToggle("Cookie preferences")}>Manage</Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium">Download Your Data</h3>
                      <p className="text-sm text-gray-500">Get a copy of all your personal data</p>
                    </div>
                    <Button variant="outline" onClick={() => handleToggle("Data download")}>Download</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-blue-500" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                    </div>
                    <Switch onCheckedChange={() => handleToggle("Dark mode")} />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Text Size</h3>
                      <p className="text-sm text-gray-500">Adjust the size of text throughout the app</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleToggle("Text size")}>A-</Button>
                      <Button variant="outline" size="sm" onClick={() => handleToggle("Text size")}>A+</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="font-medium">Language</h3>
                      <p className="text-sm text-gray-500">Choose your preferred language</p>
                    </div>
                    <Button variant="outline" onClick={() => handleToggle("Language")}>
                      <Globe className="h-4 w-4 mr-2" />
                      English (US)
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium">Animations</h3>
                      <p className="text-sm text-gray-500">Enable or disable interface animations</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => handleToggle("Animations")} />
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

export default UserSettings;
