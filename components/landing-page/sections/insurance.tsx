"use client";

import Image from "next/image";
import tawoniya from "@/assets/tawoniya.webp";
import medgulf from "@/assets/midgulf.png";
import axa from "@/assets/axa.webp";
import buba from "@/assets/buba.webp";
import Title from "../title";

const Insurance = () => {
  return (
    <div className="py-24 px-6 space-y-12" id="insurance">
      <Title
        name="شركائنا في التأمين"
        className="text-center font-bold text-2xl text-indigo-950"
      />

      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        <Image
          width={150}
          height={150}
          src={tawoniya}
          alt="img"
          className="max-w-[150px] rounded-lg shadow-md"
        />
        <Image
          alt="img"
          width={150}
          height={150}
          className="max-w-[150px] rounded-lg shadow-md"
          src={medgulf}
        />
        <Image
          alt="img"
          width={150}
          height={150}
          className="max-w-[150px] rounded-lg shadow-md"
          src={axa}
        />
        <Image
          alt="img"
          width={150}
          height={150}
          className="max-w-[150px] rounded-lg shadow-md"
          src={buba}
        />
      </div>
    </div>
  );
};

export default Insurance;
