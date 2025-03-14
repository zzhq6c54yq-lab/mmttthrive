
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeButton from "@/components/HomeButton";
import ResourceCard from "@/components/military/ResourceCard";
import CrisisResourcesBar from "@/components/military/CrisisResourcesBar";
import ResourceSearchBar from "@/components/military/ResourceSearchBar";
import SubmitResourceCTA from "@/components/military/SubmitResourceCTA";
import { resourceCategories, resources } from "@/data/militaryResourcesData";

const MilitaryResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const filteredResources = resources.filter(resource => {
    // Filter by search term
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected categories (if any are selected)
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(resource.category);
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1929] to-[#1A365D] py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/military-support" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Military Support
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Mental Health Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Access a curated collection of resources specifically designed for military personnel, veterans, and their families.
          </p>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <ResourceSearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        clearFilters={clearFilters}
        resourceCategories={resourceCategories}
      />
      
      {/* Crisis Resources - Always at the top */}
      <CrisisResourcesBar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Resources */}
        <h2 className="text-2xl font-bold text-[#B87333] mb-6 flex items-center">
          <Bookmark className="mr-2 h-5 w-5" />
          Featured Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredResources.filter(r => r.featured).map(resource => (
            <ResourceCard 
              key={resource.id}
              title={resource.title}
              description={resource.description}
              type={resource.type}
              category={resource.category}
              url={resource.url}
              featured={resource.featured}
            />
          ))}
        </div>
        
        {/* Tabbed Resources */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-[#1c2e4a] mb-8 w-full justify-start overflow-x-auto flex-nowrap">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-[#B87333]">All Resources</TabsTrigger>
            {resourceCategories.map(category => (
              <TabsTrigger 
                key={category}
                value={category.toLowerCase().replace(/\s+/g, '-')} 
                className="text-white data-[state=active]:bg-[#B87333]"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <ResourceCard 
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    type={resource.type}
                    category={resource.category}
                    url={resource.url}
                    featured={resource.featured}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12 bg-[#1c2e4a]/50 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
                  <p className="text-gray-400">
                    Try adjusting your search or filters to find resources.
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-[#B87333]"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategories([]);
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Generate a tab content for each category */}
          {resourceCategories.map(category => (
            <TabsContent key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.filter(r => r.category === category).map(resource => (
                  <ResourceCard 
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    type={resource.type}
                    category={resource.category}
                    url={resource.url}
                    featured={resource.featured}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Submit Resource */}
        <SubmitResourceCTA />
      </div>
      
      {/* Footer */}
      <footer className="bg-[#0F2942] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            Resources are regularly updated to ensure accuracy and relevance for our military community.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              to="/military-support" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Military Support Home
            </Link>
            <Link 
              to="/contact" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MilitaryResources;
