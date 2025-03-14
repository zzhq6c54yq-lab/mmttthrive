
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";

const AlternativeTherapies = () => {
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
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Alternative Therapies</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Explore complementary approaches to traditional therapy.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Art Therapy</h2>
            <p className="text-gray-700 mb-4">Express emotions and process experiences through artistic creation.</p>
            <Button className="w-full">Learn More</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Music Therapy</h2>
            <p className="text-gray-700 mb-4">Use music to address emotional, cognitive, and social needs.</p>
            <Button className="w-full">Learn More</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Yoga & Movement</h2>
            <p className="text-gray-700 mb-4">Connect mind and body through movement practices.</p>
            <Button className="w-full">Learn More</Button>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-light mb-6">Finding Your Path</h2>
          <p className="text-gray-700 mb-6">
            Alternative therapies can complement traditional approaches to mental health care. 
            Explore different options to find what works best for your unique needs and preferences.
          </p>
          <div className="flex justify-center">
            <Button size="lg">Schedule a Consultation</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeTherapies;
