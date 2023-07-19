"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { PusherDoctor } from "@prisma/client";
import DoctorCounter from "@/components/counters/doctor-counter";

interface CounterClientProps {
  initialData: PusherDoctor[];
}
const CounterClient: React.FC<CounterClientProps> = ({ initialData }) => {
  const [doctors, setDoctors] = useState(initialData);

  useEffect(() => {
    pusherClient.subscribe("counters");

    const add = (doctor: PusherDoctor) => {
      setDoctors((prev) => [...prev, doctor]);
    };

    const remove = (pusherItem: PusherDoctor) => {
      setDoctors((prev) =>
        prev.filter((pusherDoctor) => pusherDoctor.id !== pusherItem.id)
      );
    };

    pusherClient.bind("add", add);
    pusherClient.bind("remove", remove);

    return () => {
      pusherClient.unsubscribe("counters");
      pusherClient.unbind("add", add);
      pusherClient.unbind("remove", remove);
    };
  }, [doctors]);

  return (
    <>
      {doctors.map((doctor) => (
        <DoctorCounter key={doctor.id} pusherDoctor={doctor} />
      ))}
    </>
  );
};

export default CounterClient;
