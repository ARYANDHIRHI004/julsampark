import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Play, Square, Clock, Droplet, FileText } from "lucide-react";

export default function OperaterForm() {
  const { register, handleSubmit } = useForm();
  const [timerStarted, setTimerStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    let interval;
    if (timerStarted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted]);

  const onSubmit = (data) => {
    setSeconds(0);
    setStartTimestamp(new Date());
    setReportData({ ...data });
    setTimerStarted(true);
  };

  const stopTimer = () => {
    setTimerStarted(false);
    const endTimestamp = new Date();
    setReportData((prev) => ({
      ...prev,
      startTimeFormatted: startTimestamp.toLocaleString(),
      endTimeFormatted: endTimestamp.toLocaleString(),
      finalWaterLevel: prev.initialWaterLevel,
      totalTime: seconds + " seconds"
    }));
  };

  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const remainingSeconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* FORM */}
        {!timerStarted && !reportData?.endTimeFormatted && (
          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-8 border border-cyan-500/30">
            <div className="text-center mb-8">
              <Droplet className="w-16 h-16 text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Water Tank Monitoring
              </h1>
              <p className="text-gray-400 mt-2">Fill in the details to start monitoring</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Tank ID</label>
                <input
                  className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  {...register("tankID", { required: true })}
                  placeholder="e.g., TANK-001"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Start Time</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  {...register("startTime", { required: true })}
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Initial Water Level (Liters)</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  {...register("initialWaterLevel", { required: true })}
                  placeholder="e.g., 5000"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Start Monitoring
              </button>
            </form>
          </div>
        )}

        {/* TIMER */}
        {timerStarted && (
          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-12 border border-cyan-500/30 text-center">
            <Clock className="w-20 h-20 text-cyan-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8">
              {formatTime(seconds)}
            </h2>
            <p className="text-gray-400 text-lg mb-8">Monitoring in progress...</p>
            <button
              onClick={stopTimer}
              className="px-12 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-xl rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <Square size={24} />
              Stop Monitoring
            </button>
          </div>
        )}

        {/* REPORT */}
        {!timerStarted && reportData?.endTimeFormatted && (
          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-8 border border-green-500/30">
            <div className="text-center mb-8">
              <FileText className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Monitoring Report
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-black/20 rounded-xl p-4 border border-green-500/20">
                <p className="text-gray-400 text-sm mb-1">Tank ID</p>
                <p className="text-white font-bold text-xl">{reportData.tankID}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-xl p-4 border border-green-500/20">
                  <p className="text-gray-400 text-sm mb-1">Start Time (Input)</p>
                  <p className="text-white font-medium">{reportData.startTime}</p>
                </div>
                <div className="bg-black/20 rounded-xl p-4 border border-green-500/20">
                  <p className="text-gray-400 text-sm mb-1">Start Time (System)</p>
                  <p className="text-white font-medium">{reportData.startTimeFormatted}</p>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-4 border border-green-500/20">
                <p className="text-gray-400 text-sm mb-1">End Time</p>
                <p className="text-white font-bold text-lg">{reportData.endTimeFormatted}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-xl p-4 border border-green-500/20">
                  <p className="text-gray-400 text-sm mb-1">Initial Water Level</p>
                  <p className="text-white font-bold text-2xl">{reportData.initialWaterLevel} L</p>
                </div>
                <div className="bg-black/20 rounded-xl p-4 border border-green-500/20">
                  <p className="text-gray-400 text-sm mb-1">Final Water Level</p>
                  <p className="text-white font-bold text-2xl">{reportData.finalWaterLevel} L</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
                <p className="text-gray-400 text-sm mb-1">Total Monitoring Time</p>
                <p className="text-cyan-400 font-bold text-3xl">{reportData.totalTime}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setReportData(null);
                setSeconds(0);
              }}
              className="w-full mt-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lghover:shadow-cyan-500/50 transition-all"
>
Start New Monitoring Session
</button>
</div>
)}
</div>
</div>
);
}