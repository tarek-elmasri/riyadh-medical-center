"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Title = ({ name, classNames }: { name: string; classNames?: string }) => {
  return (
    <motion.div
      whileInView={{ opacity: [0, 1], y: [100, 0] }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <h3 className={cn("font-bold text-2xl md:text-3xl", classNames)}>
          {name}
        </h3>
        <div className="h-[2px] bg-sky-400 w-16" />
      </div>
    </motion.div>
  );
};

export default Title;
