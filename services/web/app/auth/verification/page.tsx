import React from 'react'
import Verification from '@/components/auth/Verification'

type Props = {}

export default function VerificationPage({}: Props) {
  return (
    <div className='flex-1 flex items-center justify-center w-full lg:px-12 lg:py-8'>
        <Verification/>
    </div>
  )
}