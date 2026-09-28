import React, { useState } from 'react';
import { Lightbulb, RotateCcw, Vote, MessageSquare, CheckCircle, BarChart2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { sounds } from '../../../utils/audio';

interface LessonCard {
  id: number;
  title: string;
  front: string;
  back: string;
  icon: string;
}

const LESSONS: LessonCard[] = [
  {
    id: 1,
    title: 'Hành Động Hơn Lời Nói (Brand Action)',
    icon: '⚡',
    front: 'Tại sao quảng cáo truyền thống ngày càng kém hiệu quả trong mắt thế hệ trẻ?',
    back: 'Người tiêu dùng ngày nay miễn nhiễm với các thông điệp sáo rỗng. Hành động cụ thể (đổ nhựa vá đường thật) tạo ra uy tín gấp 10 lần một TVC hứa hẹn.'
  },
  {
    id: 2,
    title: 'Xuất Phát Từ Nỗi Đau Thật (Pain Point)',
    icon: '🎯',
    front: 'Làm thế nào để gắn sản phẩm vào vấn đề xã hội mà không bị gượng ép?',
    back: 'Chiếc bánh pizza bị xô lệch là nỗi đau có thật 100% của cả khách hàng và shipper. Domino\'s biến lý do này thành cây cầu kết nối hoàn hảo với vấn nạn ổ gà.'
  },
  {
    id: 3,
    title: 'Đồng Sáng Tạo (Co-Creation)',
    icon: '🤝',
    front: 'Bí quyết nào khiến hơn 137.000 người tự nguyện gửi đề cử và chia sẻ?',
    back: 'Bằng cách cho người dân quyền đề cử con đường nhà mình, họ trở thành một phần của chiến dịch, biến họ từ người xem thụ động thành đại sứ thương hiệu nhiệt thành.'
  },
  {
    id: 4,
    title: 'Dũng Cảm Đối Mặt Bất Hoàn Hảo',
    icon: '🛡️',
    front: 'Domino\'s xử lý thế nào khi công chúng hoài nghi về ngân sách nhỏ $5,000?',
    back: 'Họ không thanh minh hay khoe khoang. Họ thừa nhận họ chỉ là công ty làm pizza muốn bảo vệ chiếc bánh, biến sự chân thành thành tấm khiên bảo vệ uy tín.'
  }
];

export const Spread4Lessons: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState({
    optA: 64,
    optB: 24,
    optC: 12
  });

  const toggleCard = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    sounds.playClick();
  };

  const handleVote = (opt: number) => {
    if (selectedPoll !== null) return;
    setSelectedPoll(opt);
    sounds.playPowerup();
    if (opt === 1) setPollVotes(v => ({ ...v, optA: v.optA + 1 }));
    else if (opt === 2) setPollVotes(v => ({ ...v, optB: v.optB + 1 }));
    else setPollVotes(v => ({ ...v, optC: v.optC + 1 }));
  };

  const totalVotes = pollVotes.optA + pollVotes.optB + pollVotes.optC;
  const pctA = Math.round((pollVotes.optA / totalVotes) * 100);
  const pctB = Math.round((pollVotes.optB / totalVotes) * 100);
  const pctC = Math.round((pollVotes.optC / totalVotes) * 100);

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch h-full">
      {/* LEFT PAGE: TRANG 07 - BÀI HỌC CỐT LÕI (INTERACTIVE FLASHCARDS) */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>THE DOMINO&apos;S CHRONICLE &bull; BÀI HỌC THỰC CHIẾN</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 07
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-[#006491] text-white text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" /> 4 BÀI HỌC CHO MARKETER HIỆN ĐẠI
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-600">
              CLICK ĐỂ LẬT THẺ
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading leading-tight">
              Quy Luật Chiến Thắng Của Chiến Dịch Hành Động
            </h2>
            <p className="text-xs text-slate-700 font-serif mt-1">
              Nhấp vào từng thẻ bên dưới để lật mặt sau và đọc phân tích chuyên sâu của ban biên tập:
            </p>
          </div>

          {/* 4 Interactive Flashcards */}
          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            {LESSONS.map((l) => {
              const isFlipped = !!flippedCards[l.id];
              return (
                <div
                  key={l.id}
                  onClick={() => toggleCard(l.id)}
                  className={`border-2 border-black p-3 rounded-lg shadow-[3px_3px_0px_#000] cursor-pointer transition-all duration-300 min-h-[140px] flex flex-col justify-between select-none ${
                    isFlipped
                      ? 'bg-yellow-200 text-slate-950 transform rotate-0'
                      : 'bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                  title="Click để lật thẻ!"
                >
                  <div className="flex items-center justify-between border-b border-black/20 pb-1.5">
                    <span className="text-[11px] font-black uppercase flex items-center gap-1.5 font-sans">
                      <span>{l.icon}</span>
                      <span className="line-clamp-1">{l.title}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-0.5">
                      <RotateCcw className="w-3 h-3" />
                      {isFlipped ? 'MẶT SAU' : 'LẬT'}
                    </span>
                  </div>

                  <div className="my-2">
                    {isFlipped ? (
                      <p className="text-xs font-serif leading-relaxed text-slate-900 font-medium animate-fadeIn">
                        {l.back}
                      </p>
                    ) : (
                      <p className="text-xs font-serif italic text-slate-700 leading-relaxed">
                        &ldquo;{l.front}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono font-bold flex justify-between items-center">
                    <span>{isFlipped ? 'BÀI HỌC VÀNG' : 'CÂU HỎI TƯ DUY'}</span>
                    <span className="text-[#006491]">TAP TO FLIP</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Folio */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span>Chương 4: Đúc Kết Học Thuật</span>
          <span className="italic">Trang 07 / 10</span>
        </div>
      </div>

      {/* RIGHT PAGE: TRANG 08 - BÀN TRÒN VIỆT NAM (INTERACTIVE POLL) */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>CHUYÊN ĐỀ ĐỊA PHƯƠNG &bull; THỊ TRƯỜNG VIỆT NAM</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 08
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-[#E31837] text-white text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <Vote className="w-3.5 h-3.5" /> BÀN TRÒN THĂM DÒ ĐỘC GIẢ
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-600">
              {totalVotes} LƯỢT BÌNH CHỌN
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase font-heading">
              Nếu Chiến Dịch Này Diễn Ra Tại Việt Nam?
            </h3>
            <p className="text-xs text-slate-700 font-serif mt-1">
              Đường phố Việt Nam nổi tiếng với triều cường, ngập nước mùa mưa và ổ gà hẻm nhỏ. Hãy bình chọn quan điểm của bạn:
            </p>
          </div>

          {/* Interactive Polling Question */}
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] space-y-3">
            <p className="text-xs font-bold text-slate-950 uppercase font-sans">
              ❓ Câu hỏi: Một hãng F&amp;B Việt Nam tự tài trợ vá đường ổ gà hoặc lắp gờ chống trượt giao hàng, bạn đánh giá ra sao?
            </p>

            <div className="space-y-2">
              {/* Option A */}
              <button
                onClick={() => handleVote(1)}
                className={`w-full p-2.5 border-2 border-black text-left text-xs transition-all cursor-pointer relative overflow-hidden ${
                  selectedPoll === 1
                    ? 'bg-yellow-300 font-black shadow-[2px_2px_0px_#000]'
                    : 'bg-slate-50 hover:bg-slate-100 font-bold'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span>A. Ủng hộ tuyệt đối &bull; Rất nhân văn và hữu ích cho shipper</span>
                  <span className="font-mono text-xs">{selectedPoll !== null && `${pctA}%`}</span>
                </div>
                {selectedPoll !== null && (
                  <div
                    className="absolute inset-y-0 left-0 bg-emerald-300/40 pointer-events-none"
                    style={{ width: `${pctA}%` }}
                  />
                )}
              </button>

              {/* Option B */}
              <button
                onClick={() => handleVote(2)}
                className={`w-full p-2.5 border-2 border-black text-left text-xs transition-all cursor-pointer relative overflow-hidden ${
                  selectedPoll === 2
                    ? 'bg-yellow-300 font-black shadow-[2px_2px_0px_#000]'
                    : 'bg-slate-50 hover:bg-slate-100 font-bold'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span>B. Hay nhưng rất khó vì thủ tục cấp phép đô thị nghiêm ngặt</span>
                  <span className="font-mono text-xs">{selectedPoll !== null && `${pctB}%`}</span>
                </div>
                {selectedPoll !== null && (
                  <div
                    className="absolute inset-y-0 left-0 bg-amber-300/40 pointer-events-none"
                    style={{ width: `${pctB}%` }}
                  />
                )}
              </button>

              {/* Option C */}
              <button
                onClick={() => handleVote(3)}
                className={`w-full p-2.5 border-2 border-black text-left text-xs transition-all cursor-pointer relative overflow-hidden ${
                  selectedPoll === 3
                    ? 'bg-yellow-300 font-black shadow-[2px_2px_0px_#000]'
                    : 'bg-slate-50 hover:bg-slate-100 font-bold'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span>C. Dễ bị phản ứng là &ldquo;làm màu&rdquo; nếu chỉ vá vài mét đường</span>
                  <span className="font-mono text-xs">{selectedPoll !== null && `${pctC}%`}</span>
                </div>
                {selectedPoll !== null && (
                  <div
                    className="absolute inset-y-0 left-0 bg-red-300/40 pointer-events-none"
                    style={{ width: `${pctC}%` }}
                  />
                )}
              </button>
            </div>

            {selectedPoll !== null && (
              <div className="bg-emerald-50 border border-emerald-400 p-2 text-[11px] font-sans text-emerald-950 animate-fadeIn">
                🎉 <strong>Cảm ơn bạn đã bỏ phiếu!</strong> Đa số độc giả đồng tình rằng các thương hiệu cần kết hợp với chính quyền quận/phường và nhà thầu địa phương để đảm bảo tính pháp lý và độ bền công trình.
              </div>
            )}
          </div>

          {/* Expert Editorial Insight for Vietnam */}
          <div className="bg-sky-50 border-2 border-black p-3 text-xs space-y-1">
            <span className="font-black text-[#006491] uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Gợi Ý Ứng Dụng Tại Việt Nam:
            </span>
            <p className="font-serif text-slate-800 leading-relaxed">
              Các thương hiệu giao đồ ăn như ShopeeFood, Grab, Baemin hoặc Domino&apos;s Việt Nam có thể tổ chức: <em>&ldquo;Áo Mưa &amp; Túi Chống Nước Chuyên Dụng Cho Shipper&rdquo;</em> hoặc <em>&ldquo;Trạm Hỗ Trợ Bơm Xe &amp; Thay Nhớt Miễn Phí Mùa Ngập&rdquo;</em> – Thiết thực, hợp văn hóa và không vướng pháp lý mặt đường.
            </p>
          </div>
        </div>

        {/* Bottom Folio */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span>Chương 4: Liên Hệ Thực Tế</span>
          <span className="font-mono text-slate-900 font-bold">Hồ sơ 8/5</span>
        </div>
      </div>
    </div>
  );
};
