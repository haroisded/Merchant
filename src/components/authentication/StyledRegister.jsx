import { FaEnvelope, FaPhoneAlt, FaLock, FaArrowRight } from 'react-icons/fa';
import { signUpAndCreateProfile } from '@/utils/userData_queries';
import { Input, LoadingSpinner } from '@/components';
import { useAuthActions } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';

const StyledRegister = () => {
  const { setIsMutating } = useAuthActions();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signUpAndCreateProfile,
    onMutate: () => setIsMutating(true),
    onSettled: () => setIsMutating(false),
    onError: (err) => console.error('Signup error:', err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutate({
      username: formData.get('username'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Username"
        autoComplete="username"  
        type="text"
        name="username"
        placeholder="Enter your username"
        leftIcon={FaEnvelope} // Consider changing to FaUser for better UX
        required
      />

      <Input
        label="Email Address"
        autoComplete="email"  // ← add
        type="email"
        name="email"
        placeholder="Enter your email"
        leftIcon={FaEnvelope}
        required
      />

      <Input
        label="Phone Number"
        autoComplete="tel"
        type="tel"
        name="phone"
        placeholder="Enter your phone number"
        leftIcon={FaPhoneAlt}
        required
      />

      <Input
        label="Password"
        autoComplete="new-password"
        type="password"
        name="password"
        placeholder="Create a password"
        leftIcon={FaLock}
        required
      />

      <div className="mb-4">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            name="terms"
            className="h-3.5 w-3.5 rounded border-gray-300 focus:ring-teal-600 text-teal-600"
            required
          />
          <span className="ml-2 text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-teal-600 hover:underline">
              Terms
            </a>
          </span>
        </label>
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-teal-600 text-white font-semibold py-2.5 px-4 rounded-full hover:bg-teal-700 transition duration-150 flex justify-center items-center shadow-sm disabled:opacity-50 text-sm"
      >
        {isPending ? (
          <LoadingSpinner size={64} />
        ) : (
          <>
            Register
            <FaArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default StyledRegister;