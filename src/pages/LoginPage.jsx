import React from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../stores/useAuthStore";
import { Loader2, Mail, Lock, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import backGround from "../assets/loginBack.jpg";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser, isLoggingIn } = useAuthStore();

  const handleLogin = async (data) => {
    await loginUser(data);
  };

  return (
    <div
      className="font-roboto flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backGround})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128]/90 to-[#001f54]/90 backdrop-blur-sm"></div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-[#1a1f3a]/80 to-[#0f1729]/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Droplets className="w-16 h-16 text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2">Login to JalSampark Dashboard</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                <Mail size={16} className="text-cyan-400" />
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                type="email"
                {...register("email", { required: true })}
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                <Lock size={16} className="text-cyan-400" />
                Password
              </label>
              <input
                className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                type="password"
                {...register("password", { required: true })}
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;