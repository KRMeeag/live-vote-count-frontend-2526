import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const facts: string[] = [
  "All qualifications being implemented by the Student Government Elections were set by the Student Government and is stipulated by their honorable constitution.",
  'Electoral candidates can have a "Failed Election" if the combined total votes cast for the candidate and abstentions does not reach the 50% + 1 threshold of the total student population',
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
    // flex-grow makes it stretch to bottom
    <div className="bg-green-800 text-white p-6 shadow-sm relative overflow-hidden flex flex-col flex-grow h-full min-h-[220px]">
      <div className="flex items-center gap-3 mb-6">
        <Info size={24} className="text-green-300" />
        <h3 className="font-bold text-sm tracking-widest uppercase text-green-50">Did You Know?</h3>
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