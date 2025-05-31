import React from 'react'
import Verification from '@/components/auth/Verification'

type Props = {}

export default function VerificationPage({}: Props) {
  return (
    <div className='flex-1 flex items-center justify-center w-full'>
        <Verification/>
    </div>
  )
}