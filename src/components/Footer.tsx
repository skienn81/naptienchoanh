import React from 'react';
import { PageId } from '../types';
import { Pizza, ArrowUp, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white border-t-4 border-black mt-16 py-8 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm font-medium text-slate-400">
        <div className="flex items-center gap-2">
          <Pizza className="w-5 h-5 text-[#E31837]" />
          <p>
            © 2026 Domino&apos;s &ldquo;Paving For Pizza&rdquo; Interactive Case Study Zine.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-yellow-400 transition-colors cursor-pointer"
          >
            Trang chủ
          </button>
          <button
            onClick={() => onNavigate('page2')}
            className="hover:text-yellow-400 transition-colors cursor-pointer"
          >
            Mô hình PESO
          </button>
          <button
            onClick={() => onNavigate('page5')}
            className="hover:text-yellow-400 transition-colors cursor-pointer text-yellow-300 font-bold"
          >
            Game &amp; Vá đường VN 🇻🇳
          </button>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-yellow-400 transition-colors text-white font-bold cursor-pointer"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
