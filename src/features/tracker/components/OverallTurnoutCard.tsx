// src/features/tracker/components/OverallTurnoutCard.tsx
import type { CollegeTurnout } from "../types";
import { collegeConfig } from "../utils/config";
import { AlertTriangle } from "lucide-react"; // Make sure lucide-react is installed

interface OverallTurnoutCardProps {
  pollData: CollegeTurnout[];
}

const OverallTurnoutCard = ({ pollData }: OverallTurnoutCardProps) => {
  // 1. Check for Administrative Holds
  const hasPendingData = pollData.some((col) => col.underReview);

  // 2. Core Math
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

  // Degrade chart if data is pending
  const gradientString = hasPendingData
    ? `conic-gradient(#f3f4f6 0deg 360deg)`
    : `conic-gradient(${segments.join(", ")})`;

  return (
    <div className="bg-white p-6 md:p-8 shadow-sm border-l-8 border-green-800 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full">
      {/* 1. The Chart (Left on Desktop, Top on Mobile) */}
      <div
        className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full shrink-0 ${hasPendingData ? "animate-pulse bg-gray-100 border-4 border-gray-200" : ""}`}
        style={{ background: hasPendingData ? undefined : gradientString }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-inner flex items-center justify-center">
          {hasPendingData && (
            <AlertTriangle size={24} className="text-gray-400" />
          )}
        </div>
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
          {hasPendingData ? (
            <>
              {/* DEGRADED STATE */}
              <span className="text-3xl md:text-4xl font-black text-amber-600 tracking-widest">
                PENDING
              </span>
              <span className="text-xl md:text-2xl text-gray-400 font-medium">
                {votes.toLocaleString()} / TBD
              </span>
            </>
          ) : (
            <>
              {/* NORMAL STATE */}
              <span className="text-4xl md:text-5xl font-extrabold text-green-800">
                {overallPercentage}%
              </span>
              <span className="text-xl md:text-2xl text-gray-600 font-medium">
                {votes.toLocaleString()} / {capacity.toLocaleString()}
              </span>
            </>
          )}
        </div>

        {/* Administrative Disclaimer if Pending */}
        {hasPendingData && (
          <p className="text-[11px] md:text-xs font-bold text-amber-600 mt-3 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-100 w-fit">
            <AlertTriangle size={14} />
            Overall percentage suspended while verifying college population
            data.
          </p>
        )}
      </div>

      {/* 3. The Vote Icon / Warning Bookend (Right on Desktop, Hidden on Mobile) */}
      {hasPendingData ? (
        // DEGRADED WIDGET: Replaces icon with a warning block
        <div className="hidden md:flex flex-col items-center justify-center text-center p-5 rounded-lg border shrink-0 min-w-[200px] shadow-sm bg-amber-50/50 border-amber-200">
          <span className="text-[10px] font-black text-amber-600 tracking-widest uppercase mb-2 flex items-center gap-1.5">
            <AlertTriangle size={14} />
            DATA UNDER REVIEW
          </span>
          <span className="text-sm font-bold text-amber-800 leading-tight">
            Total calculation <br />
            temporarily paused.
          </span>
        </div>
      ) : (
        // NORMAL WIDGET: The check-to-slot icon
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
      )}
    </div>
  );
};

export default OverallTurnoutCard;
