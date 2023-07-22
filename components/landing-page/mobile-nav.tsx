"use client";

import Drawer from "@/components/ui/drawer";
import useRoutes from "@/hooks/useRoutes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const routes = useRoutes();
  return (
    <>
      <Menu
        className="ml-6 w-6 h-6  cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <Drawer
        className="bg-white text-indigo-950 border-l-neutral-300"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <ul className="mt-12 text-center flex flex-col gap-12">
          {routes.map((route, i) => (
            <motion.li
              key={route.href}
              whileInView={{ y: [100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.1, delay: i * 0.1 }}
            >
              <Link
                className={cn(
                  "p-1 text-lg text-indigo-800 border-b-4 border-white rounded-lg hover:border-indigo-800 focus:border-indigo-800",
                  route.active && "font-bold text-indigo-950 border-indigo-950"
                )}
                href={route.href}
              >
                {route.label}
              </Link>
            </motion.li>
          ))}

          {/* CTA */}
          <motion.li
            whileInView={{ y: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.1, delay: routes.length * 0.1 }}
          >
            <Link
              href="/appointments"
              className="mr-3 p-3 rounded-lg bg-indigo-800 hover:bg-indigo-700/95 flex items-center text-neutral-200 hover:text-white transition font-semibold shadow-md shadow-neutral-200 "
            >
              احجز موعد
            </Link>
          </motion.li>
        </ul>
      </Drawer>
    </>
  );
};

export default MobileNav;
