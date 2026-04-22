// src/components/HomeHeader.jsx
import { FaQuestionCircle, FaUserCircle } from 'react-icons/fa';
import { useUIActions } from '@/stores/uiStore';

const HomeHeader = () => {
  const { openModal } = useUIActions();

  return (
    <header className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6 bg-white border-b border-brand-secondary/20 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Merchant Icon - hidden below 480px */}
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-secondary/20 max-[480px]:hidden" />
        <div className="text-xl md:text-2xl font-black leading-none text-brand-dark tracking-tighter">
          Merchant
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Support - hidden below 480px */}
        <div className="flex items-center gap-3 max-[480px]:hidden">
          <div className="text-right">
            <p className="text-[10px] font-black text-brand-secondary tracking-widest uppercase">
              Support
            </p>
            <p className="text-xs font-bold text-brand-dark">Help Center</p>
          </div>
          <FaQuestionCircle className="w-8 h-8 md:w-10 md:h-10 text-brand-dark" />
        </div>

        {/* Profile Icon Button - always visible */}
        <button
          onClick={() => openModal('viewProfile')}
          className="text-3xl md:text-4xl text-brand-secondary hover:text-brand-dark transition"
          aria-label="View Profile"
        >
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;