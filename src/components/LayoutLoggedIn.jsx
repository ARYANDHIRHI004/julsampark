import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import LoginNavbar from "./LoginNavbar";
const LayoutLoggedIn = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <LoginNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutLoggedIn;
