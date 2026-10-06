import React from 'react';
import { PageId } from '../types';
import { ArrowRight, PieChart, Sparkles, MapPin, Award, Users, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HomeSectionProps {
  onNavigate: (page: PageId) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    sounds.playClick();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#006491] via-[#004f73] to-[#003852] rounded-3xl border-4 border-black pop-shadow-lg p-6 sm:p-10 text-white overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-full border-2 border-black text-xs sm:text-sm font-black uppercase tracking-wider pop-shadow-sm">
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Case Study PR &amp; Truyền Thông Đột Phá</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase font-heading text-balance">
              Paving For Pizza <br />
              <span className="text-yellow-300 drop-shadow-[0_3px_0_#000]">
                Khi Domino&apos;s Vá Đường Phố Mỹ
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl">
              Khám phá chiến dịch truyền thông huyền thoại của{' '}
              <span className="font-bold text-yellow-300 underline underline-offset-4">
                Domino&apos;s Pizza
              </span>{' '}
              – Tự chi tiền sửa chữa hàng ngàn ổ gà khắp nước Mỹ với thông điệp độc đáo:{' '}
              <span className="font-bold italic bg-[#E31837] px-2.5 py-0.5 rounded-lg border border-black text-white inline-block shadow-sm">
                &ldquo;Bảo vệ chiếc bánh Pizza khỏi bị hư hỏng trên đường giao!&rdquo;
              </span>
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => handleNav('page1')}
                className="bg-[#E31837] hover:bg-red-600 active:scale-95 text-white font-black text-base sm:text-lg px-7 py-3.5 rounded-2xl border-4 border-black pop-shadow hover:scale-105 transition-all flex items-center gap-3 uppercase cursor-pointer"
              >
                Khám phá chiến dịch <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNav('page2')}
                className="bg-white hover:bg-slate-100 active:scale-95 text-slate-900 font-black text-base sm:text-lg px-7 py-3.5 rounded-2xl border-4 border-black pop-shadow hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                Mô hình PESO <PieChart className="w-5 h-5 text-[#006491]" />
              </button>
              <button
                onClick={() => handleNav('page5')}
                className="bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-900 font-black text-base sm:text-lg px-7 py-3.5 rounded-2xl border-4 border-black pop-shadow hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Chơi Game &amp; Vá Đường VN 🇻🇳</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Collage with Real Pizza Aesthetics */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md floating">
              <div className="bg-white p-4 rounded-3xl border-4 border-black pop-shadow-lg text-slate-900 text-center space-y-3">
                <div className="relative rounded-2xl border-3 border-black overflow-hidden h-56 bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
                    alt="Domino's Pizza Fresh Slice"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#E31837] text-white font-black text-xs py-1 px-3 rounded-lg border-2 border-black uppercase pop-shadow-sm">
                    &ldquo;OH YES WE DID&rdquo;
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-sky-50 p-2 rounded-xl border-2 border-black">
                    <p className="text-xl font-black text-[#006491]">50</p>
                    <p className="text-[10px] font-bold text-slate-600 uppercase">Bang tại Mỹ</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded-xl border-2 border-black">
                    <p className="text-xl font-black text-[#E31837]">137K+</p>
                    <p className="text-[10px] font-bold text-slate-600 uppercase">Đề cử lấp đường</p>
                  </div>
                  <div className="bg-amber-50 p-2 rounded-xl border-2 border-black">
                    <p className="text-xl font-black text-amber-600">1B+</p>
                    <p className="text-[10px] font-bold text-slate-600 uppercase">Media Reach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => handleNav('page1')}
          className="cursor-pointer bg-white p-4 rounded-2xl border-3 border-black pop-shadow hover:bg-sky-50 transition-all hover:-translate-y-1 space-y-3 group"
        >
          <div className="h-32 rounded-xl border-2 border-black overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80"
              alt="Pizza Delivery Scooter"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-[#006491] text-white w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center font-black text-sm">
              1
            </span>
          </div>
          <h3 className="font-black text-lg text-slate-900 font-heading">1. Tổng Quan Chiến Dịch</h3>
          <p className="text-xs text-slate-600 font-medium">
            Bối cảnh, 2 giai đoạn triển khai, mục tiêu &amp; đối tượng mục tiêu.
          </p>
        </div>

        <div
          onClick={() => handleNav('page2')}
          className="cursor-pointer bg-white p-4 rounded-2xl border-3 border-black pop-shadow hover:bg-red-50 transition-all hover:-translate-y-1 space-y-3 group"
        >
          <div className="h-32 rounded-xl border-2 border-black overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
              alt="Pizza 4 Slices PESO"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-[#E31837] text-white w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center font-black text-sm">
              2
            </span>
          </div>
          <h3 className="font-black text-lg text-slate-900 font-heading">2. Phân Tích PESO 3D</h3>
          <p className="text-xs text-slate-600 font-medium">
            Mô hình bánh Pizza 4 miếng tương tác: Paid, Earned, Shared, Owned.
          </p>
        </div>

        <div
          onClick={() => handleNav('page3')}
          className="cursor-pointer bg-white p-4 rounded-2xl border-3 border-black pop-shadow hover:bg-yellow-50 transition-all hover:-translate-y-1 space-y-3 group"
        >
          <div className="h-32 rounded-xl border-2 border-black overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
              alt="Pizza Box"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-yellow-400 text-black w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center font-black text-sm">
              3
            </span>
          </div>
          <h3 className="font-black text-lg text-slate-900 font-heading">3. Hiệu Quả &amp; Hạn Chế</h3>
          <p className="text-xs text-slate-600 font-medium">
            Số liệu truyền thông &amp; 4 Hộp Pizza 3D mở nắp xem hạn chế.
          </p>
        </div>

        <div
          onClick={() => handleNav('page5')}
          className="cursor-pointer bg-white p-4 rounded-2xl border-3 border-black pop-shadow hover:bg-emerald-50 transition-all hover:-translate-y-1 space-y-3 group"
        >
          <div className="h-32 rounded-xl border-2 border-black overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
              alt="Road Repair Pothole"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-emerald-500 text-white w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center font-black text-sm">
              🇻🇳
            </span>
          </div>
          <h3 className="font-black text-lg text-slate-900 font-heading">5. Đề Xuất Đường VN &amp; Game</h3>
          <p className="text-xs text-slate-600 font-medium">
            Chọn Tỉnh/Thành đề xuất vá đường tại Việt Nam &amp; chơi Game Pothole Hero.
          </p>
        </div>
      </div>

      {/* Trust & Strategic Key Takeaways Row */}
      <div className="bg-white p-6 rounded-3xl border-4 border-black pop-shadow grid md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 border-2 border-black flex items-center justify-center text-[#E31837] shrink-0 font-black">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-sm text-slate-900 font-heading">Cam kết bảo vệ sản phẩm</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Từ lời hứa &ldquo;Carryout Insurance&rdquo; đến hành động can thiệp trực tiếp vào hạ tầng giao thông.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 border-2 border-black flex items-center justify-center text-[#006491] shrink-0 font-black">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-sm text-slate-900 font-heading">Sức mạnh Crowdsourcing</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Trao quyền cho khách hàng tự đề xuất điểm vá đường tại thị trấn của mình, tạo tính thảo luận toàn quốc.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-black flex items-center justify-center text-amber-700 shrink-0 font-black">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-sm text-slate-900 font-heading">Giải thưởng danh giá</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Cannes Lions Gold &amp; Grand Prix cho chiến dịch trải nghiệm thương hiệu (Brand Experience &amp; Activation).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
