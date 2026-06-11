import React from 'react';
import { motion } from 'motion/react';
import { Budget, Transaction } from '../../core/types';
import { formatCurrency, getCategoryBadgeClasses } from '../../lib/utils';
import { parseISO, isSameMonth } from 'date-fns';
import { Target } from 'lucide-react';

interface BudgetGoalsProps {
  budgets: Budget[];
  transactions: Transaction[];
  currency: string;
}

export function BudgetGoals({ budgets, transactions, currency }: BudgetGoalsProps) {
  const currentMonth = new Date();

  const getSpentAmount = (category: string) => {
    return transactions
      .filter((t) => t.type === 'expense' && t.category === category && isSameMonth(parseISO(t.date), currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="glass-card rounded-3xl flex flex-col overflow-hidden shadow-lg h-full">
      <div className="flex items-center justify-between p-6 border-b border-brand-border gap-4">
        <h3 className="font-bold font-display text-white text-lg tracking-tight">Active Budgets</h3>
        <div className="w-8 h-8 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange">
           <Target className="w-4 h-4" />
        </div>
      </div>
      <div className="p-6 space-y-7 overflow-y-auto">
        {budgets.map((budget, i) => {
          const spent = getSpentAmount(budget.category);
          const percent = Math.min((spent / budget.limit) * 100, 100);
          const isWarning = percent > 80;
          const isDanger = percent >= 100;

          return (
            <motion.div 
              key={budget.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex justify-between items-end mb-3">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isDanger ? '#f97316' : isWarning ? '#fbbf24' : '#4f8cff' }}></div>
                   <span className="text-sm font-bold text-white tracking-wide">
                      {budget.category}
                    </span>
                </div>
                <div className="text-right">
                   <span className="text-xs font-bold text-white">
                      {formatCurrency(spent, currency)} 
                      <span className="text-brand-muted font-medium"> / {formatCurrency(budget.limit, currency)}</span>
                    </span>
                    <p className={`text-[10px] mt-0.5 font-bold uppercase tracking-wider ${isDanger ? 'text-accent-orange' : isWarning ? 'text-amber-400' : 'text-accent-green'}`}>
                      {percent.toFixed(0)}% Used
                    </p>
                </div>
              </div>
              <div className="h-2 w-full bg-brand-surface rounded-full overflow-hidden shadow-inner transform group-hover:scale-y-125 transition-transform">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, delay: i * 0.1 + 0.2, type: 'spring' }}
                  className={`h-full rounded-full ${isDanger ? 'bg-gradient-to-r from-red-500 to-accent-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]' : isWarning ? 'bg-gradient-to-r from-amber-500 to-amber-300' : 'bg-gradient-to-r from-accent-blue to-accent-purple shadow-[0_0_10px_rgba(79,140,255,0.5)]'}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
