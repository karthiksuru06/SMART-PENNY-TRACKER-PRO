import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Expense, categoryIcons, categoryColors } from '@/types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  const formatDate = React.useCallback((date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }, []);

  const formatCategory = (category: string) =>
    category.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-700">Recent Expenses 💸</CardTitle>
      </CardHeader>

      <CardContent>
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No expenses recorded yet!</p>
            <p className="text-sm text-gray-400">Track your chai, travels, and bills from today! 🧾</p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-red-50 transition-all border-red-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shadow"
                    style={{ backgroundColor: categoryColors[expense.category] }}
                  >
                    {categoryIcons[expense.category]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-500">
                      {formatCategory(expense.category)} • {formatDate(expense.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-red-700">
                    -₹{expense.amount.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(expense.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    aria-label={`Delete expense: ${expense.description}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
