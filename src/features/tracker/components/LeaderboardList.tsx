// src/features/tracker/components/LeaderboardList.tsx
import { motion } from 'framer-motion';
import CollegeCard from './CollegeCard';
import type { CollegeTurnout } from '../types';

interface LeaderboardListProps {
  pollData: CollegeTurnout[];
}

const LeaderboardList = ({ pollData }: LeaderboardListProps) => {
  const sortedData = [...pollData].sort((a, b) => b.percentage - a.percentage);

  if (sortedData.length === 0) return null;

  return (
    <div 
      // Allows natural stacking on mobile. Enforces the strict 1 > 0.75 ratio on desktop.
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full md:h-full md:min-h-0 md:[grid-template-rows:1fr_0.75fr_0.75fr]"
    >
      {sortedData.map((collegeData, index) => {
        const isFirst = index === 0;

        return (
          <motion.div
            key={collegeData.college}
            layout
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`w-full h-full min-h-0 ${isFirst ? 'md:col-span-2' : 'col-span-1'}`}
          >
            <CollegeCard data={collegeData} rank={index + 1} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default LeaderboardList;