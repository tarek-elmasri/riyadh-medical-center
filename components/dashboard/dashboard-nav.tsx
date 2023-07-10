"use client";

import { useSession } from "next-auth/react";
import DashboardNavLinks from "./dashboard-nav-links";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Drawer from "@/components/ui/drawer";
import UserButton from "@/components/UserButton";

const DashboardNav = () => {
  const { data: session } = useSession();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  let userLetter: string;
  if (session?.user?.name) userLetter = session.user.name[0].toUpperCase();

  return (
    <>
      <Drawer isOpen={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
        <ul className="flex flex-col pt-6 h-full gap-8">
          <DashboardNavLinks />
        </ul>
      </Drawer>
      <nav className="h-[5rem] bg-white border-b border-neutral-300 shadow-sm flex justify-between items-center px-2 md:px-16">
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            className="flex items-center md:hidden"
            onClick={() => setDrawerIsOpen(true)}
          >
            <span className="sr-only">Open Menu</span>
            <MenuIcon size={18} className="" />
          </Button>
          <p className="font-bold text-md mt-1">RMC</p>
        </div>

        {/* ROutes */}
        <div className="hidden md:block">
          <ul className="flex gap-12 items-center">
            <DashboardNavLinks />
          </ul>
        </div>

        {/* user controle */}
        <UserButton userFirstLeter={userLetter!} />
      </nav>
    </>
  );
};

export default DashboardNav;
