import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_COLORS: Record<string, string> = {
  Housing: "#6366f1", // indigo-500
  Food: "#fb7185", // rose-400
  Utilities: "#fbbf24", // amber-400
  Transport: "#3b82f6", // blue-500
  Entertainment: "#a855f7", // purple-500
  Healthcare: "#10b981", // emerald-500
  Other: "#64748b", // slate-500
  Salary: "#10b981", // emerald-500
  Investment: "#6366f1", // indigo-500
};

export const getCategoryBadgeClasses = (category: string) => {
  const styles: Record<string, string> = {
    Housing: "bg-indigo-50 text-indigo-600",
    Food: "bg-rose-50 text-rose-600",
    Utilities: "bg-amber-50 text-amber-600",
    Transport: "bg-blue-50 text-blue-600",
    Entertainment: "bg-purple-50 text-purple-600",
    Healthcare: "bg-emerald-50 text-emerald-600",
    Salary: "bg-emerald-50 text-emerald-600",
    Investment: "bg-indigo-50 text-indigo-600",
    Other: "bg-slate-100 text-slate-600"
  };
  return styles[category] || styles.Other;
};

export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.50,
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  const rate = EXCHANGE_RATES[currency] || 1;
  const converted = amount * rate;
  
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: currency === 'INR' ? 0 : 2,
    minimumFractionDigits: currency === 'INR' ? 0 : 2,
  }).format(converted);
};

export const EXPENSE_CATEGORIES = [
  "Housing",
  "Food",
  "Utilities",
  "Transport",
  "Entertainment",
  "Healthcare",
  "EMI",
  "Other"
];

export const ASSET_CATEGORIES = [
  "Emergency Fund",
  "Savings",
  "Investments",
  "Other Assets"
];

export const INCOME_CATEGORIES = [
  "Salary",
  "Investment",
  "Business",
  "Other"
];
