
import { LucideIcon } from "lucide-react";

export interface AddOn {
  id: string;
  title: string;
  description: string;
  targetAudience?: string;
  features?: string[];
  icon: LucideIcon;
  path: string;
  gradient: string;
  borderColor?: string;
  imagePath: string;
  price: {
    basic?: string;
    gold?: string;
    platinum?: string;
    monthly?: number;
    yearly?: number;
  };
  recommended?: boolean;
  free?: boolean;
}

// Types of addons
export const addonTypes = [
  { id: "profession", name: "Profession-Based", description: "Support tailored to specific career challenges" },
  { id: "demographic", name: "Demographic-Based", description: "Resources designed for specific age groups and life stages" },
  { id: "condition", name: "Condition-Based", description: "Support for specific health concerns or situations" }
];

// Categorization mapping
export const categorizedAddOns = {
  profession: [
    "small-business",
    "first-responders",
    "law-enforcement",
    "educators",
    "hospitality",
    "transportation"
  ],
  demographic: [
    "colleges",
    "dod",
    "adolescent",
    "golden-years"
  ],
  condition: [
    "chronic-illness"
  ]
};
