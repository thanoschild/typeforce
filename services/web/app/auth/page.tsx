import React, { Suspense } from 'react'
import AuthPage from '@/components/auth/AuthPage'

export default function page() {
  return (
    <div className="flex-1 flex items-center justify-center w-full">
       <Suspense fallback={<div>Loading...</div>}>
        <AuthPage />
      </Suspense>
    </div>
  )
}