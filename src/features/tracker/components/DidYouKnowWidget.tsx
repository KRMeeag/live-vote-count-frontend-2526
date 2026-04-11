// src/features/tracker/components/DidYouKnowWidget.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const facts: string[] = [
  "The SG Executive President is qualified to receive a 100% discount on tuition and miscellaneous fees under the Student Leaders' Assistance Program.",
  "Voting turnout increased by 14% during the last academic year due to the implementation of live digital tracking.",
  "Your vote is strictly confidential and protected under the Data Privacy Act of 2012.",
];

const DidYouKnowWidget = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer: ReturnType<typeof setInterval> = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-green-800 text-white p-6 shadow-sm relative overflow-hidden min-h-50">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-bold text-sm tracking-widest uppercase">
          Did You Know
        </h3>
        <div className="h-4 w-px bg-white/30 mx-2"></div>
      </div>

      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-medium leading-relaxed"
          >
            {facts[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DidYouKnowWidget;
