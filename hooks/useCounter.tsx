"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import {
  triggerIncrement,
  triggerDecrement,
  triggerRemove,
  PusherDoctor,
} from "@/app/actions/pusher";

interface UseCounterProps {
  doctor: PusherDoctor;
}
const useCounter = ({ doctor }: UseCounterProps) => {
  const [counter, setCounter] = useState(doctor.counter);

  useEffect(() => {
    pusherClient.subscribe("counters");

    const increment = (id: string) => {
      if (doctor.id == id) {
        setCounter((prev) => prev + 1);
      }
    };

    const decrement = (id: string) => {
      if (doctor.id == id) setCounter((prev) => prev - 1);
    };

    pusherClient.bind(`increment`, increment);
    pusherClient.bind(`decrement`, decrement);

    return () => {
      pusherClient.unsubscribe("counters");
      pusherClient.unbind(`increment`, increment);
      pusherClient.unbind(`decrement`, decrement);
    };
  }, [doctor.id, setCounter]);

  return {
    counter,
    triggerIncrement,
    triggerDecrement,
    triggerRemove,
  };
};

export default useCounter;
