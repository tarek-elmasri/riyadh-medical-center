"use client";

import { motion } from "framer-motion";
import Container from "@/components/landing-page/container";
import motionWrapper from "@/components/landing-page/motion-wrapper";
import Title from "@/components/landing-page/title";
import { Activity, Pill, Stethoscope } from "lucide-react";

const Services = () => {
  return (
    <div className="bg-slate-700">
      <Container id="services">
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
            >
              <div className="flex flex-col justify-center items-center bg-slate-800 rounded-md w-64 p-6 gap-8 hover:bg-sky-800 shadow-sky-400 trnasition cursor-default hover:scale-105 transition duration-500 group">
                <div className="w-16 aspect-square rounded-full bg-slate-800 grid place-items-center shadow-[0_0px_12px_0px_#38bdf8] shadow-sky-400">
                  <Activity
                    size={30}
                    color="#fff"
                    className="group-hover:text-neutral-200"
                  />
                </div>
                <p className="text-right text-sm font-medium leading-6 text-neutral-300 group-hover:text-neutral-200 transition duration-500">
                  قسم المختبرات مزود بمجموعة من الفنيين و الفنيات ذوي الخبرة و
                  الكفاءة المتميزة
                </p>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: [0, 1], y: [100, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex flex-col  justify-center items-center bg-slate-800 rounded-md w-64 p-6 gap-8 hover:bg-sky-800 trnasition cursor-default hover:scale-105 transition duration-500 group">
                <div className="w-16 aspect-square rounded-full bg-slate-800 grid place-items-center shadow-[0_0px_12px_0px_#38bdf8] shadow-sky-400">
                  <Pill
                    size={30}
                    color="#fff"
                    className="group-hover:text-neutral-200"
                  />
                </div>
                <p className="text-right text-sm font-medium leading-6 text-neutral-300 group-hover:text-neutral-200 transition duration-500">
                  صيدلية زهرة سامي مجهزة تجهيزاً كاملاً ومزودة بكل ما يلزم من
                  الادوية والمستلزمات التجميلية والصيدلية
                </p>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: [0, 1], y: [100, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex  flex-col justify-center items-center bg-slate-800 rounded-md w-64 p-6 gap-8 hover:bg-sky-800 trnasition cursor-default hover:scale-105 transition duration-500 group">
                <div className="w-16 aspect-square rounded-full bg-slate-800 grid place-items-center shadow-[0_0px_12px_0px_#38bdf8] shadow-sky-400">
                  <Stethoscope
                    size={30}
                    color="#fff"
                    className="group-hover:text-neutral-200"
                  />
                </div>
                <p className="text-right text-sm font-medium leading-6 text-neutral-300 group-hover:text-neutral-200 transition duration-500">
                  خدمات صحية على مدار الساعة بأعلى جودة يقدمها فريقنا من الأطباء
                  المؤهلين
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
