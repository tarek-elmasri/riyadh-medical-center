"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

const SuccessMark = () => {
  return (
    <motion.div
      animate={{ scale: [0.2, 1], opacity: [0, 1] }}
      transition={{ duration: 1.5 }}
    >
      <div
        className="w-20 
        aspect-square 
        rounded-full 
        border-2 
        border-green-600
        shadow-[0_0_50px_2px_rgba(0,0,0,0.3)] 
        shadow-green-400
        grid
        place-items-center
    "
      >
        <CheckIcon color="rgb(22 163 74)" />
      </div>
    </motion.div>
  );
};

export default SuccessMark;
