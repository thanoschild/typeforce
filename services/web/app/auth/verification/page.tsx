import React, { Suspense } from 'react'
import Verification from '@/components/auth/Verification'
import Loader from '@/components/core/Loader'

export default function VerificationPage() {
  return (
    <div className='flex-1 flex items-center justify-center w-full'>
      <Suspense fallback={<Loader className="text-theme-text bg-theme-bg" size="2xl" fullScreen={true}/>}>
        <Verification/>
      </Suspense>
    </div>
  )
}