"use client";

import Drawer from "@/components/ui/drawer";
import useRoutes from "@/hooks/useRoutes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CTA from "@/components/landing-page/CTA";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const routes = useRoutes();
  const router = useRouter();
  return (
    <>
      <Menu
        className="w-6 h-6 text-white ml-6 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <Drawer
        className="bg-slate-800 text-white border-l-sky-400"
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
              <Link
                className={cn(
                  "text-lg focus-within:outline-offset-8 focus-within:outline-sky-400",
                  route.active ? "text-sky-400" : "text-neutral-100"
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
            transition={{ duration: 0.3, delay: routes.length * 0.3 }}
          >
            <CTA onClick={() => router.push("/appointments")}>احجز موعدك</CTA>
          </motion.li>
        </ul>
      </Drawer>
    </>
  );
};

export default MobileNav;
