import AuthPage from '@/components/auth/AuthPage'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <main className="min-h-[calc(100vh-10rem-4rem)] flex items-center justify-center lg:px-12 lg:py-8">
       <AuthPage/>
    </main>
  )
}