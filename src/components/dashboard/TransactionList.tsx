import React, { useState } from 'react';
import { motion } from 'motion/react';
import { format, parseISO } from 'date-fns';
import { Transaction } from '../../core/types';
import { formatCurrency, getCategoryBadgeClasses } from '../../lib/utils';
import { Search } from 'lucide-react';

export function TransactionList({ transactions, currency }: { transactions: Transaction[], currency: string }) {
  const [search, setSearch] = useState('');

  const filtered = transactions
    .filter(t => t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="glass-card rounded-3xl flex flex-col overflow-hidden shadow-lg h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-brand-border gap-4">
        <h3 className="font-bold font-display text-white text-lg tracking-tight">Recent Activity</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-brand-surface border border-brand-border rounded-xl text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue w-full sm:w-64 transition-all text-white placeholder:text-brand-muted"
          />
        </div>
      </div>

      <div className="flex-1 p-2 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-brand-muted text-center py-8 text-sm">No transactions found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
             <thead className="text-[10px] uppercase text-brand-muted font-bold tracking-wider">
               <tr>
                 <th className="p-4 pb-2">Record</th>
                 <th className="p-4 pb-2 hidden sm:table-cell">Category</th>
                 <th className="p-4 pb-2 text-right">Amount</th>
               </tr>
             </thead>
             <tbody className="text-sm">
              {filtered.map((t, i) => (
                <motion.tr 
                   key={t.id}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: Math.min(i * 0.05, 0.5), duration: 0.3 }}
                   className="border-b border-brand-border/50 hover:bg-white/[0.02] transition-colors last:border-b-0 group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-sm font-bold shadow-inner ${t.type === 'income' ? 'bg-accent-green/10 text-accent-green' : t.type === 'transfer' ? 'bg-accent-purple/10 text-accent-purple' : 'bg-brand-surface text-brand-muted border border-brand-border'}`}>
                        {t.type === 'income' ? '+' : t.type === 'transfer' ? '⇄' : '-'}
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-accent-blue transition-colors text-base">{t.description}</p>
                        <p className="text-[11px] font-medium text-brand-muted flex items-center gap-2 mt-1">
                          {format(parseISO(t.date), 'MMM d yyyy h:mm a')}
                          <span className="sm:hidden w-1 h-1 rounded-full bg-brand-border"></span>
                          <span className={`sm:hidden px-2 py-0.5 rounded text-[10px] font-bold ${getCategoryBadgeClasses(t.category).replace('bg-', 'bg-brand-surface text-')}`}>
                            {t.category}
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-surface border border-brand-border ${t.type === 'income' ? 'text-accent-green' : 'text-brand-muted'}`}>
                      {t.category}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className={`font-display font-bold tracking-tight text-lg ${t.type === 'income' ? 'text-accent-green' : t.type === 'transfer' ? 'text-accent-purple' : 'text-white'}`}>
                      {t.type === 'income' ? '+' : t.type === 'transfer' ? '' : '-'}{formatCurrency(t.amount, currency)}
                    </div>
                  </td>
                </motion.tr>
              ))}
             </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
