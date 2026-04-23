import { useIsAuthLoading, useIsProfileLoading } from '@/stores/authStore';
import { useIsAppPageLoading } from '@/stores/applicationStore';
import { useIsGlobalLoading } from '@/stores/uiStore';
import { LoadingSpinner } from '@/components';

const GlobalLoader = () => {
  // General Loader
  const isGlobalLoading = useIsGlobalLoading();

  // Specific Loader
  const isAuthLoading = useIsAuthLoading();
  const isProfileLoading = useIsProfileLoading();
  const isAppPageLoading = useIsAppPageLoading();
  

  const isLoading = isAuthLoading || isProfileLoading || isGlobalLoading;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
      <LoadingSpinner size={80} />
      <p className="mt-4 text-teal-800 font-medium text-sm">
        {isGlobalLoading && 'Please wait...'}
        
        {isAuthLoading && 'Checking Session...'}
        {isProfileLoading && 'Checking Profile...'}
        {isAppPageLoading && 'Loading Application...'}
      </p>
    </div>
  );
};

export default GlobalLoader;