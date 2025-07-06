// src/types/expense.ts

export type ExpenseCategory =
  | 'food'
  | 'travel'
  | 'salary'
  | 'shopping'
  | 'health'
  | 'entertainment'
  | 'other';

export interface Expense {
  id: number;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
}

export const categoryIcons: Record<ExpenseCategory, string> = {
  food: "🍕",
  travel: "✈️",
  salary: "💼",
  shopping: "🛍️",
  health: "💊",
  entertainment: "🎬",
  other: "📦",
};

export const categoryColors: Record<ExpenseCategory, string> = {
  food: "#FF6384",
  travel: "#36A2EB",
  salary: "#4BC0C0",
  shopping: "#9966FF",
  health: "#FFCE56",
  entertainment: "#FF9F40",
  other: "#999999",
};
