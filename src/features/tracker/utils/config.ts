// utils/config.js

export interface CollegeTheme {
  bgClass: string;
  borderClass: string;
  hex: string;
  logo: string;
}

export const collegeConfig: Record<string, CollegeTheme> = {
  "CON": {
    bgClass: "bg-[#0d9488]",
    borderClass: "border-[#0d9488]",
    hex: "#0d9488",
    logo: "/con-logo.png",
  },
  "CEAS & CCJE": {
    bgClass: "bg-[#1e40af]",
    borderClass: "border-[#1e40af]",
    hex: "#1e40af",
    logo: "/ceas.png",
  },
  "CBEAM & COL": {
    bgClass: "bg-[#15803d]",
    borderClass: "border-[#15803d]",
    hex: "#15803d",
    logo: "/cbeam.png",
  },
  "CIHTM": {
    bgClass: "bg-[#b91c1c]",
    borderClass: "border-[#b91c1c]",
    hex: "#b91c1c",
    logo: "/cihtm.png",
  },
  "CITE": {
    bgClass: "bg-[#dc2626]",
    borderClass: "border-[#dc2626]",
    hex: "#dc2626",
    logo: "/cite.png",
  },
  "DEFAULT": {
    bgClass: "bg-[#6b7280]",
    borderClass: "border-[#6b7280]",
    hex: "#6b7280",
    logo: "/default.png",
  },
};


