// src/components/ProfileModal.jsx
import { useActiveModal, useUIActions } from '@/stores/uiStore';
import ModalWrapper from '../snippets/ModalWrapper';
import ProfileViewModal from '../ModalSnippets/ProfileViewModal';
import ProfileEditModal from '../ModalSnippets/ProfileEditModal';

const ProfileModal = () => {
  const activeModal = useActiveModal();
  const { closeModal } = useUIActions();

  const isOpen = activeModal === 'viewProfile' || activeModal === 'editProfile';

  const handleClose = () => closeModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      {activeModal === 'viewProfile' && <ProfileViewModal onClose={handleClose} />}
      {activeModal === 'editProfile' && <ProfileEditModal onClose={handleClose} />}
    </ModalWrapper>
  );
};

export default ProfileModal;