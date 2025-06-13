import React from 'react'
import ThemeSelector from '@/components/settings/ThemeSelector'
import FontSelector from '@/components/settings/FontSelector'

export default function Setting() {
  return (
    <div className='flex flex-col mx-40 gap-6'>
        <ThemeSelector/>
        <FontSelector/>
    </div>
  )
}