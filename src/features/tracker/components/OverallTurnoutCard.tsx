// src/features/tracker/components/OverallTurnoutCard.tsx
import type { CollegeTurnout } from '../types';
import { collegeConfig } from '../utils/config';

interface OverallTurnoutCardProps {
  pollData: CollegeTurnout[];
}

const OverallTurnoutCard = ({ pollData }: OverallTurnoutCardProps) => {
  // Logic isolated to keep render clean
  const votes = pollData.reduce((acc, curr) => acc + curr.count, 0);
  const capacity = pollData.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercentage = capacity > 0 ? ((votes / capacity) * 100).toFixed(1) : "0.0";

  let currentAngle = 0;
  const segments = pollData.map(col => {
    if (col.count === 0) return null;
    
    const theme = collegeConfig[col.college] || collegeConfig["DEFAULT"];
    const angle = (col.count / capacity) * 360; 
    const segment = `${theme.hex} ${currentAngle}deg ${currentAngle + angle}deg`;
    
    currentAngle += angle;
    return segment;
  }).filter(Boolean);

  segments.push(`#e5e7eb ${currentAngle}deg 360deg`);
  const gradientString = `conic-gradient(${segments.join(', ')})`;

  return (
    <div className="bg-white p-6 shadow-sm border-l-8 border-green-800 flex items-center justify-between mb-6">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-green-800 rounded flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 8h-2V5c0-1.1-.9-2-2-2H9C7.9 3 7 3.9 7 5v3H5c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-9-3h4v3h-4V5zm1 14l-4-4h2.5v-3h3v3H15l-4 4z"/>
          </svg>
        </div>
        
        <div>
          <h2 className="text-gray-500 font-semibold tracking-wide uppercase text-sm">
            Total Voter's Turnout For SG Elections 2025 - 2026
          </h2>
          <div className="flex items-baseline gap-4 mt-1">
            <span className="text-5xl font-extrabold text-green-800">{overallPercentage}%</span>
            <span className="text-2xl text-gray-600 font-medium">
              {votes.toLocaleString()} / {capacity.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-40 h-40 rounded-full" style={{ background: gradientString }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-inner"></div>
      </div>
    </div>
  );
};

export default OverallTurnoutCard;