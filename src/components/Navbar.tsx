import React from 'react';
import { PageId } from '../types';
import { Pizza, Volume2, VolumeX, Home, Info, PieChart, Box, Lightbulb, Gamepad2, Palette } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  brandTheme: 'classic' | 'modern' | 'cyber';
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  soundEnabled,
  onToggleSound,
}) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode; isSpecial?: boolean }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-4 h-4" /> },
    { id: 'page1', label: '1. Tổng quan', icon: <Info className="w-4 h-4" /> },
    { id: 'page2', label: '2. Mô hình PESO', icon: <PieChart className="w-4 h-4" /> },
    { id: 'page3', label: '3. Hiệu quả & Hạn chế', icon: <Box className="w-4 h-4" /> },
    { id: 'page4', label: '4. Bài học', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'page5', label: '5. Game & Vá đường VN 🇻🇳', icon: <Gamepad2 className="w-4 h-4" />, isSpecial: true },
  ];

  const handleNavClick = (id: PageId) => {
    sounds.playClick();
    onPageChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#006491] border-b-4 border-black pop-shadow py-2.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
        {/* Brand Logo - Crisp sharp border */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-none border-2 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-transform"
        >
          <div className="w-8 h-8 rounded-none bg-[#E31837] text-white flex items-center justify-center border-2 border-black">
            <Pizza className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
          <div>
            <h1 className="font-black text-lg text-[#006491] leading-none uppercase tracking-wider font-heading">
              DOMINO&apos;S
            </h1>
            <span className="text-[9px] font-black text-[#E31837] tracking-widest block uppercase">
              PAVING FOR PIZZA
            </span>
          </div>
        </div>

        {/* Navigation Tabs - Sharp, Editorial, Non-rounded Styling */}
        <nav className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-xs font-bold">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group relative flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wide font-extrabold transition-all duration-150 rounded-none border-2 border-black cursor-pointer ${
                  isActive
                    ? 'bg-yellow-300 text-slate-950 shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-0.5 z-10'
                    : item.isSpecial
                    ? 'bg-amber-400 hover:bg-yellow-300 text-slate-950 hover:shadow-[3px_3px_0px_#000] hover:-translate-y-0.5'
                    : 'bg-white hover:bg-amber-50 text-slate-900 hover:shadow-[3px_3px_0px_#000] hover:-translate-y-0.5'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute -top-1.5 left-0 right-0 h-1 bg-[#E31837] border-x-2 border-t-2 border-black" />
                )}
                <span className={`transition-transform duration-150 ${isActive ? 'scale-110 text-[#006491]' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span className="whitespace-nowrap font-heading text-[11px] sm:text-xs">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Sound Effect Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
            className="p-2 rounded-none bg-white border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-slate-100 text-slate-800 active:translate-y-0.5 transition-transform cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
