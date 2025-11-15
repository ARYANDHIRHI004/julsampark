import { Loader2Icon, LogOutIcon } from "lucide-react";
import React from "react";
import useAuthStore from "../stores/useAuthStore";

const LogoutBtn = ({ open }) => {
  const { isLoggingOut, logOutUser } = useAuthStore();
  
  return (
    <button
      onClick={logOutUser}
      className={`flex items-center ${open ? 'gap-3 px-4' : 'justify-center'} py-3 w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-red-500/50 disabled:opacity-50`}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? (
        <Loader2Icon className="animate-spin" size={20} />
      ) : (
        <>
          <LogOutIcon size={20} className="flex-shrink-0" />
          {open && <span className="text-sm font-medium">Logout</span>}
        </>
      )}
    </button>
  );
};

export default LogoutBtn;