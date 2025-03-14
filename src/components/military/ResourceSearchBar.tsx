
import React from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResourceSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  clearFilters: () => void;
  resourceCategories: string[];
}

const ResourceSearchBar: React.FC<ResourceSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  toggleCategory,
  clearFilters,
  resourceCategories,
}) => {
  return (
    <div className="bg-[#0F2942] border-y border-white/10 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-10 bg-[#1c2e4a] border-white/10 text-white w-full md:w-80"
              placeholder="Search resources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 items-center w-full md:w-auto justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-[#1c2e4a] border-white/10 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Category
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#1c2e4a] border-white/10 text-white">
                <DropdownMenuLabel>Resource Categories</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {resourceCategories.map(category => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {selectedCategories.length > 0 && (
              <Button 
                variant="ghost" 
                className="text-[#B87333] hover:text-[#B87333]/80 hover:bg-white/5"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSearchBar;
