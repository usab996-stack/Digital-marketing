import React, { useState } from 'react';
import { X, Plus, ListOrdered, UploadCloud, ArrowUp, ArrowDown, Trash2, Check, ExternalLink, Sparkles, Link as LinkIcon, BookOpen, HardDrive } from 'lucide-react';
import { CourseItem, SoftwareItem } from '../types';

interface LinkManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: CourseItem[];
  softwares: SoftwareItem[];
  onAddCourse: (course: CourseItem) => void;
  onAddSoftware: (software: SoftwareItem) => void;
  onDeleteCourse: (id: string) => void;
  onDeleteSoftware: (id: string) => void;
  onReorderCourses: (courses: CourseItem[]) => void;
  onReorderSoftwares: (softwares: SoftwareItem[]) => void;
}

export const LinkManagerModal: React.FC<LinkManagerModalProps> = ({
  isOpen,
  onClose,
  courses,
  softwares,
  onAddCourse,
  onAddSoftware,
  onDeleteCourse,
  onDeleteSoftware,
  onReorderCourses,
  onReorderSoftwares,
}) => {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk' | 'reorder'>('single');
  
  // Single form state
  const [resourceType, setResourceType] = useState<'course' | 'software'>('course');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [primaryLink, setPrimaryLink] = useState('');
  const [mirrorLink, setMirrorLink] = useState('');
  const [description, setDescription] = useState('');
  const [extraField1, setExtraField1] = useState(''); // Duration or Version
  const [extraField2, setExtraField2] = useState(''); // Modules or File Size
  const [successToast, setSuccessToast] = useState('');

  // Bulk links paste state
  const [bulkText, setBulkText] = useState(
    'Python AI Masterclass | https://drive.google.com/drive/folders/demo-python | AI & Python\nCapCut Pro PC Full Version | https://mega.nz/file/demo-capcut | Video Editing\nFigma 2025 UI Kit | https://drive.google.com/drive/folders/demo-figma | Design & UI/UX'
  );

  if (!isOpen) return null;

  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !primaryLink.trim()) return;

    if (resourceType === 'course') {
      const newCourse: CourseItem = {
        id: `course-${Date.now()}`,
        type: 'course',
        title: title.trim(),
        category: category.trim() || 'General Course',
        description: description.trim() || 'Premium curated course shared by Sagar Brand.',
        instructor: 'Sagar & Mentors',
        level: 'Masterclass',
        duration: extraField1.trim() || '24 Hours',
        modulesCount: parseInt(extraField2.trim()) || 12,
        rating: 4.9,
        studentsCount: 120,
        primaryLink: primaryLink.trim(),
        mirrorLink: mirrorLink.trim() || undefined,
        telegramLink: 'https://t.me/sagarbrand_vip',
        thumbnail: '/src/assets/images/course_masterclass_banner_1793506322464.jpg',
        tags: [category.trim() || 'Courses', 'Sagar Brand'],
        syllabus: [
          {
            title: 'Section 1: Core Lectures & Practical Demos',
            duration: extraField1.trim() || '12 Hours',
            topics: ['Complete video series', 'Project files & exercise assets', 'Direct mentor notes']
          }
        ],
        order: courses.length + 1,
      };
      onAddCourse(newCourse);
    } else {
      const newSoftware: SoftwareItem = {
        id: `soft-${Date.now()}`,
        type: 'software',
        title: title.trim(),
        category: category.trim() || 'Utility Tools',
        description: description.trim() || 'Verified high-speed software release tested clean by Sagar Brand.',
        version: extraField1.trim() || 'v2025.1',
        fileSize: extraField2.trim() || '1.2 GB',
        platform: 'Windows',
        verifiedClean: true,
        downloadUrl: primaryLink.trim(),
        mirrorUrl: mirrorLink.trim() || undefined,
        thumbnail: '/src/assets/images/software_vault_banner_1793506321691.jpg',
        tags: [category.trim() || 'Tools', 'Clean'],
        installSteps: [
          'Extract downloaded archive using 7-Zip or WinRAR.',
          'Run Setup.exe as Administrator.',
          'Follow the on-screen prompts to complete installation.'
        ],
        systemRequirements: 'Windows 10/11 64-bit · 8 GB RAM',
        order: softwares.length + 1,
      };
      onAddSoftware(newSoftware);
    }

    setSuccessToast(`"${title}" successfully added in order!`);
    setTitle('');
    setCategory('');
    setPrimaryLink('');
    setMirrorLink('');
    setDescription('');
    setExtraField1('');
    setExtraField2('');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleProcessBulk = () => {
    const lines = bulkText.split('\n').filter(l => l.trim().length > 0);
    let countAdded = 0;

    lines.forEach((line, idx) => {
      const parts = line.split('|').map(p => p.trim());
      const itemTitle = parts[0] || `Resource #${idx + 1}`;
      const itemLink = parts[1] || 'https://drive.google.com';
      const itemCat = parts[2] || 'Shared by Sagar';

      const isLikelySoftware = itemTitle.toLowerCase().includes('pro') || 
                               itemTitle.toLowerCase().includes('v') || 
                               itemTitle.toLowerCase().includes('suite') ||
                               itemTitle.toLowerCase().includes('pc');

      if (isLikelySoftware) {
        onAddSoftware({
          id: `soft-bulk-${Date.now()}-${idx}`,
          type: 'software',
          title: itemTitle,
          category: itemCat,
          description: 'Verified resource added via Sagar Brand bulk link manager.',
          version: 'Latest 2025',
          fileSize: '500 MB',
          platform: 'Windows',
          verifiedClean: true,
          downloadUrl: itemLink,
          thumbnail: '/src/assets/images/software_vault_banner_1793506321691.jpg',
          tags: ['Bulk Import', itemCat],
          installSteps: ['Extract and run setup.'],
          systemRequirements: 'Windows 10/11 64-bit',
          order: softwares.length + idx + 1,
        });
      } else {
        onAddCourse({
          id: `course-bulk-${Date.now()}-${idx}`,
          type: 'course',
          title: itemTitle,
          category: itemCat,
          description: 'Comprehensive course series added via Sagar Brand bulk link manager.',
          instructor: 'Sagar Mentors',
          level: 'Masterclass',
          duration: '20 Hours',
          modulesCount: 10,
          rating: 4.9,
          studentsCount: 200,
          primaryLink: itemLink,
          thumbnail: '/src/assets/images/course_masterclass_banner_1793506322464.jpg',
          tags: ['Bulk Import', itemCat],
          syllabus: [{ title: 'Full Curriculum', duration: '20 Hours', topics: ['All course contents & links'] }],
          order: courses.length + idx + 1,
        });
      }
      countAdded++;
    });

    setSuccessToast(`Successfully imported ${countAdded} links in order!`);
    setBulkText('');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const moveCourse = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= courses.length) return;
    const reordered = [...courses];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    onReorderCourses(reordered);
  };

  const moveSoftware = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= softwares.length) return;
    const reordered = [...softwares];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    onReorderSoftwares(reordered);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Sagar Brand Link & Sequence Manager</h2>
              <p className="text-xs text-slate-400">Aap ke tamam courses aur softwares ke links tarteeb se add karein</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 border-b border-slate-800/80 flex items-center gap-2 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'single'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Add New Link
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'bulk'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Bulk Links Import
          </button>
          <button
            onClick={() => setActiveTab('reorder')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'reorder'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Tarteeb / Reorder ({courses.length + softwares.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {successToast && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {/* TAB 1: Single Link Form */}
          {activeTab === 'single' && (
            <form onSubmit={handleAddSingle} className="space-y-4">
              
              {/* Type selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Select Resource Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setResourceType('course')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      resourceType === 'course'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Course Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setResourceType('software')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      resourceType === 'software'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <HardDrive className="w-4 h-4" />
                    <span>Software Link</span>
                  </button>
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Title / Name *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={resourceType === 'course' ? 'e.g. Next.js 15 Full Course' : 'e.g. Adobe Premiere Pro 2025'}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder={resourceType === 'course' ? 'Web Development, AI, Editing...' : 'Creative, Utilities, Dev...'}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Primary & Mirror Links */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Primary Link (Google Drive, Mega, Direct URL) *
                </label>
                <input
                  type="url"
                  value={primaryLink}
                  onChange={(e) => setPrimaryLink(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Backup Mirror Link (Optional)
                </label>
                <input
                  type="url"
                  value={mirrorLink}
                  onChange={(e) => setMirrorLink(e.target.value)}
                  placeholder="https://mega.nz/folder/..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {/* Extra Dynamic Specs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {resourceType === 'course' ? 'Duration (e.g. 35 Hours)' : 'Version (e.g. v2025.2)'}
                  </label>
                  <input
                    type="text"
                    value={extraField1}
                    onChange={(e) => setExtraField1(e.target.value)}
                    placeholder={resourceType === 'course' ? '30 Hours' : 'v2025.2.1'}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {resourceType === 'course' ? 'Total Modules' : 'File Size (e.g. 2.4 GB)'}
                  </label>
                  <input
                    type="text"
                    value={extraField2}
                    onChange={(e) => setExtraField2(e.target.value)}
                    placeholder={resourceType === 'course' ? '16' : '1.8 GB'}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Brief Overview / Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Provide brief details about this course or software..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Sagar Brand Catalog Now</span>
              </button>
            </form>
          )}

          {/* TAB 2: Bulk Links Paste */}
          {activeTab === 'bulk' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-300 leading-relaxed">
                Aap ke pas jitne bhi links hain, unko yahan aik sath paste karein. Format:
                <br />
                <code className="text-emerald-400 font-mono text-[11px] bg-slate-950 px-2 py-1 rounded block mt-1">
                  Title | Link | Category (one per line)
                </code>
              </div>

              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                rows={7}
                placeholder="Course or Software Name | https://drive.google.com/... | Category"
                className="w-full p-3 font-mono text-xs text-slate-200 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-emerald-500"
              />

              <button
                type="button"
                onClick={handleProcessBulk}
                className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Tarteeb Se Import Karein (Add All Links)</span>
              </button>
            </div>
          )}

          {/* TAB 3: Tarteeb / Reordering */}
          {activeTab === 'reorder' && (
            <div className="space-y-6 max-h-[380px] overflow-y-auto pr-1">
              
              {/* Courses Order */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Courses Sequence ({courses.length})</span>
                  <span className="text-[11px] text-slate-500 font-normal">Use Up/Down to rearrange</span>
                </h4>
                <div className="space-y-1.5">
                  {courses.map((course, idx) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate mr-2">
                        <span className="font-mono text-emerald-400 font-semibold w-5">{idx + 1}.</span>
                        <span className="font-medium text-white truncate">{course.title}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveCourse(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveCourse(idx, 'down')}
                          disabled={idx === courses.length - 1}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteCourse(course.id)}
                          className="p-1 rounded text-red-400 hover:bg-red-500/10 transition-colors ml-1"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Softwares Order */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Software Sequence ({softwares.length})</span>
                  <span className="text-[11px] text-slate-500 font-normal">Use Up/Down to rearrange</span>
                </h4>
                <div className="space-y-1.5">
                  {softwares.map((soft, idx) => (
                    <div
                      key={soft.id}
                      className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate mr-2">
                        <span className="font-mono text-emerald-400 font-semibold w-5">{idx + 1}.</span>
                        <span className="font-medium text-white truncate">{soft.title}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveSoftware(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSoftware(idx, 'down')}
                          disabled={idx === softwares.length - 1}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteSoftware(soft.id)}
                          className="p-1 rounded text-red-400 hover:bg-red-500/10 transition-colors ml-1"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
