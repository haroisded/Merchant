import { useState } from 'react';
import CreationStep1 from '@/components/ModalSnippets/CreationStep1';
import CreationStep2 from '@/components/ModalSnippets/CreationStep2';
import { useNavigate } from 'react-router';

const CreateApplicationPage = () => {
  const [currentStep, setCurrentStep] = useState('step1');
  const navigate = useNavigate();

  const handleNext = () => setCurrentStep('step2');
  const handleBack = () => setCurrentStep('step1');
  const handleCancel = () => navigate('/Home');

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()} // ← stops page reload on Enter
      className="bg-brand-light min-h-screen"
    >
      {currentStep === 'step1' && (
        <CreationStep1 onNext={handleNext} onCancel={handleCancel} />
      )}
      {currentStep === 'step2' && (
        <CreationStep2 onBack={handleBack} onCancel={handleCancel} />
      )}
    </form>
  );
};

export default CreateApplicationPage;