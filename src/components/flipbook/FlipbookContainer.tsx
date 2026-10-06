import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { sounds } from '../../utils/audio';
import { MagazineSpreadInfo } from '../../types';
import { Spread0Cover } from './pages/Spread0Cover';
import { Spread1Context } from './pages/Spread1Context';
import { Spread2Strategy } from './pages/Spread2Strategy';
import { Spread3Results } from './pages/Spread3Results';
import { Spread4Lessons } from './pages/Spread4Lessons';
import { Spread5BackCover } from './pages/Spread5BackCover';
import { TableOfContentsModal } from './TableOfContentsModal';

const SPREADS_METADATA: MagazineSpreadInfo[] = [
  {
    index: 0,
    title: 'Bìa Tạp Chí: Khi Domino\'s Đi Vá Đường',
    subtitle: 'Tiêu đề giật gân, giải Cannes Lions Gold và các điểm nóng',
    category: 'TRANG BÌA NGOÀI'
  },
  {
    index: 1,
    title: 'Thư Tòa Soạn & Máy Đo Chấn Động Ổ Gà',
    subtitle: 'Nỗi đau chiếc bánh pizza nát vụn và hiểm họa hạ tầng nước Mỹ',
    leftPageNum: 1,
    rightPageNum: 2,
    category: 'CHƯƠNG 01 &bull; BỐI CẢNH'
  },
  {
    index: 2,
    title: 'Mô Hình PESO Độc Bản & Bản Đồ Thành Phố',
    subtitle: 'Paid, Earned 1 Tỷ view, Shared viral và Owned PavingForPizza.com',
    leftPageNum: 3,
    rightPageNum: 4,
    category: 'CHƯƠNG 02 &bull; CHIẾN LƯỢC'
  },
  {
    index: 3,
    title: 'Thanh Trượt Trước/Sau & 4 Hộp Bánh Cạm Bẫy',
    subtitle: 'Kéo so sánh mặt đường láng mịn và mổ xẻ 4 rủi ro truyền thông',
    leftPageNum: 5,
    rightPageNum: 6,
    category: 'CHƯƠNG 03 &bull; KẾT QUẢ'
  },
  {
    index: 4,
    title: 'Bài Học Flashcards & Thăm Dò Góc Nhìn Việt Nam',
    subtitle: '5 bài học vàng cho marketer và thảo luận F&B ứng dụng tại VN',
    leftPageNum: 7,
    rightPageNum: 8,
    category: 'CHƯƠNG 04 &bull; ĐÚC KẾT'
  },
  {
    index: 5,
    title: 'Minigame Trải Nhựa & Bằng Chứng Nhận Độc Giả',
    subtitle: 'Vá 5 ổ gà cứu pizza và xuất bản chứng chỉ chuyên gia mang tên bạn',
    leftPageNum: 9,
    rightPageNum: 10,
    category: 'BÌA SAU &bull; CHỨNG NHẬN'
  }
];

export const FlipbookContainer: React.FC = () => {
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isTOCopen, setIsTOCopen] = useState<boolean>(false);
  const [bookmarkedSpread, setBookmarkedSpread] = useState<number | null>(null);
  const [isTurnAnimating, setIsTurnAnimating] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward' | null>(null);

  const totalSpreads = SPREADS_METADATA.length;

  const goToSpread = useCallback((index: number) => {
    if (index < 0 || index >= totalSpreads || index === currentSpread) return;
    const direction = index > currentSpread ? 'forward' : 'backward';
    setFlipDirection(direction);
    setIsTurnAnimating(true);
    sounds.playPageFlip();
    
    // Smooth page flip transition
    setTimeout(() => {
      setCurrentSpread(index);
    }, 240);

    setTimeout(() => {
      setIsTurnAnimating(false);
      setFlipDirection(null);
    }, 580);
  }, [currentSpread, totalSpreads]);

  const nextSpread = useCallback(() => {
    if (currentSpread < totalSpreads - 1) {
      goToSpread(currentSpread + 1);
    }
  }, [currentSpread, totalSpreads, goToSpread]);

  const prevSpread = useCallback(() => {
    if (currentSpread > 0) {
      goToSpread(currentSpread - 1);
    }
  }, [currentSpread, goToSpread]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextSpread();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSpread();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSpread, prevSpread]);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sounds.enabled = nextState;
  };

  const toggleBookmark = () => {
    sounds.playClick();
    if (bookmarkedSpread === currentSpread) {
      setBookmarkedSpread(null);
    } else {
      setBookmarkedSpread(currentSpread);
    }
  };

  const activeSpreadInfo = SPREADS_METADATA[currentSpread];

  return (
    <div className="min-h-screen bg-[#1e242d] text-slate-100 flex flex-col justify-between selection:bg-[#E31837] selection:text-white relative">
      {/* Table of contents modal */}
      <TableOfContentsModal
        isOpen={isTOCopen}
        onClose={() => setIsTOCopen(false)}
        currentSpread={currentSpread}
        onSelectSpread={goToSpread}
        spreadsList={SPREADS_METADATA}
      />

      {/* TOP EDITORIAL TOOLBAR */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b-2 border-black px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        {/* Magazine identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E31837] text-white flex items-center justify-center font-black text-sm border-2 border-black shadow-[2px_2px_0px_#000]">
            D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-yellow-300 font-heading">
                THE DOMINO&apos;S CHRONICLE
              </span>
              <span className="hidden sm:inline bg-white text-slate-950 text-[10px] font-black px-1.5 py-0.2 border border-black uppercase">
                TẬP SAN TƯƠNG TÁC
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-serif italic hidden md:block">
              Chiến dịch Paving For Pizza &bull; Cannes Lions Gold Dossier
            </p>
          </div>
        </div>

        {/* Central Page Spread Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-3 py-1 border border-slate-700 rounded-full text-xs font-mono">
          <span className="text-yellow-400 font-bold">
            {currentSpread === 0 ? 'TRANG BÌA' : `TRANG 0${activeSpreadInfo.leftPageNum} - ${activeSpreadInfo.rightPageNum}`}
          </span>
          <span className="text-slate-500">/ 10 TRANG</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Table of Contents Button */}
          <button
            onClick={() => {
              sounds.playClick();
              setIsTOCopen(true);
            }}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 uppercase transition-all cursor-pointer"
            title="Mở mục lục tập san"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mục Lục</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className={`p-1.5 border-2 border-black text-xs font-bold transition-all cursor-pointer ${
              bookmarkedSpread === currentSpread
                ? 'bg-[#E31837] text-white shadow-[2px_2px_0px_#000]'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title={bookmarkedSpread === currentSpread ? 'Đã đánh dấu trang này' : 'Đánh dấu trang (Bookmark)'}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            className={`p-1.5 border-2 border-black text-xs font-bold transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-slate-800 text-yellow-300 hover:bg-slate-700'
                : 'bg-slate-800 text-slate-500'
            }`}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN FLIPBOOK READING ARENA */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
        {/* Decorative Desk Texture Behind Book */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #334155 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* 3D BOOK CASING & PAGES */}
        <div className="relative w-full max-w-6xl mx-auto z-10 transition-all duration-300 perspective-2500 preserve-3d">
          {/* Subtle Book Outer Shadow & Paper Stack Depth */}
          <div className="relative bg-slate-900 rounded-lg p-1 sm:p-2 border-4 border-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Paper Sheet Stack Edges Simulation */}
            <div className="absolute -bottom-2 inset-x-4 h-2 bg-stone-300 rounded-b border-x-2 border-b-2 border-black opacity-80" />
            <div className="absolute -bottom-3 inset-x-6 h-1.5 bg-stone-400 rounded-b border-x-2 border-b-2 border-black opacity-60" />

            {/* Central Book Spine Crease Shadow (Only on 2-page spreads, not on cover) */}
            {currentSpread > 0 && (
              <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/25 via-black/5 to-black/25 pointer-events-none z-30 shadow-inner" />
            )}

            {/* Dynamic 3D Page Turn Leaf Overlay */}
            {isTurnAnimating && (
              <>
                <div
                  className={`absolute inset-0 pointer-events-none z-35 ${
                    flipDirection === 'forward' ? 'anim-page-turn-forward' : 'anim-page-turn-backward'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-r from-amber-50/80 via-white/70 to-stone-200/90 shadow-[0_0_30px_rgba(0,0,0,0.4)] rounded border border-black/20" />
                </div>
                <div className="absolute inset-0 bg-black/15 pointer-events-none z-30 anim-shadow-sweep" />
              </>
            )}

            {/* Bottom-Right Dog-Ear Corner Curl (Turn Next Page) */}
            {currentSpread < totalSpreads - 1 && (
              <button
                onClick={nextSpread}
                className="absolute bottom-2 right-2 z-40 group dog-ear-parent cursor-pointer select-none transition-transform hover:scale-105"
                title="Click để lật trang sau ↷"
                aria-label="Lật trang sau"
              >
                <div className="relative w-12 h-12 flex items-end justify-end">
                  <div className="dog-ear-corner w-10 h-10 bg-gradient-to-tl from-yellow-300 via-amber-200 to-amber-100 border-t-2 border-l-2 border-black shadow-[-2px_-2px_6px_rgba(0,0,0,0.3)] flex items-center justify-center">
                    <span className="text-[10px] font-black text-slate-900 group-hover:scale-125 transition-transform">
                      ↷
                    </span>
                  </div>
                </div>
              </button>
            )}

            {/* Bottom-Left Dog-Ear Corner Curl (Turn Previous Page) */}
            {currentSpread > 0 && (
              <button
                onClick={prevSpread}
                className="absolute bottom-2 left-2 z-40 group cursor-pointer select-none transition-transform hover:scale-105"
                title="Click để lật về trang trước ↶"
                aria-label="Lật trang trước"
              >
                <div className="relative w-12 h-12 flex items-end justify-start">
                  <div className="w-10 h-10 group-hover:w-12 group-hover:h-12 transition-all bg-gradient-to-tr from-yellow-300 via-amber-200 to-amber-100 border-t-2 border-r-2 border-black shadow-[2px_-2px_6px_rgba(0,0,0,0.3)] flex items-center justify-center [clip-path:polygon(0_0,0_100%,100%_100%)]">
                    <span className="text-[10px] font-black text-slate-900 group-hover:scale-125 transition-transform">
                      ↶
                    </span>
                  </div>
                </div>
              </button>
            )}

            {/* Flip Animation Container */}
            <div className={`transition-all duration-300 transform ${
              isTurnAnimating 
                ? flipDirection === 'forward' 
                  ? 'scale-[0.985] -rotate-y-2 opacity-95' 
                  : 'scale-[0.985] rotate-y-2 opacity-95' 
                : 'scale-100 rotate-y-0 opacity-100'
            }`}>
              {currentSpread === 0 && (
                <Spread0Cover
                  onOpenBook={nextSpread}
                  onJumpToSpread={goToSpread}
                />
              )}
              {currentSpread === 1 && <Spread1Context />}
              {currentSpread === 2 && <Spread2Strategy />}
              {currentSpread === 3 && <Spread3Results />}
              {currentSpread === 4 && <Spread4Lessons />}
              {currentSpread === 5 && (
                <Spread5BackCover onBackToCover={() => goToSpread(0)} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM CONTROL DECK & PAGE SCRUBBER */}
      <footer className="bg-slate-950/95 border-t-2 border-black px-4 py-3 z-40">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Previous Spread Button */}
          <button
            onClick={prevSpread}
            disabled={currentSpread === 0}
            className={`w-full sm:w-auto px-4 py-2 border-2 border-black text-xs font-black uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
              currentSpread === 0
                ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed opacity-50'
                : 'bg-white hover:bg-slate-100 text-slate-950 shadow-[3px_3px_0px_#000] hover:-translate-y-0.5'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trang Trước</span>
          </button>

          {/* Central Interactive Scrubber & Quick Dots */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center">
            {SPREADS_METADATA.map((s) => {
              const isActive = currentSpread === s.index;
              return (
                <button
                  key={s.index}
                  onClick={() => goToSpread(s.index)}
                  className={`h-7 px-2.5 sm:px-3 rounded border-2 border-black text-[11px] font-black font-mono transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-yellow-400 text-slate-950 shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={s.title}
                >
                  {s.index === 0 ? 'BÌA' : `P.0${s.leftPageNum}`}
                </button>
              );
            })}
          </div>

          {/* Next Spread Button */}
          <button
            onClick={nextSpread}
            disabled={currentSpread === totalSpreads - 1}
            className={`w-full sm:w-auto px-4 py-2 border-2 border-black text-xs font-black uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
              currentSpread === totalSpreads - 1
                ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed opacity-50'
                : 'bg-[#E31837] hover:bg-red-600 text-white shadow-[3px_3px_0px_#000] hover:-translate-y-0.5'
            }`}
          >
            <span>Trang Sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Keyboard helper hint */}
        <div className="text-center text-[10px] text-slate-500 font-mono mt-1.5">
          Mẹo: Dùng phím mũi tên <strong>[←]</strong> hoặc <strong>[→]</strong> trên bàn phím để lật trang nhanh &bull; Nhấp vào các phần tử trên trang để tương tác
        </div>
      </footer>
    </div>
  );
};
