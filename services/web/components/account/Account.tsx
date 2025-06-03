'use client';

import React from 'react'
import { useSession } from "next-auth/react"
import AccountHeader from './AccountHeader'
import { getUserById } from '@/actions/user'
import { useEffect, useState } from 'react'
import { User } from '@prisma/client'
import UserStats from './UserStats';

export default function Account() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.id) {
        try {
          const user = await getUserById(session.user.id)
          setUserData(user)
        } catch (error) {
          console.error('Error fetching user:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUser()
  }, [session?.user?.id])

  if (status === 'loading' || loading) {
    return <div>Loading...</div>
  }

  if (!userData) {
    return <div>User not found</div>
  }

  return (
    <div className='flex flex-col space-y-16'>
      <AccountHeader user={userData} />
      <UserStats user={userData}/>
    </div>
  )
}