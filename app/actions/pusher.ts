"use server";
// pusher server triggers

import pusher from "@/lib/pusher";
import prismadb from "@/lib/prismadb";
import { PusherDoctor } from "@prisma/client";
// let startList: PusherDoctor[] = [];

export const triggerIncrement = async (id: string) => {
  await prismadb.pusherDoctor.update({
    where: { id },
    data: { counter: { increment: 1 } },
  });
  await pusher.trigger("counters", "increment", id);

  // const target = startList.find((doctor) => doctor.id === id);
  // if (target) {
  //   target.counter++;
  //   await pusher.trigger("counters", "increment", id);
  // }
};

export const triggerDecrement = async (id: string) => {
  await prismadb.pusherDoctor.update({
    where: { id },
    data: { counter: { decrement: 1 } },
  });
  await pusher.trigger("counters", "decrement", id);

  // const target = startList.find((doctor) => doctor.id === id);
  // if (target && target.counter > 0) {
  //   target.counter--;
  //   await pusher.trigger("counters", "decrement", id);
  // }
};

export const triggerRemove = async (id: string) => {
  const doctor = await prismadb.pusherDoctor.delete({ where: { id } });
  await pusher.trigger("counters", "remove", doctor);

  // startList = startList.filter((doctor) => doctor.id !== id);
  // await pusher.trigger("counters", "remove", id);
};

// export interface PusherDoctor {
//   name: string;
//   id: string;
//   counter: number;
// }
export const triggerAdd = async (data: Omit<PusherDoctor, "id">) => {
  const doctor = await prismadb.pusherDoctor.create({ data });
  await pusher.trigger("counters", "add", doctor);

  // startList.push({ ...doctor, counter: 0 });
  // await pusher.trigger("counters", "add", doctor);
};

export const getPusherList = async () => prismadb.pusherDoctor.findMany();
