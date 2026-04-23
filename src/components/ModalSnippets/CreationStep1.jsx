import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const CreationStep1 = ({ formData, setFormData, onNext, clear_role_key, this_session }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handleCategorySelect = (type) => {
    setFormData(prev => ({ ...prev, app_type: type }));
  };


  const handleCancel = async () => {
    try {
      if (clear_role_key && this_session?.user?.id) {
        await clear_role_key(this_session.user.id);
      }
    } catch (err) {
      console.error('Failed to clear creator role:', err);
    }
    // Clear form data
    setFormData({
      app_name: '',
      app_description: '',
      app_type: null,
      app_password: '',
      app_secret: '',
      admin_name: '',
    });
  };


  
  return (
    <div className="bg-brand-light min-h-screen flex flex-col font-sans">
      <main className="flex-grow flex items-start justify-center px-4 py-6 md:px-6 md:py-10">
        <div className="bg-[#E9EDF0] w-full max-w-3xl rounded-3xl md:rounded-4xl p-6 md:p-10 shadow-sm">
          
          {/* Header */}
          <div className="text-center mb-6 md:mb-10">
            <h3 className="text-xl md:text-3xl font-black text-brand-dark tracking-tight">
              Merchant Info
            </h3>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-2">
              Let's start by defining your business identity and type.
            </p>
          </div>


          {/* Form */}
          <form className="space-y-6 max-w-2xl mx-auto">
            
              {/* Application Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
                  <span className="text-sm md:text-lg">🏪</span> Application Name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Pandesal ni Uel Bakery"
                  value={formData.app_name}
                  onChange={(e) => handleInputChange('app_name', e.target.value)}
                  className="w-full p-2 md:p-4 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-[11px] md:text-sm text-gray-700 font-medium"
                />
              </div>



              {/* Application Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
                  <span className="text-sm md:text-lg">🔒</span> Application Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={formData.app_password}
                    onChange={(e) => handleInputChange('app_password', e.target.value)}
                    className="w-full p-2 md:p-4 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-[11px] md:text-sm text-gray-700 font-medium pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-secondary transition-colors"
                  >
                    {showPassword ? <FaEyeSlash className="w-4 h-4 md:w-5 md:h-5" /> : <FaEye className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>
                </div>
              </div>



              {/* Application Key */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
                  <span className="text-sm md:text-lg">🗝️</span> Application Key
                  <span className="text-gray-400 font-medium normal-case text-[8px] md:text-xs">
                    ( for Data Encryption )
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showSecret ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={formData.app_secret}
                    onChange={(e) => handleInputChange('app_secret', e.target.value)}
                    className="w-full p-2 md:p-4 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-[11px] md:text-sm text-gray-700 font-medium pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-secondary transition-colors"
                  >
                    {showSecret ? <FaEyeSlash className="w-4 h-4 md:w-5 md:h-5" /> : <FaEye className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>
                </div>
              </div>



              {/* Business Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
                  <span className="text-sm md:text-lg">🗄️</span> Business Category
                </label>
                <p className="text-[9px] md:text-xs text-gray-400 font-medium ml-1">
                  Select the type that best describes your business.
                </p>
              </div>



              {/* Category Options */}
              <div className="bg-white rounded-2xl p-3 md:p-5 border border-gray-100">
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  
                  {/* Purchasable */}
                  <div
                    onClick={() => handleCategorySelect('purchasable')} // ← set app_type
                    className={`p-2 md:p-6 rounded-lg md:rounded-2xl border-2 cursor-pointer transition-all group flex flex-col items-center text-center ${
                      formData.app_type === 'purchasable'
                        ? 'border-brand-secondary bg-brand-secondary/5'
                        : 'border-transparent hover:border-brand-secondary bg-brand-light'
                    }`}
                  >
                    <div className="w-6 md:w-10 h-6 md:h-10 rounded-lg flex items-center justify-center text-xs md:text-base mb-1 md:mb-4 transition-colors bg-brand-light group-hover:bg-brand-secondary group-hover:text-white">
                      👜
                    </div>
                    <h4 className="font-black text-brand-dark text-[10px] md:text-sm">Purchasable</h4>
                    <p className="text-[8px] md:text-[10px] text-gray-400 font-medium mt-1 leading-relaxed hidden md:block">
                      Retail items, products, and physical goods.
                    </p>
                  </div>


                  {/* Serviceable */}
                  <div
                    onClick={() => handleCategorySelect('serviceable')}
                    className={`p-2 md:p-6 rounded-lg md:rounded-2xl border-2 cursor-pointer transition-all group flex flex-col items-center text-center ${
                      formData.app_type === 'serviceable'
                        ? 'border-brand-secondary bg-brand-secondary/5'
                        : 'border-transparent hover:border-brand-secondary bg-brand-light'
                    }`}
                  >
                    <div className="w-6 md:w-10 h-6 md:h-10 rounded-lg flex items-center justify-center text-xs md:text-base mb-1 md:mb-4 transition-colors bg-brand-light group-hover:bg-brand-secondary group-hover:text-white">
                      🛎️
                    </div>
                    <h4 className="font-black text-brand-dark text-[10px] md:text-sm">Serviceable</h4>
                    <p className="text-[8px] md:text-[10px] text-gray-400 font-medium mt-1 leading-relaxed hidden md:block">
                      Bookings, appointments, time-based.
                    </p>
                  </div>


                  {/* Both */}
                  <div
                    onClick={() => handleCategorySelect('both')}
                    className={`p-2 md:p-6 rounded-lg md:rounded-2xl border-2 cursor-pointer transition-all group flex flex-col items-center text-center ${
                      formData.app_type === 'both'
                        ? 'border-brand-secondary bg-brand-secondary/5'
                        : 'border-transparent hover:border-brand-secondary bg-brand-light'
                    }`}
                  >
                    <div className="w-6 md:w-10 h-6 md:h-10 rounded-lg flex items-center justify-center text-xs md:text-base mb-1 md:mb-4 transition-colors bg-brand-light group-hover:bg-brand-secondary group-hover:text-white">
                      📚
                    </div>
                    <h4 className="font-black text-brand-dark text-[10px] md:text-sm">Both</h4>
                    <p className="text-[8px] md:text-[10px] text-gray-400 font-medium mt-1 leading-relaxed hidden md:block">
                      Hybrid of physical goods and services.
                    </p>
                  </div>

                </div>
              </div>


              {/* Action Buttons */}
              <div className="flex flex-row items-center justify-between gap-2 md:gap-0 pt-4 md:pt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center justify-center text-white bg-brand-primary px-4 md:px-10 py-2 md:py-3 rounded-lg md:rounded-2xl font-black text-xs md:text-lg hover:opacity-90 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  disabled={!formData.app_name || !formData.app_password || !formData.app_secret || !formData.app_type}
                  className="bg-brand-secondary text-white px-4 md:px-10 py-2 md:py-3 rounded-lg md:rounded-2xl font-black text-xs md:text-lg flex items-center justify-center hover:bg-brand-dark transition-all shadow-lg shadow-brand-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>

          </form>
          {/* End of Form */}

        </div>
      </main>
    </div>
  );
};

export default CreationStep1;