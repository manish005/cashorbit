import React from 'react';
import { motion } from 'motion/react';
import { Transaction, Investment } from '../../core/types';
import { formatCurrency } from '../../lib/utils';
import { CreditCard, PiggyBank, AlertTriangle, TrendingUp, Landmark } from 'lucide-react';

interface AccountsSummaryProps {
  transactions: Transaction[];
  investments: Investment[];
  currency: string;
}

export function AccountsSummary({ transactions, investments, currency }: AccountsSummaryProps) {
  // Calculate checking balance: income - expense - transfers
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const totalTransfers = transactions.filter(t => t.type === 'transfer').reduce((acc, t) => acc + t.amount, 0);
  const checkingBalance = totalIncome - totalExpense - totalTransfers;

  // Calculate emergency fund from transfers
  const emergencyFund = transactions
    .filter(t => t.category === 'Emergency Fund' && t.type === 'transfer')
    .reduce((acc, t) => acc + t.amount, 0);

  // Calculate total investments from the investments.json database
  const totalInvestments = investments.reduce((acc, inv) => acc + inv.amount, 0);

  // Calculate active EMI obligations
  const emiPaid = transactions
    .filter(t => t.category === 'EMI' && t.type === 'transfer')
    .reduce((acc, t) => acc + t.amount, 0);

  // Net worth calculation
  const netWorth = checkingBalance + emergencyFund + totalInvestments - emiPaid;

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'stock':
        return 'bg-accent-blue/10 text-accent-blue border-accent-blue/20';
      case 'crypto':
        return 'bg-accent-green/10 text-accent-green border-accent-green/20';
      case 'bonds':
        return 'bg-accent-purple/10 text-accent-purple border-accent-purple/20';
      case 'real estate':
        return 'bg-accent-orange/10 text-accent-orange border-accent-orange/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Premium Net Worth Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-transparent border border-accent-blue/20 shadow-[0_0_50px_rgba(79,140,255,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <span className="text-[10px] font-bold text-accent-blue uppercase tracking-widest">Aggregate Portfolio Valuation</span>
          <h2 className="text-4xl font-display font-bold text-white mt-1">{formatCurrency(netWorth, currency)}</h2>
          <p className="text-brand-muted text-xs mt-2">Combined value of checking, emergency fund, and investment positions minus liabilities.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-white/5 border border-white/5 rounded-2xl">
            <span className="text-[10px] font-semibold text-brand-muted block uppercase tracking-wide">Liquidity ratio</span>
            <span className="text-sm font-bold text-accent-green">Stable (84%)</span>
          </div>
          <div className="px-5 py-3 bg-white/5 border border-white/5 rounded-2xl">
            <span className="text-[10px] font-semibold text-brand-muted block uppercase tracking-wide">Monthly savings rate</span>
            <span className="text-sm font-bold text-accent-purple">+18.4%</span>
          </div>
        </div>
      </motion.div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main Checking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-card p-6 rounded-3xl flex flex-col justify-between border-t-2 border-t-accent-blue shadow-lg relative overflow-hidden group h-36"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/10 rounded-full blur-[20px] -mr-8 -mt-8 pointer-events-none group-hover:scale-150 transition-transform"></div>
          <div className="flex justify-between items-start relative z-10">
            <span className="text-brand-muted text-[10px] font-bold uppercase tracking-widest">Main Checking</span>
            <div className={`p-2 rounded-xl bg-accent-blue/10 text-accent-blue`}>
              <CreditCard className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-2xl font-display font-bold text-white relative z-10">{formatCurrency(checkingBalance, currency)}</p>
        </motion.div>

        {/* Emergency Fund */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-3xl flex flex-col justify-between border-t-2 border-t-accent-green shadow-lg relative overflow-hidden group h-36"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-green/10 rounded-full blur-[20px] -mr-8 -mt-8 pointer-events-none group-hover:scale-150 transition-transform"></div>
          <div className="flex justify-between items-start relative z-10">
            <span className="text-brand-muted text-[10px] font-bold uppercase tracking-widest">Emergency Fund</span>
            <div className={`p-2 rounded-xl bg-accent-green/10 text-accent-green`}>
              <PiggyBank className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-2xl font-display font-bold text-white relative z-10">{formatCurrency(emergencyFund, currency)}</p>
        </motion.div>

        {/* Investments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-6 rounded-3xl flex flex-col justify-between border-t-2 border-t-accent-purple shadow-lg relative overflow-hidden group h-36"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 rounded-full blur-[20px] -mr-8 -mt-8 pointer-events-none group-hover:scale-150 transition-transform"></div>
          <div className="flex justify-between items-start relative z-10">
            <span className="text-brand-muted text-[10px] font-bold uppercase tracking-widest">Investments (JSON)</span>
            <div className={`p-2 rounded-xl bg-accent-purple/10 text-accent-purple`}>
              <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-2xl font-display font-bold text-white relative z-10">{formatCurrency(totalInvestments, currency)}</p>
        </motion.div>

        {/* Liabilities EMIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-3xl flex flex-col justify-between border-t-2 border-t-accent-orange shadow-lg relative overflow-hidden group h-36"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-orange/10 rounded-full blur-[20px] -mr-8 -mt-8 pointer-events-none group-hover:scale-150 transition-transform"></div>
          <div className="flex justify-between items-start relative z-10">
            <span className="text-brand-muted text-[10px] font-bold uppercase tracking-widest">Active EMIs</span>
            <div className={`p-2 rounded-xl bg-accent-orange/10 text-accent-orange`}>
              <AlertTriangle className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-2xl font-display font-bold text-white relative z-10">{formatCurrency(emiPaid, currency)}</p>
        </motion.div>
      </div>

      {/* Separate Investments Ledger */}
      <div className="glass-card rounded-3xl flex flex-col overflow-hidden shadow-lg border border-white/5 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold font-display text-white text-lg tracking-tight flex items-center gap-2">
            <Landmark className="w-5 h-5 text-accent-purple" /> Active Asset Allocations
          </h3>
          <span className="text-xs font-semibold px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            {investments.length} Securities Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          {investments.length === 0 ? (
            <p className="text-brand-muted text-center py-10 text-sm">No investment assets recorded in database.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="text-[10px] uppercase text-brand-muted font-bold tracking-wider border-b border-brand-border">
                <tr>
                  <th className="py-3 px-4">Asset Description</th>
                  <th className="py-3 px-4">Asset Class</th>
                  <th className="py-3 px-4">Allocation Date</th>
                  <th className="py-3 px-4 text-right">Value ({currency})</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {investments.map((inv, idx) => (
                  <tr key={inv.id || idx} className="border-b border-brand-border/50 hover:bg-white/[0.01] transition-colors last:border-b-0">
                    <td className="py-4 px-4 font-bold text-white">{inv.name}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${getTypeBadgeColor(inv.type)}`}>
                        {inv.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-brand-muted">{inv.date}</td>
                    <td className="py-4 px-4 text-right font-display font-bold text-white">
                      {formatCurrency(inv.amount, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
