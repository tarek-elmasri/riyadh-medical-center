"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import {
  triggerIncrement,
  triggerDecrement,
  triggerRemove,
} from "@/app/actions/pusher";
import { PusherDoctor } from "@prisma/client";

interface UseCounterProps {
  pusherDoctor: PusherDoctor;
}
const useCounter = ({ pusherDoctor }: UseCounterProps) => {
  const [counter, setCounter] = useState(pusherDoctor.counter);

  useEffect(() => {
    pusherClient.subscribe("counters");

    const increment = (id: string) => {
      if (pusherDoctor.id === id) {
        setCounter((prev) => prev + 1);
      }
    };

    const decrement = (id: string) => {
      if (pusherDoctor.id === id) setCounter((prev) => prev - 1);
    };

    pusherClient.bind(`increment`, increment);
    pusherClient.bind(`decrement`, decrement);

    return () => {
      pusherClient.unsubscribe("counters");
      pusherClient.unbind(`increment`, increment);
      pusherClient.unbind(`decrement`, decrement);
    };
  }, [pusherDoctor.id, setCounter]);

  return {
    counter,
    triggerIncrement,
    triggerDecrement,
    triggerRemove,
  };
};

export default useCounter;
