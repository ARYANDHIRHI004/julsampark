import React from "react";
import { Zap, Gauge, Wind } from "lucide-react";
import Map from "./Map";
import SpeedTest from "../assets/SpeedTest.gif";

const Dashboard = () => {
  const metrics = [
    { 
      title: 'Pump Usage', 
      value: '985.31', 
      unit: 'kW/h',
      icon: Zap,
      gradient: 'from-purple-500 to-pink-500',
      glow: 'shadow-lg shadow-purple-500/30'
    },
    { 
      title: 'Pipeline Pressure', 
      value: '48.62', 
      unit: 'PSI',
      icon: Gauge,
      gradient: 'from-cyan-500 to-blue-500',
      glow: 'shadow-lg shadow-cyan-500/30'
    },
    { 
      title: 'Water Flow', 
      value: '2,548', 
      unit: 'L/min',
      icon: Wind,
      gradient: 'from-green-500 to-emerald-500',
      glow: 'shadow-lg shadow-green-500/30'
    },
  ];

  return (
    <div className="bg-[#0a0e27] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a1128] to-[#001f54] p-4 md:p-6 shadow-xl sticky top-0 z-10 backdrop-blur-sm bg-opacity-90 border-b border-cyan-500/20">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent pl-16 lg:pl-0">
          Overview
        </h1>
      </div>

      {/* Metrics Cards */}
      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${metric.gradient} p-4 md:p-6 rounded-2xl ${metric.glow} hover:scale-105 transition-transform duration-300 overflow-hidden`}
            >
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <h3 className="text-white/90 text-xs md:text-sm font-semibold uppercase tracking-wide">{metric.title}</h3>
                  <metric.icon className="text-white/80" size={24} />
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">{metric.value}</div>
                <div className="text-white/80 text-xs md:text-sm font-medium">{metric.unit}</div>
                
                {/* Animated wave effect */}
                <div className="absolute -bottom-2 left-0 right-0 h-16 md:h-24 flex items-center justify-center opacity-10">
                  <img src={SpeedTest} alt="" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-4 md:p-6 border border-cyan-500/20">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Wind className="text-cyan-400" size={24} />
            Water Distribution Network
          </h2>
          <div className="w-full overflow-hidden rounded-xl">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;