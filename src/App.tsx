import React, { useState, useEffect } from 'react';
import { initialProfile } from './data/mockData';
import { Transaction, Budget, UserProfile, Investment } from './core/types';
import { StatsCards } from './components/dashboard/StatsCards';
import { ExpenseChart } from './components/dashboard/ExpenseChart';
import { CashFlowChart } from './components/dashboard/CashFlowChart';
import { TransactionList } from './components/dashboard/TransactionList';
import { AddTransactionModal } from './components/modals/AddTransactionModal';
import { LoginScreen } from './views/LoginScreen';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { BudgetGoals } from './components/dashboard/BudgetGoals';
import { AccountsSummary } from './components/dashboard/AccountsSummary';
import { LandingPage } from './views/LandingPage';
import { SecurityView, SettingsView, SupportView, ProfileView } from './views/Preferences';
import { AddBudgetModal } from './components/modals/AddBudgetModal';
import { AddInvestmentModal } from './components/modals/AddInvestmentModal';
import { CalendarView } from './views/CalendarView';
import { AIAssistantView } from './views/AIAssistantView';
import { SetupGoalForm } from './components/dashboard/SetupGoalForm';
import { RuleAdvisor } from './components/dashboard/RuleAdvisor';
import { useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { Toaster } from "react-hot-toast";

export default function App() {
  const { user, isLoggedIn, initializing, hasStarted, startApp, logout } = useAuth();
  
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'year'>('year');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile Menu
  const [notifications, setNotifications] = useState<any[]>([]);
  const validTabs = ['dashboard', 'analytics', 'accounts', 'transactions', 'budgets', 'calendar', 'ai', 'security', 'settings', 'profile', 'support'];
  const getInitialTab = () => {
    const path = window.location.pathname.replace(/^\//, '');
    return validTabs.includes(path) ? path : 'dashboard';
  };
  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Sync activeTab state changes to the URL pathname
  useEffect(() => {
    if (!isLoggedIn) return;
    const currentPath = window.location.pathname.replace(/^\//, '');
    if (currentPath !== activeTab) {
      window.history.pushState(null, '', `/${activeTab}`);
    }
  }, [activeTab, isLoggedIn]);

  // Sync URL popstate events back to activeTab state
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'dashboard';
      if (validTabs.includes(path)) {
        setActiveTab(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Clear URL to root upon logout
  useEffect(() => {
    if (!isLoggedIn) {
      window.history.replaceState(null, '', '/');
    }
  }, [isLoggedIn]);

  // Load profile from localStorage if present
  useEffect(() => {
    const local = localStorage.getItem('profile');
    if (local) {
      setProfile(JSON.parse(local));
    }
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setTransactions(data);
      localStorage.setItem('transactions', JSON.stringify(data));
    } catch (e) {
      try {
        const local = localStorage.getItem('transactions');
        if (local) {
          setTransactions(JSON.parse(local));
        } else {
          const res = await fetch('/data/transactions.json');
          const data = await res.json();
          setTransactions(data);
          localStorage.setItem('transactions', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      }
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await fetch('/api/budgets');
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setBudgets(data);
      localStorage.setItem('budgets', JSON.stringify(data));
    } catch (e) {
      try {
        const local = localStorage.getItem('budgets');
        if (local) {
          setBudgets(JSON.parse(local));
        } else {
          const res = await fetch('/data/budgets.json');
          const data = await res.json();
          setBudgets(data);
          localStorage.setItem('budgets', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Failed to fetch budgets:', err);
      }
    }
  };

  const fetchInvestments = async () => {
    try {
      const res = await fetch('/api/investments');
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setInvestments(data);
      localStorage.setItem('investments', JSON.stringify(data));
    } catch (e) {
      try {
        const local = localStorage.getItem('investments');
        if (local) {
          setInvestments(JSON.parse(local));
        } else {
          const res = await fetch('/data/investments.json');
          const data = await res.json();
          setInvestments(data);
          localStorage.setItem('investments', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Failed to fetch investments:', err);
      }
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setNotifications(data);
      localStorage.setItem('notifications', JSON.stringify(data));
    } catch (e) {
      try {
        const local = localStorage.getItem('notifications');
        if (local) {
          setNotifications(JSON.parse(local));
        } else {
          const res = await fetch('/data/notifications.json');
          const data = await res.json();
          setNotifications(data);
          localStorage.setItem('notifications', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    }
  };

  const refreshAll = () => {
    fetchTransactions();
    fetchBudgets();
    fetchInvestments();
    fetchNotifications();
  };

  useEffect(() => {
    if (isLoggedIn) {
      refreshAll();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      setProfile(prev => {
        const updated = {
          ...prev,
          name: user.displayName || "Guest User",
          email: user.email || "",
        };
        localStorage.setItem('profile', JSON.stringify(updated));
        return updated;
      });
    } else {
      const local = localStorage.getItem('profile');
      if (local) {
        setProfile(JSON.parse(local));
      } else {
        setProfile(initialProfile);
      }
    }
  }, [user]);

  const handleAddTransaction = async (newTx: Omit<Transaction, 'id'>) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const txWithTime = {
      ...newTx,
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: newTx.date.includes('T') ? newTx.date : `${newTx.date}T${timeStr}`
    };

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txWithTime),
      });
      if (!res.ok) throw new Error('API failed');
      fetchTransactions();
    } catch (e) {
      const local = localStorage.getItem('transactions');
      const list = local ? JSON.parse(local) : [];
      list.push(txWithTime);
      localStorage.setItem('transactions', JSON.stringify(list));
      setTransactions(list);
    }
  };

  const handleAddBudget = async (budget: Budget) => {
    try {
      const res = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(budget),
      });
      if (!res.ok) throw new Error('API failed');
      fetchBudgets();
    } catch (e) {
      const local = localStorage.getItem('budgets');
      const list = local ? JSON.parse(local) : [];
      const idx = list.findIndex((b: any) => b.category === budget.category);
      if (idx >= 0) {
        list[idx] = { ...list[idx], limit: list[idx].limit + budget.limit };
      } else {
        list.push(budget);
      }
      localStorage.setItem('budgets', JSON.stringify(list));
      setBudgets(list);
    }
  };

  const handleAddInvestment = async (investment: { name: string; amount: number; type: string }) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const dateTimeStr = `${dateStr}T${timeStr}`;

    const newInv = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: investment.name,
      amount: investment.amount,
      type: investment.type,
      date: dateStr
    };

    const newTx = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      description: `Investment: ${investment.name}`,
      category: 'Investment',
      amount: investment.amount,
      date: dateTimeStr,
      type: 'transfer' as const
    };

    try {
      const res1 = await fetch('/api/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInv),
      });
      if (!res1.ok) throw new Error('API failed');
      fetchInvestments();

      const res2 = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTx),
      });
      if (!res2.ok) throw new Error('API failed');
      fetchTransactions();
    } catch (e) {
      const localInvs = localStorage.getItem('investments');
      const invsList = localInvs ? JSON.parse(localInvs) : [];
      invsList.push(newInv);
      localStorage.setItem('investments', JSON.stringify(invsList));
      setInvestments(invsList);

      const localTxs = localStorage.getItem('transactions');
      const txsList = localTxs ? JSON.parse(localTxs) : [];
      txsList.push(newTx);
      localStorage.setItem('transactions', JSON.stringify(txsList));
      setTransactions(txsList);
    }
  };

  const handleBatchSetup = async (items: {
    transactions: Omit<Transaction, 'id'>[];
    budgets: Omit<Budget, 'id'>[];
  }) => {
    const newTxs = items.transactions.map((t, idx) => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      return {
        ...t,
        id: `tx_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 9)}`,
        date: t.date.includes('T') ? t.date : `${t.date}T${timeStr}`
      };
    });

    const newBudgets = items.budgets.map((b, idx) => ({
      ...b,
      id: `b_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 9)}`
    }));

    try {
      if (newTxs.length > 0) {
        const res1 = await fetch('/api/transactions/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTxs),
        });
        if (!res1.ok) throw new Error('API failed');
      }

      for (const b of newBudgets) {
        const res2 = await fetch('/api/budgets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(b),
        });
        if (!res2.ok) throw new Error('API failed');
      }

      refreshAll();
    } catch (e) {
      if (newTxs.length > 0) {
        const localTxs = localStorage.getItem('transactions');
        const txsList = localTxs ? JSON.parse(localTxs) : [];
        const updatedTxs = [...txsList, ...newTxs];
        localStorage.setItem('transactions', JSON.stringify(updatedTxs));
        setTransactions(updatedTxs);
      }

      const localBudgets = localStorage.getItem('budgets');
      const budgetsList = localBudgets ? JSON.parse(localBudgets) : [];
      for (const b of newBudgets) {
        const idx = budgetsList.findIndex((x: any) => x.category === b.category);
        if (idx >= 0) {
          budgetsList[idx] = { ...budgetsList[idx], limit: budgetsList[idx].limit + b.limit };
        } else {
          budgetsList.push(b);
        }
      }
      localStorage.setItem('budgets', JSON.stringify(budgetsList));
      setBudgets(budgetsList);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch('/api/notifications/read-all', { method: 'POST' });
      if (!res.ok) throw new Error('API failed');
      fetchNotifications();
    } catch (e) {
      const updated = notifications.map(n => ({ ...n, read: true }));
      localStorage.setItem('notifications', JSON.stringify(updated));
      setNotifications(updated);
    }
  };

  const handleRemoveNotification = async (id: string) => {
    try {
      const res = await fetch('/api/notifications/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('API failed');
      fetchNotifications();
    } catch (e) {
      const updated = notifications.filter(n => n.id !== id);
      localStorage.setItem('notifications', JSON.stringify(updated));
      setNotifications(updated);
    }
  };

  const handleUpdateTier = (tier: 'basic' | 'premium') => {
    setProfile(prev => {
      const updated = { ...prev, tier };
      localStorage.setItem('profile', JSON.stringify(updated));
      return updated;
    });
  };

  const setCurrency = (curr: string) => {
    setProfile(prev => {
      const updated = { ...prev, currency: curr };
      localStorage.setItem('profile', JSON.stringify(updated));
      return updated;
    });
  };

  if (initializing) {
    return (
      <div className="h-screen w-full bg-brand-bg flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-accent-blue/10 pointer-events-none"></div>
        <div className="flex flex-col items-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-16 h-16 border-4 border-accent-blue/30 border-t-accent-blue rounded-full mb-6 shadow-[0_0_30px_rgba(79,140,255,0.2)]"
          />
          <h2 className="text-xl font-bold font-display text-white tracking-wide">
            Loading Cash<span className="premium-gradient-text">Orbit</span>...
          </h2>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return <LandingPage onStart={startApp} />;
  }

  if (!isLoggedIn) {
     return <LoginScreen onLogin={() => {}} />;
  }

  const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-white overflow-hidden flex flex-col relative">
      {/* Background Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
       <Toaster
    position="bottom-right"
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
      style: {
        background: "#111827",
        color: "#fff",
        border: "1px solid #374151",
        borderRadius: "12px",
      },
    }}
  />
      <TopNav 
        profile={profile} 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        setActiveTab={setActiveTab}
        onLogout={logout}
        theme={theme}
        setTheme={setTheme}
      />
      
      <main className="flex-1 flex overflow-hidden w-full relative z-10">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={logout} isOpen={true} className="hidden md:flex" />
        
        {/* Mobile Sidebar overlay */}
        <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-64 h-full bg-brand-surface absolute top-0 left-0 shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            >
               <Sidebar activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setSidebarOpen(false); }} onLogout={logout} isOpen={true} className="flex h-full w-full" />
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
        
        <section className="flex-1 overflow-y-auto w-full scroll-smooth">
          <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto pb-32">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={activeTab}
                  className="text-3xl font-bold font-display text-white tracking-tight"
                >
                  {activeTab === 'dashboard' ? 'Financial Overview' : 
                   activeTab === 'analytics' ? 'Analytics Hub' :
                   activeTab === 'accounts' ? 'Assets & Accounts' : 
                   activeTab === 'transactions' ? 'Transactions' : 
                   activeTab === 'budgets' ? 'Budget Manager' :
                   activeTab === 'calendar' ? 'Financial Calendar' :
                   activeTab === 'ai' ? 'AI Assistant' :
                   activeTab === 'security' ? 'Security' :
                   activeTab === 'settings' ? 'Settings' :
                   activeTab === 'profile' ? 'Profile' :
                   activeTab === 'support' ? 'Support' : 'Overview'}
                </motion.h1>
                <p className="text-brand-muted text-sm mt-2">Manage your financial goals efficiently and beautifully.</p>
              </div>
              {activeTab === 'dashboard' && (
                <div className="bg-brand-surface p-1 rounded-2xl border border-brand-border flex items-center gap-1 shadow-inner shrink-0 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setViewMode('month')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      viewMode === 'month' 
                        ? 'bg-white text-black shadow-lg scale-100 font-extrabold' 
                        : 'text-brand-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Month View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('year')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      viewMode === 'year' 
                        ? 'bg-white text-black shadow-lg scale-100 font-extrabold' 
                        : 'text-brand-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Year View
                  </button>
                </div>
              )}
              {activeTab === 'transactions' && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden sm:inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-white text-black rounded-xl font-bold hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <Plus className="w-4 h-4" />
                  Add Transaction
                </button>
              )}
              {activeTab === 'budgets' && (
                <button
                  onClick={() => setIsBudgetModalOpen(true)}
                  className="hidden sm:inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-white text-black rounded-xl font-bold hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <Plus className="w-4 h-4" />
                  Add Budget
                </button>
              )}
              {activeTab === 'accounts' && (
                <button
                  onClick={() => setIsInvestmentModalOpen(true)}
                  className="hidden sm:inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-white text-black rounded-xl font-bold hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <Plus className="w-4 h-4" />
                  Add Investment
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <PageTransition key="dashboard">
                   <StatsCards transactions={transactions} investments={investments} currency={profile.currency} viewMode={viewMode} />
                   
                   <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      <div className="lg:col-span-3">
                        <CashFlowChart transactions={transactions} currency={profile.currency} />
                      </div>
                      <div className="lg:col-span-2">
                        <ExpenseChart transactions={transactions} currency={profile.currency} />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      <div className="lg:col-span-3 h-full">
                        <TransactionList transactions={transactions.slice(0, 5)} currency={profile.currency} />
                      </div>
                      <div className="lg:col-span-2 h-full">
                         <BudgetGoals budgets={budgets} transactions={transactions} currency={profile.currency} />
                      </div>
                   </div>
                </PageTransition>
              )}

              {activeTab === 'transactions' && (
                <PageTransition key="transactions">
                   <TransactionList transactions={transactions} currency={profile.currency} />
                </PageTransition>
              )}

              {activeTab === 'analytics' && (
                 <PageTransition key="analytics">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CashFlowChart transactions={transactions} currency={profile.currency} />
                    <ExpenseChart transactions={transactions} currency={profile.currency} />
                 </div>
                 </PageTransition>
              )}

              {activeTab === 'accounts' && (
                <PageTransition key="accounts">
                   <AccountsSummary transactions={transactions} investments={investments} currency={profile.currency} />
                   <div className="mt-8">
                     <h3 className="font-bold text-white text-lg mb-6">Asset Transfers & Adjustments</h3>
                     <TransactionList transactions={transactions.filter(t => t.type === 'transfer')} currency={profile.currency} />
                   </div>
                </PageTransition>
              )}

              {activeTab === 'budgets' && (
                 <PageTransition key="budgets">
                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                   <div className="lg:col-span-3 space-y-6">
                     <BudgetGoals budgets={budgets} transactions={transactions} currency={profile.currency} />
                     <RuleAdvisor transactions={transactions} currency={profile.currency} />
                   </div>
                   <div className="lg:col-span-2">
                     <SetupGoalForm onSetup={handleBatchSetup} currency={profile.currency} />
                   </div>
                 </div>
                 </PageTransition>
              )}

              {activeTab === 'calendar' && (
                 <PageTransition key="calendar">
                    <CalendarView transactions={transactions} currency={profile.currency} />
                 </PageTransition>
              )}

              {activeTab === 'ai' && (
                 <PageTransition key="ai">
                    <AIAssistantView />
                 </PageTransition>
              )}

              {activeTab === 'security' && (
                <PageTransition key="security">
                  <SecurityView />
                </PageTransition>
              )}
              
              {activeTab === 'settings' && (
                <PageTransition key="settings">
                  <SettingsView profile={profile} setCurrency={setCurrency} theme={theme} setTheme={setTheme} />
                </PageTransition>
              )}
              
              {activeTab === 'support' && (
                <PageTransition key="support">
                  <SupportView />
                </PageTransition>
              )}
              {activeTab === 'profile' && (
                <PageTransition key="profile">
                  <ProfileView profile={profile} setProfile={setProfile} transactions={transactions} currency={profile.currency} />
                </PageTransition>
              )}
            </AnimatePresence>

          </div>

          {activeTab === 'transactions' && (
            <button
                  onClick={() => setIsModalOpen(true)}
                  className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform z-30"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}

          {activeTab === 'budgets' && (
            <button
                  onClick={() => setIsBudgetModalOpen(true)}
                  className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform z-30"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </section>
      </main>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddTransaction} 
        currency={profile.currency}
      />
      
      <AddBudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        onAdd={handleAddBudget}
        currency={profile.currency}
      />
      
      <AddInvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        onAdd={handleAddInvestment}
        currency={profile.currency}
      />
    </div>
  );
}
