/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoursesSection } from './components/CoursesSection';
import { SoftwareSection } from './components/SoftwareSection';
import { AuthModal } from './components/AuthModal';
import { GoogleSignInModal } from './components/GoogleSignInModal';
import { PhoneSignInModal } from './components/PhoneSignInModal';
import { LinkManagerModal } from './components/LinkManagerModal';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { Footer } from './components/Footer';
import { INITIAL_COURSES, INITIAL_SOFTWARES } from './data/initialData';
import { CourseItem, SoftwareItem, UserProfile } from './types';
import { Bookmark, Sparkles, PlusCircle, Check, ArrowRight } from 'lucide-react';

export default function App() {
  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('sagar_brand_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Data state with localStorage persistence
  const [courses, setCourses] = useState<CourseItem[]>(() => {
    try {
      const saved = localStorage.getItem('sagar_brand_courses');
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [softwares, setSoftwares] = useState<SoftwareItem[]>(() => {
    try {
      const saved = localStorage.getItem('sagar_brand_softwares');
      return saved ? JSON.parse(saved) : INITIAL_SOFTWARES;
    } catch {
      return INITIAL_SOFTWARES;
    }
  });

  // Saved bookmark items
  const [savedItemIds, setSavedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sagar_brand_saved_items');
      return saved ? JSON.parse(saved) : ['course-1', 'soft-1'];
    } catch {
      return ['course-1', 'soft-1'];
    }
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'courses' | 'software' | 'saved'>('courses');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  // On first open, if no user is signed in, show Auth modal as requested!
  const [isAuthOpen, setIsAuthOpen] = useState(() => {
    const hasVisited = sessionStorage.getItem('sagar_brand_visited');
    sessionStorage.setItem('sagar_brand_visited', 'true');
    const savedUser = localStorage.getItem('sagar_brand_user');
    // If no user, show login as the 1st thing on initial load
    return !savedUser && !hasVisited;
  });

  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isLinkManagerOpen, setIsLinkManagerOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<CourseItem | SoftwareItem | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('sagar_brand_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('sagar_brand_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('sagar_brand_courses', JSON.stringify(courses));
    } catch (e) {
      console.error(e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem('sagar_brand_softwares', JSON.stringify(softwares));
    } catch (e) {
      console.error(e);
    }
  }, [softwares]);

  useEffect(() => {
    try {
      localStorage.setItem('sagar_brand_saved_items', JSON.stringify(savedItemIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedItemIds]);

  // Handlers
  const handleAuthSuccess = (newUser: UserProfile) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleToggleSave = (id: string) => {
    setSavedItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCourse = (newCourse: CourseItem) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleAddSoftware = (newSoftware: SoftwareItem) => {
    setSoftwares((prev) => [newSoftware, ...prev]);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDeleteSoftware = (id: string) => {
    setSoftwares((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReorderCourses = (updated: CourseItem[]) => {
    setCourses(updated);
  };

  const handleReorderSoftwares = (updated: SoftwareItem[]) => {
    setSoftwares(updated);
  };

  // Filtered lists based on search
  const q = searchQuery.toLowerCase().trim();
  const filteredCourses = q
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.instructor.toLowerCase().includes(q)
      )
    : courses;

  const filteredSoftwares = q
    ? softwares.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          s.platform.toLowerCase().includes(q)
      )
    : softwares;

  // Saved resources list
  const savedCourses = courses.filter((c) => savedItemIds.includes(c.id));
  const savedSoftwares = softwares.filter((s) => savedItemIds.includes(s.id));

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col radial-gradient-bg selection:bg-emerald-500/20 selection:text-emerald-300">
      
      {/* Top 3-Zone Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenLinkManager={() => setIsLinkManagerOpen(true)}
        onLogout={handleLogout}
        savedCount={savedItemIds.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenLinkManager={() => setIsLinkManagerOpen(true)}
          totalCourses={courses.length}
          totalSoftwares={softwares.length}
        />

        {/* Dynamic Content View */}
        {activeTab === 'courses' && (
          <CoursesSection
            courses={filteredCourses}
            savedItemIds={savedItemIds}
            onToggleSave={handleToggleSave}
            onSelectCourse={(course) => setSelectedResource(course)}
          />
        )}

        {activeTab === 'software' && (
          <SoftwareSection
            softwares={filteredSoftwares}
            savedItemIds={savedItemIds}
            onToggleSave={handleToggleSave}
            onSelectSoftware={(soft) => setSelectedResource(soft)}
          />
        )}

        {activeTab === 'saved' && (
          <div className="py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  Personal Library
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  My Saved Courses & Softwares
                </h2>
              </div>
              <div className="text-xs text-slate-400">
                {savedItemIds.length} items bookmarked
              </div>
            </div>

            {savedCourses.length === 0 && savedSoftwares.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
                <Bookmark className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400 mb-4">You have not bookmarked any resources yet.</p>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="px-4 py-2 text-xs font-bold bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-colors"
                >
                  Explore Sagar Courses
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {savedCourses.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Saved Masterclasses</h3>
                    <CoursesSection
                      courses={savedCourses}
                      savedItemIds={savedItemIds}
                      onToggleSave={handleToggleSave}
                      onSelectCourse={(course) => setSelectedResource(course)}
                    />
                  </div>
                )}

                {savedSoftwares.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Saved Software Tools</h3>
                    <SoftwareSection
                      softwares={savedSoftwares}
                      savedItemIds={savedItemIds}
                      onToggleSave={handleToggleSave}
                      onSelectSoftware={(soft) => setSelectedResource(soft)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Sagar Brand Callout / Link Submission Banner */}
        <section className="my-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                Sagar Brand Partner & Admin Hub
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
                Aap ke pas naye courses ya software links hain?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Koi bhi Google Drive, Mega, ya direct download link yahan paste karein. Hamara link manager unhe automatically category aur tarteeb ke sath add kar deta hai.
              </p>
            </div>
            <button
              onClick={() => setIsLinkManagerOpen(true)}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all flex items-center gap-2 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Naya Link Tarteeb Se Add Karein</span>
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onOpenLinkManager={() => setIsLinkManagerOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        onOpenGoogle={() => {
          setIsAuthOpen(false);
          setIsGoogleModalOpen(true);
        }}
        onOpenPhone={() => {
          setIsAuthOpen(false);
          setIsPhoneModalOpen(true);
        }}
      />

      <GoogleSignInModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <PhoneSignInModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <LinkManagerModal
        isOpen={isLinkManagerOpen}
        onClose={() => setIsLinkManagerOpen(false)}
        courses={courses}
        softwares={softwares}
        onAddCourse={handleAddCourse}
        onAddSoftware={handleAddSoftware}
        onDeleteCourse={handleDeleteCourse}
        onDeleteSoftware={handleDeleteSoftware}
        onReorderCourses={handleReorderCourses}
        onReorderSoftwares={handleReorderSoftwares}
      />

      <ResourceDetailModal
        item={selectedResource}
        onClose={() => setSelectedResource(null)}
        isSaved={selectedResource ? savedItemIds.includes(selectedResource.id) : false}
        onToggleSave={handleToggleSave}
      />

    </div>
  );
}
