'use client';

import React from 'react'
import { FontSelector } from '@/components/FontSelector'
import { useFont } from '@/context/FontContext';

type Props = {}

export default function FontPage({}: Props) {
  const { currentFont } = useFont();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <FontSelector />
        </div>
        <div className={`text-3xl text-theme-sub`}>
          Home is not just a place, it's a feeling.
          <p>current font: {currentFont}</p>
        </div>
      </div>
    </div>
  )
}