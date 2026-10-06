import React, { useState } from 'react';
import { PesoType, PesoDetail } from '../types';
import { Tv, Newspaper, Share2, Globe, Sparkles, CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';
import { sounds } from '../utils/audio';

const pesoData: Record<PesoType, PesoDetail> = {
  paid: {
    id: 'paid',
    title: '1. P – Paid Media (Truyền thông Trả tiền)',
    badge: 'Kích hoạt nhận thức ban đầu',
    color: '#E31837',
    bgColor: 'bg-red-50',
    borderColor: 'border-[#E31837]',
    desc: 'Paid Media đóng vai trò mồi lửa ban đầu để kích thích nhận thức về chiến dịch và điều hướng công chúng về website chính thức để bình chọn.',
    details: [
      'Quảng cáo TVC truyền hình: Tung ra các đoạn phim ngắn hóm hỉnh mô phỏng "Pizza Cam" gắn bên trong hộp bánh, ghi lại cảnh phô mai bị xô lệch tan nát khi xe chạy qua đường ổ gà.',
      'Digital Video Ads & Social Ads: Chạy video quảng cáo ngắn trên Facebook, Youtube và Instagram hiển thị cảnh xe lu dán logo Domino\'s thực hiện sửa đường chuyên nghiệp.',
      'Quảng cáo tài trợ địa phương: Mua bài PR thông báo việc Domino\'s cấp kinh phí sửa chữa cho chính quyền các thành phố đầu tiên (Bartonville, Milford, Athens, Hilo).'
    ],
    metrics: 'Hàng chục triệu lượt xem TVC và video trực tuyến trong tuần đầu'
  },
  earned: {
    id: 'earned',
    title: '2. E – Earned Media (Truyền thông Lan tỏa Tự nhiên)',
    badge: 'Trụ cột thành công vang dội nhất',
    color: '#006491',
    bgColor: 'bg-sky-50',
    borderColor: 'border-[#006491]',
    desc: 'Trụ cột thành công lớn nhất của chiến dịch, biến ngân sách quảng cáo vừa phải thành làn sóng đưa tin tự nhiên từ các hãng thông tấn lớn nhất hành tinh hoàn toàn miễn phí.',
    details: [
      'Báo chí toàn cầu đưa tin tự nhiên: BBC, CNN, Fox News, USA Today, Washington Post, Time... đồng loạt giật tiêu đề về câu chuyện độc lạ: Một thương hiệu Pizza đi sửa đường thay chính phủ.',
      'Lên sóng các Late Night Talk Show đình đám: Jimmy Kimmel, Stephen Colbert đưa chiến dịch vào tiểu phẩm hài hước giờ vàng, mang lại hơn 1 tỷ lượt hiển thị truyền thông (Media Reach).',
      'Thị trưởng các thành phố lên tiếng: Chính quyền địa phương công khai phát biểu cảm ơn Domino\'s trên đài phát thanh và mạng xã hội vì đã hỗ trợ ngân sách giải quyết vấn đề dân sinh.'
    ],
    metrics: '> 1.000.000.000 Earned Media Impressions không tốn một đồng chi phí'
  },
  shared: {
    id: 'shared',
    title: '3. S – Shared Media (Truyền thông Chia sẻ Mạng Xã Hội)',
    badge: 'Lan truyền viral trong cộng đồng',
    color: '#d97706',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-500',
    desc: 'Kênh giúp lan tỏa thông điệp theo chiều ngang từ người dùng đến người dùng, biến cư dân địa phương thành đại sứ truyền thông tự nguyện.',
    details: [
      'Hashtag #PavingForPizza gây bão: Người dân tự chụp ảnh các mảng đường mới vá có logo Domino\'s đăng tải lên Twitter, Reddit và Instagram với sự phấn khích cao độ.',
      'Trào lưu tag chính quyền địa phương: Cư dân liên tục tag tài khoản Domino\'s và chính quyền địa phương nơi họ sống để "đòi" được tài trợ lấp ổ gà con phố mình.',
      'Meme hài hước từ cư dân mạng: Hàng ngàn bức ảnh chế so sánh tiến độ làm việc thần tốc của Domino\'s với cơ quan giao thông đô thị, biến thương hiệu thành "người hùng thầm lặng".'
    ],
    metrics: '35.000+ lượt thảo luận tự nhiên chỉ trong tuần đầu tiên ra mắt'
  },
  owned: {
    id: 'owned',
    title: '4. O – Owned Media (Truyền thông Kênh Sở Hữu)',
    badge: 'Hiện thực hóa cam kết & Chuyển đổi',
    color: '#059669',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-500',
    desc: 'Nơi tiếp nhận tương tác, lưu trữ dữ liệu đề xuất từ người dân và biến sự chú ý thành hành động gắn kết thương hiệu trực tiếp.',
    details: [
      'Website PavingForPizza.com độc quyền: Trang web chuyên biệt cho phép người dân gõ mã zip để bình chọn con đường xấu nhất, theo dõi tiến độ sửa đường và xem hình ảnh Before/After real-time.',
      'Bao bì Hộp Pizza thiết kế riêng: Hộp bánh giao tới tay khách hàng được in thêm câu chuyện về chiến dịch sửa đường kèm mã QR dẫn tới trang bình chọn.',
      'Mặt đường dán nhãn thương hiệu (Brand on Asphalt): Vết vá nhựa đường được đóng con dấu sơn chịu nhiệt logo Domino\'s kèm slogan "OH YES WE DID" – biến mặt đường thành điểm chạm thương hiệu vĩnh cửu.'
    ],
    metrics: '137.000+ đề cử gửi về từ 15.275 mã zip khắp toàn bộ 50 tiểu bang'
  }
};

export const PesoSection: React.FC = () => {
  const [selectedPeso, setSelectedPeso] = useState<PesoType>('paid');

  const current = pesoData[selectedPeso];

  const handleSelect = (type: PesoType) => {
    sounds.playClick();
    setSelectedPeso(type);
  };

  const getIcon = (type: PesoType) => {
    switch (type) {
      case 'paid': return <Tv className="w-5 h-5" />;
      case 'earned': return <Newspaper className="w-5 h-5" />;
      case 'shared': return <Share2 className="w-5 h-5" />;
      case 'owned': return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header - Editorial Rounded Architecture */}
      <div className="relative bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000000] p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E31837]" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-[#E31837] text-white text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest border border-black shadow-[2px_2px_0px_#000]">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
                Chương 02 / Mô Hình PESO
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                4 Trụ Cột Truyền Thông
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight font-heading leading-tight">
              Phân Tích Mô Hình PESO{' '}
              <span className="text-[#E31837] underline decoration-[#006491] decoration-4 underline-offset-4">
                (3D Pizza Slices)
              </span>
            </h2>

            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              Mô hình PESO tích hợp 4 kênh truyền thông xoay quanh chiến dịch. Nhấp trực tiếp vào từng miếng bánh Pizza hoặc các nút bên dưới để xem phân tích chuyên sâu.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end justify-center border-l-2 border-slate-200 pl-6 shrink-0">
            <span className="text-3xl font-black text-[#E31837] font-heading leading-none">PESO</span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-1">Integrated Model</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive 3D Pizza Wheel */}
        <div className="lg:col-span-6 flex flex-col items-center py-4">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            {/* Outer Crust Plate */}
            <div className="absolute inset-0 rounded-full border-8 border-black bg-amber-100 pop-shadow-lg flex flex-wrap p-2 rotate-12 transition-transform duration-500">
              {/* Slice Paid (Top-Left) */}
              <div
                onClick={() => handleSelect('paid')}
                className={`w-1/2 h-1/2 bg-[#E31837] text-white border-2 border-black rounded-tl-full flex flex-col items-center justify-center p-3 cursor-pointer transition-all duration-300 relative group ${
                  selectedPeso === 'paid' ? 'scale-105 z-20 brightness-110 shadow-2xl ring-4 ring-black' : 'hover:scale-102 hover:brightness-105'
                }`}
              >
                <span className="text-3xl sm:text-4xl font-black font-heading">P</span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-center mt-1">Paid Media</span>
                <Tv className="w-5 h-5 mt-1 opacity-90 group-hover:scale-110 transition-transform" />
              </div>

              {/* Slice Earned (Top-Right) */}
              <div
                onClick={() => handleSelect('earned')}
                className={`w-1/2 h-1/2 bg-[#006491] text-white border-2 border-black rounded-tr-full flex flex-col items-center justify-center p-3 cursor-pointer transition-all duration-300 relative group ${
                  selectedPeso === 'earned' ? 'scale-105 z-20 brightness-110 shadow-2xl ring-4 ring-black' : 'hover:scale-102 hover:brightness-105'
                }`}
              >
                <span className="text-3xl sm:text-4xl font-black font-heading">E</span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-center mt-1">Earned Media</span>
                <Newspaper className="w-5 h-5 mt-1 opacity-90 group-hover:scale-110 transition-transform" />
              </div>

              {/* Slice Shared (Bottom-Left) */}
              <div
                onClick={() => handleSelect('shared')}
                className={`w-1/2 h-1/2 bg-yellow-400 text-slate-900 border-2 border-black rounded-bl-full flex flex-col items-center justify-center p-3 cursor-pointer transition-all duration-300 relative group ${
                  selectedPeso === 'shared' ? 'scale-105 z-20 brightness-110 shadow-2xl ring-4 ring-black' : 'hover:scale-102 hover:brightness-105'
                }`}
              >
                <span className="text-3xl sm:text-4xl font-black font-heading">S</span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-center mt-1">Shared Media</span>
                <Share2 className="w-5 h-5 mt-1 opacity-90 group-hover:scale-110 transition-transform" />
              </div>

              {/* Slice Owned (Bottom-Right) */}
              <div
                onClick={() => handleSelect('owned')}
                className={`w-1/2 h-1/2 bg-emerald-500 text-white border-2 border-black rounded-br-full flex flex-col items-center justify-center p-3 cursor-pointer transition-all duration-300 relative group ${
                  selectedPeso === 'owned' ? 'scale-105 z-20 brightness-110 shadow-2xl ring-4 ring-black' : 'hover:scale-102 hover:brightness-105'
                }`}
              >
                <span className="text-3xl sm:text-4xl font-black font-heading">O</span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-center mt-1">Owned Media</span>
                <Globe className="w-5 h-5 mt-1 opacity-90 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Center Pizza Badge */}
            <div className="absolute inset-0 m-auto w-24 h-24 bg-white border-4 border-black rounded-full pop-shadow flex items-center justify-center pointer-events-none z-30">
              <span className="font-black text-xs text-center text-slate-900 leading-tight">
                PESO<br />
                <span className="text-[#E31837]">MODEL</span>
              </span>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {(['paid', 'earned', 'shared', 'owned'] as PesoType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleSelect(type)}
                className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs font-black transition-all ${
                  selectedPeso === type
                    ? 'bg-black text-white pop-shadow-sm scale-105'
                    : 'bg-white hover:bg-slate-100 text-slate-800'
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mt-2 text-center">
            👉 Nhấp trực tiếp vào từng miếng bánh để xem chi tiết
          </p>
        </div>

        {/* Right: Dynamic Analysis Output Card */}
        <div className="lg:col-span-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-black pop-shadow min-h-[440px] flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span
                  className="text-xs font-black uppercase px-3 py-1 rounded-full text-white border border-black shadow-sm"
                  style={{ backgroundColor: current.color }}
                >
                  {current.badge}
                </span>
                <div
                  className="w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center text-white"
                  style={{ backgroundColor: current.color }}
                >
                  {getIcon(current.id)}
                </div>
              </div>

              <div>
                <h3 className="font-black text-xl sm:text-2xl text-slate-900 font-heading">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium italic mt-1">
                  {current.desc}
                </p>
              </div>

              <hr className="border-slate-200" />

              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  Hoạt động triển khai cụ thể:
                </h4>
                <ul className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {current.details.map((item, idx) => (
                    <li
                      key={idx}
                      className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metrics highlight */}
            <div className={`p-3.5 rounded-2xl border-2 border-black ${current.bgColor} flex items-center gap-3`}>
              <BarChart3 className="w-5 h-5 shrink-0" style={{ color: current.color }} />
              <div>
                <span className="text-[10px] font-black uppercase text-slate-500 block">Số liệu ghi nhận</span>
                <span className="text-xs font-bold text-slate-900">{current.metrics}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
