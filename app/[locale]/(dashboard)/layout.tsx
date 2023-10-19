import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full overflow-y-hidden">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[20] bg-zinc-50 drop-shadow-lg dark:bg-zinc-950 dark:text-white">
        <DashboardSidebar />
      </div>
      <div className="md:pl-72 h-full bg-slate-50 dark:bg-zinc-900">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
