"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useRoutes from "@/hooks/useRoutes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CTA from "@/components/landing-page/CTA";

const NavbarLinks = () => {
  const routes = useRoutes();
  const router = useRouter();
  return (
    <div className="flex w-full overflow-hidden justify-start items-center px-6">
      <div className="hidden md:ml-auto md:flex justify-end md:justify-start gap-12 items-centers">
        {routes.map((route, i) => (
          <motion.li
            key={route.label}
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: i * 0.3 }}
          >
            <Link
              href={route.href}
              className={cn(
                "font-bold text-xl hover:text-sky-400 focus-within:outline-sky-400 outline-offset-8",
                route.active ? "text-sky-400 " : "text-sky-100 "
              )}
            >
              {route.label}
            </Link>
          </motion.li>
        ))}
      </div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.3, delay: routes.length * 0.3 }}
      >
        <CTA
          className="bg-red-800 text-neutral-100 font-bold text-sm md:text-lg md:p-6 hover:bg-red-700"
          onClick={() => router.push("/appointments")}
        >
          احجز موعدك
        </CTA>
      </motion.div>
    </div>
  );
};

export default NavbarLinks;
