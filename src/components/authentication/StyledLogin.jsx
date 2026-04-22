// src/components/authentication/StyledLogin.jsx
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { signInWithEmail } from '@/utils/userData_queries';
import { Input, LoadingSpinner } from '@/components';
import { useAuthActions } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';

const StyledLogin = () => {
  const { setIsMutating } = useAuthActions();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signInWithEmail,
    onMutate: () => setIsMutating(true),
    onSettled: () => setIsMutating(false),
    onError: (err) => console.error('Login error:', err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutate({
      email: formData.get('email'),
      password: formData.get('password'),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        label="Password"
        autoComplete="current-password"
        type="password"
        name="password"
        placeholder="Enter your password"
        leftIcon={FaLock}
        required
      />

      <div className="mb-4 flex justify-between items-center text-sm">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="keepLoggedIn"
            className="h-3.5 w-3.5 rounded border-gray-300 focus:ring-teal-600 text-teal-600"
          />
          <span className="ml-2 text-gray-700">Keep me logged in</span>
        </label>
        <a href="#" className="text-teal-600 hover:underline text-sm">
          Forgot?
        </a>
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-teal-600 text-white font-semibold py-2.5 px-4 rounded-full hover:bg-teal-700 transition duration-150 flex justify-center items-center shadow-sm disabled:opacity-50 text-sm"
      >
        {isPending ? (
          <LoadingSpinner size={24} />
        ) : (
          <>
            Log in
            <FaArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default StyledLogin;