import React from 'react';
import { Search, Sparkles, PlusCircle, ArrowDown, ShieldCheck, Download, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTab: 'courses' | 'software' | 'saved';
  setActiveTab: (tab: 'courses' | 'software' | 'saved') => void;
  onOpenLinkManager: () => void;
  totalCourses: number;
  totalSoftwares: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onOpenLinkManager,
  totalCourses,
  totalSoftwares,
}) => {
  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      
      {/* Background Graphic with Scrim */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="/src/assets/images/hero_sagar_brand_1793506320862.jpg"
          alt="Sagar Brand Studio Workstation"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[1px] scale-105 transform"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/90 to-[#050811]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Brand Kicker */}
        <div className="flex items-center gap-2 mb-3 text-xs tracking-wider uppercase font-semibold text-emerald-400">
          <span>Official Sagar Brand Platform</span>
          <span aria-hidden="true">·</span>
          <span>Verified Links & Clean Releases</span>
        </div>

        {/* Hero Title */}
        <div className="max-w-3xl mb-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4 text-balance">
            Premium Courses & Softwares In One Organized Vault.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Har course aur software mukammal tarteeb aur verified links ke sath. Fast direct download links, backup mirrors, and syllabus guides curated directly under Sagar Brand.
          </p>
        </div>

        {/* Search & Actions Bar */}
        <div className="max-w-2xl mb-8">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, softwares, Adobe tools, Python, Figma, etc..."
              className="w-full pl-12 pr-28 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xl backdrop-blur-md outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Tabs & Tarteeb Link Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          
          {/* Segmented filter controls */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'courses'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Courses ({totalCourses})</span>
            </button>

            <button
              onClick={() => setActiveTab('software')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'software'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Softwares ({totalSoftwares})</span>
            </button>
          </div>

          {/* Add / Share Link CTA button for Sagar */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLinkManager}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-all"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Share & Add New Link (Tarteeb Manager)</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
