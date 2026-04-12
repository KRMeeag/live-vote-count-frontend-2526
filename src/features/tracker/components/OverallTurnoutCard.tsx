// src/features/tracker/components/OverallTurnoutCard.tsx
import type { CollegeTurnout } from "../types";
import { collegeConfig } from "../utils/config";

interface OverallTurnoutCardProps {
  pollData: CollegeTurnout[];
}

const OverallTurnoutCard = ({ pollData }: OverallTurnoutCardProps) => {
  const votes = pollData.reduce((acc, curr) => acc + curr.count, 0);
  const capacity = pollData.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercentage =
    capacity > 0 ? ((votes / capacity) * 100).toFixed(1) : "0.0";

  const currentDate = new Date()
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
  const currentTime = new Date()
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    .toUpperCase();

  let currentAngle = 0;
  const segments = pollData
    .map((col) => {
      if (col.count === 0) return null;
      const theme = collegeConfig[col.college] || collegeConfig["DEFAULT"];
      const angle = (col.count / capacity) * 360;
      const segment = `${theme.hex} ${currentAngle}deg ${currentAngle + angle}deg`;
      currentAngle += angle;
      return segment;
    })
    .filter(Boolean);

  segments.push(`#e5e7eb ${currentAngle}deg 360deg`);
  const gradientString = `conic-gradient(${segments.join(", ")})`;

  return (
    <div className="bg-white p-6 md:p-8 shadow-sm border-l-8 border-green-800 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full">
      
      {/* 1. The Chart (Left on Desktop, Top on Mobile) */}
      <div
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full shrink-0"
        style={{ background: gradientString }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-inner"></div>
      </div>

      {/* 2. The Text Content (Middle) */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left flex-grow w-full">
        <h2 className="text-gray-900 font-bold tracking-wide uppercase text-sm md:text-md mb-1">
          Total Voter's Turnout For SG Elections 2025 - 2026
        </h2>
        
        <div className="text-gray-600 bg-gray-100 md:bg-transparent px-3 py-1 md:px-0 md:py-0 text-xs font-semibold rounded-sm inline-block tracking-wider mb-2">
          AS OF {currentDate} | {currentTime}
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-start items-baseline gap-x-3 gap-y-1 md:gap-4 mt-1">
          <span className="text-4xl md:text-5xl font-extrabold text-green-800">
            {overallPercentage}%
          </span>
          <span className="text-xl md:text-2xl text-gray-600 font-medium">
            {votes.toLocaleString()} / {capacity.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 3. The Vote Icon (Right on Desktop, Hidden on Mobile to save space) */}
      <div className="hidden md:flex w-16 h-16 md:w-24 md:h-24 bg-green-800 rounded items-center justify-center shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 576 512"
          className="w-8 h-8 md:w-[60px] md:h-[60px]"
        >
          <title>Check-to-slot SVG Icon</title>
          <path
            fill="white"
            d="M96 80c0-26.5 21.5-48 48-48h288c26.5 0 48 21.5 48 48v304H96zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111l-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48h16v128h448V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48z"
          />
        </svg>
      </div>

    </div>
  );
};

export default OverallTurnoutCard;