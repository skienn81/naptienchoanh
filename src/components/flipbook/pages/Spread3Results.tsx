import React, { useState } from 'react';
import { Trophy, TrendingUp, AlertTriangle, Sparkles, RefreshCcw, Box, ArrowRight, ShieldAlert, Award } from 'lucide-react';
import { sounds } from '../../../utils/audio';

interface BoxPitfallItem {
  id: number;
  boxTitle: string;
  tag: string;
  color: string;
  summary: string;
  deepDive: string;
  counterMeasure: string;
}

const PITFALLS: BoxPitfallItem[] = [
  {
    id: 1,
    boxTitle: 'HỘP 01: NGÂN SÁCH NHỎ SO VỚI THỰC TẾ',
    tag: 'RỦI RO QUY MÔ',
    color: '#E31837',
    summary: 'Chỉ $5,000 / thành phố – giọt nước giữa đại dương hạ tầng hàng tỷ USD.',
    deepDive: 'Chi phí $5,000 chỉ đủ lấp vài chục ổ gà mang tính biểu tượng chụp ảnh PR. Một số nhà phân tích chỉ trích đây là chiến dịch "làm màu" hơn là cứu nguy hạ tầng quốc gia.',
    counterMeasure: 'Bài học: Domino\'s thẳng thắn thừa nhận họ là hãng bánh Pizza, mục tiêu là bảo vệ chiếc bánh của mình chứ không thể thay thế toàn bộ Bộ Giao thông Vận tải.'
  },
  {
    id: 2,
    boxTitle: 'HỘP 02: THỦ TỤC HÀNH CHÍNH & CẤP PHÉP',
    tag: 'RÀO CẢN PHÁP LÝ',
    color: '#006491',
    summary: 'Không thể tự ý đổ nhựa đường lên tài sản công cộng của nhà nước.',
    deepDive: 'Đội ngũ pháp chế Domino\'s phải làm việc với từng phòng ban giao thông của từng thị trấn để ký thỏa thuận nhận tiền tài trợ. Một số thành phố lớn từ chối vì sợ mang tiếng yếu kém.',
    counterMeasure: 'Bài học: Tiếp cận trước các thị trấn nhỏ đang khan hiếm ngân sách, tạo tiền lệ thành công rồi mới đàm phán với các thành phố lớn hơn.'
  },
  {
    id: 3,
    boxTitle: 'HỘP 03: TRANH CÃI PR TRỤC LỢI (CAUSE EXPLOITATION)',
    tag: 'CHỈ TRÍCH TRUYỀN THÔNG',
    color: '#d97706',
    summary: 'Bị The Guardian và một số chuyên gia phê phán thương mại hóa đường sá.',
    deepDive: 'Việc dập logo Domino\'s lên mặt đường bị chỉ trích là biến không gian công cộng thành bảng quảng cáo miễn phí của doanh nghiệp tư nhân.',
    counterMeasure: 'Bài học: Sử dụng mực sơn chịu nhiệt có thể mờ dần theo thời gian, đặt lợi ích an toàn cho người dân lái xe lên trước logo quảng cáo.'
  },
  {
    id: 4,
    boxTitle: 'HỘP 04: TRÁCH NHIỆM CHẤT LƯỢNG THI CÔNG',
    tag: 'AN TOÀN KỸ THUẬT',
    color: '#059669',
    summary: 'Nếu mảng đường mới vá bị nứt vỡ hoặc gây trượt ngã, ai sẽ chịu trách nhiệm?',
    deepDive: 'Nếu để công nhân Domino\'s tự làm và xảy ra tai nạn giao thông, hãng sẽ đối mặt với các vụ kiện tụng dân sự triệu đô.',
    counterMeasure: 'Bài học: Domino\'s chỉ tài trợ tiền mặt (grant) và vật liệu, việc thi công do chính nhà thầu được cấp phép của địa phương thực hiện.'
  }
];

export const Spread3Results: React.FC = () => {
  // Before / After Slider state
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [openedBoxId, setOpenedBoxId] = useState<number>(1);

  const handleBoxClick = (id: number) => {
    setOpenedBoxId(id);
    sounds.playBoxOpen();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch h-full">
      {/* LEFT PAGE: TRANG 05 - KẾT QUẢ & BEFORE/AFTER SLIDER */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>THE DOMINO&apos;S CHRONICLE &bull; KẾT QUẢ &amp; HIỆN TRƯỜNG</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 05
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-[#E31837] text-white text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> KẾT QUẢ KỶ LỤC TRUYỀN THÔNG
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-600">
              CANNES LIONS 2018
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading leading-tight">
              Kéo Trượt So Sánh Hiện Trường: <br />
              <span className="text-[#006491]">Trước &amp; Sau Khi Vá Đường</span>
            </h2>
            <p className="text-xs text-slate-700 font-serif mt-1">
              Dùng chuột hoặc ngón tay kéo thanh trượt ở giữa để thấy sự biến đổi ngoạn mục:
            </p>
          </div>

          {/* INTERACTIVE BEFORE / AFTER SLIDER */}
          <div className="relative border-3 border-black rounded-lg overflow-hidden h-52 sm:h-56 select-none bg-slate-900 shadow-[4px_4px_0px_#000]">
            {/* Background: AFTER Image (Smooth asphalt with Domino's stamp) */}
            <div className="absolute inset-0 bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80"
                alt="After: Smooth road with Domino's logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-3 right-3 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 border border-black shadow-md flex items-center gap-1.5 uppercase">
                <span>SAU KHI VÁ (LÁNG MỊN)</span>
              </div>
              <div className="absolute top-3 right-3 bg-yellow-300 text-slate-950 font-mono font-black text-[11px] px-2 py-0.5 border border-black">
                LOGO &ldquo;OH YES WE DID&rdquo;
              </div>
            </div>

            {/* Foreground: BEFORE Image (Nasty Pothole) with clipPath */}
            <div
              className="absolute inset-0 bg-slate-950 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
                alt="Before: Nasty cracked pothole"
                className="w-full h-full object-cover filter contrast-125"
                style={{ width: '100%', maxWidth: 'none' }}
              />
              <div className="absolute inset-0 bg-red-950/25" />
              <div className="absolute bottom-3 left-3 bg-[#E31837] text-white font-black text-xs px-2.5 py-1 border border-black shadow-md flex items-center gap-1.5 uppercase">
                <span>TRƯỚC KHI VÁ (Ổ GÀ NÁT)</span>
              </div>
              <div className="absolute top-3 left-3 bg-red-600 text-white font-mono font-black text-[10px] px-2 py-0.5 border border-black">
                HIỂM HỌA 5.0G
              </div>
            </div>

            {/* Slider Divider Line & Thumb */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-yellow-300 shadow-[0_0_8px_#000] cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 bg-yellow-400 border-2 border-black rounded-full flex items-center justify-center font-black text-[11px] shadow-lg pointer-events-auto">
                ↔
              </div>
            </div>

            {/* Native Range Input for accessibility */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
              aria-label="Thanh trượt so sánh trước và sau"
            />
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-sky-50 border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Earned Media</span>
              <span className="text-xl font-black text-[#006491] font-heading block">1 TỶ+</span>
              <span className="text-[9px] text-slate-500">Lượt tiếp cận tự nhiên</span>
            </div>
            <div className="bg-red-50 border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Đề cử từ dân</span>
              <span className="text-xl font-black text-[#E31837] font-heading block">137.000+</span>
              <span className="text-[9px] text-slate-500">Từ 50 bang nước Mỹ</span>
            </div>
            <div className="bg-amber-50 border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Doanh số tăng</span>
              <span className="text-xl font-black text-amber-700 font-heading block">+6.3%</span>
              <span className="text-[9px] text-slate-500">Tăng trưởng cùng kỳ</span>
            </div>
          </div>
        </div>

        {/* Bottom Folio */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span>Chương 3: Bằng Chứng Thực Tế</span>
          <span className="italic">Trang 05 / 10</span>
        </div>
      </div>

      {/* RIGHT PAGE: TRANG 06 - HỒ SƠ 4 CHIẾC HỘP CẠM BẪY */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>PHÂN TÍCH PHẢN BIỆN &bull; GÓC KHUẤT TRUYỀN THÔNG</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 06
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> BÓC MẼ 4 CHIẾC HỘP CẠM BẪY
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-600">
              CLICK MỞ HỘP PIZZA
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase font-heading">
              Góc Khuất: Những Rủi Ro Lớn Domino&apos;s Phải Đối Mặt
            </h3>
            <p className="text-xs text-slate-700 font-serif mt-1">
              Không có chiến dịch nào là hoàn hảo. Nhấp vào 4 nắp hộp pizza bên dưới để mở hồ sơ rủi ro và cách giải quyết:
            </p>
          </div>

          {/* Interactive 4 Pizza Boxes Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {PITFALLS.map((p) => {
              const isOpen = openedBoxId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleBoxClick(p.id)}
                  className={`p-2.5 border-2 border-black text-left transition-all cursor-pointer flex items-center justify-between ${
                    isOpen
                      ? 'bg-yellow-300 text-slate-950 shadow-[3px_3px_0px_#000] -translate-y-0.5 font-black'
                      : 'bg-white text-slate-700 hover:bg-slate-100 font-bold'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase block font-mono">
                      {p.tag}
                    </span>
                    <span className="text-xs truncate block">{p.boxTitle}</span>
                  </div>
                  <span className="text-base">{isOpen ? '📂' : '📦'}</span>
                </button>
              );
            })}
          </div>

          {/* Deep Dive Box View */}
          {(() => {
            const current = PITFALLS.find(p => p.id === openedBoxId) || PITFALLS[0];
            return (
              <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-black uppercase text-[#E31837] flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    {current.boxTitle}
                  </span>
                  <span className="text-[10px] font-mono bg-slate-900 text-white px-2 py-0.5">
                    HỒ SƠ BẢO MẬT
                  </span>
                </div>

                <div className="space-y-2 text-xs font-serif leading-relaxed text-slate-800">
                  <p>
                    <strong className="font-sans text-slate-950">Vấn đề cốt lõi: </strong>
                    {current.deepDive}
                  </p>
                  <div className="bg-amber-50 p-2.5 border-l-4 border-amber-500 text-[12px] font-sans font-medium text-slate-900">
                    💡 <strong className="text-amber-900">Cách Domino&apos;s hóa giải: </strong>
                    {current.counterMeasure}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                  <span>Trích xuất từ hồ sơ thẩm định Cannes</span>
                  <span className="text-[#006491] font-bold">Lật mở hộp khác ➔</span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Bottom Folio */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span>Chương 3: Đánh Giá Độc Lập</span>
          <span className="font-mono text-slate-900 font-bold">Hồ sơ 6/5</span>
        </div>
      </div>
    </div>
  );
};
