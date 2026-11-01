import React, { useState } from 'react';
import { X, CheckCircle2, Shield } from 'lucide-react';
import { UserProfile } from '../types';

interface GoogleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectAccount = (accountName: string, email: string) => {
    setSelectedAccount(email);
    setIsProcessing(true);

    setTimeout(() => {
      const newUser: UserProfile = {
        id: `google-${Date.now()}`,
        name: accountName,
        username: email.split('@')[0],
        email: email,
        avatarUrl: '',
        authProvider: 'google',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        isVip: true,
        savedItemIds: ['course-1', 'soft-1'],
      };
      setIsProcessing(false);
      onSuccess(newUser);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <h3 className="font-semibold text-slate-900 text-base">Sign in with Google</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Selector Body */}
        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">
            Choose an account to continue to <span className="font-semibold text-slate-900">Sagar Brand Vault</span>
          </p>

          <div className="space-y-2.5">
            {/* Account 1 */}
            <button
              onClick={() => handleSelectAccount('Sagar Usab', 'usab996@gmail.com')}
              disabled={isProcessing}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  SU
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Sagar Usab</div>
                  <div className="text-xs text-slate-500">usab996@gmail.com</div>
                </div>
              </div>
              {selectedAccount === 'usab996@gmail.com' && isProcessing ? (
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              )}
            </button>

            {/* Account 2 */}
            <button
              onClick={() => handleSelectAccount('Sagar Brand Official', 'sagar.brand.official@gmail.com')}
              disabled={isProcessing}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  SB
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Sagar Brand Official</div>
                  <div className="text-xs text-slate-500">sagar.brand.official@gmail.com</div>
                </div>
              </div>
              {selectedAccount === 'sagar.brand.official@gmail.com' && isProcessing && (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>To continue, Google will share your name and email address with Sagar Brand.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
