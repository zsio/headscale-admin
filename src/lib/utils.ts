import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function copy(text: string) {
  await navigator.clipboard.writeText(text)
}


function extractKey(str: string) {
  if (typeof str !== 'string') {
      return null;
  }

  if (/^[a-f0-9]{64}$/.test(str)) {
      return str;
  }

  var match = str.match(/nodekey:([a-f0-9]{64})$/);
  return match ? match[1] : null;
}
