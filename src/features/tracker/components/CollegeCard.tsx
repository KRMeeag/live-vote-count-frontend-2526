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

  // Uses Tailwind responsive classes instead of JS logic to handle resizing dynamically
  const logoLayout = isFirstPlace ? {
    container: "w-[96px] h-[72px] md:w-[130px] md:h-[100px]",
    single: "w-14 h-14 md:w-24 md:h-24",            
    dual: "w-[52px] h-[52px] md:w-[72px] md:h-[72px]",      
    translateUp: "-translate-y-2 md:-translate-y-3",
    translateDown: "translate-y-2 md:translate-y-3",
    overlap: "-ml-4 md:-ml-6"                
  } : {
    container: "w-[96px] h-[72px]",
    single: "w-14 h-14",            
    dual: "w-[52px] h-[52px]",      
    translateUp: "-translate-y-2",
    translateDown: "translate-y-2",
    overlap: "-ml-4"
  };

  const getRankStyle = (r: number) => {
    switch (r) {
      case 1: return "bg-gradient-to-b from-yellow-200 to-yellow-400 text-yellow-950 border border-yellow-500 shadow-md";
      case 2: return "bg-gradient-to-b from-slate-100 to-slate-300 text-slate-800 border border-slate-400 shadow-sm";
      case 3: return "bg-gradient-to-b from-orange-200 to-orange-400 text-orange-950 border border-orange-500 shadow-sm";
      default: return "bg-gray-600 text-white shadow-sm"; 
    }
  };

  // The Standard Layout component extracted to avoid code duplication
  const StandardLayout = () => (
    <div className="flex-grow flex flex-col justify-center h-full w-full">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-bold text-gray-900 text-base md:text-lg leading-tight">{college}</h3>
          <p className="text-xs text-gray-500 font-medium">{formattedPercentage}% Participation</p>
        </div>
        <div className={`font-bold py-1.5 rounded-md text-xs md:text-sm flex items-center justify-center gap-1.5 w-[60px] md:w-[72px] flex-shrink-0 ${getRankStyle(rank)}`}>
          {rank <= 3 && <Medal size={14} className="md:w-4 md:h-4" strokeWidth={2.5} />}
          #{rank}
        </div>
      </div>
      <div className="w-full block">
        <div className="w-full h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${theme.bgClass} transition-all duration-500 ease-out`}
            style={{ width: `${formattedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`relative bg-white shadow-sm border-l-8 ${theme.borderClass} ${isFirstPlace ? 'p-4 md:p-6' : 'p-4'} flex items-center w-full h-full gap-4 md:gap-5`}>
      
      <div className={`relative flex-shrink-0 ${logoLayout.container} transition-all duration-300`}>
        {theme.logos.length === 1 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={theme.logos[0]} alt={`${college} logo`} className={`${logoLayout.single} object-contain drop-shadow-sm transition-all duration-300`} />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {theme.logos.map((imgSrc, index) => (
              <img 
                key={index} 
                src={imgSrc} 
                alt={`${college} logo ${index + 1}`} 
                className={`${logoLayout.dual} object-contain transition-all duration-300 ${
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
        <>
          {/* Desktop 1st Place Hero Layout */}
          <div className="hidden md:flex flex-grow items-center justify-between h-full gap-6">
            <div className="flex-grow flex flex-col justify-center h-full">
              <h3 className="font-bold text-gray-900 text-2xl leading-tight mb-1">{college}</h3>
              <p className="text-sm text-gray-500 mb-3 font-medium">{formattedPercentage}% Participation</p>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden max-w-lg">
                <div className={`h-full ${theme.bgClass} transition-all duration-500 ease-out`} style={{ width: `${formattedPercentage}%` }} />
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center h-full">
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
          
          {/* Mobile 1st Place Standard Layout */}
          <div className="flex md:hidden flex-grow w-full h-full">
             <StandardLayout />
          </div>
        </>
      ) : (
        <StandardLayout />
      )}
    </div>
  );
};

export default CollegeCard;