import React, { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Settings, Bell, MessageSquare, TrendingUp, Droplets, Menu, X } from "lucide-react";

const SideBar = () => {
  const [open, setOpen] = useState(false); // Default closed on mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Settings, label: 'Pump Control', path: '/dashboard/pumpControllers' },
    { icon: TrendingUp, label: 'Analytics & Reports', path: '/dashboard/analyticsAndReports' },
    { icon: Bell, label: 'Alerts', path: '/dashboard/alerts' },
    { icon: MessageSquare, label: 'Citizen Feedback', path: '/dashboard/usersFeedback' },
    { icon: TrendingUp, label: 'Demand Predictions', path: '/dashboard/accounts' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-lg"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${open ? 'w-64' : 'w-20'}
          fixed lg:relative
          bg-gradient-to-b from-[#0a1128] via-[#001f54] to-[#034078] 
          h-screen flex flex-col justify-between p-4 
          transition-all duration-300 
          z-40
          shadow-2xl
        `}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-8 pt-4">
            <div className={`flex items-center gap-2 ${!open && 'justify-center w-full'}`}>
              <Droplets className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] flex-shrink-0" />
              {open && (
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
                  JalSampark
                </h1>
              )}
            </div>
          </div>

          {/* Toggle Button - Hidden on mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="hidden lg:block absolute -right-3 top-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full p-1.5 shadow-lg hover:shadow-cyan-500/50 transition-all z-20"
          >
            {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>

          {/* Menu Items */}
          <nav className="space-y-2 mt-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center ${open ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-cyan-400 transition-all group`}
              >
                <item.icon size={20} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                {open && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pb-4">
          <LogoutBtn open={open} />
        </div>
      </div>
    </>
  );
};

export default SideBar;