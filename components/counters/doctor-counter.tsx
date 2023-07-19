"use client";

import { PusherDoctor } from "@/app/actions/pusher";
import useCounter from "@/hooks/useCounter";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";

interface DoctorCounterProps {
  doctor: PusherDoctor;
}

const DoctorCounter: React.FC<DoctorCounterProps> = ({ doctor }) => {
  const { counter, triggerDecrement, triggerIncrement, triggerRemove } =
    useCounter({ doctor });

  return (
    <div className="w-full max-w-xs bg-slate-700 rounded-md shadow-md">
      <div className="p-6 w-full text-center">
        <h2 className="text-md md:text-2xl text-neutral-200">{doctor.name}</h2>
      </div>

      <p className="text-xl w-full  text-center text-neutral-200 p-6">
        {counter}
      </p>
      <div className="p-6 bg-white  w-full flex justify-between items-center">
        <div
          className="hover:shadow-md hover:scale-110 transition w-12 aspect-square rounded-full  cursor-pointer flex items-center justify-center"
          onClick={() => triggerIncrement(doctor.id)}
        >
          <ArrowUp color="#000" />
        </div>
        <div
          className="hover:shadow-md hover:scale-110 transition w-12 aspect-square rounded-full  cursor-pointer flex items-center justify-center"
          onClick={() => triggerRemove(doctor.id)}
        >
          <Trash color="#931515" />
        </div>
        <div
          className="hover:shadow-md hover:scale-110 transition w-12 aspect-square rounded-full  cursor-pointer flex items-center justify-center"
          onClick={() => triggerDecrement(doctor.id)}
        >
          <ArrowDown color="#000" />
        </div>
      </div>
    </div>
  );
};

export default DoctorCounter;
