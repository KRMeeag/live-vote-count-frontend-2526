import { useState, useEffect } from "react";
import { useTrackerData } from "../hooks/useTrackerData";
import {
  QrWidget,
  OverallTurnoutCard,
  LeaderboardList,
  FlickeringGrid,
  DidYouKnowWidget,
} from "../components";

const TrackerDashboard = () => {
  const { data, isLoading, error } = useTrackerData();
  const [secondsLeft, setSecondsLeft] = useState<number>(60);

  useEffect(() => {
    if (!error && data.length > 0) {
      setSecondsLeft(60);
    }
  }, [data, error]);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const renderConnectionBadge = () => {
    if (error && data.length > 0) {
      return (
        <div className="bg-amber-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-widest shadow-sm">
          DATA STALE: RECONNECTING
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-amber-200"></span>
          </span>
        </div>
      );
    }

    if (isLoading || secondsLeft === 0) {
      return (
        <div className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-widest shadow-sm">
          {isLoading ? "CONNECTING..." : "FETCHING..."}
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-blue-300"></span>
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

  if (isLoading && data.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#f4f4f4]">
        <div className="relative flex items-center justify-center w-32 h-32 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-green-800 animate-spin"></div>
          <img
            src="/comelec.png"
            alt="COMELEC"
            className="w-20 h-20 object-contain animate-pulse z-10"
          />
        </div>
        <h2 className="text-green-800 font-heading font-bold tracking-[0.2em] animate-pulse">
          ESTABLISHING LIVE CONNECTION...
        </h2>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600 font-heading">
        Fatal Connection Error: {error}
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden lg:overflow-visible bg-[#f4f4f4] text-gray-900 font-sans flex flex-col">
      {/* Header - Z-index elevated, solid white background prevents grid bleed */}
      <header className="relative bg-white border-b-4 border-green-800 px-6 py-3 flex items-center justify-between shadow-sm flex-shrink-0 z-20">
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

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl lg:text-3xl font-heading font-bold tracking-[0.2em] text-green-800 w-max text-center z-0 hidden md:block">
          LIVE VOTER'S TURNOUT
        </h1>

        <h1 className="text-xl font-heading font-bold tracking-wider text-green-800 md:hidden">
          LIVE TURNOUT
        </h1>

        <div className="flex items-center gap-4 z-10">
          <span className="font-heading font-bold text-sm text-gray-500 hidden md:block tracking-widest">
            {timerText}
          </span>
          {renderConnectionBadge()}
        </div>
      </header>

      {/* Main Content Wrapper - Houses both the Grid and the Cards */}
      <div className="relative flex-grow min-h-0 flex flex-col">
        {/* Absolute Background Canvas (z-0) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <FlickeringGrid
            className="w-full h-full"
            squareSize={4}
            gridGap={6}
            color="rgb(22, 163, 74)" // Deep green to match the theme
            maxOpacity={0.3}
            flickerChance={1}
          />
        </div>

        {/* Foreground Cards (z-10) */}
        <main className="relative z-10 flex-grow max-w-screen-2xl mx-auto w-full p-6 grid grid-cols-1 xl:grid-cols-10 gap-6 items-stretch min-h-0">
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
    </div>
  );
};

export default TrackerDashboard;
