// src/features/tracker/routes/TrackerDashboard.tsx
import { useState, useEffect } from 'react';
import { useTrackerData } from '../hooks/useTrackerData';
import OverallTurnoutCard from '../components/OverallTurnoutCard';
import LeaderboardList from '../components/LeaderboardList';
import DidYouKnowWidget from '../components/DidYouKnowWidget';
import QrWidget from '../components/QrWidget';
import { Vote } from 'lucide-react'; 
import { FlickeringGrid } from '../components';

const TrackerDashboard = () => {
  const { data, isLoading, error } = useTrackerData();
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  // Sync UI countdown to global clock
  useEffect(() => {
    const calculateSecondsLeft = () => {
      const currentSeconds = new Date().getSeconds();
      setSecondsLeft(60 - currentSeconds);
    };
    calculateSecondsLeft();
    const interval = setInterval(calculateSecondsLeft, 500);
    return () => clearInterval(interval);
  }, []);

  const renderConnectionBadge = () => {
    if (error && data.length > 0) {
      return (
        <div className="bg-amber-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-widest shadow-sm">
          DATA STALE
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-amber-200"></span>
          </span>
        </div>
      );
    }
    
    if (isLoading && data.length === 0) {
      return (
        <div className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-widest shadow-sm">
          CONNECTING
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-blue-300"></span>
          </span>
        </div>
      );
    }

    return (
      <div className="bg-green-800 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-widest shadow-sm">
        LIVE
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>
    );
  };

  const timerText = `00:${secondsLeft.toString().padStart(2, '0')}`;

  if (isLoading && data.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#f4f4f4]">
        <div className="relative flex items-center justify-center w-32 h-32 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-green-800 animate-spin"></div>
          <img src="/comelec.png" alt="COMELEC" className="w-20 h-20 object-contain animate-pulse z-10" />
        </div>
        <h2 className="text-green-800 font-heading font-bold tracking-[0.2em] animate-pulse text-center px-4">
          ESTABLISHING LIVE CONNECTION...
        </h2>
      </div>
    );
  }
  
  if (error && data.length === 0) {
    return <div className="flex h-screen items-center justify-center text-red-600 font-heading text-center px-4">Fatal Connection Error: {error}</div>;
  }

  return (
    // Shifted from xl: to lg: 
    <div className="min-h-screen lg:h-screen overflow-y-auto lg:overflow-hidden bg-[#f4f4f4] text-gray-900 font-sans flex flex-col relative pb-20 lg:pb-0">
      
      {/* Header */}
      <header className="relative bg-white border-b-4 border-green-800 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm flex-shrink-0 z-20">
        <div className="flex items-center gap-3 z-10 w-1/4">
          <img src="/comelec.png" alt="COMELEC" className="h-10 w-10 object-contain" />
          <div className="hidden md:block">
            <h2 className="text-xs font-bold text-green-800 tracking-wider">DE LA SALLE LIPA</h2>
            <h1 className="text-sm font-bold tracking-widest uppercase">COMMISSION ON ELECTIONS</h1>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 w-max max-w-[50%] text-center z-0">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-heading font-bold tracking-widest text-green-800 whitespace-nowrap">
              LIVE VOTER'S TURNOUT
            </h1>
        </div>

        {/* Desktop Timer/Status (Shifted to lg:) */}
        <div className="hidden lg:flex items-center justify-end gap-4 z-10 w-1/4">
           <span className="font-heading font-bold text-sm text-gray-500 tracking-widest">
             NEXT UPDATE IN {timerText}
           </span>
           {renderConnectionBadge()}
        </div>
      </header>

      {/* Floating Mobile UI (Shifted to lg:) */}
      <div className="fixed bottom-4 left-4 z-50 lg:hidden flex flex-col gap-2 pointer-events-none">
         <div className="pointer-events-auto shadow-md rounded-full">
            {renderConnectionBadge()}
         </div>
         <div className="bg-white text-gray-800 text-[10px] font-bold px-3 py-1 rounded-full shadow-md border border-gray-200 w-max pointer-events-auto tracking-widest">
            UPDATE IN {timerText}
         </div>
      </div>

      <a 
        href="https://forms.gle/ySfoenJ9RnPYJUNQ7" 
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-4 right-4 z-50 lg:hidden bg-green-800 hover:bg-green-700 text-white text-sm font-heading font-bold tracking-widest px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95"
      >
        <Vote size={18} />
        VOTE NOW
      </a>

      {/* Main Content Wrapper */}
      <div className="relative flex-grow lg:min-h-0 flex flex-col">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <FlickeringGrid
            className="w-full h-full"
            squareSize={4}
            gridGap={6}
            color="rgb(22, 163, 74)"
            maxOpacity={0.15}
            flickerChance={0.2}
          />
        </div>

        {/* Adjusting grid for mobile stacking vs desktop columns (Shifted to lg:) */}
        <main className="relative z-10 flex-grow max-w-screen-2xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch lg:min-h-0">
          <div className="lg:col-span-7 flex flex-col gap-6 lg:h-full lg:min-h-0">
            <div className="flex-shrink-0">
               <OverallTurnoutCard pollData={data} />
            </div>
            <div className="flex-grow lg:min-h-0">
               <LeaderboardList pollData={data} />
            </div>
          </div>

          {/* Right Column (60/40 Split) */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:h-full lg:min-h-0">
            {/* 60% Height for QR Widget */}
            <div className="hidden lg:flex flex-col h-[70%] min-h-0">
               <QrWidget />
            </div>
            {/* 40% Height for Did You Know */}
            <div className="flex flex-col h-[260px] lg:h-[30%] min-h-0">
              <DidYouKnowWidget />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrackerDashboard;