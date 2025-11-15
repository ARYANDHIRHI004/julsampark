import React, { useState } from 'react';
import { Droplets, TrendingUp, Activity, Clock, MapPin } from 'lucide-react';

const LiveSupply = () => {
  // Dummy live data - replace with real-time data from backend
  const [liveData] = useState({
    zones: [
      {
        id: 1,
        name: 'Zone A - Civil Lines',
        currentFlow: 2450,
        pressure: 48.5,
        status: 'active',
        lastUpdate: '2 seconds ago'
      },
      {
        id: 2,
        name: 'Zone B - Shankar Nagar',
        currentFlow: 1890,
        pressure: 42.3,
        status: 'active',
        lastUpdate: '3 seconds ago'
      },
      {
        id: 3,
        name: 'Zone C - Telibandha',
        currentFlow: 0,
        pressure: 0,
        status: 'offline',
        lastUpdate: '5 minutes ago'
      },
      {
        id: 4,
        name: 'Zone D - Mowa',
        currentFlow: 3120,
        pressure: 52.1,
        status: 'active',
        lastUpdate: '1 second ago'
      }
    ],
    totalFlow: 7460,
    avgPressure: 47.6,
    activeZones: 3
  });

  const getStatusStyle = (status) => {
    switch(status) {
      case 'active':
        return {
          bg: 'from-green-500/20 to-emerald-500/20',
          border: 'border-green-500/50',
          text: 'text-green-400',
          dot: 'bg-green-400'
        };
      case 'offline':
        return {
          bg: 'from-red-500/20 to-pink-500/20',
          border: 'border-red-500/50',
          text: 'text-red-400',
          dot: 'bg-red-400'
        };
      default:
        return {
          bg: 'from-yellow-500/20 to-orange-500/20',
          border: 'border-yellow-500/50',
          text: 'text-yellow-400',
          dot: 'bg-yellow-400'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
            <Activity className="text-cyan-400 animate-pulse" size={36} />
            Live Water Supply Monitoring
          </h1>
          <p className="text-gray-400 mt-2">Real-time data from distribution network</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-cyan-400 text-sm font-semibold uppercase">Total Flow</h3>
              <Droplets className="text-cyan-400" size={24} />
            </div>
            <p className="text-4xl font-bold text-white mb-1">{liveData.totalFlow.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Liters per minute</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-purple-400 text-sm font-semibold uppercase">Avg Pressure</h3>
              <TrendingUp className="text-purple-400" size={24} />
            </div>
            <p className="text-4xl font-bold text-white mb-1">{liveData.avgPressure}</p>
            <p className="text-gray-400 text-sm">PSI</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-green-400 text-sm font-semibold uppercase">Active Zones</h3>
              <MapPin className="text-green-400" size={24} />
            </div>
            <p className="text-4xl font-bold text-white mb-1">{liveData.activeZones}/{liveData.zones.length}</p>
            <p className="text-gray-400 text-sm">Operational</p>
          </div>
        </div>

        {/* Live Zone Cards */}
        <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MapPin className="text-cyan-400" size={28} />
            Zone-wise Live Data
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveData.zones.map((zone) => {
              const style = getStatusStyle(zone.status);
              
              return (
                <div
                  key={zone.id}
                  className={`bg-gradient-to-r ${style.bg} border ${style.border} rounded-xl p-6 hover:shadow-lg transition-all`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{zone.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${style.dot} ${zone.status === 'active' ? 'animate-pulse' : ''}`}></div>
                        <span className={`text-sm font-medium uppercase ${style.text}`}>
                          {zone.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-black/20 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Droplets className="text-cyan-400" size={20} />
                        <span className="text-gray-300 text-sm">Flow Rate</span>
                      </div>
                      <span className="text-white font-bold text-lg">
                        {zone.currentFlow > 0 ? `${zone.currentFlow.toLocaleString()} L/min` : 'No Flow'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-black/20 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-purple-400" size={20} />
                        <span className="text-gray-300 text-sm">Pressure</span>
                      </div>
                      <span className="text-white font-bold text-lg">
                        {zone.pressure > 0 ? `${zone.pressure} PSI` : 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-black/20 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="text-green-400" size={20} />
                        <span className="text-gray-300 text-sm">Last Update</span>
                      </div>
                      <span className="text-gray-400 text-sm font-medium">
                        {zone.lastUpdate}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {zone.status === 'offline' && (
                    <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all text-sm">
                      Investigate Issue
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Auto-refresh indicator */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            Auto-refreshing every 5 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveSupply;