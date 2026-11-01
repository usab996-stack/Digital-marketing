import React, { useState } from 'react';
import { X, Lock, User, AtSign, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  onOpenGoogle: () => void;
  onOpenPhone: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onOpenGoogle,
  onOpenPhone,
}) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && !name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!username.trim()) {
      setErrorMessage('Please choose a username');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: mode === 'register' ? name.trim() : username.trim(),
        username: username.trim().toLowerCase().replace(/[^a-z0-9_]/g, ''),
        authProvider: 'credentials',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        isVip: true,
        savedItemIds: ['course-1', 'soft-1'],
      };
      setIsLoading(false);
      onSuccess(newUser);
      onClose();
    }, 600);
  };

  const handleFillDemo = () => {
    setName('Sagar Member');
    setUsername('sagar_vip');
    setPassword('sagar2025');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-md my-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Ambient Top Glow Line */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        {/* Modal Header */}
        <div className="pt-6 px-6 pb-4 flex items-center justify-between border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                SAGAR BRAND ACCESS
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">
              {mode === 'register' ? 'Create VIP Account' : 'Welcome Back'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* Mode Switcher Tabs */}
          <div className="flex rounded-lg bg-slate-950 p-1 mb-5 border border-slate-800">
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                mode === 'register'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              New Registration (Name & Pass)
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                mode === 'login'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Primary Form: Name, Username, Password */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sagar Usab"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Username
              </label>
              <div className="relative">
                <AtSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. sagar_brand_pro"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Remember me on this browser</span>
              </label>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-emerald-400 hover:underline"
              >
                Auto-fill Demo
              </button>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-bold rounded-lg text-sm transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'register' ? 'Register & Enter Vault' : 'Sign In to Sagar Brand'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-slate-900 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Sign-In Buttons as requested: Google & Phone Number */}
          <div className="space-y-2.5">
            {/* Google Sign In */}
            <button
              type="button"
              onClick={onOpenGoogle}
              className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 rounded-lg text-sm font-medium text-white transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Phone Number Sign In */}
            <button
              type="button"
              onClick={onOpenPhone}
              className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 rounded-lg text-sm font-medium text-white transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Sign in with Phone Number</span>
            </button>
          </div>

          {/* Guest preview button */}
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Or browse catalog as Guest first →
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500">
              Sagar Brand Official Hub · 100% Verified Courses & Softwares
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
