import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from 'firebase/auth';
import { toast } from 'react-hot-toast';

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent.");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!email || !password || (isRegister && !name)) {
      alert("Please fill all required fields.");
      return;
    }
    setIsLoading(true);

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name,
        });
        await auth.currentUser?.reload();
        console.log(auth.currentUser?.displayName);
        onLogin();
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user);
        onLogin();
      }
    } catch (error: any) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already exists.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;
        case "auth/weak-password":
          toast.error("Password must be at least 6 characters.");
          break;
        case "auth/user-not-found":
          toast.error("No account found.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;
        case "auth/invalid-credential":
          toast.error("Invalid email or password.");
          break;
        default:
          toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-brand-bg flex flex-col justify-center items-center p-4 relative overflow-y-auto overflow-x-hidden">
      {/* Background Orbit/Glow Effects */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 bg-transparent pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10 bg-transparent pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] bg-accent-blue/10 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass-card p-6 sm:p-8 rounded-3xl relative z-10 my-auto"
      >
        <div className="flex flex-col items-center mb-6">
           <motion.div 
             initial={{ rotate: -180, scale: 0 }}
             animate={{ rotate: 0, scale: 1 }}
             transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
             className="w-14 h-14 bg-gradient-to-tr from-accent-blue to-accent-purple rounded-2xl flex items-center justify-center text-white mb-4 shadow-[0_0_30px_rgba(79,140,255,0.4)]"
           >
              <div className="w-10 h-10 bg-brand-bg rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-blue" strokeWidth={2.5} />
              </div>
          </motion.div>
          <h2 className="text-2xl font-bold font-display text-white tracking-tight mb-1">
            Cash<span className="premium-gradient-text">Orbit</span>
          </h2>
          <p className="text-brand-muted text-xs font-medium tracking-wide uppercase">Master Your Money</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl mb-6">
          <button 
             onClick={() => setIsRegister(false)}
             className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${!isRegister ? 'bg-white/10 text-white shadow-sm' : 'text-brand-muted hover:text-white'}`}
          >
             Log In
          </button>
          <button 
             onClick={() => setIsRegister(true)}
             className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${isRegister ? 'bg-white/10 text-white shadow-sm' : 'text-brand-muted hover:text-white'}`}
          >
             Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <AnimatePresence mode="popLayout">
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted group-focus-within:text-accent-blue transition-colors" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-brand-surface/50 border border-brand-border rounded-xl focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all text-sm text-white placeholder:text-brand-border"
                    required={isRegister}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1.5">Email Identity</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted group-focus-within:text-accent-blue transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-brand-surface/50 border border-brand-border rounded-xl focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all text-sm text-white placeholder:text-brand-border"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1.5">Secure Passcode</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted group-focus-within:text-accent-blue transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-brand-surface/50 border border-brand-border rounded-xl focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all text-sm text-white placeholder:text-brand-border"
                required
              />
            </div>
            {!isRegister && (
              <div className="text-right mt-1.5">
                 <a href="#" className="text-[10px] text-accent-blue hover:text-white transition-colors" onClick={handleForgotPassword}>
                   Forgot Password?
                 </a>
              </div>
            )}
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {isLoading ? (
                <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                   className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : (
                <>
                  {isRegister ? 'Create Account' : 'Enter Orbit'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center border-t border-brand-border pt-4">
          <p className="text-[10px] text-brand-muted font-bold uppercase tracking-wider mb-3">Or continue with</p>
          <div className="grid grid-cols-2 gap-3">
             <button className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors" onClick={handleGoogleLogin}>
                 <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                 <span className="text-xs font-bold text-white">Google</span>
             </button>
             <button className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="text-xs font-bold text-white">Facebook</span>
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
