import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 
  return date without time
*/

export const standardDate = (date: Date) => new Date(date.setHours(0, 0, 0, 0));
