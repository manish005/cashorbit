import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard, PieChart, WalletCards, Target,
  ArrowRightLeft, CalendarDays, Bot
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: ArrowRightLeft, label: 'Transactions', id: 'transactions' },
  { icon: Target, label: 'Budgets & Goals', id: 'budgets' },
  { icon: WalletCards, label: 'Investments', id: 'accounts' },
  { icon: PieChart, label: 'Analytics', id: 'analytics' },
  { icon: CalendarDays, label: 'Calendar', id: 'calendar' },
  { icon: Bot, label: 'AI Assistant', id: 'ai' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isOpen?: boolean;
  className?: string;
}

export function Sidebar({ activeTab, setActiveTab, onLogout, isOpen = true, className = "" }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <aside className={`w-64 bg-brand-surface border-r border-brand-border p-6 pt-14 flex flex-col h-full shrink-0 relative z-10 ${className}`}>
      <div className="mb-8 px-2">
        <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-4">Menu</p>
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                  ? 'bg-accent-blue/10 text-accent-blue font-semibold scale-105'
                  : 'text-brand-muted hover:bg-brand-card hover:text-white'
                  }`}
              >
                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 w-1 h-8 bg-accent-blue rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
