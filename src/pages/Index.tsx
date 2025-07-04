
import React, { useState, useMemo } from 'react';
import { Plus, TrendingUp, DollarSign, PieChart, Calendar, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseChart from '@/components/ExpenseChart';
import BudgetTracker from '@/components/BudgetTracker';
import IncomeForm from '@/components/IncomeForm';
import IncomeList from '@/components/IncomeList';
import { Expense, Income, ExpenseCategory } from '@/types/expense';

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 450,
      category: 'food',
      description: 'Lunch at Zomato',
      date: new Date('2024-07-01'),
    },
    {
      id: '2',
      amount: 1200,
      category: 'transport',
      description: 'Monthly metro pass',
      date: new Date('2024-07-02'),
    },
    {
      id: '3',
      amount: 899,
      category: 'entertainment',
      description: 'Movie tickets - PVR',
      date: new Date('2024-07-03'),
    },
  ]);

  const [incomes, setIncomes] = useState<Income[]>([
    {
      id: '1',
      amount: 5000,
      source: 'pocket-money',
      description: 'Monthly pocket money from parents',
      date: new Date('2024-07-01'),
    },
    {
      id: '2',
      amount: 15000,
      source: 'freelance',
      description: 'Website development project',
      date: new Date('2024-07-02'),
    },
  ]);
  
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [monthlyBudget] = useState(25000);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
    setShowExpenseForm(false);
  };

  const addIncome = (income: Omit<Income, 'id'>) => {
    const newIncome: Income = {
      ...income,
      id: Date.now().toString(),
    };
    setIncomes([newIncome, ...incomes]);
    setShowIncomeForm(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const deleteIncome = (id: string) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyExpenses = useMemo(() => {
    return expenses.filter(expense => 
      expense.date.getMonth() === currentMonth && 
      expense.date.getFullYear() === currentYear
    );
  }, [expenses, currentMonth, currentYear]);

  const monthlyIncomes = useMemo(() => {
    return incomes.filter(income => 
      income.date.getMonth() === currentMonth && 
      income.date.getFullYear() === currentYear
    );
  }, [incomes, currentMonth, currentYear]);

  const totalMonthlySpent = useMemo(() => {
    return monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [monthlyExpenses]);

  const totalMonthlyIncome = useMemo(() => {
    return monthlyIncomes.reduce((sum, income) => sum + income.amount, 0);
  }, [monthlyIncomes]);

  const categoryTotals = useMemo(() => {
    const totals: Record<ExpenseCategory, number> = {
      food: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
      utilities: 0,
      health: 0,
      rent: 0,
      education: 0,
      other: 0,
    };
    
    monthlyExpenses.forEach(expense => {
      totals[expense.category] += expense.amount;
    });
    
    return totals;
  }, [monthlyExpenses]);

  const netBalance = totalMonthlyIncome - totalMonthlySpent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 Paisa Tracker</h1>
          <p className="text-gray-600">Track every rupee like a boss! 🇮🇳</p>
          <p className="text-sm text-orange-600 mt-1">
            "Don't let your money vanish into thin air - track it all here!"
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <Wallet className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalMonthlyIncome.toLocaleString('en-IN')}</div>
              <p className="text-xs text-green-100">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{monthlyBudget.toLocaleString('en-IN')}</div>
              <p className="text-xs text-blue-100">Your limit</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalMonthlySpent.toLocaleString('en-IN')}</div>
              <p className="text-xs text-red-100">This month</p>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-r ${netBalance >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} text-white`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
              <PieChart className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {netBalance >= 0 ? '+' : ''}₹{netBalance.toLocaleString('en-IN')}
              </div>
              <p className="text-xs opacity-100">
                {netBalance >= 0 ? 'Great job! 🎉' : 'Over budget! 😰'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(monthlyBudget - totalMonthlySpent).toLocaleString('en-IN')}</div>
              <p className="text-xs text-purple-100">Budget left</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Add Income Button & Form */}
          <div>
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Plus className="h-5 w-5" />
                  Add Income 💰
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showIncomeForm ? (
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowIncomeForm(true)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Income
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                      Got pocket money or freelance bonus? Track it! 🚀
                    </p>
                  </div>
                ) : (
                  <IncomeForm 
                    onSubmit={addIncome}
                    onCancel={() => setShowIncomeForm(false)}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Add Expense Button & Form */}
          <div>
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Plus className="h-5 w-5" />
                  Add Expense 💸
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showExpenseForm ? (
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowExpenseForm(true)}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Expense
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                      Track every rupee you spend! 💳
                    </p>
                  </div>
                ) : (
                  <ExpenseForm 
                    onSubmit={addExpense}
                    onCancel={() => setShowExpenseForm(false)}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Motivational Card */}
          <Card className="bg-gradient-to-r from-orange-400 to-pink-400 text-white">
            <CardHeader>
              <CardTitle className="text-center">💡 Money Tip</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm">
                "Track today, save tomorrow! Every rupee counts in building your financial future. 🌟"
              </p>
              <div className="mt-4 text-2xl">
                {netBalance >= 0 ? '🎯' : '⚠️'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Income */}
          <IncomeList 
            incomes={incomes.slice(0, 5)}
            onDelete={deleteIncome}
          />

          {/* Recent Expenses */}
          <ExpenseList 
            expenses={expenses.slice(0, 5)}
            onDelete={deleteExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
