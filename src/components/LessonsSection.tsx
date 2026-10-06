import React, { useState } from 'react';
import { CheckCircle, AlertOctagon, Compass, Lightbulb, Sparkles, BookOpen, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

export const LessonsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'success' | 'improvements' | 'strategy'>('all');
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header - Editorial Sharp Architecture */}
      <div className="relative bg-white border-2 border-black shadow-[6px_6px_0px_#000000] p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#006491]" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-[#006491] text-white text-[11px] font-black px-3 py-1 uppercase tracking-widest border border-black shadow-[2px_2px_0px_#000]">
                <span className="w-1.5 h-1.5 bg-yellow-300" />
                Chương 04 / Đúc Kết
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                Key Takeaways &amp; Next Steps
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight font-heading leading-tight">
              Bài Học Kinh Nghiệm &amp;{' '}
              <span className="text-[#006491] underline decoration-emerald-500 decoration-4 underline-offset-4">
                Đề Xuất Chiến Lược
              </span>
            </h2>

            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              Tổng kết 3 nhóm bài học giá trị rút ra từ chiến dịch Paving for Pizza cho các thương hiệu và nhà làm truyền thông.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end justify-center border-l-2 border-slate-200 pl-6 shrink-0">
            <span className="text-3xl font-black text-emerald-600 font-heading leading-none">3 Pillars</span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-1">Strategic Framework</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('all');
          }}
          className={`px-4 py-2 rounded-xl border-2 border-black text-xs font-black transition-all ${
            activeTab === 'all' ? 'bg-black text-white pop-shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-800'
          }`}
        >
          Tất cả (3 Trụ Cột)
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('success');
          }}
          className={`px-4 py-2 rounded-xl border-2 border-black text-xs font-black transition-all ${
            activeTab === 'success' ? 'bg-emerald-600 text-white pop-shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-800'
          }`}
        >
          Yếu Tố Thành Công
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('improvements');
          }}
          className={`px-4 py-2 rounded-xl border-2 border-black text-xs font-black transition-all ${
            activeTab === 'improvements' ? 'bg-[#E31837] text-white pop-shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-800'
          }`}
        >
          Điểm Cần Cải Thiện
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('strategy');
          }}
          className={`px-4 py-2 rounded-xl border-2 border-black text-xs font-black transition-all ${
            activeTab === 'strategy' ? 'bg-[#006491] text-white pop-shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-800'
          }`}
        >
          Đề Xuất Cho Tương Lai
        </button>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Factors */}
        {(activeTab === 'all' || activeTab === 'success') && (
          <div className="bg-white p-6 rounded-3xl border-4 border-black pop-shadow space-y-4 border-t-8 border-t-emerald-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl border-2 border-black flex items-center justify-center text-xl font-black">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-black text-xl text-slate-900 uppercase font-heading">
                Yếu Tố Thành Công
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-700">
              <li className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <strong className="text-slate-900 font-bold block text-sm">
                  1. Giải quyết vấn đề thực tế (Action &gt; Words):
                </strong>
                <span>
                  Biến hoạt động PR thành hành động CSR có ích thiết thực cho cộng đồng thay vì chỉ giăng bảng quảng cáo sáo rỗng. Khách hàng nhìn thấy giá trị cụ thể được hoàn thành.
                </span>
              </li>
              <li className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <strong className="text-slate-900 font-bold block text-sm">
                  2. Tạo động lực tương tác (Crowdsourcing):
                </strong>
                <span>
                  Trao quyền cho cư dân tự bầu chọn con đường xấu nhất nơi họ sống, biến khách hàng thành người chủ động tham gia và theo dõi tiến độ thi công.
                </span>
              </li>
              <li className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <strong className="text-slate-900 font-bold block text-sm">
                  3. Lồng ghép thông điệp hóm hỉnh:
                </strong>
                <span>
                  Gợi mở lý do ngây thơ &ldquo;vá đường để bảo vệ chiếc pizza&rdquo; tạo cảm giác hóm hỉnh, thiện cảm và kích thích tính viral tự nhiên trên mạng xã hội.
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Improvements */}
        {(activeTab === 'all' || activeTab === 'improvements') && (
          <div className="bg-white p-6 rounded-3xl border-4 border-black pop-shadow space-y-4 border-t-8 border-t-[#E31837]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 text-[#E31837] rounded-xl border-2 border-black flex items-center justify-center text-xl font-black">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <h3 className="font-black text-xl text-slate-900 uppercase font-heading">
                Điểm Cần Cải Thiện
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-700">
              <li className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <strong className="text-slate-900 font-bold block text-sm">
                  1. Chuẩn hóa thủ tục với chính quyền:
                </strong>
                <span>
                  Cần chuẩn bị sẵn khung pháp lý và hợp tác công - tư (PPP) chuẩn hóa để ký kết với chính quyền địa phương nhanh chóng, tránh trường hợp bị từ chối cấp phép.
                </span>
              </li>
              <li className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <strong className="text-slate-900 font-bold block text-sm">
                  2. Quản lý kỳ vọng công chúng (Expectation):
                </strong>
                <span>
                  Cần minh bạch từ đầu rằng đây là khoản tài trợ bổ sung tượng trưng, tránh gây hiểu nhầm là Domino&apos;s sẽ thay thế toàn bộ trách nhiệm bảo trì đường bộ của nhà nước.
                </span>
              </li>
              <li className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <strong className="text-slate-900 font-bold block text-sm">
                  3. Đo lường doanh số bán hàng (Sales Impact):
                </strong>
                <span>
                  Bổ sung các voucher giảm giá riêng cho cư dân tại khu vực được vá đường để đo lường chính xác tỷ lệ chuyển đổi trực tiếp từ Earned Media sang doanh thu.
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Strategic Recommendations */}
        {(activeTab === 'all' || activeTab === 'strategy') && (
          <div className="bg-white p-6 rounded-3xl border-4 border-black pop-shadow space-y-4 border-t-8 border-t-[#006491]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 text-[#006491] rounded-xl border-2 border-black flex items-center justify-center text-xl font-black">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-black text-xl text-slate-900 uppercase font-heading">
                Đề Xuất Cho Tương Lai
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-700">
              <li className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <strong className="text-slate-900 font-bold block text-sm">
                  1. Ứng dụng Công nghệ AI &amp; Camera shipper:
                </strong>
                <span>
                  Tích hợp camera hành trình gắn trên xe giao hàng hoặc ứng dụng của shipper để tự động quét 3D và báo cáo ổ gà thời gian thực cho bộ phận đô thị thành phố.
                </span>
              </li>
              <li className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <strong className="text-slate-900 font-bold block text-sm">
                  2. Bản địa hóa tại Châu Á &amp; Việt Nam:
                </strong>
                <span>
                  Biến tấu mô hình sang việc tài trợ &ldquo;Bản đồ tránh ngập nước&rdquo; hoặc &ldquo;Trang bị túi chống sốc chuyên dụng&rdquo; cho xe máy shipper tại các đô thị Đông Nam Á.
                </span>
              </li>
              <li className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 space-y-1">
                <strong className="text-slate-900 font-bold block text-sm">
                  3. Xây dựng Quỹ Bảo Trì Dài Hạn:
                </strong>
                <span>
                  Trích 1% doanh thu từ mỗi chiếc pizza bán ra để lập quỹ &ldquo;Đường Êm Bánh Ngon&rdquo; tạo tính bền vững lâu dài thay vì chỉ là chiến dịch PR ngắn hạn.
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Interactive Quick Quiz / Case Study Check */}
      <div className="bg-white p-6 rounded-3xl border-4 border-black pop-shadow space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black border-2 border-black flex items-center justify-center font-black">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="font-black text-lg text-slate-900 font-heading">
              Góc Suy Ngẫm Chiến Lược (Mini Quiz)
            </h4>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              setShowQuiz(!showQuiz);
            }}
            className="text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black bg-slate-100 hover:bg-slate-200"
          >
            {showQuiz ? 'Thu gọn' : 'Làm câu hỏi kiểm tra nhanh'}
          </button>
        </div>

        {showQuiz && (
          <div className="space-y-4 pt-2 border-t-2 border-slate-100">
            <p className="text-sm font-bold text-slate-800">
              Câu hỏi: Yếu tố nào sau đây là mấu chốt biến chiến dịch &ldquo;Paving For Pizza&rdquo; thành hiện tượng toàn cầu với hơn 1 tỷ lượt Earned Media?
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: 1, text: 'A. Bỏ ra hàng trăm triệu USD chạy quảng cáo Super Bowl' },
                { id: 2, text: 'B. Kết hợp hành động CSR thực tế với một góc nhìn thương hiệu hóm hỉnh và trao quyền cho cộng đồng' },
                { id: 3, text: 'C. Phát pizza miễn phí cho toàn bộ cư dân ở 50 bang' },
                { id: 4, text: 'D. Chỉ đăng bài khiếu nại chính quyền trên Twitter' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    sounds.playClick();
                    setQuizAnswer(opt.id);
                  }}
                  className={`p-3 rounded-xl border-2 border-black text-left text-xs font-bold transition-all ${
                    quizAnswer === opt.id
                      ? opt.id === 2
                        ? 'bg-emerald-200 border-emerald-700 text-emerald-950 font-black'
                        : 'bg-red-100 border-red-600 text-red-900'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {quizAnswer !== null && (
              <div
                className={`p-3 rounded-xl border-2 border-black text-xs font-bold ${
                  quizAnswer === 2 ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                }`}
              >
                {quizAnswer === 2 ? (
                  <span>
                    🎉 <strong>Chính xác!</strong> Chiến dịch thành công vang dội vì đã biến lời hứa sản phẩm thành hành động thực tế (Brand Action) hài hước, biến người dân thành đồng minh truyền thông.
                  </span>
                ) : (
                  <span>
                    ❌ <strong>Chưa chính xác.</strong> Đáp án đúng là <strong>B</strong>. Domino&apos;s không tốn ngân sách khổng lồ cho Paid Ads mà tối đa hóa Earned &amp; Shared Media nhờ ý tưởng hành động độc đáo!
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
