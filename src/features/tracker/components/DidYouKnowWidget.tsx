// src/features/tracker/components/DidYouKnowWidget.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const facts: string[] = [
  "All qualifications being implemented by the Student Government Elections were set by the Student Government and is stipulated by their honorable constitution.",
  'Electoral candidates can have a "Failed Election" if the combined total votes cast for the candidate and abstentions does not reach the 50% + 1 threshold of the total student population.',
  "The SG Executive President is qualified to receive a 100% discount on tuition and miscellaneous fees under the Student Leaders' Assistance Program.",
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
    <div className="bg-green-800 text-white p-4 xl:p-6 shadow-sm relative overflow-hidden flex flex-col w-full h-[260px] lg:h-full rounded-lg">
      
      {/* Header */}
      <div className="flex items-center gap-2 xl:gap-3 mb-3 xl:mb-4 shrink-0">
        <Info className="text-green-300 shrink-0 w-5 h-5 xl:w-6 xl:h-6" />
        <h3 className="font-bold text-xs xl:text-sm tracking-widest uppercase text-green-50 whitespace-nowrap">
          Did You Know?
        </h3>
        <div className="h-4 flex-grow border-b border-white/20 ml-2"></div>
      </div>

      <div className="relative flex-grow w-full">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="font-medium text-center text-green-50 drop-shadow-sm transition-all duration-300 text-sm lg:text-sm xl:text-base 2xl:text-lg leading-tight lg:leading-tight xl:leading-snug 2xl:leading-normal">
              {facts[index]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
};

export default DidYouKnowWidget;