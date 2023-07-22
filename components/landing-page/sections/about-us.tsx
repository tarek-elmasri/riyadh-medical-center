"use client";
import { motion } from "framer-motion";
import Container from "@/components/landing-page/container";
import logo from "@/assets/logo.png";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="xl:mt-24" id="aboutus">
      <Container>
        <div className="grid md:grid-cols-2 gap-6 place-items-center px-6 pb-32">
          <Image src={logo} alt="logo" className="md:order-2" />

          <div className="flex flex-col gap-6 items-center md:items-start overflow-hidden">
            <motion.h2
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 0.5 }}
              className="font-bold text-3xl text-indigo-950 hidden md:block"
            >
              عن مستوصف الرياض الطبي
            </motion.h2>
            <motion.p
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 0.5 }}
              className="text-indigo-900"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure ex
              nobis exercitationem pariatur tempore, porro nesciunt libero hic
              dolorem illum recusandae repudiandae deleniti, a voluptate
              excepturi, consectetur voluptates qui ducimus.
            </motion.p>

            <motion.p
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 0.5 }}
              className="text-indigo-900"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure ex
              nobis exercitationem pariatur tempore, porro nesciunt libero hic
              dolorem illum recusandae repudiandae deleniti, a voluptate
              excepturi, consectetur voluptates qui ducimus.
            </motion.p>

            <motion.p
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 0.5 }}
              className="text-indigo-900"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure ex
              nobis exercitationem pariatur tempore, porro nesciunt libero hic
              dolorem illum recusandae repudiandae deleniti, a voluptate
              excepturi, consectetur voluptates qui ducimus.
            </motion.p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
