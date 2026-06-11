import { Transaction, Budget, UserProfile } from "../core/types";

export const initialTransactions: Transaction[] = [
  { id: "1", amount: 4500, date: "2026-06-01", description: "Salary", category: "Salary", type: "income" },
  { id: "2", amount: 1200, date: "2026-06-02", description: "Rent", category: "Housing", type: "expense" },
  { id: "3", amount: 150, date: "2026-06-05", description: "Groceries", category: "Food", type: "expense" },
  { id: "4", amount: 60, date: "2026-06-06", description: "Internet", category: "Utilities", type: "expense" },
  { id: "5", amount: 200, date: "2026-06-08", description: "Dining Out", category: "Food", type: "expense" },
  { id: "6", amount: 80, date: "2026-06-09", description: "Gas", category: "Transport", type: "expense" },
  { id: "7", amount: 50, date: "2026-06-10", description: "Coffee", category: "Food", type: "expense" },
  { id: "8", amount: 300, date: "2026-06-11", description: "Freelance", category: "Salary", type: "income" },
  { id: "9", amount: 500, date: "2026-06-01", description: "Home Loan EMI", category: "EMI", type: "transfer" },
  { id: "10", amount: 200, date: "2026-06-01", description: "Emergency Fund", category: "Emergency Fund", type: "transfer" }
];

export const initialBudgets: Budget[] = [
  { id: "b1", category: "Housing", limit: 1500 },
  { id: "b2", category: "Food", limit: 600 },
  { id: "b3", category: "Transport", limit: 300 },
  { id: "b4", category: "Entertainment", limit: 200 },
  { id: "b5", category: "Utilities", limit: 250 },
];

export const initialProfile: UserProfile = {
  name: "Guest User",
  email: "",
  currency: "INR",
  tier: "premium"
};
