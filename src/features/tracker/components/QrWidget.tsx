const QrWidget = () => {
  return (
    <div className="bg-[#bfe6c4] p-4 shadow-sm flex flex-col items-center text-center">
      <h2 className="text-2xl font-heading font-bold text-green-900 mb-2">
        LET YOUR VOICE BE HEARD
      </h2>
      <p className="text-sm font-bold text-green-800 mb-6 max-w-62.5">
        YOUR VOTE MATTERS. PARTICIPATE IN THIS YEAR'S SG ELECTIONS
      </p>

      <div className="bg-white p-4 rounded-sm shadow-md mb-6 w-56 h-56 flex items-center justify-center">
        {/* Replace with your actual QR code image */}
        <img
          src="/Mock_QR_Code.svg"
          alt="Scan to vote QR Code"
          className="w-full h-full object-contain"
        />
      </div>

      <h3 className="text-3xl font-heading font-bold text-green-900 tracking-wider">
        SCAN TO VOTE
      </h3>
    </div>
  );
};

export default QrWidget;
