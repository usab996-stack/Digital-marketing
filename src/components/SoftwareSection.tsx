import React, { useState } from 'react';
import { Download, ExternalLink, Copy, Check, Bookmark, ShieldCheck, HardDrive, Info, ArrowUpRight } from 'lucide-react';
import { SoftwareItem } from '../types';

interface SoftwareSectionProps {
  softwares: SoftwareItem[];
  savedItemIds: string[];
  onToggleSave: (id: string) => void;
  onSelectSoftware: (software: SoftwareItem) => void;
}

export const SoftwareSection: React.FC<SoftwareSectionProps> = ({
  softwares,
  savedItemIds,
  onToggleSave,
  onSelectSoftware,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(softwares.map(s => s.category)))];

  const filteredSoftwares = selectedCategory === 'All'
    ? softwares
    : softwares.filter(s => s.category === selectedCategory);

  const handleCopyLink = (software: SoftwareItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(software.downloadUrl);
    setCopiedId(software.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section className="py-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
            Verified Tools & Suites
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Sagar Brand Software Vault
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing <span className="text-white font-semibold">{filteredSoftwares.length}</span> checked softwares
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Softwares Grid */}
      {filteredSoftwares.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <HardDrive className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-400">No software items found matching this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSoftwares.map((soft) => {
            const isSaved = savedItemIds.includes(soft.id);
            const isCopied = copiedId === soft.id;

            return (
              <div
                key={soft.id}
                onClick={() => onSelectSoftware(soft)}
                className="group relative flex flex-col justify-between bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-emerald-950/20 transition-all cursor-pointer"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={soft.thumbnail}
                    alt={soft.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Category text badge */}
                  <div className="absolute top-3 left-3 text-[11px] font-semibold text-emerald-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-emerald-500/20">
                    {soft.category}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleSave(soft.id); }}
                    className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                      isSaved
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                    title={isSaved ? 'Remove bookmark' : 'Bookmark software'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {/* Platform & Size */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-medium">
                    <span>{soft.platform}</span>
                    <span className="font-mono tabular-nums">{soft.fileSize}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span className="font-mono">{soft.version}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Clean Tested
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                      {soft.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {soft.description}
                    </p>

                    {/* System Requirements snippet */}
                    <div className="text-[11px] text-slate-400 line-clamp-1 mb-4">
                      Req: {soft.systemRequirements}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(soft.downloadUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Direct Download</span>
                    </button>

                    <button
                      onClick={(e) => handleCopyLink(soft, e)}
                      title="Copy Download URL"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectSoftware(soft); }}
                      title="View Install & Activation Guide"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
