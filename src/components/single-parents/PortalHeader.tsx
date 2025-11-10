import React from 'react';
import { Heart } from 'lucide-react';

const PortalHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-700">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Single Parent Wellness Portal</h1>
          <p className="text-muted-foreground">Your community for strength, support, and self-care</p>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-rose-500 to-pink-700 rounded-full" />
    </div>
  );
};

export default PortalHeader;
