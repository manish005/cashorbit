import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Shield, Zap, CircleDollarSign, Star, Menu, X, Mail, TrendingUp, Sparkles, PieChart as PieIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const infographicData = [
  { name: 'Jan', NetWorth: 12000, Assets: 5000 },
  { name: 'Feb', NetWorth: 15500, Assets: 7200 },
  { name: 'Mar', NetWorth: 19200, Assets: 10800 },
  { name: 'Apr', NetWorth: 24800, Assets: 15400 },
  { name: 'May', NetWorth: 32000, Assets: 21000 },
  { name: 'Jun', NetWorth: 42500, Assets: 30000 },
];

export function LandingPage({ onStart }: { onStart: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, path: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', path);
  };

  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/features') {
      setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 200);
    } else if (path === '/testimonials') {
      setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 200);
    } else if (path === '/pricing') {
      setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 200);
    } else if (path === '/faq') {
      setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-white font-sans selection:bg-accent-blue/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center">
              <CircleDollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">CashOrbit</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium">
            <a href="/features" onClick={(e) => handleNavClick(e, 'features', '/features')} className="text-brand-muted hover:text-white transition-colors">Features</a>
            <a href="/testimonials" onClick={(e) => handleNavClick(e, 'testimonials', '/testimonials')} className="text-brand-muted hover:text-white transition-colors">Testimonials</a>
            <a href="/pricing" onClick={(e) => handleNavClick(e, 'pricing', '/pricing')} className="text-brand-muted hover:text-white transition-colors">Pricing</a>
            <a href="/faq" onClick={(e) => handleNavClick(e, 'faq', '/faq')} className="text-brand-muted hover:text-white transition-colors">FAQ</a>
            <button onClick={onStart} className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform">
              Get Started
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-bg pt-24 px-6 md:hidden">
            <div className="flex flex-col gap-6 text-lg font-medium">
              <a href="/features" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'features', '/features'); }}>Features</a>
              <a href="/testimonials" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'testimonials', '/testimonials'); }}>Testimonials</a>
              <a href="/pricing" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'pricing', '/pricing'); }}>Pricing</a>
              <button onClick={onStart} className="bg-white text-black px-6 py-3 rounded-full font-bold mt-4">
                Get Started
              </button>
            </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-accent-blue/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl text-left flex-1 relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-accent-blue mb-8">
            The Future of Personal Finance
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-tight">
            Master your money with <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">absolute clarity.</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-muted mb-12 max-w-xl">
            CashOrbit helps you track expenses, analyze cash flow, and achieve financial freedom through intelligent insights and an elegant experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onStart} className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 group shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Start Building Wealth
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="/features" onClick={(e) => handleNavClick(e, 'features', '/features')} className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition-colors text-center">
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Hero Interactive Financial Infographic */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }} 
           animate={{ opacity: 1, scale: 1 }} 
           transition={{ duration: 0.8, delay: 0.2 }} 
           className="flex-1 w-full max-w-xl relative z-10 glass-card p-6 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(79,140,255,0.1)] flex flex-col gap-6"
        >
          {/* Mock Header Metrics */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Estimated Net Worth</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold font-display text-white">$42,500.00</span>
                <span className="text-xs font-bold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +14.2%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-accent-purple">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Live Simulation</span>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="h-64 min-h-0 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={infographicData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWorth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f8cff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f8cff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#b0b0b0' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#b0b0b0' }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #374151', color: '#fff' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="NetWorth" stroke="#4f8cff" strokeWidth={3} fillOpacity={1} fill="url(#colorWorth)" />
                <Area type="monotone" dataKey="Assets" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAssets)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Mock Feature Highlights */}
          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <div className="flex gap-3 items-start p-3 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0">
                <PieIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">Compound Growth</p>
                <p className="text-[10px] text-brand-muted mt-0.5">Asset allocations model compound multipliers.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-accent-purple/10 text-accent-purple flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">Target Safe Deposit</p>
                <p className="text-[10px] text-brand-muted mt-0.5">Separate emergency ledgers protected locally.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Component */}
      <section id="features" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Everything you need</h2>
          <p className="text-brand-muted">Simple, powerful, and beautifully designed.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="text-accent-orange" />, title: "Real-time Tracking", desc: "Log your transactions instantly." },
            { icon: <CircleDollarSign className="text-accent-green" />, title: "Currency Swap", desc: "Multi-currency support baked right in." },
            { icon: <Shield className="text-accent-blue" />, title: "Bank-level Security", desc: "Your data is encrypted and completely private." }
          ].map((f, i) => (
             <motion.div key={i} whileHover={{ y: -5 }} className="glass-card p-8 rounded-3xl border border-white/5">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-brand-muted">{f.desc}</p>
             </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 bg-white/5 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
           <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center">Loved by thousands</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah J.", role: "Freelancer", text: "Finally an app that doesn't feel like a spreadsheet. Beautiful." },
                { name: "Marcus T.", role: "Entrepreneur", text: "The cross-currency support is flawless. Highly recommend!" },
                { name: "Elena R.", role: "Designer", text: "The UI is so clean. It makes managing money genuinely enjoyable." }
              ].map((t, i) => (
                <div key={i} className="glass-card p-8 rounded-3xl">
                   <div className="flex gap-1 text-accent-orange mb-4">
                     {[...Array(5)].map((_,j) => <Star key={j} className="w-4 h-4 fill-current"/>)}
                   </div>
                   <p className="text-lg mb-6 text-gray-300">"{t.text}"</p>
                   <div className="text-sm font-bold">{t.name}</div>
                   <div className="text-xs text-brand-muted tracking-wider uppercase">{t.role}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Pricing / Plans */}
      <section id="pricing" className="py-24 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-brand-muted mb-8">Start for free, upgrade when you need more power.</p>

        <div className="flex justify-center mb-16">
           <div className="bg-white/5 p-1 rounded-xl flex items-center shadow-inner border border-white/5">
              <button 
                 onClick={() => setIsYearly(false)} 
                 className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${!isYearly ? 'bg-white text-black shadow-md scale-105' : 'text-brand-muted hover:text-white'}`}
              >
                 Monthly
              </button>
              <button 
                 onClick={() => setIsYearly(true)} 
                 className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${isYearly ? 'bg-white text-black shadow-md scale-105' : 'text-brand-muted hover:text-white'}`}
              >
                 Yearly <span className="text-[10px] bg-accent-green/20 text-accent-green px-2 py-0.5 rounded-full ml-1 uppercase tracking-wider">Save</span>
              </button>
           </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="glass-card p-10 rounded-3xl border border-white/5 flex-1 relative text-left">
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <div className="text-4xl font-bold mb-6">₹{isYearly ? '800' : '80'}<span className="text-lg text-brand-muted font-normal">/{isYearly ? 'yr' : 'mo'}</span></div>
            <ul className="space-y-4 mb-8">
               {['Unlimited manual transactions', 'Basic analytics pane', '1 Base Currency'].map((f, i) => (
                 <li key={i} className="flex gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-brand-muted"/> {f}</li>
               ))}
            </ul>
            <button onClick={onStart} className="w-full py-3 rounded-xl font-bold border border-white/20 hover:bg-white/10 transition-colors">Get Started</button>
          </div>
          {/* Pro Plan */}
          <div className="glass-card p-10 rounded-3xl border border-accent-purple relative flex-1 text-left bg-accent-purple/5">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent-purple text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Most Popular</div>
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <div className="text-4xl font-bold mb-6">₹{isYearly ? '1300' : '150'}<span className="text-lg text-brand-muted font-normal">/{isYearly ? 'yr' : 'mo'}</span></div>
            <ul className="space-y-4 mb-8">
               {['Unlimited Bank connections', 'Advanced insights & forecasting', 'Unlimited Currency toggles', 'Priority Support'].map((f, i) => (
                 <li key={i} className="flex gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-accent-purple"/> {f}</li>
               ))}
            </ul>
            <button onClick={onStart} className="w-full py-3 rounded-xl font-bold bg-white text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">Upgrade to Premium</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 max-w-3xl mx-auto">
         <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-center">Frequently asked questions</h2>
         <div className="space-y-6">
            {[
              { q: 'Is my data secure?', a: 'Yes, we use AES-256 encryption. Your financial data is completely secure and private.' },
              { q: 'Can I change my base currency?', a: 'Absolutely. You can change your currency at any time from the Settings panel.' },
              { q: 'Is there a mobile app?', a: 'CashOrbit is fully responsive and works beautifully via your mobile browser as a PWA.' }
            ].map((faq, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border border-white/5">
                 <h4 className="font-bold mb-2">{faq.q}</h4>
                 <p className="text-brand-muted text-sm">{faq.a}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="bg-black py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
            <CircleDollarSign className="w-5 h-5 text-accent-blue" />
            <span className="font-display font-bold text-lg tracking-tight">CashOrbit</span>
          </div>
          <div className="flex gap-4 text-brand-muted text-sm">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                 <Mail className="w-4 h-4"/> support@cashorbit.co
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
