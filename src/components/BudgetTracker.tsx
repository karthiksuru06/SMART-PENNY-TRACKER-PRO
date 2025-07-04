
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface BudgetTrackerProps {
  budget: number;
  spent: number;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ budget, spent }) => {
  const percentage = (spent / budget) * 100;
  const remaining = budget - spent;
  const isOverBudget = spent > budget;
  const isNearLimit = percentage > 80 && !isOverBudget;

  const getStatusColor = () => {
    if (isOverBudget) return 'text-red-600';
    if (isNearLimit) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusIcon = () => {
    if (isOverBudget) return <AlertTriangle className="h-5 w-5 text-red-600" />;
    if (isNearLimit) return <TrendingUp className="h-5 w-5 text-yellow-600" />;
    return <CheckCircle className="h-5 w-5 text-green-600" />;
  };

  const getStatusMessage = () => {
    if (isOverBudget) return `Over budget by $${(spent - budget).toFixed(2)}`;
    if (isNearLimit) return 'Approaching budget limit';
    return 'On track with budget';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Monthly Budget</span>
          {getStatusIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Spent: ${spent.toFixed(2)}</span>
            <span>Budget: ${budget.toFixed(2)}</span>
          </div>
          <Progress 
            value={Math.min(percentage, 100)} 
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{percentage.toFixed(1)}% used</span>
            <span>${remaining.toFixed(2)} remaining</span>
          </div>
        </div>

        <div className={`flex items-center gap-2 p-3 rounded-lg bg-gray-50 ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="font-medium">{getStatusMessage()}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Daily Budget</p>
            <p className="text-xl font-bold text-blue-600">
              ${(budget / 30).toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Days Left</p>
            <p className="text-xl font-bold text-purple-600">
              {30 - new Date().getDate()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
