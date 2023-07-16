"use client";
import { motion } from "framer-motion";
import Container from "@/components/landing-page/container";
import motionWrapper from "@/components/landing-page/motion-wrapper";
import Title from "@/components/landing-page/title";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="bg-slate-700" id="aboutUs">
      <Container>
        <Title name="من نحن" classNames="text-sky-400" />

        <div className="my-10 md:my-20">
          <div className="flex flex-col md:flex-row md:justify-around gap-6 md:gap-10 overflow-x-hidden">
            <motion.p
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 0.5 }}
              className="text-neutral-300 font-medium text-md w-full"
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat, vitae modi et mollitia, dolores officiis officia
              pariatur quidem optio molestiae tenetur error quod iure sed
              perferendis debitis inventore similique?
            </motion.p>

            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Image
                src={
                  "https://res.cloudinary.com/dhcedk2iy/image/upload/v1689081199/RMC/dwsabuau5zzpgfvivcqi.jpg"
                }
                alt="RMC"
                width={200}
                height={200}
                className="w-full"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default motionWrapper(AboutUs);
