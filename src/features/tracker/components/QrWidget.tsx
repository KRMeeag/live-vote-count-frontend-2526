// src/features/tracker/components/QrWidget.tsx
const QrWidget = () => {
  return (
    <div className="bg-[#bfe6c4] p-6 shadow-sm flex flex-col items-center justify-center text-center w-full h-full min-h-0">
      
      <h2 className="text-xl 2xl:text-2xl font-heading font-bold text-green-900 mb-2 shrink-0">
        LET YOUR VOICE BE HEARD
      </h2>
      
      <p className="text-xs 2xl:text-sm font-bold text-green-800 mb-4 xl:mb-6 max-w-[250px] shrink-0">
        YOUR VOTE MATTERS. PARTICIPATE IN THIS YEAR'S SG ELECTIONS
      </p>

      {/* Fluid scaling box instead of fixed pixel heights */}
      <div className="bg-white p-3 xl:p-4 rounded-md shadow-md mb-4 xl:mb-6 w-[90%] max-w-[300px] aspect-square flex items-center justify-center shrink min-h-0">
        <img
          src="/QR_Code_Forms.png"
          alt="Scan to vote QR Code"
          className="w-full h-full object-contain"
        />
      </div>

      <h3 className="text-2xl 2xl:text-3xl font-heading font-bold text-green-900 tracking-wider shrink-0">
        SCAN TO VOTE
      </h3>
      
    </div>
  );
};

export default QrWidget;