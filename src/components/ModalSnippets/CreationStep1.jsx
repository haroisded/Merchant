import { useAppActions, useApplicationForm } from '@/stores/applicationStore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const CATEGORIES = [
  { label: 'Purchasable', icon: '👜', desc: 'Retail items, products, and physical goods.' },
  { label: 'Serviceable', icon: '🛎️', desc: 'Bookings, appointments, time-based.' },
  { label: 'Both',        icon: '📚', desc: 'Hybrid of physical goods and services.' },
];

const CreationStep1 = ({ onNext, onCancel }) => {
  const { setApplicationForm, resetApplicationForm } = useAppActions();
  const form = useApplicationForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleChange = (field) => (e) =>
    setApplicationForm({ [field]: e.target.value });

  const handleCategory = (label) =>
    setApplicationForm({ businessCategory: label });

  const handleCancel = () => {
    if (window.confirm('Cancel application creation? All progress will be lost.')) {
      resetApplicationForm();
      onCancel();
    }
  };

  return (
    <>
    <div className="bg-brand-light min-h-screen flex flex-col font-sans">

      {/* Main Card */}
      <main className="flex-grow flex items-start justify-center px-4 py-6 md:px-6 md:py-10">
        <div className="bg-[#E9EDF0] w-full max-w-3xl rounded-3xl md:rounded-4xl p-6 md:p-10 shadow-sm">
          <div className="text-center mb-6 md:mb-10">
            <h3 className="text-xl md:text-3xl font-black text-brand-dark tracking-tight">Merchant Info</h3>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-2">Let's start by defining your business identity and type.</p>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">

            {/* Application Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
                <span className="text-sm md:text-lg">🏪</span> Application Name
              </label>
              <input
                type="text"
                autoComplete="off"   // ← add this
                placeholder="e.g. Pandesal ni Uel Bakery"
                value={form.applicationName}
                onChange={handleChange('applicationName')}
                className="w-full p-2 md:p-4 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-[11px] md:text-sm text-gray-700 font-medium"
              />
            </div>

            {/* Application Password */}
            <div>
              <p className="text-[9px] md:text-xs font-bold text-gray-500 mb-2 uppercase ml-1">
                Application Password
              </p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"   // ← add this
                  placeholder="••••••••"
                  value={form.applicationPassword}
                  onChange={handleChange('applicationPassword')}
                  className="w-full p-2 md:p-4 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-[11px] md:text-sm text-gray-700 font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-secondary transition-colors flex items-center justify-center"
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} className="md:w-5 md:h-5" />
                  ) : (
                    <FaEye size={16} className="md:w-5 md:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Application Key */}
            <div>
              <p className="text-[9px] md:text-xs font-bold text-gray-500 mb-2 uppercase ml-1">
                {"Application Key ( for Data Encryption )"}
              </p>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  autoComplete="new-password"   // ← add this
                  placeholder="••••••••"
                  value={form.applicationKey}
                  onChange={handleChange('applicationKey')}
                  className="w-full p-2 md:p-4 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-[11px] md:text-sm text-gray-700 font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-secondary transition-colors flex items-center justify-center"
                >
                  {showKey ? (
                    <FaEyeSlash size={16} className="md:w-5 md:h-5" />
                  ) : (
                    <FaEye size={16} className="md:w-5 md:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Business Category */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
                <span className="text-sm md:text-lg">🗄️</span> Business Category
              </label>

              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {CATEGORIES.map(({ label, icon, desc }) => {
                  const isSelected = form.businessCategory === label; // ← highlight active
                  return (
                    <div
                      key={label}
                      onClick={() => handleCategory(label)}
                      className={`bg-white p-2 md:p-6 rounded-lg md:rounded-2xl border-2 cursor-pointer transition-all group flex flex-col items-center text-center
                        ${isSelected ? 'border-brand-secondary' : 'border-transparent hover:border-brand-secondary'}`}
                    >
                      <div className={`w-6 md:w-10 h-6 md:h-10 rounded-lg flex items-center justify-center text-xs md:text-base mb-1 md:mb-4 transition-colors
                        ${isSelected ? 'bg-brand-secondary text-white' : 'bg-brand-light group-hover:bg-brand-secondary group-hover:text-white'}`}>
                        {icon}
                      </div>
                      <h4 className="font-black text-brand-dark text-[10px] md:text-sm">{label}</h4>
                      <p className="text-[8px] md:text-[10px] text-gray-400 font-medium mt-1 leading-relaxed hidden md:block">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row items-center justify-between gap-2 md:gap-0 pt-4 md:pt-6">
              <button
                onClick={handleCancel}
                className="flex items-center justify-center text-white bg-brand-primary px-4 md:px-10 py-2 md:py-3 rounded-lg md:rounded-2xl font-black text-xs md:text-lg hover:opacity-90 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={onNext}
                className="bg-brand-secondary text-white px-4 md:px-10 py-2 md:py-3 rounded-lg md:rounded-2xl font-black text-xs md:text-lg flex items-center justify-center hover:bg-brand-dark transition-all shadow-lg shadow-brand-secondary/20"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      </main>

    </div>
    </>
  );
};

export default CreationStep1;