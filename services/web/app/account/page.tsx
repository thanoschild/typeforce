import Account from '@/components/account/Account'
import AuthGuard from '@/components/auth/AuthGuard'
import React from 'react'

export default function AccountPage() {
  return (
    <AuthGuard message="Sign in to view your profile">
      <Account/>
    </AuthGuard>
  )
}