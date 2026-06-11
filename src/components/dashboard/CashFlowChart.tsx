import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Transaction } from '../../core/types';
import { formatCurrency } from '../../lib/utils';

export function CashFlowChart({ transactions, currency }: { transactions: Transaction[], currency: string }) {
  const data = useMemo(() => {
    const grouped = transactions.reduce((acc, curr) => {
      const date = curr.date;
      if (!acc[date]) {
        acc[date] = { name: date, income: 0, expense: 0 };
      }
      if (curr.type === 'income') acc[date].income += curr.amount;
      else if (curr.type === 'expense') acc[date].expense += curr.amount;
      return acc;
    }, {} as Record<string, { name: string, income: number, expense: number }>);

    return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name)).map(item => ({
      ...item,
      name: format(parseISO(item.name), 'MMM dd')
    }));
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="glass-card p-6 rounded-3xl h-96 flex items-center justify-center">
        <p className="text-brand-muted">No cash flow data available.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card p-6 rounded-3xl h-[400px] flex flex-col shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold font-display text-white text-lg tracking-tight">Cash Flow Dynamics</h3>
        <select className="bg-brand-surface text-xs font-bold text-brand-muted border border-brand-border rounded-lg px-2 py-1 outline-none">
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2a2a" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#b0b0b0' }} dy={10} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#b0b0b0' }} 
              tickFormatter={(value) => `$${value}`}
              dx={-10}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value, currency)}
              contentStyle={{ backgroundColor: '#1c1c1c', borderRadius: '12px', border: '1px solid #2a2a2a', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expense" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
