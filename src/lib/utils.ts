import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCookie = (): string | null  => {
  const cookieExpiry = localStorage.getItem('cookieExpiry')
  const cookieFallback = localStorage.getItem('cookieFallback')

  const limit = !cookieExpiry ? 0 : Number(cookieExpiry)
  
  if((Date.now() - limit) >= 0) return null

  return cookieFallback
} 

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};