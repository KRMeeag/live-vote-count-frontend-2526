// src/features/tracker/components/TrackerDashboard.tsx
import { useTrackerData } from '../hooks/useTrackerData';
import OverallTurnoutCard from '../components/OverallTurnoutCard';
import LeaderboardList from '../components/LeaderBoardList';
import DidYouKnowWidget from '../components/DidYouKnowWidget';
import QrWidget from '../components/QRWidget'; 

const TrackerDashboard = () => {
  const { data, isLoading, error } = useTrackerData();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center font-heading text-xl">Initializing Live Tracker...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-600 font-heading">Connection Error: {error}</div>;
  }

  // Fallback if data is undefined or empty
  if (!data || data.length === 0) {
    return <div className="flex h-screen items-center justify-center font-heading">No election data available.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-gray-900 font-sans">
      
      <header className="bg-white border-b-4 border-green-800 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <img src="/comelec.png" alt="COMELEC" className="h-12 w-12 object-contain" />
          <div>
            <h2 className="text-xs font-bold text-green-800 tracking-wider">DE LA SALLE LIPA</h2>
            <h1 className="text-sm font-bold tracking-widest uppercase">COMMISSION ON ELECTIONS</h1>
          </div>
        </div>
        <h1 className="text-3xl font-heading font-bold tracking-[0.2em] text-green-800">
          LIVE VOTER'S TURNOUT
        </h1>
        <div className="flex items-center gap-4">
           <span className="font-heading font-medium text-sm text-green-900">APR 13, 2026 | 02:45 PM</span>
           <div className="bg-green-800 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-widest">
             CONNECTION: LIVE
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
           </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto p-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 flex flex-col gap-6">
          <OverallTurnoutCard pollData={data} />
          <LeaderboardList pollData={data} />
        </div>

        <div className="xl:col-span-4 flex flex-col gap-6">
          <QrWidget />
          <DidYouKnowWidget />
        </div>
      </main>
      
    </div>
  );
};

export default TrackerDashboard;