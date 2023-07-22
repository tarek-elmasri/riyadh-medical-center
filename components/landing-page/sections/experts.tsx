"use client";
import Container from "@/components/landing-page/container";
import doctor from "@/assets/doctor.png";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Title from "../title";

interface ExpertProps {
  img: StaticImageData;
  name: string;
  title: string;
}
const Expert: React.FC<ExpertProps> = ({ img, name, title }) => (
  <motion.div
    whileInView={{ opacity: [0, 1], y: [100, 0] }}
    transition={{ duration: 0.5 }}
    className="w-64 min-h-[300px] rounded-lg shadow-md group"
  >
    <div className="w-full overflow-hidden">
      <Image
        src={img}
        alt="Image"
        className="group-hover:scale-125 transition duration-500"
      />
    </div>
    <div className="p-6 text-center space-y-6">
      <h5 className="text-lg font-bold text-indigo-950">{name}</h5>
      <p className="text-indigo-800 text-sm font-semibold">{title}</p>
    </div>
  </motion.div>
);
const Experts = () => {
  return (
    <>
      <div className="py-24 rounded-tr-full bg-white shadow-[0_-4px_6px_-1px_#00000010]" />
      <div className="bg-white px-6 pb-24" id="experts">
        <Container>
          <Title
            name="تعرف على خبرائنا"
            className="text-3xl font-bold text-center text-indigo-950"
          />

          <div className="mt-12 p-6 flex flex-col md:flex-row flex-wrap gap-6 items-center justify-center overflow-hidden">
            {/* doctors cards */}

            <Expert img={doctor} name="د/ لينا شابو" title="اخصائية الباطنية" />
            <Expert
              img={doctor}
              name="د/ محمد البكر"
              title="أخصائي الأنف و الأذن و الحنجرة"
            />
            <Expert
              img={doctor}
              name="د/ زياد القيسي"
              title="أخصائي طب الأسنان"
            />
            <Expert
              img={doctor}
              name="د/ عيسى رفيق"
              title="أخصائي طب الأطفال"
            />
            <Expert img={doctor} name="د/ حلا أحمد" title="أخصائية طب العيون" />
            <Expert
              img={doctor}
              name="د/ مي محمد"
              title="أخصائية أمراض النساء"
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Experts;
