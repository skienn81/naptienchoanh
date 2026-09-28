import React, { useState } from 'react';
import { Layers, MapPin, Tv, Newspaper, Share2, Globe, Sparkles, CheckCircle2, ChevronRight, Award, DollarSign } from 'lucide-react';
import { sounds } from '../../../utils/audio';
import { PesoType } from '../../../types';

interface CityGrant {
  name: string;
  state: string;
  potholesFilled: number;
  grantAmount: string;
  quote: string;
  mayor: string;
  year: string;
}

const CITIES: CityGrant[] = [
  {
    name: 'Bartonville',
    state: 'Texas',
    potholesFilled: 8,
    grantAmount: '$5,000',
    quote: 'Chiến dịch này đã giúp chúng tôi lấp các ổ gà trên đường giao hàng chính mà ngân sách thị trấn chưa kịp cấp.',
    mayor: 'Thị trưởng Bill Scherer',
    year: '2018'
  },
  {
    name: 'Milford',
    state: 'Delaware',
    potholesFilled: 40,
    grantAmount: '$5,000',
    quote: 'Người dân Milford vô cùng phấn khích khi thấy xe lu dán logo Domino\'s lăn bánh trên đường phố.',
    mayor: 'Đại diện Đô thị Mark Whitfield',
    year: '2018'
  },
  {
    name: 'Athens',
    state: 'Georgia',
    potholesFilled: 56,
    grantAmount: '$5,000',
    quote: 'Một sự hỗ trợ thiết thực và thông minh, giảm tải ngân sách sửa chữa hạ tầng công cộng.',
    mayor: 'Kelly Girtz',
    year: '2018'
  },
  {
    name: 'Burbank',
    state: 'California',
    potholesFilled: 125,
    grantAmount: '$25,000 (Giai đoạn 2)',
    quote: 'Chiến dịch mang tính viral cao nhất mà thành phố từng chứng kiến, thu hút sự chú ý của toàn bang.',
    mayor: 'Hội đồng TP Burbank',
    year: '2019'
  }
];

export const Spread2Strategy: React.FC = () => {
  const [activePeso, setActivePeso] = useState<PesoType>('earned');
  const [selectedCity, setSelectedCity] = useState<CityGrant>(CITIES[0]);

  const handlePesoTab = (type: PesoType) => {
    setActivePeso(type);
    sounds.playClick();
  };

  const handleCitySelect = (city: CityGrant) => {
    setSelectedCity(city);
    sounds.playPave();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch h-full">
      {/* LEFT PAGE: TRANG 03 - MÔ HÌNH PESO CHI TIẾT */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>THE DOMINO&apos;S CHRONICLE &bull; CHIẾN LƯỢC TRUYỀN THÔNG</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 03
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-[#006491] text-white text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> MA TRẬN PESO ĐỘC BẢN
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase">
              Paid &bull; Earned &bull; Shared &bull; Owned
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading leading-tight">
              Phối Hợp Đa Kênh: Biến $1 Quảng Cáo Thành $10 Tự Nhiên
            </h2>
            <p className="text-xs text-slate-700 font-serif mt-1">
              Nhấp vào 4 hồ sơ tài liệu dưới đây để giải mã cách Domino&apos;s vận hành từng trụ cột truyền thông:
            </p>
          </div>

          {/* Interactive 4 Tabs for PESO */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <button
              onClick={() => handlePesoTab('paid')}
              className={`p-2 border-2 border-black font-black text-xs uppercase transition-all cursor-pointer ${
                activePeso === 'paid'
                  ? 'bg-[#E31837] text-white shadow-[2px_2px_0px_#000] -translate-y-0.5'
                  : 'bg-white text-slate-700 hover:bg-red-50'
              }`}
            >
              PAID
            </button>
            <button
              onClick={() => handlePesoTab('earned')}
              className={`p-2 border-2 border-black font-black text-xs uppercase transition-all cursor-pointer ${
                activePeso === 'earned'
                  ? 'bg-[#006491] text-white shadow-[2px_2px_0px_#000] -translate-y-0.5'
                  : 'bg-white text-slate-700 hover:bg-sky-50'
              }`}
            >
              EARNED
            </button>
            <button
              onClick={() => handlePesoTab('shared')}
              className={`p-2 border-2 border-black font-black text-xs uppercase transition-all cursor-pointer ${
                activePeso === 'shared'
                  ? 'bg-amber-500 text-slate-950 shadow-[2px_2px_0px_#000] -translate-y-0.5'
                  : 'bg-white text-slate-700 hover:bg-amber-50'
              }`}
            >
              SHARED
            </button>
            <button
              onClick={() => handlePesoTab('owned')}
              className={`p-2 border-2 border-black font-black text-xs uppercase transition-all cursor-pointer ${
                activePeso === 'owned'
                  ? 'bg-emerald-600 text-white shadow-[2px_2px_0px_#000] -translate-y-0.5'
                  : 'bg-white text-slate-700 hover:bg-emerald-50'
              }`}
            >
              OWNED
            </button>
          </div>

          {/* Active Dossier Content Box */}
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] min-h-[220px] flex flex-col justify-between animate-fadeIn">
            {activePeso === 'paid' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4 text-[#E31837]" />
                    <span className="text-xs font-black uppercase text-[#E31837]">
                      PAID MEDIA &bull; Mồi Lửa Kích Hoạt
                    </span>
                  </div>
                  <span className="text-[10px] bg-red-100 text-[#E31837] font-bold px-2 py-0.5 border border-red-300">
                    Ngân sách mục tiêu
                  </span>
                </div>
                <p className="text-xs font-serif text-slate-800 leading-relaxed">
                  Tung ra các đoạn TVC truyền hình hóm hỉnh với góc quay &ldquo;Pizza Cam&rdquo; đặt bên trong hộp bánh, ghi lại cảnh phô mai bị xô lệch tan nát khi xe chạy qua đường xấu. Điều hướng người xem về website đề cử.
                </p>
                <div className="bg-red-50 p-2.5 border-l-4 border-[#E31837] text-[11px] font-mono font-bold text-slate-900">
                  ⚡ KẾT QUẢ: Hàng chục triệu lượt xem TVC trong tuần đầu, tạo làn sóng tò mò cực lớn.
                </div>
              </div>
            )}

            {activePeso === 'earned' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-[#006491]" />
                    <span className="text-xs font-black uppercase text-[#006491]">
                      EARNED MEDIA &bull; Cú Nổ 1 Tỷ Lượt Tiếp Cận
                    </span>
                  </div>
                  <span className="text-[10px] bg-sky-100 text-[#006491] font-bold px-2 py-0.5 border border-sky-300">
                    Trụ cột thành công nhất
                  </span>
                </div>
                <p className="text-xs font-serif text-slate-800 leading-relaxed">
                  BBC, CNN, Fox News, USA Today, Washington Post, Time... đồng loạt đưa tin tự nhiên: Một thương hiệu Pizza đi sửa đường thay chính quyền. Lên sóng giờ vàng các Talk Show của Jimmy Kimmel, Stephen Colbert.
                </p>
                <div className="bg-sky-50 p-2.5 border-l-4 border-[#006491] text-[11px] font-mono font-bold text-slate-900">
                  ⚡ KẾT QUẢ: Hơn 1.000.000.000 Earned Media Impressions hoàn toàn miễn phí.
                </div>
              </div>
            )}

            {activePeso === 'shared' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-black uppercase text-amber-700">
                      SHARED MEDIA &bull; Lan Tỏa Trong Cộng Đồng
                    </span>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 border border-amber-300">
                    Viral Mạng Xã Hội
                  </span>
                </div>
                <p className="text-xs font-serif text-slate-800 leading-relaxed">
                  Hashtag #PavingForPizza phủ sóng Twitter. Cư dân tự chụp ảnh các mảng đường mới vá có logo dập nổi Domino&apos;s, tag tài khoản thị trưởng địa phương để &ldquo;đòi&rdquo; Domino&apos;s về sửa đường khu phố mình.
                </p>
                <div className="bg-amber-50 p-2.5 border-l-4 border-amber-500 text-[11px] font-mono font-bold text-slate-900">
                  ⚡ KẾT QUẢ: 35.000+ cuộc thảo luận tự nhiên trong tuần đầu, hàng ngàn bức ảnh meme viral.
                </div>
              </div>
            )}

            {activePeso === 'owned' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-black uppercase text-emerald-700">
                      OWNED MEDIA &bull; Cổng Tương Tác Chuyển Đổi
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 border border-emerald-300">
                    PavingForPizza.com
                  </span>
                </div>
                <p className="text-xs font-serif text-slate-800 leading-relaxed">
                  Website chính thức đóng vai trò phễu tiếp nhận: Cho phép người dân nhập mã ZIP thành phố để đề cử con đường cần vá, theo dõi thanh tiến độ thi công và nhận ưu đãi đặt hàng Pizza.
                </p>
                <div className="bg-emerald-50 p-2.5 border-l-4 border-emerald-500 text-[11px] font-mono font-bold text-slate-900">
                  ⚡ KẾT QUẢ: 137.000+ đề cử thu thập được từ người dân, tăng doanh số bán hàng quý.
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Độc quyền thẩm định: Tạp san #01</span>
              <span className="text-[#006491] font-bold">CLICK ĐỂ ĐỔI HỒ SƠ ➔</span>
            </div>
          </div>
        </div>

        {/* Bottom Folio */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span>Chương 2: Ma Trận Chiến Lược</span>
          <span className="italic">Trang 03 / 10</span>
        </div>
      </div>

      {/* RIGHT PAGE: TRANG 04 - BẢN ĐỒ THÀNH PHỐ TÀI TRỢ */}
      <div className="bg-[#FAF8F5] border-3 border-slate-900 shadow-[6px_6px_0px_#000] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Folio Header */}
        <div className="border-b-2 border-slate-800 pb-2 mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <span>ĐỊA BÀN TRIỂN KHAI &bull; TIỂU BANG NƯỚC MỸ</span>
          <span className="font-mono text-slate-900 bg-slate-200 px-2 py-0.5 border border-black font-black">
            TRANG 04
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="bg-[#E31837] text-white text-[10px] font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> BẢN ĐỒ THÀNH PHỐ ĐƯỢC TÀI TRỢ
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-600">
              CLICK CHỌN ĐỊA BÀN
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase font-heading">
              Giai Đoạn 1 Thử Nghiệm Tới Giai Đoạn 2 Toàn Quốc
            </h3>
            <p className="text-xs text-slate-700 font-serif mt-1">
              Domino&apos;s bắt đầu với 4 thành phố đầu tiên (cấp $5,000/thành phố) để đo lường phản ứng, trước khi mở rộng ra 50 bang với gói tài trợ $25,000/thành phố.
            </p>
          </div>

          {/* Interactive City Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CITIES.map((c) => (
              <button
                key={c.name}
                onClick={() => handleCitySelect(c)}
                className={`p-2 border-2 border-black text-left transition-all cursor-pointer ${
                  selectedCity.name === c.name
                    ? 'bg-yellow-300 text-slate-950 shadow-[2px_2px_0px_#000] -translate-y-0.5 font-black'
                    : 'bg-white text-slate-700 hover:bg-slate-100 font-bold'
                }`}
              >
                <div className="text-[10px] text-slate-500 uppercase">{c.state}</div>
                <div className="text-xs truncate">{c.name}</div>
              </button>
            ))}
          </div>

          {/* Detailed Selected City Investigation Card */}
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-sm font-black text-slate-950 uppercase">
                  {selectedCity.name}, {selectedCity.state}
                </span>
                <span className="block text-[10px] text-slate-500 font-mono">
                  Năm thực hiện: {selectedCity.year} &bull; Đại diện: {selectedCity.mayor}
                </span>
              </div>
              <span className="bg-[#006491] text-white font-mono font-black text-xs px-2.5 py-1 border border-black">
                {selectedCity.grantAmount}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-100 p-2.5 border border-slate-300">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Số ổ gà đã vá</span>
                <span className="text-xl font-black text-[#E31837] font-heading">
                  {selectedCity.potholesFilled} ổ gà
                </span>
              </div>
              <div className="bg-slate-100 p-2.5 border border-slate-300">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Dấu ấn thương hiệu</span>
                <span className="text-xs font-black text-slate-900 block mt-1">
                  Logo dập nổi sơn chịu nhiệt
                </span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="bg-amber-50 border-l-4 border-yellow-500 p-2.5 text-xs font-serif italic text-slate-800">
              &ldquo;{selectedCity.quote}&rdquo;
            </div>
          </div>

          {/* 2-Phase Summary Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="border border-black p-2 bg-slate-50">
              <span className="text-[10px] font-black text-[#E31837] uppercase block">Giai đoạn 1 (2018)</span>
              <p className="text-[11px] text-slate-700 mt-0.5">
                4 thành phố mồi &bull; $5,000/thành phố &bull; Tạo bão truyền thông ban đầu.
              </p>
            </div>
            <div className="border border-black p-2 bg-slate-50">
              <span className="text-[10px] font-black text-[#006491] uppercase block">Giai đoạn 2 (2019)</span>
              <p className="text-[11px] text-slate-700 mt-0.5">
                Mở rộng 50 bang &bull; $25,000/thành phố &bull; Biến thành chiến dịch dân sự toàn quốc.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Folio */}
        <div className="border-t border-slate-300 pt-2 mt-2 flex items-center justify-between text-[11px] text-slate-500 font-serif">
          <span>Chương 2: Thực Địa Thi Công</span>
          <span className="font-mono text-slate-900 font-bold">Hồ sơ 4/5</span>
        </div>
      </div>
    </div>
  );
};
