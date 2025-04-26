'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { cn } from '@/lib/utils';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
  
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row lg:gap-32 xl:gap-60">
        <div className={cn(
          "w-full max-w-sm p-4 transition-all duration-300",
          activeTab === 'register' ? 'md:block' : 'hidden md:block'
        )}>
          <RegisterForm />
        </div>
        
        <div className={cn(
          "w-full max-w-sm p-4 transition-all duration-300",
          activeTab === 'login' ? 'md:block' : 'hidden md:block'
        )}>
          <LoginForm />
        </div>

        <div className="md:hidden flex justify-center space-x-4 mb-4">
          <button 
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2 ${activeTab === 'register' ? 'text-theme-sub font-medium' : 'text-theme-text'}`}
          >
            Register
          </button>
          <button 
            onClick={() => setActiveTab('login')}
            className={`px-4 py-2 ${activeTab === 'login' ? 'text-theme-sub font-medium' : 'text-theme-text'}`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}