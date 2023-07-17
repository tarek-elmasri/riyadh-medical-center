import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 
  return date without time
*/

export const standardDate = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

export const todayInKSA = () => {
  const local = new Date();
  const timezoneOffset = local.getTimezoneOffset();
  const utc = new Date(local.getTime() - timezoneOffset * 6000);
  const ksaOffset = 3 * 60 * 60 * 1000;
  return new Date(utc.getTime() + ksaOffset);
};
