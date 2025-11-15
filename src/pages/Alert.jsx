import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, Bell, X } from 'lucide-react';

const Alert = () => {
  // Dummy alert data - replace with real data from backend
  const [alerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'High Pressure Detected',
      message: 'Zone A pipeline pressure exceeds safe threshold (85 PSI)',
      timestamp: '2 minutes ago',
      location: 'Civil Lines - Sector 12'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Water Level',
      message: 'Tank T-304 water level below 30%',
      timestamp: '15 minutes ago',
      location: 'Shankar Nagar'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Pump P-102 maintenance scheduled for tomorrow 10 AM',
      timestamp: '1 hour ago',
      location: 'Telibandha'
    },
    {
      id: 4,
      type: 'success',
      title: 'Issue Resolved',
      message: 'Leak in Zone C pipeline has been fixed',
      timestamp: '3 hours ago',
      location: 'Mowa'
    }
  ]);

  const getAlertStyle = (type) => {
    switch(type) {
      case 'critical':
        return {
          border: 'border-red-500/50',
          bg: 'from-red-500/20 to-pink-500/20',
          icon: AlertCircle,
          iconColor: 'text-red-400',
          glow: 'shadow-red-500/30'
        };
      case 'warning':
        return {
          border: 'border-orange-500/50',
          bg: 'from-orange-500/20 to-yellow-500/20',
          icon: AlertTriangle,
          iconColor: 'text-orange-400',
          glow: 'shadow-orange-500/30'
        };
      case 'success':
        return {
          border: 'border-green-500/50',
          bg: 'from-green-500/20 to-emerald-500/20',
          icon: CheckCircle,
          iconColor: 'text-green-400',
          glow: 'shadow-green-500/30'
        };
      default:
        return {
          border: 'border-blue-500/50',
          bg: 'from-blue-500/20 to-cyan-500/20',
          icon: Info,
          iconColor: 'text-blue-400',
          glow: 'shadow-blue-500/30'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
            <Bell className="text-cyan-400" size={36} />
            System Alerts & Notifications
          </h1>
          <p className="text-gray-400 mt-2">Real-time monitoring and alert management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">Critical</p>
                <p className="text-white text-3xl font-bold">1</p>
              </div>
              <AlertCircle className="text-red-400" size={32} />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm font-medium">Warning</p>
                <p className="text-white text-3xl font-bold">1</p>
              </div>
              <AlertTriangle className="text-orange-400" size={32} />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Info</p>
                <p className="text-white text-3xl font-bold">1</p>
              </div>
              <Info className="text-blue-400" size={32} />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Resolved</p>
                <p className="text-white text-3xl font-bold">1</p>
              </div>
              <CheckCircle className="text-green-400" size={32} />
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Alerts</h2>
          <div className="space-y-4">
            {alerts.map((alert) => {
              const style = getAlertStyle(alert.type);
              const Icon = style.icon;
              
              return (
                <div key={alert.id} className={`bg-gradient-to-r ${style.bg} border ${style.border} rounded-xl p-5 ${style.glow} shadow-lg hover:scale-[1.02] transition-transform`}>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <Icon className={`${style.iconColor} flex-shrink-0`} size={28} />
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-1">{alert.title}</h3>
                        <p className="text-gray-300 mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{alert.timestamp}</span>
                          <span>•</span>
                          <span>{alert.location}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;