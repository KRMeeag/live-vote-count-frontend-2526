// src/features/tracker/components/CollegeCard.tsx
import type { CollegeTurnout } from '../types';
import { collegeConfig } from '../utils/config';
import { Crown, Medal } from 'lucide-react';

interface CollegeCardProps {
  data: CollegeTurnout;
  rank: number;
}

const CollegeCard = ({ data, rank }: CollegeCardProps) => {
  const { college, percentage } = data;
  const formattedPercentage = (percentage * 100).toFixed(1);
  const theme = collegeConfig[college] || collegeConfig["DEFAULT"];
  const isFirstPlace = rank === 1;

  // Conditionally scale the logos based on rank
  const logoLayout = isFirstPlace ? {
    container: "w-[130px] h-[100px]",
    single: "w-24 h-24",            // 96px for 1st place
    dual: "w-[72px] h-[72px]",      // 72px each for dual logos
    translateUp: "-translate-y-3",
    translateDown: "translate-y-3",
    overlap: "-ml-6"                // Deeper overlap to account for larger size
  } : {
    container: "w-[96px] h-[72px]",
    single: "w-14 h-14",            // 56px for grid items
    dual: "w-[52px] h-[52px]",      // 52px each
    translateUp: "-translate-y-2",
    translateDown: "translate-y-2",
    overlap: "-ml-4"
  };

  const getRankStyle = (r: number) => {
    switch (r) {
      case 1:
        return "bg-gradient-to-b from-yellow-200 to-yellow-400 text-yellow-950 border border-yellow-500 shadow-md";
      case 2:
        return "bg-gradient-to-b from-slate-100 to-slate-300 text-slate-800 border border-slate-400 shadow-sm";
      case 3:
        return "bg-gradient-to-b from-orange-200 to-orange-400 text-orange-950 border border-orange-500 shadow-sm";
      default:
        return "bg-gray-600 text-white shadow-sm"; 
    }
  };

  return (
    <div className={`relative bg-white shadow-sm border-l-8 ${theme.borderClass} ${isFirstPlace ? 'p-6' : 'p-4'} flex items-center w-full h-full gap-5`}>
      
      {/* SCALABLE LOGO ARCHITECTURE */}
      <div className={`relative flex-shrink-0 ${logoLayout.container}`}>
        {theme.logos.length === 1 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={theme.logos[0]} alt={`${college} logo`} className={`${logoLayout.single} object-contain drop-shadow-sm`} />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {theme.logos.map((imgSrc, index) => (
              <img 
                key={index} 
                src={imgSrc} 
                alt={`${college} logo ${index + 1}`} 
                className={`${logoLayout.dual} object-contain ${
                  index === 0 
                    ? `transform ${logoLayout.translateUp} z-0 drop-shadow-sm` 
                    : `transform ${logoLayout.translateDown} ${logoLayout.overlap} z-10 drop-shadow-md`
                }`} 
              />
            ))}
          </div>
        )}
      </div>

      {isFirstPlace ? (
        <div className="flex-grow flex items-center justify-between h-full gap-6">
          
          <div className="flex-grow flex flex-col justify-center h-full">
            {/* Scaled up the college name slightly to match the larger logos */}
            <h3 className="font-bold text-gray-900 text-2xl leading-tight mb-1">{college}</h3>
            <p className="text-sm text-gray-500 mb-3 font-medium">{formattedPercentage}% Participation</p>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden max-w-lg">
              <div 
                className={`h-full ${theme.bgClass} transition-all duration-500 ease-out`}
                style={{ width: `${formattedPercentage}%` }}
              />
            </div>
          </div>
          
          <div className="flex-shrink-0 flex items-center h-full">
            {/* Cleaned up typography: Massive #1, single-line highly tracked subtitle */}
            <div className={`font-bold px-8 py-5 rounded-lg text-center flex flex-col items-center justify-center min-w-[220px] ${getRankStyle(1)}`}>
              <span className="text-3xl flex items-center gap-2 mb-1.5">
                <Crown size={32} className="text-yellow-700" fill="currentColor" />
                #1
              </span>
              <span className="text-xs font-black tracking-widest uppercase text-yellow-900/80">
                Most Engaged College
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col justify-center h-full w-full">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{college}</h3>
              <p className="text-xs text-gray-500 font-medium">{formattedPercentage}% Participation</p>
            </div>
            
            <div className={`font-bold py-1.5 rounded-md text-sm flex items-center justify-center gap-1.5 w-[72px] flex-shrink-0 ${getRankStyle(rank)}`}>
              {rank <= 3 && <Medal size={16} strokeWidth={2.5} />}
              #{rank}
            </div>
          </div>
          
          <div className="w-full block">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${theme.bgClass} transition-all duration-500 ease-out`}
                style={{ width: `${formattedPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeCard;