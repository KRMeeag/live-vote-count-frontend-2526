// src/features/tracker/components/LeaderboardList.tsx
import { motion } from 'framer-motion';
import CollegeCard from './CollegeCard';
import type { CollegeTurnout } from '../types';

interface LeaderboardListProps {
  pollData: CollegeTurnout[];
}

const LeaderboardList = ({ pollData }: LeaderboardListProps) => {
  if (pollData.length === 0) return null;

  // 1. Separate the data
  const validColleges = pollData.filter(c => !c.underReview);
  const pendingColleges = pollData.filter(c => c.underReview);

  // 2. Sort only the valid colleges
  validColleges.sort((a, b) => b.percentage - a.percentage);

  // 3. Recombine: Valid first, Pending at the bottom
  const displayData = [...validColleges, ...pendingColleges];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full md:h-full md:min-h-0 md:[grid-template-rows:1fr_0.75fr_0.75fr]">
      {displayData.map((collegeData, index) => {
        const isFirst = index === 0 && !collegeData.underReview;

        return (
          <motion.div
            key={collegeData.college}
            layout
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`w-full h-full min-h-0 ${isFirst ? 'md:col-span-2' : 'col-span-1'}`}
          >
            {/* Pass the rank ONLY if it's not under review */}
            <CollegeCard 
              data={collegeData} 
              rank={collegeData.underReview ? 0 : index + 1} 
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default LeaderboardList;