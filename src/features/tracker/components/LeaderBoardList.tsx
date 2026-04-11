// components/LeaderboardList.jsx
import { motion } from "framer-motion";
import CollegeCard from "./CollegeCard";
import type { CollegeTurnout } from "../types";

interface LeaderboardListProps {
  pollData: CollegeTurnout[];
}

const LeaderboardList = ({ pollData }: LeaderboardListProps) => {
  // Sort data descending. useMemo prevents unnecessary resorting if parent re-renders without new data.
  const sortedData = [...pollData].sort((a, b) => b.count - a.count);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sortedData.map((collegeData, index) => (
        <motion.div
          key={collegeData.college}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <CollegeCard data={collegeData} rank={index + 1} />
        </motion.div>
      ))}
    </div>
  );
};

export default LeaderboardList;
