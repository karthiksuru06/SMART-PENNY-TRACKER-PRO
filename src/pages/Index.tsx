
import React, { useState, useMemo } from 'react';
import { Plus, TrendingUp, DollarSign, PieChart, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseChart from '@/components/ExpenseChart';
import BudgetTracker from '@/components/BudgetTracker';
import { Expense, ExpenseCategory } from '@/types/expense';

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 45.50,
      category: 'food',
      description: 'Lunch at restaurant',
      date: new Date('2024-07-01'),
    },
    {
      id: '2',
      amount: 120.00,
      category: 'transport',
      description: 'Monthly bus pass',
      date: new Date('2024-07-02'),
    },
    {
      id: '3',
      amount: 89.99,
      category: 'entertainment',
      description: 'Movie tickets and dinner',
      date: new Date('2024-07-03'),
    },
  ]);
  
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [monthlyBudget] = useState(2000);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
    setShowExpenseForm(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyExpenses = useMemo(() => {
    return expenses.filter(expense => 
      expense.date.getMonth() === currentMonth && 
      expense.date.getFullYear() === currentYear
    );
  }, [expenses, currentMonth, currentYear]);

  const totalMonthlySpent = useMemo(() => {
    return monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [monthlyExpenses]);

  const categoryTotals = useMemo(() => {
    const totals: Record<ExpenseCategory, number> = {
      food: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
      utilities: 0,
      health: 0,
      other: 0,
    };
    
    monthlyExpenses.forEach(expense => {
      totals[expense.category] += expense.amount;
    });
    
    return totals;
  }, [monthlyExpenses]);

  const averageDailySpent = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    return totalMonthlySpent / daysInMonth;
  }, [totalMonthlySpent, currentYear, currentMonth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ExpenseTracker</h1>
          <p className="text-gray-600">Take control of your finances with smart expense tracking</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${monthlyBudget.toFixed(2)}</div>
              <p className="text-xs text-green-100">
                Your spending limit
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalMonthlySpent.toFixed(2)}</div>
              <p className="text-xs text-red-100">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${averageDailySpent.toFixed(2)}</div>
              <p className="text-xs text-blue-100">
                Per day this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <PieChart className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(monthlyBudget - totalMonthlySpent).toFixed(2)}</div>
              <p className="text-xs text-purple-100">
                Budget left
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Budget Tracker */}
          <BudgetTracker 
            budget={monthlyBudget}
            spent={totalMonthlySpent}
          />

          {/* Expense Chart */}
          <ExpenseChart categoryTotals={categoryTotals} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Expense Button & Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Expense
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showExpenseForm ? (
                  <Button 
                    onClick={() => setShowExpenseForm(true)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Expense
                  </Button>
                ) : (
                  <ExpenseForm 
                    onSubmit={addExpense}
                    onCancel={() => setShowExpenseForm(false)}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Expenses */}
          <div className="lg:col-span-2">
            <ExpenseList 
              expenses={expenses.slice(0, 10)}
              onDelete={deleteExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
