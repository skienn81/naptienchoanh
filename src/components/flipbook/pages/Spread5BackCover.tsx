import React, { useState } from 'react';
import { Award, CheckCircle, RotateCcw, Sparkles, Shield, User, Play, RefreshCw, QrCode } from 'lucide-react';
import { sounds } from '../../../utils/audio';

interface Spread5BackCoverProps {
  onBackToCover: () => void;
}

export const Spread5BackCover: React.FC<Spread5BackCoverProps> = ({ onBackToCover }) => {
  // Mini Game State on Left Page
  const [potholes, setPotholes] = useState([
    { id: 1, x: 20, y: 30, paved: false },
    { id: 2, x: 70, y: 25, paved: false },
    { id: 3, x: 45, y: 60, paved: false },
    { id: 4, x: 80, y: 75, paved: false },
    { id: 5, x: 25, y: 80, paved: false }
  ]);
  const [gameWon, setGameWon] = useState(false);

  // Certificate State on Right Page
  const [userName, setUserName] = useState('');
  const [certified, setCertified] = useState(false);

  const handlePaveHole = (id: number) => {
    sounds.playPave();
    setPotholes(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, paved: true } : p);
      if (updated.every(p => p.paved)) {
        setGameWon(true);
        sounds.playWin();
      }
      return updated;
    });
  };

  const handleResetGame = () => {
    sounds.playClick();
    setPotholes(p => p.map(hole => ({ ...hole, paved: false })));
    setGameWon(false);
  };

  const handleCertify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    setCertified(true);
    sounds.playPowerup();
  };

  const pavedCount = potholes.filter(p => p.paved).length;

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch h-full">
      {/* LEFT PAGE: TRANG 09 - MINIGAME VÁ ĐƯỜNG BÁO CHÍ */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>TƯƠNG TÁC GIẢI TRÍ &bull; THỰC HÀNH TẠP SAN</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 09
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-[#006491] text-white text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> MINIGAME THỢ TRẢI NHỰA DOMINO&apos;S
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-600">
              ĐÃ VÁ: {pavedCount} / 5
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading leading-tight">
              Thử Tay Nghề Sửa Đường Cứu Pizza
            </h2>
            <p className="text-xs text-slate-700 font-serif mt-1">
              Click trực tiếp vào 5 ổ gà dưới đây để trải nhựa nóng và in logo Domino&apos;s trước khi xe pizza chạy qua:
            </p>
          </div>

          {/* Interactive Asphalt Pitch */}
          <div className="relative border-3 border-black rounded-lg h-56 bg-slate-900 shadow-[4px_4px_0px_#000] overflow-hidden select-none">
            {/* Road Lane markings */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-yellow-400 opacity-60" />

            {/* Potholes to click */}
            {potholes.map(hole => (
              <button
                key={hole.id}
                onClick={() => !hole.paved && handlePaveHole(hole.id)}
                style={{ left: `${hole.x}%`, top: `${hole.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border-2 border-black transition-all cursor-pointer ${
                  hole.paved
                    ? 'bg-yellow-300 text-slate-950 shadow-md scale-105'
                    : 'bg-red-600 hover:bg-red-500 text-white animate-pulse shadow-lg hover:scale-110'
                }`}
                title={hole.paved ? 'Đã vá láng mịn!' : 'Click để đổ nhựa đường vá ổ gà!'}
              >
                {hole.paved ? (
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase">
                    <span>🍕</span>
                    <span className="hidden sm:inline">PAVED</span>
                  </div>
                ) : (
                  <div className="text-xs font-black">
                    💥 Ổ GÀ
                  </div>
                )}
              </button>
            ))}

            {/* Game Win Announcement Overlay */}
            {gameWon && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-white animate-fadeIn">
                <Award className="w-10 h-10 text-yellow-300 animate-bounce mb-1" />
                <h3 className="text-lg font-black uppercase text-yellow-300 font-heading">
                  XUẤT SẮC! ĐƯỜNG PHỐ ĐÃ AN TOÀN!
                </h3>
                <p className="text-xs text-slate-200 font-serif mt-1 max-w-xs">
                  Bạn đã bảo vệ 100% bánh Pizza thơm ngon đến tay khách hàng. Hãy sang trang bên để nhận Chứng chỉ Độc giả!
                </p>
                <button
                  onClick={handleResetGame}
                  className="mt-3 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 uppercase cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Chơi Lại
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-600 bg-slate-100 p-2 border border-slate-300">
            <span>Tiến độ thi công: {Math.round((pavedCount / 5) * 100)}%</span>
            <button
              onClick={handleResetGame}
              className="text-[#E31837] font-bold hover:underline cursor-pointer"
            >
              Đặt lại ổ gà
            </button>
          </div>
        </div>

        {/* Bottom Folio */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span>Trang 09: Trải Nghiệm Thực Tế</span>
          <span className="font-mono text-slate-900 font-bold">Hồ sơ 9/10</span>
        </div>
      </div>

      {/* RIGHT PAGE: TRANG 10 - BÌA SAU & BẰNG CHỨNG NHẬN ĐỘC GIẢ */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>BÌA SAU TẬP SAN &bull; CHỨNG NHẬN ĐỘC GIẢ</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 10
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-[#E31837] text-white text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> CHỨNG NHẬN CHUYÊN GIA TRUYỀN THÔNG
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-600">
              DOMINO&apos;S MASTER
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase font-heading">
              Cấp Chứng Chỉ Tốt Nghiệp Case Study
            </h3>
            <p className="text-xs text-slate-700 font-serif mt-1">
              Nhập tên của bạn để tòa soạn xuất bản Giấy Chứng Nhận Chuyên Khảo độc bản mang tên bạn:
            </p>
          </div>

          {/* Form to issue certificate */}
          {!certified ? (
            <form onSubmit={handleCertify} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] space-y-3">
              <div>
                <label className="text-xs font-black uppercase text-slate-900 block mb-1">
                  Họ và Tên Marketer / Độc giả:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A (Marketing Specialist)"
                    className="w-full pl-9 pr-3 py-2 text-xs border-2 border-black focus:bg-yellow-50 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#E31837] hover:bg-red-600 active:scale-95 text-white font-black text-xs py-2.5 border-2 border-black shadow-[2px_2px_0px_#000] transition-all flex items-center justify-center gap-2 uppercase cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Xuất Bản Bằng Chứng Nhận Ngay</span>
              </button>
            </form>
          ) : (
            /* Official Beautiful Certificate Display */
            <div className="bg-amber-50/80 border-4 border-double border-amber-700 p-4 rounded shadow-[4px_4px_0px_#000] text-center space-y-2 relative overflow-hidden animate-fadeIn">
              <div className="absolute top-2 right-2 text-3xl opacity-20">📜</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-900">
                TẬP SAN THE DOMINO&apos;S CHRONICLE
              </p>
              <h4 className="text-lg font-black uppercase text-slate-950 font-heading">
                CHỨNG CHỈ THẨM ĐỊNH CHIẾN LƯỢC
              </h4>
              <p className="text-xs font-serif text-slate-700 italic">Chứng nhận độc giả:</p>
              <p className="text-base font-black text-[#E31837] uppercase underline decoration-2 underline-offset-4">
                {userName}
              </p>
              <p className="text-[11px] font-serif text-slate-800 leading-snug">
                Đã nghiên cứu và hoàn thành xuất sắc chuyên khảo phân tích chiến dịch PR &bull; Cannes Lions Gold: <strong>&ldquo;Domino&apos;s Paving For Pizza&rdquo;</strong>.
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-amber-600/30 text-[10px] font-mono text-slate-600">
                <span className="text-left">
                  MÃ SỐ: DOM-2026-OK
                  <br />
                  NGÀY: 2026
                </span>
                <div className="w-10 h-10 border-2 border-red-600 rounded-full flex items-center justify-center font-black text-red-600 transform -rotate-12 border-dashed text-[8px]">
                  DẤU ĐỎ
                </div>
              </div>

              <button
                onClick={() => setCertified(false)}
                className="text-[10px] text-slate-500 underline font-mono cursor-pointer pt-1"
              >
                Đổi tên người nhận
              </button>
            </div>
          )}

          {/* Barcode & Return to Cover */}
          <div className="bg-slate-100 border-2 border-black p-3 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-black text-slate-700 block">
                MÃ LƯU TRỮ TẠP CHÍ: 978-0-2026-DOM
              </span>
              <span className="text-[11px] text-slate-500 font-serif italic">
                Cảm ơn bạn đã đọc trọn vẹn tập san!
              </span>
            </div>

            <button
              onClick={() => {
                sounds.playPageFlip();
                onBackToCover();
              }}
              className="bg-slate-900 hover:bg-slate-800 text-yellow-300 font-black text-xs px-3 py-2 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 uppercase cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Về Trang Bìa</span>
            </button>
          </div>
        </div>

        {/* Bottom Folio */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span>KẾT THÚC TẬP SAN #01</span>
          <span className="font-mono text-slate-900 font-bold">Trang 10 / 10</span>
        </div>
      </div>
    </div>
  );
};
