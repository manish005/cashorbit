import React, { useState, useEffect } from 'react';
import { Shield, Key, Lock, Settings as SettingsIcon, Bell, HelpCircle, Mail, MessageSquare, User, Trophy, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { EXCHANGE_RATES, formatCurrency } from '../lib/utils';
import { UserProfile, Transaction } from '../core/types';
import { parseISO, format } from 'date-fns';

export function ProfileView({
  profile,
  setProfile,
  transactions,
  currency
}: {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  transactions: Transaction[];
  currency: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
  }, [profile]);

  const handleSave = () => {
    setProfile({ ...profile, name, email });
    setIsEditing(false);
  };

  // Calculate best month (highest savings)
  const monthlySavings: Record<string, number> = {};
  transactions.forEach(t => {
    const monthKey = format(parseISO(t.date), 'MMM yyyy');
    if (!monthlySavings[monthKey]) monthlySavings[monthKey] = 0;
    if (t.type === 'income') monthlySavings[monthKey] += t.amount;
    if (t.type === 'expense') monthlySavings[monthKey] -= t.amount;
  });

  let bestMonth = '-';
  let bestMonthSavings = 0;

  Object.entries(monthlySavings).forEach(([month, savings]) => {
    if (savings > bestMonthSavings) {
      bestMonthSavings = savings;
      bestMonth = month;
    }
  });

  // Calculate running balance and find the highest balance
  let highestBalance = 0;
  let runningBalance = 0;
  const sortedTrans = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  sortedTrans.forEach(t => {
    if (t.type === 'income') runningBalance += t.amount;
    if (t.type === 'expense') runningBalance -= t.amount;
    if (runningBalance > highestBalance) highestBalance = runningBalance;
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="glass-card p-8 rounded-3xl border border-white/5">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-accent-purple" /> My Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-accent-purple to-accent-blue shadow-lg shrink-0">
                <div className="w-full h-full rounded-full bg-brand-bg flex items-center justify-center overflow-hidden">
                  <span className="font-bold text-white text-2xl">
                    {name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display flex items-center gap-2">
                  {name}
                </h3>
                <p className="text-brand-muted">{email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                ) : (
                  <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/5">{name}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                ) : (
                  <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/5">{email}</div>
                )}
              </div>

              <div className="pt-4">
                {isEditing ? (
                  <div className="flex gap-4">
                    <button onClick={handleSave} className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform">Save Changes</button>
                    <button onClick={() => setIsEditing(false)} className="px-6 py-3 border border-white/20 font-bold rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="w-full py-3 border border-white/20 font-bold rounded-xl hover:bg-white/5 transition-colors">Edit Profile</button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-accent-purple/20 to-transparent border border-accent-purple/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent-purple/20 rounded-lg text-accent-purple"><Trophy className="w-5 h-5" /></div>
                <h4 className="font-bold text-lg">Highest Balance Score</h4>
              </div>
              <p className="text-3xl font-bold font-display text-white mb-1">{formatCurrency(highestBalance, currency)}</p>
              <p className="text-brand-muted text-sm">Peak portfolio value achieved</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue"><TrendingUp className="w-5 h-5" /></div>
                <h4 className="font-bold text-lg">Best Month</h4>
              </div>
              <p className="text-3xl font-bold font-display text-white mb-1">{bestMonth}</p>
              <div className="mt-4 flex gap-4">
                <div className="inline-block px-3 py-1 bg-accent-green/20 text-accent-green rounded-full text-sm font-bold border border-accent-green/20">
                  +{formatCurrency(bestMonthSavings, currency)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-border">
          <h3 className="text-lg font-bold mb-4 font-display">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
              <span className="text-brand-muted text-sm font-bold uppercase tracking-wider">Member Since</span>
              <span className="font-medium text-white">{format(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), 'MMMM yyyy')}</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
              <span className="text-brand-muted text-sm font-bold uppercase tracking-wider">Account Tier</span>
              <span className="font-medium text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SecurityView() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="glass-card p-8 rounded-3xl border border-white/5">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent-green" /> Security Settings
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-white/10 rounded-xl"><Key className="w-5 h-5 text-brand-muted" /></div>
              <div>
                <h4 className="font-bold">Password</h4>
                <p className="text-sm text-brand-muted">Last changed 3 months ago</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">Update</button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-white/10 rounded-xl"><Lock className="w-5 h-5 text-brand-muted" /></div>
              <div>
                <h4 className="font-bold">Two-Factor Authentication</h4>
                <p className="text-sm text-brand-muted">Add an extra layer of security</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white text-black hover:bg-slate-200 rounded-xl text-sm font-bold transition-colors">Enable 2FA</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsView({
  profile,
  setCurrency,
  theme,
  setTheme
}: {
  profile: UserProfile;
  setCurrency: (c: string) => void;
  theme: string;
  setTheme: (t: 'dark' | 'light') => void;
}) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="glass-card p-8 rounded-3xl border border-white/5">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-accent-blue" /> App Settings
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-muted mb-4">Currency Configuration</h3>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <label className="block text-sm font-bold mb-2">Base Currency</label>
              <p className="text-xs text-brand-muted mb-4">Select the currency to display your portfolio value in. Values will be live-converted based on standard exchange rates.</p>
              <select
                value={profile.currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
              >
                {Object.keys(EXCHANGE_RATES).map(curr => (
                  <option key={curr} value={curr}>{curr} (Rate: {EXCHANGE_RATES[curr]})</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-muted mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-white/10 rounded-xl"><Bell className="w-5 h-5 text-brand-muted" /></div>
                  <div>
                    <h4 className="font-bold">Notifications</h4>
                    <p className="text-sm text-brand-muted">Monthly summaries and budget alerts</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-accent-blue rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SupportView() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="glass-card p-8 rounded-3xl border border-white/5">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-accent-orange" /> Help & Support
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold mb-2">Email Support</h3>
            <p className="text-sm text-brand-muted mb-4">Get help from our team within 24 hours.</p>
            <div className="text-accent-blue text-sm font-bold">Contact Support &rarr;</div>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold mb-2">Community Forum</h3>
            <p className="text-sm text-brand-muted mb-4">Join 10k+ users in our community discussions.</p>
            <div className="text-accent-blue text-sm font-bold">Visit Forum &rarr;</div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-bold mb-4">Quick FAQs</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
              <span>How do I export my data?</span>
              <span className="text-brand-muted">+</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
              <span>How are currency conversions calculated?</span>
              <span className="text-brand-muted">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
