import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Income, incomeSourceIcons, incomeSourceColors } from '@/types/expense';

interface IncomeListProps {
  incomes: Income[];
  onDelete: (id: string) => void;
}

const IncomeList: React.FC<IncomeListProps> = ({ incomes, onDelete }) => {
  const formatDate = React.useCallback((date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }, []);

  const formatSourceLabel = (source: string) => {
    return source === 'pocket-money'
      ? 'Pocket Money'
      : source.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">Recent Income 💰</CardTitle>
      </CardHeader>

      <CardContent>
        {incomes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No income recorded yet!</p>
            <p className="text-sm text-gray-400">
              Add your pocket money, salary, or freelance earnings to get started 🚀
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {incomes.map((income) => (
              <div
                key={income.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-green-50 transition-all border-green-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm"
                    style={{ backgroundColor: incomeSourceColors[income.source] }}
                  >
                    {incomeSourceIcons[income.source]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{income.description}</p>
                    <p className="text-sm text-gray-500">
                      {formatSourceLabel(income.source)} • {formatDate(income.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-green-700">
                    +₹{income.amount.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(income.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    aria-label={`Delete income: ${income.description}`}
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

export default IncomeList;
