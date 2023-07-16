"use client";

import { motion } from "framer-motion";
import Container from "@/components/landing-page/container";
import motionWrapper from "@/components/landing-page/motion-wrapper";
import Title from "@/components/landing-page/title";
import { Activity, Pill, Stethoscope } from "lucide-react";

const Services = () => {
  return (
    <div className="bg-slate-800" id="services">
      <Container>
        <Title name="خدماتنا" classNames="text-sky-400" />

        <div className="my-20">
          <motion.div
            whileInView={{ opacity: [0, 1], y: [100, 0] }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center w-full flex-wrap gap-12 overflow-y-hidden"
          >
            {/* service */}
            <motion.div
              whileInView={{ opacity: [0, 1], y: [100, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6"
            >
              <div className="flex flex-col justify-center items-center bg-slate-700 rounded-md w-64 p-6 gap-6 hover:bg-sky-800 shadow-sky-400 trnasition cursor-default hover:scale-105 transition duration-500 group">
                <Activity
                  size={40}
                  color="#fff"
                  className="group-hover:text-neutral-200"
                />
                <p className="text-right text-sm font-medium leading-6 text-neutral-400 group-hover:text-neutral-200 transition duration-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda blanditiis doloribus aliquid sint eligendi, laborum
                  sequi, dicta molestias explicabo ducimus deleniti, voluptate
                  nihil dolorem tempora. Blanditiis laborum animi impedit
                  expedita.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: [0, 1], y: [100, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6"
            >
              <div className="flex flex-col justify-center items-center bg-slate-700 rounded-md w-64 p-6 gap-6 hover:bg-sky-800 trnasition cursor-default hover:scale-105 transition duration-500 group">
                <Pill
                  size={40}
                  color="#fff"
                  className="group-hover:text-neutral-200"
                />
                <p className="text-right text-sm font-medium leading-6 text-neutral-400 group-hover:text-neutral-200 transition duration-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda blanditiis doloribus aliquid sint eligendi, laborum
                  sequi, dicta molestias explicabo ducimus deleniti, voluptate
                  nihil dolorem tempora. Blanditiis laborum animi impedit
                  expedita.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: [0, 1], y: [100, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6"
            >
              <div className="flex flex-col justify-center items-center bg-slate-700 rounded-md w-64 p-6 gap-6 hover:bg-sky-800 trnasition cursor-default hover:scale-105 transition duration-500 group">
                <Stethoscope
                  size={40}
                  color="#fff"
                  className="group-hover:text-neutral-200"
                />
                <p className="text-right text-sm font-medium leading-6 text-neutral-400 group-hover:text-neutral-200 transition duration-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda blanditiis doloribus aliquid sint eligendi, laborum
                  sequi, dicta molestias explicabo ducimus deleniti, voluptate
                  nihil dolorem tempora. Blanditiis laborum animi impedit
                  expedita.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default motionWrapper(Services);
