import React, { useState } from 'react';
import { Building2, Target, CheckCircle2, Users, Calendar, ArrowRight, Shield, Award, MapPin } from 'lucide-react';
import { sounds } from '../utils/audio';

export const OverviewSection: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<1 | 2>(1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner - Sophisticated Editorial & Sharp Architecture */}
      <div className="relative bg-white border-2 border-black shadow-[6px_6px_0px_#000000] p-6 sm:p-8 overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#006491]" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-[#006491] text-white text-[11px] font-black px-3 py-1 uppercase tracking-widest border border-black shadow-[2px_2px_0px_#000]">
                <span className="w-1.5 h-1.5 bg-yellow-300" />
                Chương 01 / Tổng Quan
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                Case Study Strategy
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight font-heading leading-tight">
              Tổng Quan Chiến Dịch{' '}
              <span className="text-[#006491] underline decoration-[#E31837] decoration-4 underline-offset-4">
                &ldquo;Paving For Pizza&rdquo;
              </span>
            </h2>

            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              Chi tiết về đơn vị thực hiện, thời gian tổ chức theo từng giai đoạn, mục tiêu chiến lược và các nhóm đối tượng mục tiêu cốt lõi.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end justify-center border-l-2 border-slate-200 pl-6 shrink-0">
            <span className="text-3xl font-black text-[#006491] font-heading leading-none">2018</span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-1">Cannes Lions Gold</span>
          </div>
        </div>
      </div>

      {/* Visual Imagery Row */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border-3 border-black overflow-hidden h-44 pop-shadow relative group">
          <img
            src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80"
            alt="Domino's Pizza Store"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-bold">Domino&apos;s Store &amp; Chuỗi giao hàng</span>
          </div>
        </div>

        <div className="rounded-2xl border-3 border-black overflow-hidden h-44 pop-shadow relative group">
          <img
            src="https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=600&q=80"
            alt="Road Pothole Infrastructure"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-bold">Thực trạng ổ gà tại đường phố Mỹ</span>
          </div>
        </div>

        <div className="rounded-2xl border-3 border-black overflow-hidden h-44 pop-shadow relative group">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
            alt="Delicious Pizza Box"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-bold">Chiếc Pizza cần được giao nguyên vẹn</span>
          </div>
        </div>
      </div>

      {/* Overview Cards: Agency & Objectives vs Target Audiences */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Agency & Objectives */}
        <div className="bg-white p-6 rounded-3xl border-4 border-black pop-shadow space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#E31837] text-white rounded-2xl border-2 border-black flex items-center justify-center text-2xl font-black">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-900 uppercase font-heading">Đơn Vị Thực Hiện</h3>
              <p className="text-sm font-bold text-[#E31837]">Domino&apos;s Pizza (Phối hợp cùng Agency CP+B)</p>
            </div>
          </div>

          <hr className="border-2 border-slate-200" />

          <div className="space-y-3">
            <h4 className="font-black text-lg text-[#006491] uppercase font-heading flex items-center gap-2">
              <Target className="w-5 h-5 text-[#E31837]" />
              Mục Tiêu Chiến Dịch
            </h4>
            <ul className="space-y-3 text-sm font-medium text-slate-700">
              <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Giữ vững định vị thương hiệu:</strong> Khẳng định vị thế &ldquo;Đơn vị vận chuyển pizza hàng đầu thế giới&rdquo; với cam kết sản phẩm đến tay khách hàng toàn vẹn 100%.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Tăng độ nhận biết (Brand Awareness):</strong> Thu hút sự chú ý của toàn cộng đồng thông qua hành động thực tế khác biệt – doanh nghiệp tư nhân đi vá đường công cộng.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Tăng tình cảm thương hiệu (Brand Love):</strong> Tạo dựng hình ảnh một thương hiệu trách nhiệm, hài hước và thực sự lắng nghe phản ánh từ khách hàng.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-white p-6 rounded-3xl border-4 border-black pop-shadow space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 text-black rounded-2xl border-2 border-black flex items-center justify-center text-2xl font-black">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-900 uppercase font-heading">Đối Tượng Hướng Tới</h3>
              <p className="text-sm font-bold text-slate-500">Target Audiences</p>
            </div>
          </div>

          <hr className="border-2 border-slate-200" />

          <div className="grid gap-3.5">
            <div className="bg-slate-50 p-4 rounded-xl border-2 border-black flex items-center gap-3.5">
              <span className="text-3xl shrink-0">🛵</span>
              <div>
                <h5 className="font-black text-sm text-slate-900">Khách hàng đặt Pizza mang về &amp; giao tận nơi</h5>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Những người mong muốn nhận chiếc bánh pizza hoàn hảo, không bị trôi phô mai hay méo dập hộp do ổ gà.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border-2 border-black flex items-center gap-3.5">
              <span className="text-3xl shrink-0">🚗</span>
              <div>
                <h5 className="font-black text-sm text-slate-900">Cộng đồng người lái xe &amp; Cư dân đô thị</h5>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Người dân bức xúc vì tình trạng ổ gà làm nổ lốp, cong vành và hư hỏng phương tiện giao thông hàng ngày.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border-2 border-black flex items-center gap-3.5">
              <span className="text-3xl shrink-0">🏛️</span>
              <div>
                <h5 className="font-black text-sm text-slate-900">Chính quyền địa phương các thành phố</h5>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Các hội đồng đô thị thiếu hụt ngân sách bảo trì hạ tầng đường bộ, hoan nghênh tài trợ từ khối tư nhân.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Timeline with Interactive Phase Selector */}
      <div className="bg-white p-6 rounded-3xl border-4 border-black pop-shadow space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 pb-3">
          <h3 className="font-black text-2xl text-[#006491] uppercase flex items-center gap-2 font-heading">
            <Calendar className="w-6 h-6 text-[#E31837]" />
            Thời Gian Triển Khai (2 Giai Đoạn Cốt Lõi)
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setSelectedPhase(1);
              }}
              className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs font-black transition-all ${
                selectedPhase === 1 ? 'bg-[#006491] text-white shadow-sm' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Giai đoạn 1 (06 - 08/2018)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setSelectedPhase(2);
              }}
              className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs font-black transition-all ${
                selectedPhase === 2 ? 'bg-[#E31837] text-white shadow-sm' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Giai đoạn 2 (08 - 12/2018)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            onClick={() => {
              sounds.playClick();
              setSelectedPhase(1);
            }}
            className={`p-6 rounded-2xl border-3 border-black pop-shadow space-y-3 cursor-pointer transition-all ${
              selectedPhase === 1 ? 'bg-sky-50 ring-4 ring-[#006491]' : 'bg-slate-50 opacity-80'
            }`}
          >
            <div className="inline-block bg-[#006491] text-white px-3 py-1 rounded-lg text-xs font-black uppercase border border-black">
              Giai đoạn 1 (06/2018 - 08/2018)
            </div>
            <h4 className="font-black text-xl text-slate-900 font-heading">Thử Nghiệm &amp; Kích Hoạt CSR Ban Đầu</h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Diễn ra từ <strong>tháng 6 đến tháng 8 năm 2018</strong>. Domino&apos;s bắt đầu hợp tác thử nghiệm tài trợ ngân sách sửa ổ gà tại 4 thành phố nhỏ:
            </p>
            <ul className="text-xs space-y-1 font-semibold text-slate-800 list-disc list-inside bg-white/70 p-2.5 rounded-lg border border-slate-200">
              <li>Bartonville, Texas</li>
              <li>Milford, Delaware</li>
              <li>Athens, Georgia</li>
              <li>Hilo, Hawaii</li>
            </ul>
            <p className="text-xs text-slate-600 font-medium">
              Tạo ra làn sóng truyền thông rầm rộ trên TVC và mạng xã hội nhờ tính bất ngờ và thiết thực.
            </p>
          </div>

          <div
            onClick={() => {
              sounds.playClick();
              setSelectedPhase(2);
            }}
            className={`p-6 rounded-2xl border-3 border-black pop-shadow space-y-3 cursor-pointer transition-all ${
              selectedPhase === 2 ? 'bg-red-50 ring-4 ring-[#E31837]' : 'bg-slate-50 opacity-80'
            }`}
          >
            <div className="inline-block bg-[#E31837] text-white px-3 py-1 rounded-lg text-xs font-black uppercase border border-black">
              Giai đoạn 2 (08/2018 - 12/2018)
            </div>
            <h4 className="font-black text-xl text-slate-900 font-heading">Mở Rộng Quy Mô Toàn Quốc (50 Bang)</h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Diễn ra từ <strong>tháng 8 đến tháng 12 năm 2018</strong>. Trước sự hưởng ứng ngoài mong đợi của công chúng:
            </p>
            <div className="bg-white/70 p-2.5 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-800 font-medium">
              <p>🎯 Domino&apos;s nhân rộng chương trình tài trợ vá đường đến đủ <strong>50 tiểu bang tại Hoa Kỳ</strong>.</p>
              <p>🗳️ Quyết định tài trợ dựa trên số lượt bình chọn và đề cử mã bưu chính (Zip code) từ chính cư dân.</p>
              <p>🏷️ Mỗi ổ gà được hoàn thiện kèm tem sơn chịu nhiệt: <em>&ldquo;OH YES WE DID&rdquo;</em>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
