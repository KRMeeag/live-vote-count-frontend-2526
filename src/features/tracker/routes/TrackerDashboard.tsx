// src/features/tracker/routes/TrackerDashboard.tsx
import { useState, useEffect } from "react";
import { useTrackerData } from "../hooks/useTrackerData";
import OverallTurnoutCard from "../components/OverallTurnoutCard";
import LeaderboardList from "../components/LeaderboardList";
import DidYouKnowWidget from "../components/DidYouKnowWidget";
import QrWidget from "../components/QrWidget";

const TrackerDashboard = () => {
  const { data, isLoading, error } = useTrackerData();
  const [secondsLeft, setSecondsLeft] = useState<number>(60);

  // Sync timer strictly to successful data fetches
  useEffect(() => {
    if (data && !error) {
      setSecondsLeft(60);
    }
  }, [data, error]);

  // Handle countdown logic
  useEffect(() => {
    if (error || isLoading) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [error, isLoading]);

  const renderConnectionBadge = () => {
    if (error) {
      return (
        <div className="bg-red-800 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-widest shadow-sm">
          CONNECTION: ERROR
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
          </span>
        </div>
      );
    }

    // Check if initial load or if timer hit 0 but data hasn't arrived yet
    if (isLoading || secondsLeft === 0) {
      return (
        <div className="bg-amber-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-widest shadow-sm">
          {isLoading ? "CONNECTING..." : "FETCHING..."}
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
          </span>
        </div>
      );
    }

    return (
      <div className="bg-green-800 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-widest shadow-sm">
        CONNECTION: LIVE
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>
    );
  };

  const timerText =
    secondsLeft > 0
      ? `NEXT UPDATE IN 00:${secondsLeft.toString().padStart(2, "0")}`
      : "UPDATING DATA...";

  if (isLoading && (!data || data.length === 0))
    return (
      <div className="flex h-screen items-center justify-center font-heading text-xl">
        Initializing Live Tracker...
      </div>
    );
  if (error && (!data || data.length === 0))
    return (
      <div className="flex h-screen items-center justify-center text-red-600 font-heading">
        Connection Error: {error}
      </div>
    );

  return (
    <div className="h-screen overflow-hidden lg:overflow-visible bg-[#f4f4f4] text-gray-900 font-sans flex flex-col">
      {/* Added 'relative' to the header so absolute children position themselves to it */}
      <header className="relative bg-white border-b-4 border-green-800 px-6 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
        {/* Left Block */}
        <div className="flex items-center gap-4 z-10">
          <img
            src="/comelec.png"
            alt="COMELEC"
            className="h-10 w-10 object-contain"
          />
          <div>
            <h2 className="text-xs font-bold text-green-800 tracking-wider">
              DE LA SALLE LIPA
            </h2>
            <h1 className="text-sm font-bold tracking-widest uppercase">
              COMMISSION ON ELECTIONS
            </h1>
          </div>
        </div>

        {/* Center Title - Forced to True Center */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl lg:text-3xl font-heading font-bold tracking-[0.2em] text-green-800 w-max text-center z-0 hidden md:block">
          LIVE VOTER'S TURNOUT
        </h1>

        {/* Fallback for Mobile (where absolute centering might overlap the logo) */}
        <h1 className="text-xl font-heading font-bold tracking-wider text-green-800 md:hidden">
          LIVE TURNOUT
        </h1>

        {/* Right Block */}
        <div className="flex items-center gap-4 z-10">
          <span className="font-heading font-bold text-sm text-gray-500 hidden md:block tracking-widest">
            {timerText}
          </span>
          {renderConnectionBadge()}
        </div>
      </header>
      <main className="flex-grow max-w-screen-2xl mx-auto w-full p-6 grid grid-cols-1 xl:grid-cols-10 gap-6 items-stretch min-h-0">
        <div className="xl:col-span-7 flex flex-col gap-6 h-full min-h-0">
          <div className="flex-shrink-0">
            <OverallTurnoutCard pollData={data} />
          </div>
          <div className="flex-grow min-h-0">
            <LeaderboardList pollData={data} />
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col gap-6 h-full min-h-0">
          <QrWidget />
          <DidYouKnowWidget />
        </div>
      </main>
    </div>
  );
};

export default TrackerDashboard;
