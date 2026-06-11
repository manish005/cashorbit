import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { EXPENSE_CATEGORIES, EXCHANGE_RATES } from '../../lib/utils';
import { Budget } from '../../core/types';

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (budget: Budget) => void;
  currency?: string;
}

export function AddBudgetModal({ isOpen, onClose, onAdd, currency = 'USD' }: AddBudgetModalProps) {
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [limit, setLimit] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!limit || !category) return;

    const parsedLimit = parseFloat(limit);
    const rate = EXCHANGE_RATES[currency] || 1;
    const baseLimit = parsedLimit / rate;

    onAdd({
      id: crypto.randomUUID(),
      category,
      limit: baseLimit
    });
    
    setLimit('');
    setCategory(EXPENSE_CATEGORIES[0]);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg glass-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-brand-border">
            <h2 className="text-xl font-bold font-display tracking-tight text-white">
              Create Budget
            </h2>
            <button 
              onClick={onClose}
              className="p-2 text-brand-muted hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
              >
                {EXPENSE_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Monthly Limit</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold text-lg">
                  {currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$'}
                </span>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full bg-brand-surface border border-brand-border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-lg bg-white text-black hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Add Budget
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
