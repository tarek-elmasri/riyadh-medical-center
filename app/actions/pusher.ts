"use server";
// pusher server triggers

import pusher from "@/lib/pusher";

let startList: PusherDoctor[] = [];

export const triggerIncrement = (id: string) => {
  const target = startList.find((doctor) => doctor.id === id);
  if (target) {
    target.counter++;
    pusher.trigger("counters", "increment", id);
  }
};

export const triggerDecrement = (id: string) => {
  const target = startList.find((doctor) => doctor.id === id);
  if (target && target.counter > 0) {
    target.counter--;
    pusher.trigger("counters", "decrement", id);
  }
};

export const triggerRemove = (id: string) => {
  startList = startList.filter((doctor) => doctor.id !== id);
  pusher.trigger("counters", "remove", id);
};

export interface PusherDoctor {
  name: string;
  id: string;
  counter: number;
}
export const triggerAdd = (doctor: Omit<PusherDoctor, "counter">) => {
  startList.push({ ...doctor, counter: 0 });
  pusher.trigger("counters", "add", doctor);
};

export const getCurrentList = async () => startList;
