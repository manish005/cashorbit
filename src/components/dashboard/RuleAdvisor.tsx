import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Landmark, Flame, Compass, RefreshCw } from 'lucide-react';
import { Transaction } from '../../core/types';
import { formatCurrency } from '../../lib/utils';
import { isSameMonth, parseISO } from 'date-fns';

interface RuleAdvisorProps {
  transactions: Transaction[];
  currency: string;
}

export function RuleAdvisor({ transactions, currency }: RuleAdvisorProps) {
  const currentMonth = new Date();

  // 1. Identify previous balance
  const previousBalanceTx = transactions.find(t => 
    t.description.toLowerCase().includes('previous') || 
    t.description.toLowerCase().includes('opening')
  );
  const previousBalance = previousBalanceTx ? previousBalanceTx.amount : 0;

  // 2. Monthly Income (excluding previous balance)
  const monthlyIncome = transactions
    .filter(t => t.type === 'income' && t.id !== previousBalanceTx?.id && isSameMonth(parseISO(t.date), currentMonth))
    .reduce((acc, t) => acc + t.amount, 0);

  // 3. Monthly Expenses
  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense' && isSameMonth(parseISO(t.date), currentMonth))
    .reduce((acc, t) => acc + t.amount, 0);

  // 4. Monthly EMIs
  const emiPaid = transactions
    .filter(t => t.type === 'transfer' && t.category === 'EMI' && isSameMonth(parseISO(t.date), currentMonth))
    .reduce((acc, t) => acc + t.amount, 0);

  // 5. Remaining surplus
  const surplus = Math.max(0, monthlyIncome - monthlyExpenses - emiPaid);

  // 50/30/20 targets
  const targetSavings = surplus * 0.50;
  const targetInvestments = surplus * 0.30;
  const targetFlex = surplus * 0.20;

  // Actual values logged this month
  const actualSavings = transactions
    .filter(t => t.type === 'transfer' && t.category === 'Emergency Fund' && isSameMonth(parseISO(t.date), currentMonth))
    .reduce((acc, t) => acc + t.amount, 0);

  const actualInvestments = transactions
    .filter(t => (t.category === 'Investment' || t.description.toLowerCase().includes('investment')) && isSameMonth(parseISO(t.date), currentMonth))
    .reduce((acc, t) => acc + t.amount, 0);

  // Travel / flexible expenses
  const actualFlex = transactions
    .filter(t => (t.category === 'Entertainment' || t.category === 'Travel' || t.description.toLowerCase().includes('travel')) && isSameMonth(parseISO(t.date), currentMonth))
    .reduce((acc, t) => acc + t.amount, 0);

  const getPercent = (actual: number, target: number) => {
    if (target <= 0) return 0;
    return Math.min((actual / target) * 100, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl flex flex-col overflow-hidden shadow-lg border border-white/5 p-6 h-full"
    >
      <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-6">
        <div>
          <h3 className="font-bold font-display text-white text-lg tracking-tight flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-accent-purple animate-pulse" /> 50/30/20 Allocation Advisor
          </h3>
          <p className="text-brand-muted text-xs mt-1">Intelligent allocations calculated from surplus cash.</p>
        </div>
      </div>

      {/* Snapshot scenario values */}
      <div className="grid grid-cols-2 gap-4 mb-6 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
        <div>
          <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Income Added</span>
          <span className="text-lg font-bold text-white">{formatCurrency(monthlyIncome, currency)}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Fixed Costs + EMI</span>
          <span className="text-lg font-bold text-accent-orange">{formatCurrency(monthlyExpenses + emiPaid, currency)}</span>
        </div>
        <div className="col-span-2 pt-2 border-t border-white/5 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Remaining Surplus</span>
            <span className="text-xl font-display font-bold text-accent-green">{formatCurrency(surplus, currency)}</span>
          </div>
          {previousBalance > 0 && (
            <div className="text-right">
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Previous Balance</span>
              <span className="text-sm font-bold text-slate-300">{formatCurrency(previousBalance, currency)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Recommended breakdowns */}
      <div className="space-y-6 flex-1">
        {/* Savings - 50% */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent-blue/10 text-accent-blue"><Landmark className="w-3.5 h-3.5" /></div>
              <div>
                <span className="text-sm font-bold text-white block">Savings (50% Rule)</span>
                <span className="text-[10px] text-brand-muted">Target Allocation: {formatCurrency(targetSavings, currency)}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-white">{formatCurrency(actualSavings, currency)} Logged</span>
              <span className="text-[10px] text-accent-blue font-bold block">{getPercent(actualSavings, targetSavings).toFixed(0)}% Filled</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-brand-surface rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getPercent(actualSavings, targetSavings)}%` }}
              className="h-full bg-accent-blue rounded-full shadow-[0_0_10px_rgba(79,140,255,0.5)]"
            />
          </div>
        </div>

        {/* Investments - 30% */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent-purple/10 text-accent-purple"><Flame className="w-3.5 h-3.5" /></div>
              <div>
                <span className="text-sm font-bold text-white block">Investments (30% Rule)</span>
                <span className="text-[10px] text-brand-muted">Target Allocation: {formatCurrency(targetInvestments, currency)}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-white">{formatCurrency(actualInvestments, currency)} Logged</span>
              <span className="text-[10px] text-accent-purple font-bold block">{getPercent(actualInvestments, targetInvestments).toFixed(0)}% Filled</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-brand-surface rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getPercent(actualInvestments, targetInvestments)}%` }}
              className="h-full bg-accent-purple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
          </div>
        </div>

        {/* Flexible Travel Expense - 20% */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent-orange/10 text-accent-orange"><Compass className="w-3.5 h-3.5" /></div>
              <div>
                <span className="text-sm font-bold text-white block">Flexible & Travel (20% Rule)</span>
                <span className="text-[10px] text-brand-muted">Target Allocation: {formatCurrency(targetFlex, currency)}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-white">{formatCurrency(actualFlex, currency)} Logged</span>
              <span className="text-[10px] text-accent-orange font-bold block">{getPercent(actualFlex, targetFlex).toFixed(0)}% Spent</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-brand-surface rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getPercent(actualFlex, targetFlex)}%` }}
              className="h-full bg-accent-orange rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
