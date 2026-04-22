// src/components/ProfileEditModal.jsx
import { useState } from 'react';
import { FaUser, FaPhoneAlt, FaEnvelope, FaSave, FaTimes } from 'react-icons/fa';
import Input from '../snippets/Input';

import { useProfile } from '@/stores/authStore';
import { useUIActions } from '@/stores/uiStore';


const ProfileEditModal = ({ onClose }) => {
  const profile = useProfile();
  const { openModal } = useUIActions();

  const [formData, setFormData] = useState({
    username: profile?.username || '',
    phone: profile?.phone || '',
    email: profile?.email || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Return to ViewProfile without saving to DB
    openModal('viewProfile');
  };

  const handleCancel = () => {
    // Return to ViewProfile without saving
    openModal('viewProfile');
  };

  return (
    <div className="bg-brand-light rounded-3xl p-6 md:p-8 border border-brand-accent">
      <h2 className="text-2xl font-bold text-brand-dark mb-4">Edit Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          leftIcon={FaUser}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          leftIcon={FaPhoneAlt}
          required
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          leftIcon={FaEnvelope}
          required
        />

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-white border border-brand-secondary text-brand-secondary font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-accent/20"
          >
            <FaTimes className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-brand-secondary text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-dark"
          >
            <FaSave className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditModal;