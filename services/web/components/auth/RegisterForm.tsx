'use client';

import { useState } from 'react';
import { LuUserPlus } from "react-icons/lu";
import AuthInput from './AuthInput';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    verifyEmail: '',
    password: '',
    verifyPassword: ''
  });

  const isFieldFilled = (fieldName: keyof typeof formData) => {
    return formData[fieldName].length > 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the registration logic
    console.log('Register form submitted', formData);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center text-theme-sub text-2xl font-light mb-6">
        <LuUserPlus className="mr-2" size={24} />
        <span>register</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username"
          highlight={isFieldFilled('username')}
        />
        
        <AuthInput
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          highlight={true}
        />
        
        {/* <AuthInput
          name="verifyEmail"
          type="email"
          value={formData.verifyEmail}
          onChange={handleChange}
          placeholder="verify email"
          highlight={true}
        /> */}
        
        <AuthInput
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
          highlight={true}
        />
        
        <AuthInput
          name="verifyPassword"
          type="password"
          value={formData.verifyPassword}
          onChange={handleChange}
          placeholder="verify password"
          highlight={true}
        />
        
        <button
          type="submit"
          className="w-full bg-theme-sub-alt hover:bg-theme-text text-theme-text hover:text-theme-sub-alt flex items-center justify-center py-2.5 rounded-md transition-colors duration-200 mt-6"
        >
          <LuUserPlus className="mr-2" size={20} />
          <span>sign up</span>
        </button>
      </form>
    </div>
  );
}