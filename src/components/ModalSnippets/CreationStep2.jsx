import { useAppActions, usePageSwitch } from '@/stores/applicationStore';

const CreationStep2 = () => {
  const { setPageSwitch } = useAppActions();
  const this_PageSwitch = usePageSwitch();

  return (
    <div className="bg-brand-light min-h-screen flex items-center justify-center px-4 py-6 md:px-6 md:py-10">
      <div className="bg-[#E9EDF0] w-full max-w-3xl rounded-3xl md:rounded-4xl p-6 md:p-10 shadow-sm border border-white/50">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <h3 className="text-lg md:text-3xl font-black text-brand-dark tracking-tight">
            Admin & Employees Credentials
          </h3>
          <p className="text-[10px] md:text-sm text-gray-500 font-medium mt-2">
            Configure your team access and admin credentials.
          </p>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Admin Security Label */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
              <span className="text-sm md:text-lg">🔑</span> Admin Security
            </label>
            <p className="text-[9px] md:text-xs text-gray-400 font-medium ml-1">
              Set the name for the primary administrator account.
            </p>
          </div>

          {/* Admin Options */}
          <div className="bg-white rounded-2xl p-3 md:p-5 border border-gray-100 space-y-3">
            {/* Administrator Name */}
            <div>
              <p className="text-[9px] md:text-xs font-bold text-gray-500 mb-2 uppercase ml-1">
                Administrator Name
              </p>
              <input
                type="text"
                autoComplete="off"
                placeholder="e.g. Dill Doe"
                value=""
                readOnly
                className="w-full p-2 md:p-4 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-[11px] md:text-sm text-gray-700 font-medium"
              />
            </div>

            {/* Warning Banner */}
            <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-lg md:rounded-xl p-2 md:p-4 flex gap-2 md:gap-3">
              <div className="w-4 md:w-6 h-4 md:h-6 bg-brand-primary rounded-full flex items-center justify-center text-white text-[8px] md:text-xs font-bold shrink-0">
                !
              </div>
              <div className="text-[9px] md:text-[11px] leading-relaxed text-gray-600 font-medium">
                <p className="font-bold text-gray-800 uppercase tracking-tight">
                  Admin access allows full system control including inventory, reporting, and
                  financial records.
                </p>
                <p className="mt-1">Ensure this password is kept strictly confidential.</p>
              </div>
            </div>
          </div>

          {/* Description Label (replaces Add Users) */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
              <span className="text-sm md:text-lg">📝</span> Description
            </label>
            <p className="text-[9px] md:text-xs text-gray-400 font-medium ml-1">
              Provide additional details (max 255 characters).
            </p>
          </div>

          {/* Description Input */}
          <div className="bg-white rounded-2xl p-3 md:p-5 border border-gray-100">
            <textarea
              placeholder="Enter a description…"
              maxLength={255}
              rows={3}
              className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-[11px] md:text-sm text-gray-700 font-medium resize-none"
            />
            <div className="text-right text-[9px] md:text-xs text-gray-400 mt-1">
              0 / 255 characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0 pt-4 md:pt-6">
            <button
              type="button"
              onClick={() => setPageSwitch(!this_PageSwitch)}
              className="flex items-center justify-center text-white bg-brand-primary px-4 md:px-10 py-2 md:py-3 rounded-lg md:rounded-2xl font-black text-xs md:text-lg hover:opacity-90 transition-all"
            >
              Back
            </button>
            <button
              type="button"
              className="bg-brand-secondary text-white px-4 md:px-10 py-2 md:py-3 rounded-lg md:rounded-2xl font-black text-xs md:text-lg flex items-center justify-center hover:bg-brand-dark transition-all shadow-lg shadow-brand-secondary/20"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationStep2;