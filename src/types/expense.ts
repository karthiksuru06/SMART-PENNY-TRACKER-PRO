// Types for Expense and Income Management

export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'utilities'
  | 'health'
  | 'rent'
  | 'education'
  | 'other';

export type IncomeSource =
  | 'salary'
  | 'freelance'
  | 'pocket-money'
  | 'bonus'
  | 'investment'
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
}

export interface Income {
  id: string;
  amount: number;
  source: IncomeSource;
  description: string;
  date: Date;
}

// Visual styles for UI: category → color
export const categoryColors: Record<ExpenseCategory, string> = {
  food: '#FF6384',
  transport: '#36A2EB',
  entertainment: '#FFCE56',
  shopping: '#4BC0C0',
  utilities: '#9966FF',
  health: '#FF9F40',
  rent: '#FF8C42',
  education: '#4ECDC4',
  other: '#C9CBCF',
};

// Emoji icons for each expense category
export const categoryIcons: Record<ExpenseCategory, string> = {
  food: '🍽️',
  transport: '🚗',
  entertainment: '🎬',
  shopping: '🛍️',
  utilities: '💡',
  health: '🏥',
  rent: '🏠',
  education: '📚',
  other: '📝',
};

// Visual styles for income sources
export const incomeSourceColors: Record<IncomeSource, string> = {
  salary: '#28A745',
  freelance: '#17A2B8',
  'pocket-money': '#FFC107',
  bonus: '#DC3545',
  investment: '#6F42C1',
  other: '#6C757D',
};

// Emoji icons for each income source
export const incomeSourceIcons: Record<IncomeSource, string> = {
  salary: '💼',
  freelance: '💻',
  'pocket-money': '👨‍👩‍👧‍👦',
  bonus: '🎁',
  investment: '📈',
  other: '💰',
};
