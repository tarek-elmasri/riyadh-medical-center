"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { PusherDoctor } from "@/app/actions/pusher";
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

    const remove = (id: string) => {
      setDoctors((prev) => prev.filter((doctor) => doctor.id != id));
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
        <DoctorCounter key={doctor.id} doctor={doctor} />
      ))}
    </>
  );
};

export default CounterClient;
