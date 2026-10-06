import React from 'react';
import { X, BookOpen, ChevronRight, Sparkles, Layers, Trophy, Lightbulb, Award } from 'lucide-react';
import { sounds } from '../../utils/audio';
import { MagazineSpreadInfo } from '../../types';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpread: number;
  onSelectSpread: (spreadIndex: number) => void;
  spreadsList: MagazineSpreadInfo[];
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  currentSpread,
  onSelectSpread,
  spreadsList
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FAF8F5] border-4 border-slate-900 shadow-[10px_10px_0px_#000] max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 border-b-4 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-400" />
            <h3 className="text-base sm:text-lg font-black uppercase tracking-wider font-heading">
              MỤC LỤC TẬP SAN &bull; THE DOMINO&apos;S CHRONICLE
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="text-white hover:text-yellow-400 p-1 border-2 border-transparent hover:border-white transition-all cursor-pointer"
            aria-label="Đóng mục lục"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of spreads */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          <p className="text-xs text-slate-600 font-serif italic mb-2">
            Nhấp vào bất kỳ trang nào để lật mở trực tiếp đến chuyên mục đó:
          </p>

          <div className="space-y-2.5">
            {spreadsList.map((spread) => {
              const isCurrent = currentSpread === spread.index;
              return (
                <div
                  key={spread.index}
                  onClick={() => {
                    sounds.playPageFlip();
                    onSelectSpread(spread.index);
                    onClose();
                  }}
                  className={`p-3 border-2 border-black transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'bg-yellow-300 shadow-[4px_4px_0px_#000] -translate-y-0.5'
                      : 'bg-white hover:bg-slate-50 shadow-[2px_2px_0px_#000]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-yellow-300 font-black text-xs flex items-center justify-center shrink-0 border border-black font-mono">
                      {spread.index === 0 ? 'BÌA' : `0${spread.index}`}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-[#E31837] tracking-wider">
                          {spread.category}
                        </span>
                        {isCurrent && (
                          <span className="bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.2 border border-black uppercase font-mono">
                            Đang xem
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase font-heading">
                        {spread.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 font-serif line-clamp-1">
                        {spread.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <span className="text-[11px] font-mono font-bold text-slate-500 block">
                      {spread.leftPageNum ? `P.${spread.leftPageNum < 10 ? '0' : ''}${spread.leftPageNum} - ${spread.rightPageNum}` : 'BÌA TRƯỚC'}
                    </span>
                    <span className="text-xs text-[#006491] font-black flex items-center gap-0.5 justify-end">
                      Xem <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t-2 border-black flex items-center justify-between text-xs font-mono text-slate-600">
          <span>Xuất bản độc quyền &bull; 10 Trang Báo Chí</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="text-slate-900 font-black hover:underline cursor-pointer"
          >
            Đóng bảng mục lục
          </button>
        </div>
      </div>
    </div>
  );
};
