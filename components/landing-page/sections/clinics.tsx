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
  <div className="p-6 w-72 h-96 bg-white shadow-md  rounded-lg flex flex-col justify-center items-center gap-6 hover:scale-105 transition duration-500 hover:bg-indigo-700 group">
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
            title="عيادة النساء"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati quas, cumque eum amet praesentium ratione error esse qui
              aliquid cum eligendi, odit maiores facilis id numquam, quae
              debitis neque officia?"
          />

          <ClinicCard
            icon={FaStethoscope}
            title="عيادة الباطنية "
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati quas, cumque eum amet praesentium ratione error esse qui
              aliquid cum eligendi, odit maiores facilis id numquam, quae
              debitis neque officia?"
          />

          <ClinicCard
            icon={FaTooth}
            title="عيادة الأسنان"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati quas, cumque eum amet praesentium ratione error esse qui
              aliquid cum eligendi, odit maiores facilis id numquam, quae
              debitis neque officia?"
          />

          <ClinicCard
            icon={FaBaby}
            title="عيادة الأطفال"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati quas, cumque eum amet praesentium ratione error esse qui
              aliquid cum eligendi, odit maiores facilis id numquam, quae
              debitis neque officia?"
          />

          <ClinicCard
            icon={BsFillEarFill}
            title="عيادة الأنف و الأذن و الحنجرة"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati quas, cumque eum amet praesentium ratione error esse qui
              aliquid cum eligendi, odit maiores facilis id numquam, quae
              debitis neque officia?"
          />

          <ClinicCard
            icon={FaEye}
            title="عيادة العيون"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Obcaecati quas, cumque eum amet praesentium ratione error esse qui
              aliquid cum eligendi, odit maiores facilis id numquam, quae
              debitis neque officia?"
          />
        </div>
      </Container>
      ;
    </div>
  );
};

export default Clinics;
