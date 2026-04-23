import { fillUpProfile, handleSignOut } from '@/utils/userData_queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthActions, useSession } from '@/stores/authStore';
import { Input, LoadingSpinner } from '@/components';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';

const FillUpPage = () => {
  
  const { setIsProfileMutating } = useAuthActions();
  const this_session = useSession();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: fillUpProfile,
    onMutate: () => setIsProfileMutating(true),
    onSettled: () => {
      setIsProfileMutating(false);
      queryClient.invalidateQueries({ queryKey: ['user', this_session?.user?.id] });
    },
    onError: (err) => console.error('FillUp error:', err.message),
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutate({
      userId: this_session?.user?.id,
      email: this_session?.user?.email,
      username: formData.get('username'),
      phone: formData.get('phone'),
    });
  };



  return (
    <div className="min-h-screen bg-mainBg flex flex-col justify-center items-center py-6 px-4">

      <h1 className="text-2xl font-bold text-teal-800 mb-6 tracking-tight">
        Complete Your Profile
      </h1>

      <div className="bg-formBg p-6 rounded-xl w-full max-w-sm shadow-sm">
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="Enter your username"
            leftIcon={FaUser}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            leftIcon={FaPhoneAlt}
            required
          />

          {error && <p className="text-red-500 text-sm mb-3">{error.message}</p>}

          <div className="flex gap-3 mt-2">
              <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-full hover:bg-gray-50 transition duration-150 flex justify-center items-center shadow-sm text-sm"
              >
                  Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-teal-600 text-white font-semibold py-2.5 px-4 rounded-full hover:bg-teal-700 transition duration-150 flex justify-center items-center shadow-sm disabled:opacity-50 text-sm"
              >
                {isPending ? <LoadingSpinner size={24} /> : 'Complete Profile'}
              </button>
          </div>
        </form>
      </div>

      
    </div>
  );
};

export default FillUpPage;