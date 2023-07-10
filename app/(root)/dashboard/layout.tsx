import React from "react";
import DashboardNav from "@/components/dashboard/dashboard-nav";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white min-h-full">
      <DashboardNav />
      <div className="w-full p-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
