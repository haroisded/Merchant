// src/components/ui/Input.jsx
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  leftIcon: LeftIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-teal-800 font-semibold text-sm mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className="h-4 w-4 text-gray-500" />
          </div>
        )}
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${
            LeftIcon ? 'pl-9' : 'pl-3'
          } pr-9 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-teal-600 bg-white text-black placeholder-gray-400`}
          {...props}
        />
        {isPassword && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="h-4 w-4 text-gray-500" />
            ) : (
              <FaEye className="h-4 w-4 text-gray-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;