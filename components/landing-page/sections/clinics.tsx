"use client";
import Container from "@/components/landing-page/container";
import { BsFillEarFill } from "react-icons/bs";
import {
  FaFemale,
  FaTooth,
  FaBaby,
  FaEye,
  FaStethoscope,
} from "react-icons/fa";

import { IconType } from "react-icons";
import React from "react";
import Title from "../title";

interface ClinicCardProps {
  icon: IconType;
  title: string;
  description: string;
}
const ClinicCard: React.FC<ClinicCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="px-6 py-12 w-72 h-[25rem] bg-white shadow-md  rounded-lg flex flex-col justify-start items-center gap-12 hover:scale-105 transition duration-500 hover:bg-indigo-700 group">
    <div className="svg-icon group-hover:text-white transition duration-500">
      <Icon />
    </div>
    <h4 className="text-center text-2xl text-indigo-950 font-bold group-hover:text-white transition duration-500">
      {title}
    </h4>
    <p className="text-indigo-900 group-hover:text-neutral-200 transition duration-500">
      {description}
    </p>
  </div>
);

const Clinics = () => {
  return (
    <div className="py-24" id="clinics">
      <Container>
        <Title
          name="تخصصاتنا"
          className="text-3xl text-indigo-950 font-bold text-center"
        />

        <div className="mt-12 flex flex-col md:flex-row flex-wrap justify-center items-center w-full gap-6 ">
          {/* Clinics */}
          <ClinicCard
            icon={FaFemale}
            title="أمراض النساء"
            description="استفد من أفضل النتائج في جميع حالات أمراض النساء بأقصى قدر من الرعابة المتميزة."
          />

          <ClinicCard
            icon={FaStethoscope}
            title="الطب الباطني "
            description="احصل على التحليل الأكثر شمولا لتطمئن على حالتك الحية من قبل طبيب متمرس."
          />

          <ClinicCard
            icon={FaTooth}
            title="طب الأسنان"
            description="نحن نقدم خدمات رعاية أسنان كاملة من تنظيف الأسنان الروتيني إلى تقويم الأسنان المتقدم.
            "
          />

          <ClinicCard
            icon={FaBaby}
            title="طب الأطفال"
            description="احصل على الرعاية الأكثر خبرة و نصائح الخبراء لطفلك و تأكد من صحة نموه."
          />

          <ClinicCard
            icon={BsFillEarFill}
            title="الأنف و الأذن و الحنجرة"
            description="يهدف قسم الأنف و الأذن و الحنجرة إلى تقديم رعاية طبية عالية الجودة و تقديم العلاج المناسب للمرضى."
          />

          <ClinicCard
            icon={FaEye}
            title="طب العيون"
            description="احصل على تشخيصات و رعاية متخصصة لمجموعة واسعة من حالات العين البسيطة و المعقدة. تجعلنا تقنيتنا المتقدمة و أطباؤنا من ذوي الخبرة العيادة الأكثر تفصيلا في المنطقة."
          />
        </div>
      </Container>
      ;
    </div>
  );
};

export default Clinics;
