import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 
  return date without time
*/

// export const standardDate = (date: Date) => new Date(date.setHours(0, 0, 0, 0));
export const standardDate = (date: Date) =>
  new Date(new Date(date).setUTCHours(0, 0, 0, 0));

// time in client
export const todayInKSA = () => standardDate(new Date());

// time on server is in UTC so adding ksa offset 3 hours for validations of dates on server
export const serverTodayInKSA = () => {
  const local = new Date();
  const offsetKSA = 3 * 60 * 60 * 1000;
  return new Date(local.getTime() + offsetKSA);
};
