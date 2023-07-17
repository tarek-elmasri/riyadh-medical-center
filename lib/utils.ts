import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 
  return date without time
*/

export const standardDate = (date: Date) => {
  const toUTC = new Date(date.toUTCString());
  const toKSA = addKsaTimeZone(toUTC);
  return new Date(toKSA.setHours(0, 0, 0, 0));
};

export const addKsaTimeZone = (date: Date) =>
  new Date(date.getTime() + 3 * 60 * 60 * 1000); // difference 3 hours in KSA
