import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Bookmark, BookOpen, Layers, Star, Users, ArrowUpRight } from 'lucide-react';
import { CourseItem } from '../types';

interface CoursesSectionProps {
  courses: CourseItem[];
  savedItemIds: string[];
  onToggleSave: (id: string) => void;
  onSelectCourse: (course: CourseItem) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  savedItemIds,
  onToggleSave,
  onSelectCourse,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(c => c.category === selectedCategory);

  const handleCopyLink = (course: CourseItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(course.primaryLink);
    setCopiedId(course.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section className="py-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
            Curated Academic & Tech Tracks
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Sagar Brand Course Catalog
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing <span className="text-white font-semibold">{filteredCourses.length}</span> structured courses
        </div>
      </div>

      {/* Interactive Category Filter Buttons */}
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

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-400">No courses found matching your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isSaved = savedItemIds.includes(course.id);
            const isCopied = copiedId === course.id;

            return (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="group relative flex flex-col justify-between bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-emerald-950/20 transition-all cursor-pointer"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Category text watermark overlay */}
                  <div className="absolute top-3 left-3 text-[11px] font-semibold text-emerald-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-emerald-500/20">
                    {course.category}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleSave(course.id); }}
                    className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                      isSaved
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                    title={isSaved ? 'Remove bookmark' : 'Bookmark course'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {/* Duration & Modules Strip */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-medium">
                    <span className="truncate">{course.duration}</span>
                    <span>{course.modulesCount} Modules</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>{course.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {course.rating.toFixed(1)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{course.studentsCount.toLocaleString()} enrolled</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {course.description}
                    </p>

                    {/* Instructor */}
                    <div className="text-xs text-slate-400 mb-4">
                      Mentor: <span className="text-slate-200 font-medium">{course.instructor}</span>
                    </div>
                  </div>

                  {/* Action Buttons & Links */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(course.primaryLink, '_blank', 'noopener,noreferrer');
                      }}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Open Course Link</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => handleCopyLink(course, e)}
                      title="Copy Primary Link"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectCourse(course); }}
                      title="View Syllabus & Outline"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      <Layers className="w-4 h-4" />
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
