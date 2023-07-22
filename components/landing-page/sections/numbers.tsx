"use client";
import { motion } from "framer-motion";
import motionWrapper from "../motion-wrapper";

const Numbers = () => {
  return (
    <div className="grid md:grid-cols-2 text-center">
      <div className="bg-indigo-700 p-24 flex flex-col gap-6 justify-center overflow-hidden">
        <motion.h3
          whileInView={{ opacity: [0, 1], y: [100, 0] }}
          transition={{ duration: 0.5 }}
          className="text-3xl text-neutral-100"
        >
          200000+
        </motion.h3>
        <motion.p
          whileInView={{ opacity: [0, 1], y: [100, 0] }}
          transition={{ duration: 0.5 }}
          className="text-neutral-100"
        >
          مريض يتلقى الرعاية الطبية
        </motion.p>
      </div>

      <div className="bg-indigo-950 p-24 flex flex-col gap-6 justify-center overflow-hidden">
        <motion.h3
          whileInView={{ opacity: [0, 1], y: [100, 0] }}
          transition={{ duration: 0.5 }}
          className="text-3xl text-neutral-100"
        >
          30+
        </motion.h3>
        <motion.p
          whileInView={{ opacity: [0, 1], y: [100, 0] }}
          transition={{ duration: 0.5 }}
          className="text-neutral-100"
        >
          طبيب بمختلف التخصصات
        </motion.p>
      </div>
    </div>
  );
};

export default Numbers;
