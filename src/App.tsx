import React, { useState } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { OverviewSection } from './components/OverviewSection';
import { PesoSection } from './components/PesoSection';
import { ResultsSection } from './components/ResultsSection';
import { LessonsSection } from './components/LessonsSection';
import { GameAndVietnamSection } from './components/GameAndVietnamSection';
import { Footer } from './components/Footer';
import { CursorTrail } from './components/CursorTrail';
import { FlipbookContainer } from './components/flipbook/FlipbookContainer';
import { sounds } from './utils/audio';
import { Layout, BookOpen, Sparkles } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'interactive' | 'flipbook'>('interactive');
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const toggleSound = () => {
    const isMuted = sounds.toggleMute();
    setSoundEnabled(!isMuted);
  };

  const handlePageChange = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#f3f4f6] text-slate-900 font-sans selection:bg-yellow-300 selection:text-slate-900">
      {/* Magic Pizza & Sparkle Cursor Trail */}
      <CursorTrail />

      {viewMode === 'interactive' ? (
        <div className="flex flex-col min-h-screen">
          {/* Top Brand & Navigation Bar */}
          <Navbar
            currentPage={currentPage}
            onPageChange={handlePageChange}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            viewMode={viewMode}
            onToggleViewMode={() => setViewMode('flipbook')}
          />

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8">
            {currentPage === 'home' && <HomeSection onNavigate={handlePageChange} />}
            {currentPage === 'page1' && <OverviewSection />}
            {currentPage === 'page2' && <PesoSection />}
            {currentPage === 'page3' && <ResultsSection />}
            {currentPage === 'page4' && <LessonsSection />}
            {currentPage === 'page5' && <GameAndVietnamSection />}
          </main>

          {/* Bottom Footer */}
          <Footer onNavigate={handlePageChange} />
        </div>
      ) : (
        <div className="relative min-h-screen bg-[#1e242d]">
          {/* Quick return bar when in flipbook mode */}
          <div className="sticky top-0 z-50 bg-[#006491] border-b-2 border-black px-4 py-2 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase">
              <BookOpen className="w-4 h-4 text-yellow-300" />
              <span>Chế độ: Tạp chí Lật Trang (Flipbook)</span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setViewMode('interactive');
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition-transform cursor-pointer"
            >
              <Layout className="w-3.5 h-3.5 text-[#006491]" />
              <span>Quay Lại Bản Web Ấn Theo Mục</span>
            </button>
          </div>

          {/* Flipbook Magazine Application */}
          <FlipbookContainer />
        </div>
      )}
    </div>
  );
}
