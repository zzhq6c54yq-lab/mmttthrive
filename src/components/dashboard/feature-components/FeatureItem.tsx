
import React from "react";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface FeatureItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  index: number;
  onClick: (path: string) => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  description,
  icon: IconComponent,
  path,
  index,
  onClick
}) => {
  // Gradient arrays for styling
  const gradients = [
    "from-[#9333EA]/70 to-[#D946EF]/30",
    "from-[#0EA5E9]/70 to-[#2563EB]/30",
    "from-[#F97316]/70 to-[#F59E0B]/30",
    "from-[#10B981]/70 to-[#34D399]/30",
    "from-[#EC4899]/70 to-[#F472B6]/30",
    "from-[#6366F1]/70 to-[#A5B4FC]/30",
    "from-[#84CC16]/70 to-[#BEF264]/20",
    "from-[#EF4444]/70 to-[#FCA5A5]/30",
    "from-[#B87333]/70 to-[#E5C5A1]/30",
  ];
  
  const borderColors = [
    "#9333EA",
    "#0EA5E9",
    "#F97316",
    "#10B981",
    "#EC4899",
    "#6366F1",
    "#84CC16",
    "#EF4444",
    "#B87333",
  ];
  
  const iconColors = [
    "#D946EF",
    "#2563EB",
    "#F59E0B",
    "#34D399",
    "#F472B6",
    "#A5B4FC",
    "#BEF264",
    "#FCA5A5",
    "#E5C5A1",
  ];
  
  const CornerIcons = [
    import("lucide-react").then(mod => mod.Sparkles),
    import("lucide-react").then(mod => mod.Star),
    import("lucide-react").then(mod => mod.Lightbulb),
    import("lucide-react").then(mod => mod.Target),
    import("lucide-react").then(mod => mod.Zap),
    import("lucide-react").then(mod => mod.Bird),
    import("lucide-react").then(mod => mod.Leaf),
    import("lucide-react").then(mod => mod.Smile),
    import("lucide-react").then(mod => mod.Coffee)
  ];

  const gradientIndex = index % gradients.length;
  const borderColor = borderColors[gradientIndex];
  const iconColor = iconColors[gradientIndex];
  
  const [CornerIcon, setCornerIcon] = React.useState<LucideIcon | null>(null);
  
  React.useEffect(() => {
    const iconIndex = index % 9;
    CornerIcons[iconIndex].then(Icon => {
      setCornerIcon(() => Icon as unknown as LucideIcon);
    });
  }, [index]);

  return (
    <div 
      onClick={() => onClick(path)}
      className="relative group cursor-pointer overflow-hidden rounded-xl backdrop-blur-md shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.01]"
      style={{ minHeight: "150px" }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradientIndex]} opacity-80`}></div>
      
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="absolute top-3 right-3 opacity-40 group-hover:opacity-80 transition-opacity">
        {CornerIcon && <CornerIcon className="h-5 w-5" style={{ color: iconColor }} />}
      </div>
      
      <div className="relative p-4 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-2">
          <div 
            className="p-2 rounded-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3"
            style={{ 
              background: `${iconColor}30`,
              border: `1px solid ${iconColor}50`,
              boxShadow: `0 0 20px ${iconColor}30`
            }}
          >
            <IconComponent className="h-5 w-5" style={{ color: iconColor }} />
          </div>
          <h3 className="text-md font-semibold text-white">
            {title}
          </h3>
        </div>
        
        <p className="text-white/80 mb-4 text-xs">
          {description}
        </p>
        
        <div className="mt-auto">
          <div 
            className="h-6 w-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
            style={{ background: `${iconColor}30` }}
          >
            <ArrowRight className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
      
      <div 
        className="absolute inset-0 border-2 border-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
      ></div>
    </div>
  );
};

export default FeatureItem;
