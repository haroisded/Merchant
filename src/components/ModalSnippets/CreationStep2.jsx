import { useAppActions, useApplicationForm } from '@/stores/applicationStore';

const CreationStep2 = ({ onBack, onCancel }) => {
  const { setApplicationForm, resetApplicationForm } = useAppActions();
  const form = useApplicationForm();

  const handleAdminName = (e) =>
    setApplicationForm({ administratorName: e.target.value });

  const adjustUsers = (delta) =>
    setApplicationForm({ totalUsers: Math.max(1, form.totalUsers + delta) });

  const handleUserInput = (e) =>
    setApplicationForm({ totalUsers: Math.max(1, Number(e.target.value)) });

  const handleCreate = () => {
    alert(
      `=== Application Form ===\n\n` +
      `Application Name:     ${form.applicationName}\n` +
      `Application Password: ${form.applicationPassword}\n` +
      `Application Key:      ${form.applicationKey}\n` +
      `Business Category:    ${form.businessCategory}\n\n` +
      `Administrator Name:   ${form.administratorName}\n` +
      `Total Users:          ${form.totalUsers}`
    );
    resetApplicationForm();
    // Optionally call onCancel or navigate
  };

  return (
    <div className="bg-brand-light min-h-screen flex items-center justify-center px-4 py-6 md:px-6 md:py-10">
      <div className="bg-[#E9EDF0] w-full max-w-3xl rounded-3xl md:rounded-4xl p-6 md:p-10 shadow-sm border border-white/50">
        <div className="text-center mb-6 md:mb-10">
          <h3 className="text-lg md:text-3xl font-black text-brand-dark tracking-tight">
            Admin & Employees Credentials
          </h3>
          <p className="text-[10px] md:text-sm text-gray-500 font-medium mt-2">
            Configure your team access and admin credentials
          </p>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">

          {/* Admin Security */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
              <span className="text-sm md:text-lg">🔑</span> Admin Security
            </label>

            <div className="space-y-3">
              <div>
                <p className="text-[9px] md:text-xs font-bold text-gray-500 mb-2 uppercase ml-1">
                  Administrator Name
                </p>
                <input
                  type="text"
                  placeholder="e.g. Dill Doe"
                  value={form.administratorName}
                  onChange={handleAdminName}
                  className="w-full p-2 md:p-4 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-[11px] md:text-sm text-gray-700 font-medium"
                />
              </div>
            </div>

            <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-lg md:rounded-xl p-2 md:p-4 flex gap-2 md:gap-3">
              <div className="w-4 md:w-6 h-4 md:h-6 bg-brand-primary rounded-full flex items-center justify-center text-white text-[8px] md:text-xs font-bold shrink-0">
                !
              </div>
              <div className="text-[9px] md:text-[11px] leading-relaxed text-gray-600 font-medium">
                <p className="font-bold text-gray-800 uppercase tracking-tight">
                  Admin access allows full system control including inventory,
                  reporting, and financial records.
                </p>
                <p className="mt-1">Ensure this password is kept strictly confidential.</p>
              </div>
            </div>
          </div>

          {/* Add Users */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-[10px] md:text-sm tracking-wide">
              <span className="text-sm md:text-lg">👤</span> Add Users
            </label>

            <div className="bg-white rounded-lg md:rounded-2xl p-3 md:p-4 border border-gray-100 flex flex-row items-center justify-between gap-2">
              {/* User Count Display */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-7 md:w-10 h-7 md:h-10 bg-brand-secondary/10 rounded-full flex items-center justify-center text-sm md:text-lg">
                  👥
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">
                    Total Users
                  </p>
                  <p className="text-base md:text-2xl font-black text-brand-dark leading-none">
                    {form.totalUsers} {/* ← live from store */}
                  </p>
                </div>
              </div>

              {/* Increment / Decrement */}
              <div className="flex items-center gap-1 md:gap-2">
                <button
                  onClick={() => adjustUsers(-1)}
                  className="w-7 md:w-10 h-7 md:h-10 rounded-lg md:rounded-xl bg-brand-dark/10 text-brand-dark font-black text-xs md:text-lg hover:bg-brand-secondary hover:text-white transition-colors flex items-center justify-center"
                >
                  −
                </button>

                <input
                  type="number"
                  value={form.totalUsers}
                  min={1}
                  onChange={handleUserInput}
                  className="w-10 md:w-16 text-center p-1 md:p-2 rounded-lg md:rounded-xl border border-brand-accent/50 bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 text-xs md:text-sm text-gray-700 font-black [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                  onClick={() => adjustUsers(1)}
                  className="w-7 md:w-10 h-7 md:h-10 rounded-lg md:rounded-xl bg-brand-secondary text-white font-black text-xs md:text-lg hover:bg-brand-dark transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0 pt-4 md:pt-6">
            <button
              onClick={onBack}
              className="flex items-center justify-center text-white bg-brand-primary px-4 md:px-10 py-2 md:py-3 rounded-lg md:rounded-2xl font-black text-xs md:text-lg hover:opacity-90 transition-all"
            >
              Back
            </button>

            <button
              onClick={handleCreate}
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