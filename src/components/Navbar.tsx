import React from 'react';
import { Sparkles, PlusCircle, Bookmark, ShieldCheck, User, LogOut } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  activeTab: 'courses' | 'software' | 'saved';
  setActiveTab: (tab: 'courses' | 'software' | 'saved') => void;
  onOpenAuth: () => void;
  onOpenLinkManager: () => void;
  onLogout: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenLinkManager,
  onLogout,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); setActiveTab('courses'); }}
          className="flex items-center gap-2 group whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <span className="font-bold text-base tracking-tighter">SB</span>
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            SAGAR BRAND
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('courses')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'courses' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Courses Vault
          </button>
          
          <button
            onClick={() => setActiveTab('software')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'software' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Software Tools
          </button>

          <button
            onClick={onOpenLinkManager}
            className="whitespace-nowrap shrink-0 text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Add / Manage Links</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white flex items-center gap-1.5 ${
              activeTab === 'saved' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Resources ({savedCount})</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLinkManager}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md hover:bg-emerald-500/20 transition-all whitespace-nowrap shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Tarteeb Se Add Karein</span>
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-emerald-400">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <p className="font-semibold text-white truncate max-w-[110px]">{user.name}</p>
                  <p className="text-slate-400 text-[11px] truncate max-w-[110px]">@{user.username}</p>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm hover:shadow-emerald-500/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>VIP Sign In</span>
            </button>
          )}
        </div>

      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="flex md:hidden items-center justify-around px-4 py-2 border-t border-slate-800/60 bg-slate-950 text-xs">
        <button
          onClick={() => setActiveTab('courses')}
          className={`py-1 ${activeTab === 'courses' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab('software')}
          className={`py-1 ${activeTab === 'software' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Softwares
        </button>
        <button
          onClick={onOpenLinkManager}
          className="py-1 text-emerald-400 flex items-center gap-1 font-medium"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add Link</span>
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`py-1 ${activeTab === 'saved' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Saved ({savedCount})
        </button>
      </div>
    </header>
  );
};
