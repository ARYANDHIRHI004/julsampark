import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import LoginNavbar from "./LoginNavbar";
const LayoutLoggedIn = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <LoginNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutLoggedIn;
