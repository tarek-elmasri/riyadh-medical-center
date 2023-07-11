"use client";

import Drawer from "@/components/ui/drawer";
import useRoutes from "@/hooks/useRoutes";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const routes = useRoutes();

  return (
    <>
      <Menu className="w-6 h-6 text-white ml-6" onClick={() => setOpen(true)} />
      <Drawer
        className="bg-slate-800 text-white"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <ul className="mt-12 text-center flex flex-col gap-12">
          {routes.map((route, i) => (
            <motion.li
              key={route.href}
              whileInView={{ y: [100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.3, delay: i * 0.3 }}
            >
              <Link href={route.href}>{route.label}</Link>
            </motion.li>
          ))}
        </ul>
      </Drawer>
    </>
  );
};

export default MobileNav;
