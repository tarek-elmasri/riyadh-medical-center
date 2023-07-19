"use client";

import React, { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Doctor, PusherDoctor } from "@prisma/client";
import { triggerAdd } from "@/app/actions/pusher";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CounterLisetProps {
  initialList: Doctor[];
}

const CounterList: React.FC<CounterLisetProps> = ({ initialList }) => {
  const [currentList, setCurrentList] = useState(initialList);
  const [selection, setSelection] = useState("");

  useEffect(() => {
    pusherClient.subscribe("counters");

    const add = (pusherDoctor: PusherDoctor) => {
      // remove pusherDoctor from list after adding it to dashboard
      setCurrentList((prev) =>
        prev.filter((listDoctor) => listDoctor.id !== pusherDoctor.doctorId)
      );
    };

    const remove = (pusherItem: PusherDoctor) => {
      // add the doctor again in list on remove event from dashboard
      const targetDoctor = initialList.find(
        (doctor) => doctor.id === pusherItem.doctorId
      );
      if (targetDoctor) setCurrentList((prev) => [...prev, targetDoctor]);
    };

    pusherClient.bind("add", add);
    pusherClient.bind("remove", remove);

    return () => {
      pusherClient.unsubscribe("counters");
      pusherClient.unbind("add", add);
      pusherClient.unbind("remove", remove);
    };
  }, [initialList, setCurrentList]);

  return (
    <div className="flex flex-col justify-start items-start gap-3">
      <p className="text-sm">اضف طبيب</p>
      <div className="flex justify-start items-center gap-3">
        <Select
          onValueChange={(value) => setSelection(value)}
          value={selection}
        >
          <SelectTrigger className="w-[180px] flex-row-reverse">
            <SelectValue placeholder="اضف طبيب" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {currentList.map((doctor) => (
                <SelectItem
                  key={doctor.id}
                  value={doctor.id}
                  className="flex-row-reverse"
                >
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          disabled={selection.length === 0}
          onClick={() => {
            const doctor = currentList.find(
              (doctor) => doctor.id === selection
            );
            if (doctor) {
              triggerAdd({
                doctorId: doctor.id,
                name: doctor.name,
                counter: 0,
              });
            }
          }}
        >
          اضافة
        </Button>
      </div>
    </div>
  );
};

export default CounterList;
