import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  Pizza, 
  Volume2, 
  VolumeX, 
  Home, 
  Info, 
  PieChart, 
  Box, 
  Lightbulb, 
  Gamepad2, 
  BookOpen, 
  Layout, 
  ChevronUp, 
  ChevronDown, 
  Maximize, 
  Minimize,
  Pin,
  PinOff
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  brandTheme?: 'classic' | 'modern' | 'cyber';
  viewMode?: 'interactive' | 'flipbook';
  onToggleViewMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  soundEnabled,
  onToggleSound,
  viewMode = 'interactive',
  onToggleViewMode,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Auto hide on scroll down, auto show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (isPinned) return;

      if (currentY > lastY + 12 && currentY > 70) {
        // Scrolling down past threshold -> slide up / collapse
        setIsCollapsed(true);
      } else if (currentY < lastY - 10 || currentY <= 25) {
        // Scrolling up or at the top -> slide down / show
        setIsCollapsed(false);
      }
      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPinned]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    sounds.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

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
    <>
      {/* Top hover detection strip when header is collapsed */}
      {isCollapsed && (
        <div 
          onMouseEnter={() => setIsCollapsed(false)}
          className="fixed top-0 left-0 right-0 h-4 z-40 bg-transparent cursor-pointer"
          title="Rê chuột để hiện thanh điều hướng"
        />
      )}

      {/* Main Collapsible Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-[#006491] border-b-4 border-black pop-shadow py-2.5 px-3 sm:px-6 transition-transform duration-300 ease-in-out ${
          isCollapsed ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
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

          {/* Action Controls: View Mode, Fullscreen, Pin, Sound Effect */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {onToggleViewMode && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onToggleViewMode();
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wide border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition-transform cursor-pointer"
                title="Chuyển đổi giữa Bản Web Ấn và Bản Tạp Chí Lật Trang"
              >
                {viewMode === 'interactive' ? (
                  <>
                    <BookOpen className="w-4 h-4 text-[#E31837]" />
                    <span className="hidden sm:inline">Xem Bản Lật Trang</span>
                    <span className="sm:hidden">Lật Trang</span>
                  </>
                ) : (
                  <>
                    <Layout className="w-4 h-4 text-[#006491]" />
                    <span className="hidden sm:inline">Xem Bản Web Ấn</span>
                    <span className="sm:hidden">Bản Web</span>
                  </>
                )}
              </button>
            )}

            {/* Toggle Fullscreen Screen */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Phóng to Toàn màn hình (Full Screen)'}
              className="p-2 rounded-none bg-white border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-slate-100 text-slate-800 active:translate-y-0.5 transition-transform cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 text-[#006491]" />
              ) : (
                <Maximize className="w-4 h-4 text-[#006491]" />
              )}
            </button>

            {/* Pin / Lock Header (Don't auto hide on scroll) */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsPinned(!isPinned);
                if (isCollapsed) setIsCollapsed(false);
              }}
              title={isPinned ? 'Bỏ ghim (Cho phép tự động ẩn khi cuộn)' : 'Ghim thanh điều hướng (Luôn hiển thị)'}
              className={`p-2 rounded-none border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition-transform cursor-pointer ${
                isPinned ? 'bg-yellow-300 text-slate-950 font-black' : 'bg-white hover:bg-slate-100 text-slate-800'
              }`}
            >
              {isPinned ? (
                <PinOff className="w-4 h-4 text-[#E31837]" />
              ) : (
                <Pin className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Sound Toggle */}
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

        {/* Thò ra / Thụt vào Pull Tab Handle (Hangs down from header bottom) */}
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center">
          <button
            onClick={() => {
              sounds.playClick();
              setIsCollapsed(!isCollapsed);
            }}
            onMouseEnter={() => {
              if (isCollapsed) setIsCollapsed(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-[11px] uppercase tracking-wider border-2 border-black border-t-0 shadow-[2px_3px_0px_#000] cursor-pointer transition-transform active:translate-y-0.5 select-none"
            title={isCollapsed ? 'Nhấp hoặc rê chuột để thò ra menu' : 'Nhấp để thụt vào (Trải nghiệm Full screen)'}
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#E31837] animate-bounce" />
                <span>Hiện Menu (Thò ra)</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#006491]" />
                <span className="hidden sm:inline">Ẩn Menu (Full screen)</span>
                <span className="sm:hidden">Ẩn</span>
              </>
            )}
          </button>
        </div>
      </header>
    </>
  );
};
