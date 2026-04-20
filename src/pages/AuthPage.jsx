// src/components/authentication/AuthPage.jsx
import { FaGoogle } from 'react-icons/fa';
import { handleGoogleSignIn } from '@/utils/userData_queries';
import { StyledLogin, StyledRegister } from '@/components';
import { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-mainBg flex flex-col justify-center items-center py-6 px-4">
      {/* Logo */}
      <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 shadow-sm border border-gray-200"></div>

      <h1 className="text-2xl font-bold text-teal-800 mb-6 tracking-tight">
        Merchant: POS Maker
      </h1>

      <div className="bg-formBg p-6 rounded-xl w-full max-w-sm shadow-sm">
        {/* Toggle Buttons */}
        <div className="flex mb-5 border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-sm font-semibold ${
              isLogin
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-teal-600'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-sm font-semibold ${
              !isLogin
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-teal-600'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Conditional Form */}
        {isLogin ? <StyledLogin /> : <StyledRegister />}

        {/* Divider */}
        <div className="mt-6 mb-5 flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-3 text-xs text-gray-400 font-medium uppercase tracking-wide">
            OR
          </span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-full hover:bg-gray-50 transition duration-150 flex justify-center items-center shadow-sm text-sm"
        >
          <FaGoogle className="mr-2 h-4 w-4 text-[#EA4335]" />
          Google
        </button>

        {/* Toggle Link */}
        <p className="text-center text-teal-800 font-medium text-sm mt-5">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-teal-600 hover:underline font-normal"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>



      {/* Footer */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        <p className="mb-2">© 2026 Merchant. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 text-teal-600">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;