// src/components/ProfileViewModal.jsx
import { FaShareAlt, FaCamera, FaUser, FaPen, FaLock, FaArrowLeft, FaExchangeAlt, FaSignOutAlt } from 'react-icons/fa';
import { handleSignOut } from '@/utils/userData_queries';
import { useQueryClient } from '@tanstack/react-query';
import { useProfile, useSession } from '@/stores/authStore';
import { useUIActions } from '@/stores/uiStore';


const ProfileViewModal = ({ onClose }) => {
  const { openModal } = useUIActions();
  const queryClient = useQueryClient();
  const this_session = useSession();
  const profile = useProfile();

  const displayName = profile?.username || 'Patrick Caro';
  const email = profile?.email || 'patrickcaro2005@gmail.com';
  const phone = profile?.phone || '+63 9676767676';
  const accountId = profile?.id || 'ACC-001-67';
  const role = profile?.role || 'Business Owner';
  const business = profile?.business_name || 'Cafe 67';

  const handleEdit = () => { openModal('editProfile'); };

  const signOut_clearCache = () => {
    handleSignOut()
    queryClient.removeQueries({ queryKey: ['user', this_session?.user?.id] });
  }

  return (
    <div className="bg-brand-light rounded-3xl p-6 md:p-8 flex flex-col items-center border border-brand-accent">
      {/* Avatar */}
      <div className="w-24 h-24 bg-brand-primary/20 rounded-full border-4 border-white shadow-md flex items-center justify-center text-brand-primary text-3xl font-bold mb-4">
        {displayName.charAt(0).toUpperCase()}
      </div>

      <h2 className="text-2xl font-bold text-brand-dark">{displayName}</h2>
      <p className="text-brand-secondary font-semibold text-sm flex items-center space-x-1.5 mt-0.5">
        <span>{role}</span>
        <span className="text-brand-dark text-xs">•</span>
        <span>{business}</span>
      </p>

      {/* Action Buttons */}
      <div className="flex w-full max-w-md gap-3 mt-6">
        <button className="flex-1 bg-white border border-brand-secondary text-brand-secondary font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-brand-accent/20 transition">
          <FaCamera className="w-4 h-4" />
          <span>Change Photo</span>
        </button>
        <button
          onClick={handleEdit}
          className="flex-1 bg-brand-secondary text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-brand-dark transition"
        >
          <FaPen className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Account Details Card */}
      <div className="w-full bg-white rounded-2xl p-5 mt-6 border border-brand-secondary/30 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <FaUser className="w-5 h-5 text-brand-dark" />
          <h3 className="text-lg font-bold text-brand-dark">Account Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Full Name</p>
            <p className="font-semibold text-base text-brand-dark">{displayName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Phone Number</p>
            <p className="font-semibold text-base text-brand-dark">{phone}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Email Address</p>
            <p className="font-semibold text-base text-brand-dark break-all">{email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Account ID</p>
            <p className="font-semibold text-base text-brand-dark">{accountId}</p>
          </div>
        </div>
      </div>

      {/* Change Password Button */}
      <button className="w-full bg-brand-secondary text-white font-bold py-3 rounded-xl mt-5 flex items-center justify-center gap-2 shadow-sm hover:bg-brand-dark transition">
        <FaLock className="w-5 h-5" />
        <span>Change Password</span>
      </button>

      {/* Bottom Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full mt-5">
        <button
          onClick={onClose}
          className="flex-1 bg-white border border-brand-secondary text-brand-secondary font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-brand-accent/20 transition"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
        <button className="flex-1 bg-brand-secondary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-brand-dark transition">
          <FaExchangeAlt className="w-4 h-4" />
          <span>Switch Account</span>
        </button>
        <button className="flex-1 bg-brand-primary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-brand-primary/80 transition">
          <FaSignOutAlt className="w-4 h-4" />
          <span onClick={ () => signOut_clearCache() }>Sign Out</span>
        </button>
      </div>


    </div>
  );
};

export default ProfileViewModal;