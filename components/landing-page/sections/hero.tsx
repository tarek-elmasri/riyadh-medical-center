"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import Link from "next/link";

const Hero = () => {
  return (
    <header className="relative" id="main">
      <div className="relative w-full max-h-[35rem] flex overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dhcedk2iy/image/upload/v1689197111/RMC/wfej0mzeimnwkeznlpd8.jpg"
          alt="img"
          width={1000}
          height={1000}
          className="w-full object-cover"
        />

        {/* larg screen inside content */}
        <div className="hidden z-10 xl:flex flex-col items-start justify-center gap-6 p-20 absolute top-[-10rem] bottom-[-10rem] left-[-20rem] w-[70%] bg-amber-500 rounded-full overflow-hidden">
          <motion.h1
            whileInView={{ opacity: [0, 1], y: [100, 0] }}
            transition={{ duration: 0.5 }}
            className="font-bold text-4xl text-indigo-950"
          >
            مركز الرياض الطبي
          </motion.h1>
          <motion.p
            whileInView={{ opacity: [0, 1], y: [100, 0] }}
            transition={{ duration: 0.5 }}
            className="max-w-sm font-semibold text-indigo-950"
          >
            مستوصف الرياض الطبي هو عيادة متعددة التخصصات تقدم الرعاية الأكثر
            شمولا في الرياض, مدعوما بأحدث التقنيات و الموظفين الطبيين ذوي الخبرة
            . مع فريق متنوع دائما على استعداد لمواجهة التحديات و تقديم افضل
            رعاية طبية لمرضانا
          </motion.p>
          <Link
            href="#"
            className="p-3 rounded-lg bg-indigo-800 hover:bg-indigo-700/95 flex items-center text-neutral-200 hover:text-white transition font-semibold shadow-md shadow-indigo-700 "
          >
            احجز موعد
          </Link>
        </div>
      </div>

      <div className="xl:hidden overflow-hidden h-[380px] relative top-[-80px] md:top-[-180px] ">
        <div className=" w-[200vw] h-[100vw] rounded-tr-[110vw] rounded-tl-[110vw] bg-amber-500 relative left-[50%] flex flex-col items-center justify-start gap-6 p-16">
          <motion.h1
            whileInView={{ opacity: [0, 1], y: [100, 0] }}
            transition={{ duration: 0.5 }}
            className="font-bold text-4xl text-indigo-950"
          >
            مركز الرياض الطبي
          </motion.h1>
          <motion.p
            whileInView={{ opacity: [0, 1], y: [100, 0] }}
            transition={{ duration: 0.5 }}
            className="max-w-sm font-semibold text-indigo-950 text-center"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia,
            labore sapiente aliquam quisquam vitae aperiam laudantium esse illo
            tenetur saepe, incidunt velit. Labore unde quaerat voluptatum id
            maiores, fuga veniam?
          </motion.p>
          <Link
            href="#"
            className="p-3 rounded-lg bg-indigo-800 hover:bg-indigo-700/95 flex items-center text-neutral-200 hover:text-white transition font-semibold shadow-md shadow-indigo-700 "
          >
            احجز موعد
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Hero;
