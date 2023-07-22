"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useRoutes from "@/hooks/useRoutes";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavbarLinks = () => {
  const routes = useRoutes();
  const router = useRouter();
  return (
    <>
      {routes.map((route, i) => (
        <motion.li
          key={route.label}
          animate={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: i * 0.3 }}
        >
          <Link
            href={route.href}
            className={cn(
              "p-2 border-b-4 rounded-md border-b-transparent cursor-pointer hover:border-b-indigo-800 hover:text-indigo-800 font-semibold transition"
            )}
          >
            {route.label}
          </Link>
        </motion.li>
      ))}
    </>
  );
};

export default NavbarLinks;
