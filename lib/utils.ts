import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert a number to the specified script format
 * @param num - The number to convert
 * @param script - The target script: 'english', 'arabic', or 'urdu'
 * @returns The number as a string in the specified script
 */
export function formatAyahNumber(num: number, script: 'english' | 'arabic' | 'urdu'): string {
  const numStr = num.toString()
  
  if (script === 'english') {
    return numStr
  }
  
  // Mapping for Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩)
  const arabicNumerals: Record<string, string> = {
    '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
    '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
  }
  
  // Mapping for Urdu numerals (۰۱۲۳۴۵۶۷۸۹)
  const urduNumerals: Record<string, string> = {
    '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
    '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹'
  }
  
  const mapping = script === 'arabic' ? arabicNumerals : urduNumerals
  
  return numStr.split('').map(digit => mapping[digit] || digit).join('')
}

