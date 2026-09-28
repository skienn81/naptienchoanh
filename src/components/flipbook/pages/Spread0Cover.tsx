import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Award, Flame, Eye, MapPin } from 'lucide-react';
import { sounds } from '../../../utils/audio';

interface Spread0CoverProps {
  onOpenBook: () => void;
  onJumpToSpread: (spreadIndex: number) => void;
}

export const Spread0Cover: React.FC<Spread0CoverProps> = ({ onOpenBook, onJumpToSpread }) => {
  const [stampHovered, setStampHovered] = useState(false);

  return (
    <div className="relative w-full max-w-2xl mx-auto my-auto bg-[#FBF9F5] border-4 border-slate-900 shadow-[12px_16px_0px_#000000] p-6 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-300">
      {/* Texture grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '8px 8px'
        }}
      />

      {/* Book Binding Left Accent (Front Cover Spine Simulation) */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-slate-950 via-slate-800 to-transparent opacity-80" />

      {/* Top Magazine Header & Barcode */}
      <div className="border-b-4 border-slate-900 pb-4 relative z-10">
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-700 mb-2">
          <span className="flex items-center gap-1.5 text-[#E31837]">
            <Flame className="w-3.5 h-3.5 animate-pulse" /> SỐ ĐẶC BIỆT #01 &bull; 2026
          </span>
          <span className="bg-slate-900 text-yellow-300 px-2.5 py-0.5 font-mono text-[10px] tracking-normal border border-black">
            ISSN 2026-9047
          </span>
          <span className="hidden sm:inline font-serif italic text-slate-600">
            Tập San Báo Chí &amp; Truyền Thông Độc Lập
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 uppercase font-heading">
            THE DOMINO<span className="text-[#E31837]">&apos;</span>S
          </h1>
          <span className="text-xs sm:text-sm font-extrabold uppercase bg-[#006491] text-white px-2.5 py-1 border border-black tracking-wider">
            CHRONICLE
          </span>
        </div>
        <p className="text-[11px] sm:text-xs font-serif italic text-slate-600 mt-1">
          Chuyên khảo phân tích sâu các chiến dịch PR &amp; Marketing thay đổi cục diện thị trường
        </p>
      </div>

      {/* Main Cover Visual & Headline */}
      <div className="my-6 space-y-6 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#E31837] text-white text-xs font-black px-3 py-1 uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5" /> BÁO CÁO ĐẶC BIỆT
          </span>
          <span className="bg-yellow-300 text-slate-950 text-xs font-black px-3 py-1 uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
            CANNES LIONS GOLD 2018
          </span>
        </div>

        {/* Big Sensational Headline */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase leading-none tracking-tight font-heading">
            KHI THƯƠNG HIỆU PIZZA <br />
            <span className="bg-[#E31837] text-white px-2 py-0.5 inline-block my-1 shadow-[4px_4px_0px_#000]">
              ĐI SỬA ĐƯỜNG
            </span> <br />
            THAY CHÍNH PHỦ!
          </h2>
          <p className="text-sm sm:text-base text-slate-800 font-serif leading-relaxed italic pt-1 border-l-4 border-[#006491] pl-3 bg-slate-100/70 py-1">
            &ldquo;Một chiến dịch dũng cảm, điên rồ và xuất chúng: Domino&apos;s tự bỏ tiền túi lấp hàng ngàn ổ gà khắp nước Mỹ chỉ để bảo vệ chiếc bánh Pizza thơm giòn khỏi bị nát trên đường giao!&rdquo;
          </p>
        </div>

        {/* Cover Photo with Authentic Cutout Effect */}
        <div className="relative border-4 border-slate-900 bg-slate-900 shadow-[6px_6px_0px_#000] overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
            alt="Paving for Pizza Editorial Cover"
            className="w-full h-48 sm:h-56 object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="bg-white/95 backdrop-blur-sm p-2 border-2 border-black shadow-[2px_2px_0px_#000]">
              <p className="text-[10px] font-black text-slate-900 uppercase">Hiện Trường Điều Tra</p>
              <p className="text-xs font-bold text-[#E31837] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> 50 Tiểu Bang Nước Mỹ
              </p>
            </div>

            {/* Interactive Stamp */}
            <div
              onMouseEnter={() => {
                setStampHovered(true);
                sounds.playClick();
              }}
              onMouseLeave={() => setStampHovered(false)}
              className={`transform -rotate-12 transition-all cursor-pointer border-2 border-dashed border-yellow-400 bg-yellow-400/90 text-slate-950 font-black p-2 text-center rounded-lg shadow-lg ${
                stampHovered ? 'scale-110 rotate-0 bg-yellow-300' : ''
              }`}
              title="Click để nghe tiếng tem dập!"
              onClick={() => sounds.playPowerup()}
            >
              <Award className="w-5 h-5 mx-auto text-slate-900" />
              <span className="text-[9px] block uppercase leading-tight mt-0.5">Xác Nhận Độc Bản</span>
            </div>
          </div>
        </div>

        {/* Interactive Headlines: Click to Jump! */}
        <div className="bg-amber-50/80 border-2 border-black p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-black uppercase text-slate-700">
            <span>MỤC LỤC ĐIỂM NÓNG BÌA BÁO (CLICK ĐỂ LẬT TRANG):</span>
            <span className="text-[#006491]">TAP TO READ ➔</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                sounds.playPageFlip();
                onJumpToSpread(1);
              }}
              className="text-left p-2 bg-white hover:bg-red-50 border border-black shadow-[2px_2px_0px_#000] font-bold text-slate-900 hover:text-[#E31837] transition-all flex items-start justify-between cursor-pointer"
            >
              <span className="line-clamp-1">Trang 02 &bull; Máy đo chấn động ổ gà</span>
              <span className="text-[10px] text-slate-400">P.02</span>
            </button>

            <button
              onClick={() => {
                sounds.playPageFlip();
                onJumpToSpread(2);
              }}
              className="text-left p-2 bg-white hover:bg-sky-50 border border-black shadow-[2px_2px_0px_#000] font-bold text-slate-900 hover:text-[#006491] transition-all flex items-start justify-between cursor-pointer"
            >
              <span className="line-clamp-1">Trang 03 &bull; Giải mã PESO 1 tỷ view</span>
              <span className="text-[10px] text-slate-400">P.03</span>
            </button>

            <button
              onClick={() => {
                sounds.playPageFlip();
                onJumpToSpread(3);
              }}
              className="text-left p-2 bg-white hover:bg-amber-50 border border-black shadow-[2px_2px_0px_#000] font-bold text-slate-900 hover:text-amber-700 transition-all flex items-start justify-between cursor-pointer"
            >
              <span className="line-clamp-1">Trang 05 &bull; Kéo trượt Trước/Sau &amp; 4 Hộp Bẫy</span>
              <span className="text-[10px] text-slate-400">P.05</span>
            </button>

            <button
              onClick={() => {
                sounds.playPageFlip();
                onJumpToSpread(4);
              }}
              className="text-left p-2 bg-white hover:bg-emerald-50 border border-black shadow-[2px_2px_0px_#000] font-bold text-slate-900 hover:text-emerald-700 transition-all flex items-start justify-between cursor-pointer"
            >
              <span className="line-clamp-1">Trang 08 &bull; Bàn tròn Việt Nam &amp; Minigame</span>
              <span className="text-[10px] text-slate-400">P.08</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Action to Open Magazine */}
      <div className="pt-4 border-t-4 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs font-bold bg-slate-200 px-2 py-1 border border-black">
            GIÁ BÌA: VÔ GIÁ (KIẾN THỨC)
          </div>
          <span className="text-[11px] text-slate-500 font-serif italic">
            Xuất bản cho giới Marketer &amp; Sinh viên
          </span>
        </div>

        <button
          onClick={() => {
            sounds.playPageFlip();
            onOpenBook();
          }}
          className="w-full sm:w-auto bg-[#E31837] hover:bg-red-600 active:scale-95 text-white font-black text-base px-6 py-3.5 border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 uppercase cursor-pointer"
        >
          <BookOpen className="w-5 h-5" />
          <span>LẬT MỞ TẬP SAN (P.01 - 02)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
