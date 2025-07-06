import React, { useState } from 'react';
import ThemeToggle from "@/components/ui/ThemeToggle";
import { motion } from 'framer-motion';
import ParticlesBackground from "@/components/ui/ParticlesBackground";

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  note: string;
  date: string;
}

const getCategoryIcon = (category: string): string => {
  const map: Record<string, string> = {
    food: "🍕",
    travel: "✈️",
    salary: "💼",
    shopping: "🛍️",
    health: "💊",
    entertainment: "🎬",
    others: "📦",
  };
  return map[category.toLowerCase()] || "📁";
};

export default function IndexPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [form, setForm] = useState<Omit<Transaction, 'id'>>({
    type: 'expense',
    amount: 0,
    category: '',
    note: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const calculateTotal = (type: 'income' | 'expense') =>
    transactions.filter((t) => t.type === type).reduce((total, t) => total + t.amount, 0);

  const balance = budget + calculateTotal('income') - calculateTotal('expense');

  const addTransaction = () => {
    if (!form.amount || !form.category || !form.date) return;

    if (form.type === 'expense' && form.amount > balance) {
      alert('❌ Not enough balance to add this expense.');
      return;
    }

    const newTransaction: Transaction = {
      ...form,
      amount: Number(form.amount),
      id: Date.now(),
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setForm({ type: 'expense', amount: 0, category: '', note: '', date: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 py-10 sm:px-8 md:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-950 dark:from-black dark:via-gray-900 dark:to-black text-foreground"
    >
      <ParticlesBackground />

      <div className="relative z-10 max-w-4xl mx-auto backdrop-blur-lg bg-white/10 dark:bg-black/30 border border-white/20 rounded-2xl shadow-xl p-6 sm:p-10 space-y-10 transition-all duration-500">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
            Smart Penny Tracker 💸
          </h1>
          <ThemeToggle />
        </div>

        {/* Budget Input */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/5 dark:bg-gray-900/40 shadow-inner space-y-2">
          <label htmlFor="budget" className="font-semibold">Enter Monthly Budget (₹):</label>
          <input
            id="budget"
            name="budget"
            type="number"
            min={0}
            value={budget}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value >= 0) setBudget(value);
            }}
            placeholder="Ex: 10000"
            className="w-full mt-1 px-3 py-2 border rounded-md bg-background border-border"
          />
        </div>

        {/* Add Transaction Form */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/5 dark:bg-gray-900/40 shadow-inner space-y-4">
          <h2 className="text-xl font-semibold text-white/90">➕ Add Transaction</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="p-2 rounded-md border bg-background border-border"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              type="number"
              min={0}
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount (₹)"
              className="p-2 rounded-md border bg-background border-border"
            />

            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category (e.g. Food)"
              className="p-2 rounded-md border bg-background border-border"
            />

            <input
              type="text"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Optional note"
              className="p-2 rounded-md border bg-background border-border"
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="p-2 rounded-md border bg-background border-border"
            />
          </div>

          <button
            onClick={addTransaction}
            className="mt-3 px-6 py-2 rounded-xl transition-all duration-300 shadow-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:brightness-110 active:scale-95"
          >
            ➕ Add Transaction
          </button>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-card rounded-xl shadow-md">
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="text-xl font-bold text-green-600">₹{budget.toLocaleString('en-IN')}</p>
          </div>
          <div className="p-4 bg-card rounded-xl shadow-md">
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-xl font-bold text-blue-600">₹{calculateTotal('income').toLocaleString('en-IN')}</p>
          </div>
          <div className="p-4 bg-card rounded-xl shadow-md">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-xl font-bold text-red-600">₹{calculateTotal('expense').toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Balance */}
        <div className="text-center text-xl font-semibold mt-4">
          Net Balance:{' '}
          <span className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>
            ₹{balance.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Transaction History */}
        <div className="mt-8 space-y-2">
          <h2 className="text-xl font-semibold mb-2">📜 Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-sm">No transactions added yet.</p>
          ) : (
            <ul className="space-y-2">
              {transactions.map((t) => (
                <motion.li
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 rounded-md border border-border bg-muted flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">
                      {getCategoryIcon(t.category)} {t.category}
                      {t.note && (
                        <span className="text-sm text-muted-foreground"> ({t.note})</span>
                      )}
                    </span>
                    <br />
                    <span className="text-xs text-muted-foreground">{t.date}</span>
                  </div>
                  <span
                    className={
                      t.type === 'income'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
