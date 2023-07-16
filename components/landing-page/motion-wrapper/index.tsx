"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const MotionWrapper = (Children: () => JSX.Element, classNames?: string) => {
  const Component = () => {
    return (
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        className={cn("", classNames)}
      >
        <Children />
      </motion.div>
    );
  };

  Component.displayName = "MotionWrapper";
  return Component;
};

export default MotionWrapper;
