import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp } from 'lucide-react';
import { EXCHANGE_RATES } from '../../lib/utils';

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (investment: { name: string; amount: number; type: string }) => void;
  currency?: string;
}

export function AddInvestmentModal({ isOpen, onClose, onAdd, currency = 'USD' }: AddInvestmentModalProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Stock');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    const parsedAmount = parseFloat(amount);
    const rate = EXCHANGE_RATES[currency] || 1;
    const baseAmount = parsedAmount / rate;

    onAdd({
      name,
      amount: baseAmount,
      type
    });
    
    setName('');
    setAmount('');
    setType('Stock');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass-card p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent-blue" />
              Add Investment
            </h2>
            <button 
              onClick={onClose}
              className="p-2 text-brand-muted hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Asset Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                placeholder="e.g. Apple Inc. (AAPL)"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Investment Amount ({currency})</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
               <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Type</label>
               <select
                 value={type}
                 onChange={(e) => setType(e.target.value)}
                 className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue appearance-none"
               >
                 <option value="Stock">Stock</option>
                 <option value="Crypto">Crypto</option>
                 <option value="Bonds">Bonds</option>
                 <option value="Real Estate">Real Estate</option>
               </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Add Investment
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
