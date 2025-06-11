import React, { Suspense } from 'react'
import AuthPage from '@/components/auth/AuthPage'
import Loader from '@/components/core/Loader'

export default function page() {
  return (
    <div className="flex-1 flex items-center justify-center w-full">
       <Suspense fallback={<Loader className="text-theme-text bg-theme-bg" size="2xl" fullScreen={true}/>}>
        <AuthPage />
      </Suspense>
    </div>
  )
}