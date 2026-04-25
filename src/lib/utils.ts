import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getRiskColor(level: string) {
  switch (level.toLowerCase()) {
    case 'low': return 'text-[#8A9A5B] bg-[#F4F6EE] border-[#8A9A5B]/20';
    case 'medium': return 'text-[#D4A373] bg-[#FEFAF2] border-[#D4A373]/20';
    case 'high': return 'text-[#A65E4E] bg-[#F9F1F0] border-[#A65E4E]/20';
    default: return 'text-[#706B5C] bg-[#F2F0EB] border-[#E0DBCF]';
  }
}
