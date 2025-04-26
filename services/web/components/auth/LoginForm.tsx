'use client';

import { useState } from 'react';
import { LuLogIn, LuCheck } from "react-icons/lu";
import AuthInput from './AuthInput';
import SocialButton from './SocialButton';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the login logic
    console.log('Login form submitted', formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center text-theme-sub text-2xl font-light mb-6">
        <LuLogIn className="mr-2" size={24} />
        <span>login</span>
      </div>

      <div className="flex space-x-4">
        <SocialButton provider="google" />
        <SocialButton provider="github" />
      </div>

      <div className="flex items-center my-1.5">
        <div className="flex-grow h-1 bg-theme-sub-alt rounded-full"></div>
        <span className="px-4 text-theme-text">or</span>
        <div className="flex-grow h-1 bg-theme-sub-alt rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
        />
        
        <AuthInput
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
        />
        
        <div className="flex items-center justify-between">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="sr-only"
            />
            <div 
              className={`w-5 h-5 border rounded ${formData.rememberMe ? 'bg-theme-sub border-theme-sub' : 'bg-theme-sub-alt border-theme-sub-alt'} flex items-center justify-center cursor-pointer`}
              onClick={() => setFormData(prev => ({ ...prev, rememberMe: !prev.rememberMe }))}
            >
              {formData.rememberMe && <LuCheck className="text-theme-bg font-extrabold text-xl"/>}
            </div>
            <label htmlFor="rememberMe" className="ml-2 text-gray-700 cursor-pointer">
              remember me
            </label>
          </div>

          <div className="text-right">
          <a href="#" className="text-theme-sub hover:underline text-sm">
            forgot password?
          </a>
        </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-theme-sub-alt hover:bg-theme-text text-theme-text hover:text-theme-sub-alt flex items-center justify-center py-2.5 rounded-md transition-colors duration-200 mt-6"
        >
          <LuLogIn className="mr-2" size={20} />
          <span>sign in</span>
        </button>
      </form>
    </div>
  );
}