
export type ExpenseCategory = 
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'utilities'
  | 'health'
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
}

export const categoryColors: Record<ExpenseCategory, string> = {
  food: '#FF6384',
  transport: '#36A2EB',
  entertainment: '#FFCE56',
  shopping: '#4BC0C0',
  utilities: '#9966FF',
  health: '#FF9F40',
  other: '#C9CBCF',
};

export const categoryIcons: Record<ExpenseCategory, string> = {
  food: '🍽️',
  transport: '🚗',
  entertainment: '🎬',
  shopping: '🛍️',
  utilities: '💡',
  health: '🏥',
  other: '📝',
};
