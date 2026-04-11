import type { CollegeTurnout } from "../types";
import { collegeConfig } from "../utils/config";

interface CollegeCardProps {
  data: CollegeTurnout;
  rank: number;
}

const CollegeCard = ({ data, rank }: CollegeCardProps) => {
  const { college, percentage } = data;

  const formattedPercentage = (percentage * 100).toFixed(1);
  const theme = collegeConfig[college] || collegeConfig["DEFAULT"];
  const isFirstPlace = rank === 1;

  return (
    <div
      className={`relative flex items-center p-4 bg-white shadow-sm border-l-4 ${theme.borderClass}`}
    >
      <div className="w-12 h-12 shrink-0 mr-4 bg-gray-100 rounded flex items-center justify-center p-1">
        <img
          src={theme.logo}
          alt={`${college} logo`}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <div className="grow">
        <h3 className="font-bold text-gray-900 text-lg leading-tight">
          {college}
        </h3>
        <p className="text-sm text-gray-500">
          {formattedPercentage}% Participation
        </p>
      </div>

      <div className="flex flex-col items-end min-w-37.5">
        {isFirstPlace ? (
          <div className="bg-yellow-500 text-white font-bold px-4 py-1 rounded shadow-sm text-sm mb-2 flex items-center">
            👑 #1 MOST ENGAGED COLLEGE
          </div>
        ) : (
          <div className="bg-gray-400 text-white font-bold px-4 py-1 rounded shadow-sm text-sm mb-2">
            #{rank}
          </div>
        )}

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${theme.bgClass} transition-all duration-500 ease-out`}
            style={{ width: `${formattedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
