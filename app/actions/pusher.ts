"use server";
// pusher server triggers

import pusher from "@/lib/pusher";

let startList: PusherDoctor[] = [];

export const triggerIncrement = async (id: string) => {
  const target = startList.find((doctor) => doctor.id === id);
  if (target) {
    target.counter++;
    await pusher.trigger("counters", "increment", id);
  }
};

export const triggerDecrement = async (id: string) => {
  const target = startList.find((doctor) => doctor.id === id);
  if (target && target.counter > 0) {
    target.counter--;
    await pusher.trigger("counters", "decrement", id);
  }
};

export const triggerRemove = async (id: string) => {
  startList = startList.filter((doctor) => doctor.id !== id);
  await pusher.trigger("counters", "remove", id);
};

export interface PusherDoctor {
  name: string;
  id: string;
  counter: number;
}
export const triggerAdd = async (doctor: Omit<PusherDoctor, "counter">) => {
  startList.push({ ...doctor, counter: 0 });
  await pusher.trigger("counters", "add", doctor);
};

export const getCurrentList = async () => startList;
