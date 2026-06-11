import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Sparkles, User, Settings, Shield, HelpCircle, LogOut, Moon, Sun, X } from 'lucide-react';
import { UserProfile } from '../../core/types';
import { motion, AnimatePresence } from 'motion/react';

interface TopNavProps {
  profile: UserProfile;
  onMenuToggle: () => void;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  notifications: any[];
  onMarkAllRead: () => void;
  onRemoveNotification: (id: string) => void;
  onUpdateTier: (tier: 'basic' | 'premium') => void;
}

export function TopNav({
  profile,
  onMenuToggle,
  setActiveTab,
  onLogout,
  theme,
  setTheme,
  notifications = [],
  onMarkAllRead,
  onRemoveNotification,
  onUpdateTier
}: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasUnread = notifications.some(n => !n.read);

  return (
    <nav className="h-20 flex items-center justify-between px-6 sm:px-8 bg-brand-surface/80 backdrop-blur-xl border-b border-brand-border shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="md:hidden p-2 text-brand-muted hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>

        <div
          className="hidden sm:flex items-center gap-3 group cursor-pointer"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-accent-blue to-accent-purple rounded-xl flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(79,140,255,0.3)] group-hover:shadow-[0_0_30px_rgba(79,140,255,0.5)] transition-all">
            <div className="w-8 h-8 bg-brand-bg rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent-blue" strokeWidth={2.5} />
            </div>
          </div>
          <span className="text-2xl font-bold font-display tracking-tight text-white">
            Cash<span className="premium-gradient-text">Orbit</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5 sm:gap-8">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 bg-brand-card rounded-full border border-brand-border text-brand-muted hover:text-white hover:border-white/20 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 bg-brand-card rounded-full border border-brand-border text-brand-muted hover:text-white hover:border-white/20 transition-all"
          >
            <Bell className="w-5 h-5" />
            {hasUnread && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-accent-orange rounded-full border-2 border-brand-card shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-4 w-80 glass-card rounded-2xl p-5 z-50 origin-top-right"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-bold text-white uppercase tracking-wider">Notifications</p>
                  {hasUnread && (
                    <span
                      onClick={onMarkAllRead}
                      className="text-xs text-accent-blue cursor-pointer hover:underline"
                    >
                      Mark all read
                    </span>
                  )}
                </div>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-brand-muted text-xs text-center py-4">No notifications.</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="flex gap-4 items-start group relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${n.type === 'success' ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-orange/20 text-accent-orange'
                          }`}>
                          {n.type === 'success' ? <Sparkles className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 pr-6">
                          <p className={`font-semibold text-sm ${n.read ? 'text-brand-muted' : 'text-white'}`}>{n.title}</p>
                          <p className="text-xs text-brand-muted mt-1 leading-relaxed">{n.message}</p>
                          <p className="text-[10px] text-brand-muted/70 mt-2">{n.time}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); onRemoveNotification(n.id); }}
                          className="absolute right-0 top-1 p-1 text-brand-muted hover:text-white hover:bg-white/5 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-px bg-brand-border hidden sm:block"></div>

        <div className="relative" ref={profileMenuRef}>
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors">{profile.name}</p>
              <p className={`text-[10px] font-bold uppercase tracking-wider ${profile.tier === 'premium' ? 'text-accent-purple' : 'text-brand-muted'}`}>
                {profile.tier === 'premium' ? '👑 Premium Member' : '⭐ Basic Member'}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-accent-purple to-accent-blue shadow-lg">
              <div className="w-full h-full rounded-full bg-brand-bg flex items-center justify-center overflow-hidden">
                <span className="font-bold text-white text-sm sm:text-base">
                  {profile.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-4 w-48 glass-card rounded-2xl p-2 z-50 origin-top-right overflow-hidden"
              >
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveTab('profile'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors"
                  >
                    <User className="w-4 h-4 text-brand-muted" /> Profile
                  </button>
                  <button
                    onClick={() => { setActiveTab('settings'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-brand-muted" /> Settings
                  </button>
                  <button
                    onClick={() => { setActiveTab('security'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors"
                  >
                    <Shield className="w-4 h-4 text-brand-muted" /> Security
                  </button>
                  <button
                    onClick={() => { setActiveTab('support'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-brand-muted" /> Support
                  </button>
                  <div className="h-px bg-white/10 my-1"></div>
                  <button
                    onClick={() => {
                      const newTier = profile.tier === 'premium' ? 'basic' : 'premium';
                      onUpdateTier(newTier);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors text-accent-blue"
                  >
                    <Sparkles className="w-4 h-4" />Subscription Plan
                  </button>
                  <div className="h-px bg-white/10 my-1"></div>
                  <button
                    onClick={() => { onLogout(); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-accent-orange/10 text-accent-orange rounded-xl text-sm font-medium flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
