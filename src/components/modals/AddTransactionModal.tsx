import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Transaction } from '../../core/types';
import { format } from 'date-fns';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, ASSET_CATEGORIES, EXCHANGE_RATES } from '../../lib/utils';

export function AddTransactionModal({ 
  isOpen, 
  onClose, 
  onAdd,
  currency = 'USD'
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onAdd: (t: Omit<Transaction, 'id'>) => void;
  currency?: string;
}) {
  const [type, setType] = useState<'income' | 'expense' | 'transfer'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !date || !category) return;

    const parsedAmount = parseFloat(amount);
    const rate = EXCHANGE_RATES[currency] || 1;
    const baseAmount = parsedAmount / rate;

    onAdd({
      type,
      amount: baseAmount,
      description,
      date,
      category,
    });
    
    setAmount('');
    setDescription('');
    setDate(format(new Date(), 'yyyy-MM-dd'));
    onClose();
  };

  const handleTypeChange = (newType: 'income' | 'expense' | 'transfer') => {
    setType(newType);
    if(newType === 'income') setCategory(INCOME_CATEGORIES[0]);
    else if(newType === 'expense') setCategory(EXPENSE_CATEGORIES[0]);
    else setCategory(ASSET_CATEGORIES[0]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-8 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto border border-brand-border"
            >
              <div className="flex items-center justify-between p-6 border-b border-brand-border">
                <h2 className="text-xl font-display font-bold text-white tracking-tight">New Record</h2>
                <button onClick={onClose} className="p-2 text-brand-muted hover:text-white hover:bg-white/5 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex bg-brand-surface p-1 rounded-xl border border-brand-border">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('expense')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${type === 'expense' ? 'bg-accent-orange text-white shadow-md' : 'text-brand-muted hover:text-white'}`}
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('income')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${type === 'income' ? 'bg-accent-green text-white shadow-md' : 'text-brand-muted hover:text-white'}`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('transfer')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${type === 'transfer' ? 'bg-accent-purple text-white shadow-md' : 'text-brand-muted hover:text-white'}`}
                  >
                    Transfer
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold text-lg">
                        {currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$'}
                      </span>
                      <input 
                        type="number" 
                        step="0.01"
                        min="0"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-9 pr-4 py-3 w-full bg-brand-surface border border-brand-border rounded-xl text-white font-bold text-lg focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Description</label>
                    <input 
                      type="text" 
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="px-4 py-3 w-full bg-brand-surface border border-brand-border rounded-xl text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                      placeholder="e.g. Groceries at Whole Foods"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-3 w-full bg-brand-surface border border-brand-border rounded-xl text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                      >
                        {(type === 'income' ? INCOME_CATEGORIES : type === 'expense' ? EXPENSE_CATEGORIES : ASSET_CATEGORIES).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Date</label>
                      <input 
                        type="date" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-4 py-3 w-full bg-brand-surface border border-brand-border rounded-xl text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] block"
                  >
                    Confirm Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
