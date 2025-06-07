import React, { Suspense } from 'react'
import Verification from '@/components/auth/Verification'

export default function VerificationPage() {
  return (
    <div className='flex-1 flex items-center justify-center w-full'>
      <Suspense fallback={<div>Loading...</div>}>
        <Verification/>
      </Suspense>
    </div>
  )
}