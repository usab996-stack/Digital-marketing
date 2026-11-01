import React from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenLinkManager: () => void;
  onOpenAuth: () => void;
  setActiveTab: (tab: 'courses' | 'software' | 'saved') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLinkManager,
  onOpenAuth,
  setActiveTab,
}) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Note */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              SB
            </div>
            <div>
              <p className="font-bold text-white tracking-tight text-sm">SAGAR BRAND</p>
              <p className="text-slate-500 text-[11px]">Elite Courses, Software & Digital Vault</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button
              onClick={() => setActiveTab('courses')}
              className="hover:text-emerald-400 transition-colors"
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('software')}
              className="hover:text-emerald-400 transition-colors"
            >
              Softwares
            </button>
            <button
              onClick={onOpenLinkManager}
              className="hover:text-emerald-400 transition-colors"
            >
              Link Manager (Tarteeb)
            </button>
            <button
              onClick={onOpenAuth}
              className="hover:text-emerald-400 transition-colors"
            >
              VIP Portal
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right text-[11px] text-slate-500">
            <span>© {new Date().getFullYear()} Sagar Brand. All links verified & organized.</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
