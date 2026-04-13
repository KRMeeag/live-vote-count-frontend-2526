// utils/config.ts

export interface CollegeTheme {
  bgClass: string;
  borderClass: string;
  hex: string;
  logos: string[];
}

export const collegeConfig: Record<string, CollegeTheme> = {
  // Cyan (Tailwind cyan-600) - Distinctly bluer and brighter than green
  "CON": {
    bgClass: "bg-[#0891b2]",
    borderClass: "border-[#0891b2]",
    hex: "#0891b2",
    logos: ["/con-logo.png"],
  },
  
  // Blue (Tailwind blue-600) - Deep pure blue
  "CEAS/CCJE": {
    bgClass: "bg-[#2563eb]",
    borderClass: "border-[#2563eb]",
    hex: "#2563eb",
    logos: ["/ceas.png", "/ccje.png"],
  },
  
  // Amber (Tailwind amber-500) - Rich golden yellow
  "CBEAM": {
    bgClass: "bg-[#f59e0b]",
    borderClass: "border-[#f59e0b]",
    hex: "#f59e0b",
    logos: ["/cbeam.png"],
  },
  
  // True Green (Tailwind green-600) - Warmer and leafier, no blue undertones
  "CIHTM": {
    bgClass: "bg-[#16a34a]",
    borderClass: "border-[#16a34a]",
    hex: "#16a34a",
    logos: ["/cihtm.png"],
  },
  
  // Red (Tailwind red-600) - Standard bright red
  "CITE": {
    bgClass: "bg-[#dc2626]",
    borderClass: "border-[#dc2626]",
    hex: "#dc2626",
    logos: ["/cite.png"],
  },
  
  "DEFAULT": {
    bgClass: "bg-[#6b7280]",
    borderClass: "border-[#6b7280]",
    hex: "#6b7280",
    logos: ["/default.png"],
  },
};