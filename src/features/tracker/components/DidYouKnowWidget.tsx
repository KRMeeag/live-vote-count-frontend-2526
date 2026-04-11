import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const facts: string[] = [
  "The SG Executive President is qualified to receive a 100% discount on tuition and miscellaneous fees under the Student Leaders' Assistance Program.",
  "Voting turnout increased by 14% during the last academic year due to the implementation of live digital tracking.",
  "Your vote is strictly confidential and protected under the Data Privacy Act of 2012."
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
    // flex-grow makes it stretch to bottom
    <div className="bg-green-800 text-white p-6 shadow-sm relative overflow-hidden flex flex-col flex-grow h-full min-h-[220px]">
      <div className="flex items-center gap-3 mb-6">
        <Info size={24} className="text-green-300" />
        <h3 className="font-bold text-sm tracking-widest uppercase text-green-50">Did You Know</h3>
        <div className="h-4 flex-grow border-b border-white/20 ml-2"></div>
      </div>

      <div className="relative flex-grow flex items-center">
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