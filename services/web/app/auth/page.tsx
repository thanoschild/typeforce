import AuthPage from '@/components/auth/AuthPage'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="flex-1 flex items-center justify-center w-full lg:px-12 lg:py-8">
       <AuthPage/>
    </div>
  )
}