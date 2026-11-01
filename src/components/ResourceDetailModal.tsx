import React, { useState } from 'react';
import { X, ExternalLink, Download, Copy, Check, ShieldCheck, Bookmark, FileText, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { CourseItem, SoftwareItem } from '../types';

interface ResourceDetailModalProps {
  item: CourseItem | SoftwareItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  item,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!item) return null;

  const isCourse = item.type === 'course';
  const course = isCourse ? (item as CourseItem) : null;
  const software = !isCourse ? (item as SoftwareItem) : null;

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner Image */}
        <div className="relative aspect-[21/9] w-full bg-slate-950 overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-semibold text-emerald-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-emerald-500/20">
              {item.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 leading-snug">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pb-4 border-b border-slate-800">
            {isCourse && course && (
              <>
                <span>Level: <strong>{course.level}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Duration: <strong>{course.duration}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Modules: <strong>{course.modulesCount}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Instructor: <strong>{course.instructor}</strong></span>
              </>
            )}

            {!isCourse && software && (
              <>
                <span>Version: <strong className="font-mono">{software.version}</strong></span>
                <span aria-hidden="true">·</span>
                <span>File Size: <strong className="font-mono">{software.fileSize}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Platform: <strong>{software.platform}</strong></span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Safe
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Overview</h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Course Syllabus Details */}
          {isCourse && course && course.syllabus && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Curriculum Syllabus ({course.syllabus.length} Sections)
              </h4>
              <div className="space-y-3">
                {course.syllabus.map((sec, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                      <span>{sec.title}</span>
                      <span className="text-emerald-400 font-mono">{sec.duration}</span>
                    </div>
                    <ul className="space-y-1">
                      {sec.topics.map((t, tIdx) => (
                        <li key={tIdx} className="text-xs text-slate-400 flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Software Installation Guide */}
          {!isCourse && software && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  System Requirements
                </h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                  {software.systemRequirements}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Step-by-Step Installation & Setup
                </h4>
                <div className="space-y-2">
                  {software.installSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/60">
                      <span className="font-mono text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Direct Links Action Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Direct Sagar Brand Access Links</span>
            </h4>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                onClick={() => {
                  const url = isCourse ? course?.primaryLink : software?.downloadUrl;
                  if (url) window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="flex-1 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{isCourse ? 'Open Primary Course Drive / Link' : 'Download Verified Software'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Mirror Link */}
              {((isCourse && course?.mirrorLink) || (!isCourse && software?.mirrorUrl)) && (
                <button
                  onClick={() => {
                    const url = isCourse ? course?.mirrorLink : software?.mirrorUrl;
                    if (url) window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Backup Mirror</span>
                </button>
              )}

              {/* Copy URL */}
              <button
                onClick={() => handleCopy(isCourse ? (course?.primaryLink || '') : (software?.downloadUrl || ''))}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                title="Copy link to clipboard"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
