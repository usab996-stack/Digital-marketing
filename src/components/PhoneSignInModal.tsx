import React, { useState } from 'react';
import { X, Phone, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface PhoneSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const PhoneSignInModal: React.FC<PhoneSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [countryCode, setCountryCode] = useState('+92');
  const [phoneNumber, setPhoneNumber] = useState('3001234567');
  const [fullName, setFullName] = useState('Sagar Member');
  const [otpCode, setOtpCode] = useState(['7', '8', '6', '9', '0', '2']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 7) {
      setErrorMsg('Please enter a valid phone number');
      return;
    }
    setErrorMsg('');
    setStep('otp');
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpCode];
    updated[index] = val;
    setOtpCode(updated);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpCode.join('');
    if (fullOtp.length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const newUser: UserProfile = {
        id: `phone-${Date.now()}`,
        name: fullName || `Member ${phoneNumber.slice(-4)}`,
        username: `sagar_user_${phoneNumber.slice(-4)}`,
        phoneNumber: `${countryCode} ${phoneNumber}`,
        authProvider: 'phone',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        isVip: true,
        savedItemIds: ['course-1', 'soft-4'],
      };
      setIsVerifying(false);
      onSuccess(newUser);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Phone Authentication</h3>
              <p className="text-xs text-slate-400">Direct instant VIP verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sagar Member"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-28 px-2.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="+92">🇵🇰 +92</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+880">🇧🇩 +880</option>
                  </select>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="300 1234567"
                    className="flex-1 px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white text-sm outline-none transition-colors"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  We will send a 6-digit confirmation code via SMS.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span>Send Verification Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-xs text-slate-400">
                  Verification code sent to{' '}
                  <span className="text-emerald-400 font-medium">
                    {countryCode} {phoneNumber}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-slate-500 hover:text-slate-300 underline mt-1"
                >
                  Change phone number
                </button>
              </div>

              {/* 6 Digit Input Boxes */}
              <div className="flex justify-between gap-2">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-bold rounded-lg bg-slate-950 border border-slate-800 focus:border-emerald-400 text-white outline-none transition-all"
                  />
                ))}
              </div>

              <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Demo Code pre-filled: <strong>786902</strong> (or enter your code)</span>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify & Enter Sagar Vault</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted VIP Access · Sagar Brand Security</span>
          </div>

        </div>

      </div>
    </div>
  );
};
