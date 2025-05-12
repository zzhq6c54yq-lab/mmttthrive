
import React from "react";
import { Users, Calendar, MessageCircle, Star, Heart } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface CommunitiesTabProps {
  onFeatureClick: (path: string) => void;
}

const CommunitiesTab: React.FC<CommunitiesTabProps> = ({ onFeatureClick }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Connect with Others</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Find support through connection with others who understand what you're experiencing.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          title="General Community"
          description="Connect with others affected by cancer in our general discussion forums"
          icon={Users}
          color="bg-purple-500"
          onClick={() => onFeatureClick("cancer-support/general-community")}
        />
        <FeatureCard 
          title="Cancer Type Communities"
          description="Find groups specific to different types of cancer"
          icon={Star}
          color="bg-blue-500"
          onClick={() => onFeatureClick("cancer-support/cancer-type-communities")}
        />
        <FeatureCard 
          title="Virtual Meetings"
          description="Join scheduled video meetings with others who understand what you're going through"
          icon={Calendar}
          color="bg-emerald-500"
          onClick={() => onFeatureClick("cancer-support/virtual-meetings")}
        />
        <FeatureCard 
          title="One-on-One Connect"
          description="Get matched with a peer supporter for individual conversations"
          icon={MessageCircle}
          color="bg-amber-500"
          onClick={() => onFeatureClick("cancer-support/one-on-one")}
        />
        <FeatureCard 
          title="Young Adults with Cancer"
          description="A space specifically for young adults facing cancer"
          icon={Heart}
          color="bg-rose-500"
          onClick={() => onFeatureClick("cancer-support/young-adults")}
        />
        <FeatureCard 
          title="Metastatic Cancer"
          description="Connect with others dealing with advanced and metastatic cancer"
          icon={Users}
          color="bg-indigo-500"
          onClick={() => onFeatureClick("cancer-support/metastatic")}
        />
      </div>
    </div>
    
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Specialized Groups</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Find communities that match your specific needs and experiences.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          title="Caregivers Circle"
          description="A dedicated space for those supporting loved ones through cancer"
          icon={Heart}
          color="bg-purple-500"
          onClick={() => onFeatureClick("cancer-support/caregivers-circle")}
        />
        <FeatureCard 
          title="Survivorship Community"
          description="Connect with others who have completed treatment and are navigating life after cancer"
          icon={Star}
          color="bg-emerald-500"
          onClick={() => onFeatureClick("cancer-support/survivorship-community")}
        />
      </div>
    </div>
    
    <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-900/30">
      <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Create Your Own Group</h4>
      <p className="text-indigo-800 dark:text-indigo-200 text-sm">
        Don't see a community that fits your specific needs? You can create your own group and invite others to join.
      </p>
      <button
        onClick={() => onFeatureClick("cancer-support/create-group")}
        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
      >
        Start a Group
      </button>
    </div>
  </div>
);

export default CommunitiesTab;
