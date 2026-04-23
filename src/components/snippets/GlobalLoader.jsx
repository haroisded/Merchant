import { useIsAuthLoading, useIsProfileLoading } from '@/stores/authStore';
import { useIsGlobalLoading } from '@/stores/uiStore';
import { LoadingSpinner } from '@/components';

const GlobalLoader = () => {
  const isAuthLoading = useIsAuthLoading();
  const isProfileLoading = useIsProfileLoading();
  const isGlobalLoading = useIsGlobalLoading();

  const isLoading = isAuthLoading || isProfileLoading || isGlobalLoading;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
      <LoadingSpinner size={80} />
      <p className="mt-4 text-teal-800 font-medium text-sm">
        {isAuthLoading && 'Checking Session...'}
        {isProfileLoading && 'Loading Profile...'}
        {isGlobalLoading && 'Please wait...'}
      </p>
    </div>
  );
};

export default GlobalLoader;