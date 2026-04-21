// src/pages/ProfilePage.jsx
import { FaCamera, FaShareAlt, FaUser, FaPen } from 'react-icons/fa';

const ProfilePage = () => {
  const profile = null;

  const displayName = profile?.username || 'Patrick Caro';
  const email = profile?.email || 'patrickcaro2005@gmail.com';
  const phone = profile?.phone || '+63 9676767676';
  const accountId = profile?.id || 'ACC-001-67';
  const role = profile?.role || 'Business Owner';
  const business = profile?.business_name || 'Cafe 67';

  return (
    <div className="min-h-screen bg-brand-light py-6 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Responsive Grid: Profile Header and Account Details side-by-side on md+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
            {/* Top accent bar */}
            <div className="bg-brand-accent h-20 w-full"></div>

            {/* Content */}
            <div className="px-6 pb-6 pt-4 flex flex-col items-center text-center -mt-10">
              {/* Avatar */}
              <div className="relative mb-3">
                <div className="w-24 h-24 bg-brand-primary/20 rounded-full border-4 border-white shadow-md flex items-center justify-center text-brand-primary text-3xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 bg-brand-secondary w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-sm hover:bg-brand-dark transition">
                  <FaCamera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-brand-dark">{displayName}</h2>
              <p className="text-brand-secondary font-semibold text-sm flex items-center justify-center space-x-1.5 mt-0.5">
                <span>{role}</span>
                <span className="text-brand-dark text-xs">•</span>
                <span>{business}</span>
              </p>

              {/* Buttons */}
              <div className="flex w-full max-w-xs gap-3 mt-5">
                <button className="flex-1 bg-brand-secondary text-white font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:bg-brand-dark transition text-sm">
                  <FaShareAlt className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
                <button className="flex-1 bg-white border border-brand-secondary text-brand-secondary font-semibold py-2.5 px-3 rounded-xl shadow-sm hover:bg-brand-accent/20 transition text-sm flex items-center justify-center gap-1.5">
                  <FaPen className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="bg-brand-accent/10 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-brand-secondary/10 text-brand-secondary p-2 rounded-full">
                <FaUser className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark">Account Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Full Name</p>
                <p className="font-semibold text-base text-brand-dark">{displayName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Email Address</p>
                <p className="font-semibold text-base text-brand-dark break-all">{email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Phone Number</p>
                <p className="font-semibold text-base text-brand-dark">{phone}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Account ID</p>
                <p className="font-semibold text-base text-brand-dark">{accountId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;