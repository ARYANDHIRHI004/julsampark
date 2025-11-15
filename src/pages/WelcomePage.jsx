import React from 'react';
import { Droplets, TrendingUp, Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  const features = [
    {
      icon: Droplets,
      title: 'Smart Distribution',
      description: 'AI-powered water distribution management for optimal resource utilization',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Demand Forecasting',
      description: 'Predict water demand patterns with machine learning algorithms',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Citizen Engagement',
      description: 'Direct communication channel for queries and feedback',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Real-time Monitoring',
      description: 'Live tracking of water supply, pressure, and system health',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Droplets className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-bounce" />
            </div>

            {/* Heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                JalSampark
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transforming water distribution management with intelligent technology, 
              real-time monitoring, and citizen-centric solutions for a sustainable future.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all hover:scale-110 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                </button>
              </Link>
              <Link to="/">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-cyan-500/50 text-cyan-400 font-bold text-lg rounded-full hover:bg-white/20 transition-all">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive tools and insights to revolutionize water management in your city
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-[#0a1128] to-[#001f54] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                50K+
              </p>
              <p className="text-gray-400">Citizens Connected</p>
            </div>
            <div>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                95%
              </p>
              <p className="text-gray-400">Uptime Guaranteed</p>
            </div>
            <div>
              <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                24/7
              </p>
              <p className="text-gray-400">Real-time Monitoring</p>
            </div>
            <div>
              <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                4+
              </p>
              <p className="text-gray-400">Zones Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Water Management?
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Join JalSampark today and be part of the smart city revolution
        </p>
        <Link to="/signup">
          <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xl rounded-full hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all hover:scale-110">
            Start Now - It's Free
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;