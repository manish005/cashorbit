import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, CircleDollarSign, CalendarRange, Landmark, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SetupGoalFormProps {
  onSetup: (data: {
    transactions: any[];
    budgets: any[];
  }) => Promise<void>;
  currency: string;
}

export function SetupGoalForm({ onSetup, currency }: SetupGoalFormProps) {
  const [income, setIncome] = useState('');
  const [spend, setSpend] = useState('');
  const [emi, setEmi] = useState('');
  const [savings, setSavings] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!income && !spend && !emi && !savings) {
      toast.error('Please enter at least one financial goal value.');
      return;
    }

    setIsLoading(true);
    const dateStr = new Date().toISOString().split('T')[0];
    const transactions: any[] = [];
    const budgets: any[] = [];

    if (income) {
      transactions.push({
        amount: parseFloat(income),
        date: dateStr,
        description: 'Monthly Salary (Goal Setup)',
        category: 'Salary',
        type: 'income',
      });
    }

    if (spend) {
      // Create a budget limit for food/groceries
      budgets.push({
        category: 'Food',
        limit: parseFloat(spend) * 0.4, // 40% to food
      });
      budgets.push({
        category: 'Housing',
        limit: parseFloat(spend) * 0.6, // 60% to housing
      });

      // Also create an expense transaction representing a part of it spent
      transactions.push({
        amount: parseFloat(spend) * 0.3,
        date: dateStr,
        description: 'Baseline Food Spends',
        category: 'Food',
        type: 'expense',
      });
    }

    if (emi) {
      transactions.push({
        amount: parseFloat(emi),
        date: dateStr,
        description: 'EMI Obligation',
        category: 'EMI',
        type: 'transfer',
      });
    }

    if (savings) {
      transactions.push({
        amount: parseFloat(savings),
        date: dateStr,
        description: 'Emergency Fund Transfer',
        category: 'Emergency Fund',
        type: 'transfer',
      });
    }

    try {
      await onSetup({ transactions, budgets });
      toast.success('Financial goals set up successfully!');
      setIncome('');
      setSpend('');
      setEmi('');
      setSavings('');
    } catch (err) {
      toast.error('Failed to set up financial goals.');
    } finally {
      setIsLoading(false);
    }
  };

  const currSymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl flex flex-col overflow-hidden shadow-lg h-full border border-white/5"
    >
      <div className="flex items-center justify-between p-6 border-b border-brand-border">
        <h3 className="font-bold font-display text-white text-lg tracking-tight">Set Financial Milestones</h3>
        <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue">
          <Target className="w-4 h-4" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 justify-between flex flex-col">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CircleDollarSign className="w-3.5 h-3.5 text-accent-green" /> Monthly Income Goal
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold">{currSymbol}</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter monthly income target"
                className="w-full bg-brand-surface border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent-blue text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CalendarRange className="w-3.5 h-3.5 text-accent-orange" /> Estimated Monthly Spends
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold">{currSymbol}</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={spend}
                onChange={(e) => setSpend(e.target.value)}
                placeholder="Target monthly spending budget"
                className="w-full bg-brand-surface border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent-blue text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-accent-purple" /> Monthly EMI Obligations
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold">{currSymbol}</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={emi}
                onChange={(e) => setEmi(e.target.value)}
                placeholder="Loan EMIs & recurrent debts"
                className="w-full bg-brand-surface border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent-blue text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-blue" /> Savings & Emergency Deposit
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold">{currSymbol}</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                placeholder="Target monthly savings goal"
                className="w-full bg-brand-surface border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent-blue text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
            />
          ) : (
            'Initialize baseline profile'
          )}
        </button>
      </form>
    </motion.div>
  );
}
