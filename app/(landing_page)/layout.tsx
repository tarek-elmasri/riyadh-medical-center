import Navbar from "@/components/landing-page/Navbar";
import { ReactNode } from "react";

const AppointmentSLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-slate-800 h-auto min-h-screen w-full">
      <Navbar />

      {children}
    </div>
  );
};

export default AppointmentSLayout;
