import React, { useState } from 'react';
import { BoxPitfall } from '../types';
import { Trophy, TrendingUp, AlertTriangle, FileWarning, Scale, ShieldAlert, Sparkles, RefreshCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

const pitfalls: BoxPitfall[] = [
  {
    id: 1,
    boxNum: 'HỘP PIZZA 01',
    emoji: '📦🍕',
    title: 'Ngân sách giới hạn và quy mô nhỏ so với thực tế',
    color: '#E31837',
    bgColor: 'bg-[#E31837]',
    subtitle: 'Ngân sách $5,000 / thành phố',
    detail: 'Số tiền tài trợ cho mỗi thành phố chỉ khoảng 5,000 USD – chỉ đủ lấp vài chục ổ gà mang tính biểu tượng để làm hình ảnh truyền thông. Mức này hoàn toàn không đủ giải quyết cuộc khủng hoảng hạ tầng đường xá hàng tỷ USD tại Mỹ.',
    highlight: 'Thiên về tính biểu tượng truyền thông hơn là giải pháp hạ tầng quy mô lớn.'
  },
  {
    id: 2,
    boxNum: 'HỘP PIZZA 02',
    emoji: '🏛️📜',
    title: 'Thủ tục hành chính phức tạp với chính quyền địa phương',
    color: '#006491',
    bgColor: 'bg-[#006491]',
    subtitle: 'Rào cản quy định đô thị và cấp phép',
    detail: 'Domino\'s không thể tự ý thi công trên tài sản công. Việc thương lượng giấy phép tài trợ với từng chính quyền thành phố tốn nhiều thời gian. Một số nơi từ chối thẳng thừng vì không muốn doanh nghiệp tư nhân can thiệp hoặc làm mất mặt cơ quan nhà nước.',
    highlight: 'Mỗi thị trấn có một luật và quy trình nghiệm thu xây dựng riêng biệt.'
  },
  {
    id: 3,
    boxNum: 'HỘP PIZZA 03',
    emoji: '🗞️🗣️',
    title: 'Tranh cãi dư luận về bản chất PR trục lợi thương mại',
    color: '#d97706',
    bgColor: 'bg-amber-500',
    subtitle: 'Chỉ trích từ báo chí và dư luận phản biện',
    detail: 'Một số tờ báo lớn như The Guardian và các chuyên gia đô thị chỉ trích hãng "trục lợi" dựa trên sự yếu kém của hạ tầng công cộng. Việc in logo thương hiệu lên mặt đường giao thông bị coi là hình thức thương mại hóa không gian công cộng quá đà.',
    highlight: 'Nguy cơ bị gắn mác "Cause Exploitation" thay vì lòng nhân ái chân thành.'
  },
  {
    id: 4,
    boxNum: 'HỘP PIZZA 04',
    emoji: '⚠️🛠️',
    title: 'Rủi ro pháp lý & chất lượng thi công không đồng đều',
    color: '#059669',
    bgColor: 'bg-emerald-600',
    subtitle: 'Trách nhiệm pháp lý kéo dài sau thi công',
    detail: 'Do đội ngũ thi công vẫn là các nhà thầu địa phương ký hợp đồng nhanh, chất lượng các vết vá nhựa đường không đồng đều theo thời gian. Nếu vết vá bị sụt lở gây tai nạn xe cộ, logo Domino\'s in ngay cạnh có nguy cơ bị kéo vào các vụ kiện tụng kéo dài.',
    highlight: 'Rủi ro trách nhiệm dân sự đối với an toàn giao thông đường bộ.'
  }
];

export const ResultsSection: React.FC = () => {
  const [flippedBoxes, setFlippedBoxes] = useState<Record<number, boolean>>({});

  const toggleBox = (id: number) => {
    sounds.playClick();
    setFlippedBoxes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const flipAll = () => {
    sounds.playClick();
    const allOpen = Object.values(flippedBoxes).filter(Boolean).length === pitfalls.length;
    const newState: Record<number, boolean> = {};
    pitfalls.forEach(p => {
      newState[p.id] = !allOpen;
    });
    setFlippedBoxes(newState);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header - Editorial Rounded Architecture */}
      <div className="relative bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000000] p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-400" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-black text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest border border-black shadow-[2px_2px_0px_#000]">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                Chương 03 / Đo Lường
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                Outcome &amp; Pitfalls
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight font-heading leading-tight">
              Đánh Giá Hiệu Quả &amp;{' '}
              <span className="text-slate-950 underline decoration-yellow-400 decoration-4 underline-offset-4">
                Hạn Chế Chiến Dịch
              </span>
            </h2>

            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              Đo lường kết quả thực tế vượt bậc cùng 4 hạn chế lớn (Nhấp trực tiếp vào từng Hộp Pizza bên dưới để lật nắp 3D 180 độ xem nội dung chi tiết).
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end justify-center border-l-2 border-slate-200 pl-6 shrink-0">
            <span className="text-3xl font-black text-yellow-500 font-heading leading-none">1B+</span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-1">Total Impressions</span>
          </div>
        </div>
      </div>

      {/* Campaign Results Summary */}
      <div className="space-y-4">
        <h3 className="font-black text-2xl text-[#006491] uppercase flex items-center gap-2 font-heading">
          <TrendingUp className="w-6 h-6 text-[#E31837]" />
          Kết Quả Ấn Tượng Của Chiến Dịch
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border-3 border-black pop-shadow text-center space-y-2 hover:-translate-y-1 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80"
              alt="Social Media Reach"
              className="w-full h-24 object-cover rounded-xl border border-black"
            />
            <div className="text-3xl font-black text-[#E31837] font-heading">35,000+</div>
            <p className="text-xs font-bold text-slate-700">
              Đề cập tự nhiên trong tuần đầu tiên trên mạng xã hội Twitter &amp; Facebook.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border-3 border-black pop-shadow text-center space-y-2 hover:-translate-y-1 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=300&q=80"
              alt="Website Nominate"
              className="w-full h-24 object-cover rounded-xl border border-black"
            />
            <div className="text-3xl font-black text-[#006491] font-heading">137,000+</div>
            <p className="text-xs font-bold text-slate-700">
              Đề cử lấp đường gửi về từ 15,275 mã zip khắp toàn bộ 50 tiểu bang Mỹ.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border-3 border-black pop-shadow text-center space-y-2 hover:-translate-y-1 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=300&q=80"
              alt="Potholes repaired"
              className="w-full h-24 object-cover rounded-xl border border-black"
            />
            <div className="text-3xl font-black text-amber-500 font-heading">200+ Ổ Gà</div>
            <p className="text-xs font-bold text-slate-700">
              Được trực tiếp tài trợ vá phẳng với dấu ấn con dấu Domino&apos;s độc quyền.
            </p>
          </div>

          <div className="bg-yellow-300 p-5 rounded-2xl border-3 border-black pop-shadow text-center space-y-2 hover:-translate-y-1 transition-transform">
            <div className="h-24 bg-yellow-400 rounded-xl border border-black flex items-center justify-center text-4xl shadow-inner">
              🏆
            </div>
            <div className="text-xl font-black text-black font-heading">Cannes Lions Gold</div>
            <p className="text-xs font-bold text-slate-900">
              Giải Vàng Cannes Lions danh giá ở hạng mục Brand Experience &amp; Activation.
            </p>
          </div>
        </div>
      </div>

      {/* 3D Pizza Box Flip Section */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-black text-2xl text-[#E31837] uppercase flex items-center gap-2 font-heading">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            4 Hạn Chế Lớn Cần Rút Kinh Nghiệm (Hộp Pizza 3D)
          </h3>
          <button
            onClick={flipAll}
            className="flex items-center gap-1.5 bg-white text-slate-900 text-xs font-black px-4 py-2 rounded-xl border-2 border-black pop-shadow-sm hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Lật mở / Đóng tất cả nắp hộp</span>
          </button>
        </div>

        <p className="text-xs text-slate-600 font-medium">
          Mỗi chiếc hộp bên dưới đại diện cho một góc khuất và bài học thực tế sau ánh hào quang giải thưởng. Bấm vào hộp để mở nắp đọc chi tiết:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {pitfalls.map((box) => {
            const isFlipped = !!flippedBoxes[box.id];
            return (
              <div
                key={box.id}
                onClick={() => toggleBox(box.id)}
                className="perspective-1000 cursor-pointer h-72 w-full group select-none"
              >
                <div
                  className={`relative w-full h-full rounded-3xl border-4 border-black pop-shadow transition-transform duration-700 preserve-3d ${
                    isFlipped ? 'rotate-y-180' : 'group-hover:scale-[1.01]'
                  }`}
                >
                  {/* Front Side (Closed Box) */}
                  <div
                    className={`absolute inset-0 ${box.bgColor} text-white p-6 rounded-2xl flex flex-col justify-between items-center text-center backface-hidden`}
                  >
                    <div className="w-full flex justify-between items-center">
                      <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-lg border border-white">
                        {box.boxNum}
                      </span>
                      <span className="text-xs font-black text-yellow-300 animate-bounce">
                        Bấm mở nắp 👆
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-5xl">{box.emoji}</div>
                      <h4 className="font-black text-xl leading-snug font-heading text-balance">
                        {box.title}
                      </h4>
                    </div>

                    <span className="text-xs font-black text-yellow-300 uppercase bg-black/40 px-3 py-1.5 rounded-full border border-black">
                      Lật 180° để xem phân tích
                    </span>
                  </div>

                  {/* Back Side (Opened Box) */}
                  <div className="absolute inset-0 bg-white text-slate-900 p-6 rounded-2xl flex flex-col justify-between border-2 border-black rotate-y-180 backface-hidden">
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase" style={{ color: box.color }}>
                          {box.boxNum} • Phân tích chuyên sâu
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Bấm để đóng nắp ↩
                        </span>
                      </div>
                      <h5 className="font-black text-base text-[#006491] font-heading">
                        {box.subtitle}
                      </h5>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {box.detail}
                      </p>
                      <div className="bg-amber-50 p-2 rounded-lg border border-amber-300 text-[11px] text-amber-900 font-semibold">
                        💡 <strong>Đúc kết:</strong> {box.highlight}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase hover:underline">
                        Đóng nắp ↑
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
