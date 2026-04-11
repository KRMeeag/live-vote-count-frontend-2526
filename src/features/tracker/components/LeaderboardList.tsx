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
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full min-h-0"
      // Enforces the strict height ratio: 1.0 (Hero) > 0.75 (Runners-up)
      style={{ gridTemplateRows: '1fr 0.75fr 0.75fr' }}
    >
      {sortedData.map((collegeData, index) => {
        const isFirst = index === 0;

        return (
          <motion.div
            key={collegeData.college}
            layout
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            // The item at index 0 stretches across both columns. 
            // Framer Motion animates the transition between col-span-1 and col-span-2.
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