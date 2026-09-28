import React, { useState } from 'react';
import { Newspaper, Sparkles, Volume2, AlertOctagon, StickyNote, Activity, Info, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../../utils/audio';

export const Spread1Context: React.FC = () => {
  // Interactive Simulator state
  const [impactLevel, setImpactLevel] = useState<'mild' | 'moderate' | 'catastrophic'>('moderate');
  const [showEditorSecret, setShowEditorSecret] = useState(false);
  const [activeAudioNote, setActiveAudioNote] = useState(false);

  const handleImpactChange = (level: 'mild' | 'moderate' | 'catastrophic') => {
    setImpactLevel(level);
    if (level === 'mild') sounds.playClick();
    else if (level === 'moderate') sounds.playPave();
    else sounds.playHit();
  };

  const toggleAudioSimulation = () => {
    setActiveAudioNote(prev => !prev);
    sounds.playPave();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch h-full">
      {/* LEFT PAGE: TRANG 01 - THƯ TÒA SOẠN & BỐI CẢNH */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>THE DOMINO&apos;S CHRONICLE &bull; BÁO CÁO ĐIỀU TRA</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 01
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#006491] text-white text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000]">
              THƯ TÒA SOẠN &bull; EDITORIAL
            </span>
            <span className="text-[11px] font-serif italic text-slate-500">
              Chấp bút: Hội đồng Thẩm định Truyền thông
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading leading-tight tracking-tight">
            Khi Thương Hiệu Dám Làm Thay <br />
            <span className="text-[#E31837] underline decoration-[#006491] decoration-3">
              Những Gì Lời Nói Không Làm Được
            </span>
          </h2>

          {/* Authentic 2-Column Newspaper Body */}
          <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-[13px] text-slate-800 font-serif leading-relaxed text-justify">
            <p>
              <span className="text-4xl float-left font-black font-heading leading-none mr-2 text-slate-950">
                N
              </span>
              ăm 2018, các nhà quảng cáo toàn cầu vẫn đang chìm đắm trong các khẩu hiệu hào nhoáng. Thế nhưng, tại trụ sở Ann Arbor của Domino&apos;s Pizza, một bài toán nhức nhối xuất hiện: Tại sao hàng triệu chiếc bánh nướng hảo hạng rời lò giòn rụm nhưng khi tới tay khách hàng lại nát vụn và dính phô mai vào nắp hộp?
            </p>
            <p>
              Thủ phạm không phải do shipper lái xe ẩu. Thủ phạm chính là <strong className="font-sans font-black text-[#E31837]">hệ thống hạ tầng giao thông nước Mỹ đang xuống cấp nghiêm trọng</strong> với hàng triệu ổ gà chực chờ nuốt chửng bánh xe. Thay vì than phiền, Domino&apos;s đã làm một điều không tưởng: Trực tiếp đi vá đường!
            </p>
          </div>

          {/* Editorial Photo Collage */}
          <div className="relative border-2 border-black bg-slate-900 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=700&q=80"
              alt="Domino's delivery car"
              className="w-full h-36 object-cover opacity-90 group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-2 text-white text-[11px] font-mono flex items-center justify-between">
              <span>HÌNH 1.1: Đội xe giao hàng Domino&apos;s đối mặt với mặt đường gồ ghề</span>
              <span className="text-yellow-400">CHÂN THẬT</span>
            </div>
          </div>

          {/* Interactive Sticky Note (Bóc tem khám phá hậu trường) */}
          <div
            onClick={() => {
              setShowEditorSecret(prev => !prev);
              sounds.playClick();
            }}
            className="cursor-pointer bg-yellow-200 hover:bg-yellow-100 border-2 border-dashed border-amber-600 p-3 shadow-[3px_3px_0px_#b45309] transition-all transform hover:-rotate-1 relative select-none"
            title="Click để bóc ghi chú biên tập viên!"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-900 font-sans">
                <StickyNote className="w-4 h-4 text-amber-800" />
                Ghi chú mật của Biên tập viên (Click to reveal)
              </span>
              <span className="text-[10px] bg-amber-400 px-1.5 py-0.5 font-mono font-bold text-slate-950">
                {showEditorSecret ? 'ĐANG MỞ' : 'NHẤN ĐỂ XEM'}
              </span>
            </div>

            {showEditorSecret ? (
              <p className="text-xs font-serif text-amber-950 leading-relaxed animate-fadeIn">
                🎯 <strong>Bí mật hậu trường:</strong> Đơn vị sáng tạo CP+B (Crispin Porter Bogusky) lúc đầu chỉ đề xuất chiến dịch online. Nhưng chính CEO Domino&apos;s đã đập bàn: <em>&ldquo;Nếu chúng ta không đổ nhựa đường thật xuống mặt đường, công chúng sẽ coi đây chỉ là trò hề PR rẻ tiền!&rdquo;</em>. Nhờ sự quyết liệt này, chiến dịch đã thắng giải Cannes Lions.
              </p>
            ) : (
              <p className="text-xs font-serif italic text-amber-900/80">
                &ldquo;Tại sao Domino&apos;s lại dám đổ nhựa đường thật thay vì chỉ làm quảng cáo 3D? Nhấn vào đây để xem phát biểu của Giám đốc Sáng tạo...&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Bottom Folio / Quote */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span>Tập San Chuyên Khảo &bull; Phân tích chiến dịch PR</span>
          <span className="italic">Chương 1: Khởi nguồn ý tưởng</span>
        </div>
      </div>

      {/* RIGHT PAGE: TRANG 02 - KHỦNG HOẢNG & MÁY MÔ PHỎNG VA ĐẬP PIZZA */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>HỒ SƠ HIỆN TRƯỜNG &bull; VẤN NẠN DÂN SINH</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 02
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-[#E31837] text-white text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5" /> HIỂM HỌA Ổ GÀ (POTHOLE CRISIS)
            </span>
            <span className="text-[11px] font-bold text-slate-600 font-mono">
              37 TRIỆU Ổ GÀ / NĂM
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase font-heading">
              Khi Cú Xóc Ổ Gà Phá Hỏng Niềm Tin Khách Hàng
            </h3>
            <p className="text-xs text-slate-700 font-serif mt-1">
              Người Mỹ chi hàng tỷ USD tiền sửa lốp xe mỗi năm. Nhưng với Domino&apos;s, mỗi cú sụp hố là một thảm họa thẩm mỹ ẩm thực khiến khách hàng thất vọng.
            </p>
          </div>

          {/* INTERACTIVE ELEMENT: DAMAGE SIMULATOR (MÁY ĐO CHẤN ĐỘNG PIZZA) */}
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#E31837] animate-pulse" />
                <span className="text-xs font-black uppercase text-slate-900 tracking-wider">
                  MÁY MÔ PHỎNG VA ĐẬP TRONG HỘP BÁNH (INTERACTIVE SIMULATOR)
                </span>
              </div>
              <span className="text-[10px] bg-yellow-300 font-bold px-2 py-0.5 border border-black">
                CLICK THỬ NGHIỆM
              </span>
            </div>

            {/* Impact Selector Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleImpactChange('mild')}
                className={`p-2 border-2 border-black text-left font-black transition-all cursor-pointer ${
                  impactLevel === 'mild'
                    ? 'bg-emerald-400 text-slate-950 shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="text-[10px] uppercase font-mono">Cấp 1 &bull; 0.5G</div>
                <div className="text-xs mt-0.5">Gờ giảm tốc</div>
              </button>

              <button
                onClick={() => handleImpactChange('moderate')}
                className={`p-2 border-2 border-black text-left font-black transition-all cursor-pointer ${
                  impactLevel === 'moderate'
                    ? 'bg-amber-400 text-slate-950 shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="text-[10px] uppercase font-mono">Cấp 2 &bull; 2.0G</div>
                <div className="text-xs mt-0.5">Ổ gà trung bình</div>
              </button>

              <button
                onClick={() => handleImpactChange('catastrophic')}
                className={`p-2 border-2 border-black text-left font-black transition-all cursor-pointer ${
                  impactLevel === 'catastrophic'
                    ? 'bg-[#E31837] text-white shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="text-[10px] uppercase font-mono">Cấp 3 &bull; 5.0G</div>
                <div className="text-xs mt-0.5">Hố sụp tử thần</div>
              </button>
            </div>

            {/* Visual Box Result Display */}
            <div className="relative border-2 border-black rounded-lg p-3 bg-slate-900 text-white overflow-hidden min-h-[140px] flex flex-col justify-between">
              {/* Background Pizza representation */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-yellow-300 font-bold">
                  CAMERA QUAN SÁT TRONG HỘP PIZZA CAM #01
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 border ${
                  impactLevel === 'mild' ? 'bg-emerald-500 text-black border-white' :
                  impactLevel === 'moderate' ? 'bg-amber-500 text-black border-white' :
                  'bg-red-600 text-white border-yellow-300 animate-pulse'
                }`}>
                  {impactLevel === 'mild' ? 'AN TOÀN' : impactLevel === 'moderate' ? 'LỆCH TÂM' : 'HỎNG HOÀN TOÀN!'}
                </span>
              </div>

              {/* Pizza Visual State */}
              <div className="my-2 flex items-center gap-4">
                <div className="relative w-20 h-20 shrink-0 border-2 border-yellow-400 rounded-full flex items-center justify-center bg-amber-950 overflow-hidden">
                  {impactLevel === 'mild' && (
                    <div className="text-3xl transition-transform duration-300">🍕</div>
                  )}
                  {impactLevel === 'moderate' && (
                    <div className="text-3xl transform rotate-45 translate-x-1.5 transition-transform duration-300">
                      🍕💥
                    </div>
                  )}
                  {impactLevel === 'catastrophic' && (
                    <div className="text-3xl transform rotate-90 scale-125 transition-transform duration-300 filter hue-rotate-30">
                      💥🤢
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-yellow-200">
                    {impactLevel === 'mild' && 'Bánh ổn định. Độ rung nhẹ không ảnh hưởng tới kết cấu phô mai mozzarella.'}
                    {impactLevel === 'moderate' && 'Phô mai bị dồn sang một bên mép hộp. Vài lát pepperoni văng ra khỏi bề mặt.'}
                    {impactLevel === 'catastrophic' && 'Bánh bị hất tung đập vào nắp hộp giấy! Phô mai dính chặt lên nắp, đế bánh gãy đôi!'}
                  </p>
                  <p className="text-[11px] text-slate-300 font-serif italic">
                    &ldquo;Khách hàng mở hộp bánh ra với tâm trạng bức xúc và lập tức gọi điện phàn nàn tổng đài!&rdquo;
                  </p>
                </div>
              </div>

              {/* Soundbite prompt button */}
              <button
                onClick={toggleAudioSimulation}
                className="mt-1 self-start flex items-center gap-1.5 text-[11px] font-black uppercase text-yellow-300 hover:text-white transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe thử mô phỏng âm thanh va đập xe lu</span>
              </button>
            </div>
          </div>

          {/* Key Metric Snapshot */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-slate-100 border border-black p-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Thiệt hại hạ tầng Mỹ</span>
              <span className="text-base font-black text-[#E31837] font-heading">$3 Tỷ USD/năm</span>
            </div>
            <div className="bg-slate-100 border border-black p-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Cam kết của Domino&apos;s</span>
              <span className="text-base font-black text-[#006491] font-heading">Bảo đảm nguyên vẹn 100%</span>
            </div>
          </div>
        </div>

        {/* Bottom Folio */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span className="italic">Chương 1: Nỗi đau người dùng</span>
          <span className="font-mono text-slate-900 font-bold">Hồ sơ 2/5</span>
        </div>
      </div>
    </div>
  );
};
