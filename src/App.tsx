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
import { sounds } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const toggleSound = () => {
    const isMuted = sounds.toggleMute();
    setSoundEnabled(!isMuted);
  };

  const handlePageChange = (page: PageId) => {
    sounds.playClick();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#f3f4f6] text-slate-900 font-sans selection:bg-yellow-300 selection:text-slate-900">
      {/* Magic Pizza & Sparkle Cursor Trail */}
      <CursorTrail />

      <div className="flex flex-col min-h-screen">
        {/* Top Brand & Navigation Bar with Rounded Elements */}
        <Navbar
          currentPage={currentPage}
          onPageChange={handlePageChange}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
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
    </div>
  );
}
