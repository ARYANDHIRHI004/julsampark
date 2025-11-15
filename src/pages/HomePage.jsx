import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Droplets, ArrowRight, Shield, Users, BarChart3, Settings } from "lucide-react";
import WaterBackwashGIF from "../assets/waterBackGif.gif";

const HomePage = () => {
  const btnsRef = useRef();
  
  const scrollToSection = () => {
    btnsRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const roles = [
    {
      title: 'Admin',
      icon: Shield,
      description: 'Full system control and monitoring',
      gradient: 'from-purple-500 to-pink-500',
      path: '/login'
    },
    {
      title: 'Operator',
      icon: Settings,
      description: 'Manage pumps and daily operations',
      gradient: 'from-cyan-500 to-blue-500',
      path: '/login'
    },
    {
      title: 'Planner',
      icon: BarChart3,
      description: 'Analytics and demand forecasting',
      gradient: 'from-green-500 to-emerald-500',
      path: '/login'
    },
    {
      title: 'User',
      icon: Users,
      description: 'Submit queries and track issues',
      gradient: 'from-orange-500 to-pink-500',
      path: '/login'
    }
  ];

  return (
    <div className="bg-[#0a0e27] min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${WaterBackwashGIF})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Droplets className="w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              JalSampark
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Smart Water Distribution Management System for Raipur
          </p>

          <button
            onClick={scrollToSection}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-base md:text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-110"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </span>
          </button>
        </div>
      </div>

      {/* Role Selection Section */}
      <div ref={btnsRef} className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-[#0a0e27] to-[#0a1128]">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Choose Your Role
            </h2>
            <p className="text-gray-400 text-base md:text-xl">Select how you want to access the system</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
            {roles.map((role, index) => (
              <Link key={index} to={role.path}>
                <div className={`group relative bg-gradient-to-br ${role.gradient} p-6 md:p-8 rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden`}>
                  {/* Glass effect */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    <role.icon className="w-12 h-12 md:w-16 md:h-16 text-white mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{role.title}</h3>
                    <p className="text-white/80 text-sm">{role.description}</p>
                    
                    <div className="mt-6 flex items-center text-white group-hover:gap-3 gap-2 transition-all">
                      <span className="text-sm font-medium">Access Portal</span>
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Animated wave */}
                  <div className="absolute -bottom-2 left-0 right-0 h-24 opacity-20">
                    <div className="absolute bottom-0 w-full h-20 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;