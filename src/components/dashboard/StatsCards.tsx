import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, TrendingUp, Landmark } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { Transaction, Investment } from '../../core/types';
import { isSameMonth, isSameYear, parseISO, format } from 'date-fns';

export function StatsCards({ 
  transactions, 
  investments = [], 
  currency,
  viewMode = 'year'
}: { 
  transactions: Transaction[], 
  investments?: Investment[], 
  currency: string,
  viewMode?: 'month' | 'year'
}) {
  const currentMonth = new Date();
  
  // Filter data based on selected view mode
  const filteredTxs = transactions.filter(t => {
    const d = parseISO(t.date);
    return viewMode === 'month' ? isSameMonth(d, currentMonth) : isSameYear(d, currentMonth);
  });

  const filteredInvs = investments.filter(inv => {
    const d = parseISO(inv.date);
    return viewMode === 'month' ? isSameMonth(d, currentMonth) : isSameYear(d, currentMonth);
  });

  // Calculate checking balance: income - expense - transfers
  const totalIncome = filteredTxs.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = filteredTxs.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const totalTransfers = filteredTxs.filter(t => t.type === 'transfer').reduce((acc, t) => acc + t.amount, 0);
  const checkingBalance = totalIncome - totalExpense - totalTransfers;

  // Calculate emergency fund from transfers
  const emergencyFund = filteredTxs
    .filter(t => t.category === 'Emergency Fund' && t.type === 'transfer')
    .reduce((acc, t) => acc + t.amount, 0);

  // Calculate travel savings from transfers
  const travelSavings = filteredTxs
    .filter(t => t.category === 'Travel' && t.type === 'transfer')
    .reduce((acc, t) => acc + t.amount, 0);

  // Net savings in bank account (checking + emergency + travel)
  const netBankSavings = checkingBalance + emergencyFund + travelSavings;

  // Calculate total investments
  const totalInvestments = filteredInvs.reduce((acc, inv) => acc + inv.amount, 0);

  // Spend (type === 'expense')
  const monthlyExpense = filteredTxs.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  const monthLabel = format(currentMonth, 'MMMM yyyy');
  const yearLabel = format(currentMonth, 'yyyy');
  const periodText = viewMode === 'month' ? monthLabel : yearLabel;

  const cards = [
    { 
      title: viewMode === 'month' ? 'Net Savings (Month)' : 'Net Savings (Year)', 
      amount: netBankSavings, 
      icon: Landmark, 
      color: 'text-accent-blue', 
      bg: 'bg-accent-blue/10', 
      glow: 'shadow-[0_0_30px_rgba(79,140,255,0.15)]',
      sub: `Checking + Savings (${periodText})`
    },
    { 
      title: viewMode === 'month' ? 'Investments (Month)' : 'Total Investments', 
      amount: totalInvestments, 
      icon: TrendingUp, 
      color: 'text-accent-purple', 
      bg: 'bg-accent-purple/10', 
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]',
      sub: `Mutual Funds + Equities (${periodText})`
    },
    { 
      title: viewMode === 'month' ? 'Spend (Month)' : 'Overall Spend (Year)', 
      amount: monthlyExpense, 
      icon: ArrowDownRight, 
      color: 'text-accent-orange', 
      bg: 'bg-accent-orange/10', 
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.15)]',
      sub: `Rent, Food, Utilities, Gas (${periodText})`
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`glass-card p-6 rounded-3xl flex flex-col justify-between ${card.glow} relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[30px] -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-150"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <span className="text-brand-muted text-[10px] font-bold uppercase tracking-widest block">{card.title}</span>
                <span className="text-[10px] text-brand-muted/70 mt-0.5 block">{card.sub}</span>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${card.bg} ${card.color}`}>
                <card.icon className="w-4 h-4" strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-3xl font-display font-bold text-white relative z-10">{formatCurrency(card.amount, currency)}</p>
          </motion.div>
        ))}
      </div>
  );
}
