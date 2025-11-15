import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { Loader2Icon, LogOutIcon, Droplets, Menu, X } from "lucide-react";

const Navbar = () => {
  const { authUser, isLoggingOut, logOutUser } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex bg-gradient-to-r from-[#0a1128] via-[#001f54] to-[#034078] p-4 md:p-5 justify-between items-center w-full shadow-lg border-b border-cyan-500/20 relative">
      <Link to="/" className="flex items-center gap-2">
        <Droplets className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Jal
          </span>
          <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Sampark
          </span>
        </h1>
      </Link>

      {/* Desktop Menu */}
      {!authUser && (
        <>
          <ul className="hidden md:flex gap-6 lg:gap-8 text-base lg:text-lg text-gray-300">
            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Home</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer">About</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Pricing</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Services</li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </>
      )}

      {/* Desktop Auth Buttons */}
      {!authUser ? (
        <div className="hidden md:flex gap-3 lg:gap-4">
          <Link
            to="/login"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-medium text-sm lg:text-base"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all font-medium text-sm lg:text-base"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <button
          onClick={logOutUser}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-all font-medium flex items-center gap-2 text-sm md:text-base"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2Icon className="animate-spin" size={18} />
          ) : (
            <>
              <span className="hidden sm:inline">Logout</span>
              <LogOutIcon size={16} />
            </>
          )}
        </button>
      )}

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && !authUser && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-b from-[#001f54] to-[#0a1128] border-b border-cyan-500/20 shadow-xl md:hidden z-50">
          <ul className="flex flex-col p-4 space-y-3 text-gray-300">
            <li className="hover:text-cyan-400 transition-colors cursor-pointer py-2">Home</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer py-2">About</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer py-2">Pricing</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer py-2">Services</li>
          </ul>
          <div className="flex flex-col gap-3 p-4 border-t border-cyan-500/20">
            <Link
              to="/login"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;