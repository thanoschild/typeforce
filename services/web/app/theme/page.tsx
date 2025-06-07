'use client';

import React from 'react'
import { useTheme } from '@/context/ThemeContext';

export default function Theme() {
    const { currentTheme, themeColors, setTheme, availableThemes } = useTheme();

  return (
    <div className="min-h-screen p-8 bg-theme-bg">
      <h1 className="text-4xl font-bold mb-4 text-theme-text">
        Theme Test
      </h1>

      <div className="mb-8">
        <label
          htmlFor="theme-select"
          className="mr-4 text-theme-sub"
        >
          Select Theme:
        </label>
        <select
          id="theme-select"
          value={currentTheme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-2 rounded bg-theme-bg text-theme-text border border-theme-sub focus:outline-none focus:border-theme-main"
        >
          {availableThemes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      <div className="p-6 rounded-lg border border-theme-sub mb-8 bg-theme-bg">
        <h2 className="text-2xl font-semibold mb-4 text-theme-text">
          Current Theme Colors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(themeColors).map(([key, value]) => (
            <div
              key={key}
              className="p-4 rounded border border-theme-sub bg-theme-bg"
            >
              <div className="text-theme-text mb-2">{key}:</div>
              <div
                className="h-8 rounded mb-2"
                style={{ backgroundColor: value }}
              />
              <div className="text-theme-sub text-sm">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-theme-text">
          Sample UI Elements
        </h2>
        <div className="space-x-4">
          <button
            className="px-4 py-2 rounded bg-theme-main text-theme-bg hover:bg-theme-error transition-all duration-200 ease-in-out active:scale-95"
            onClick={() => console.log('Button clicked')}
          >
            Primary Button
          </button>
          <button
            className="px-4 py-2 rounded bg-theme-bg text-theme-text border border-theme-sub hover:border-theme-main hover:text-theme-main transition-all duration-200 ease-in-out active:scale-95"
            onClick={() => console.log('Secondary button clicked')}
          >
            Secondary Button
          </button>
        </div>
      </div>

      <div className="p-4 rounded mb-4 bg-theme-error text-theme-bg">
        Error Message
      </div>

      <div className="p-4 rounded border border-theme-sub bg-theme-bg">
        <p className="text-theme-text mb-2">
          Regular text in a container
        </p>
        <p className="text-theme-sub">
          Secondary text with different color
        </p>
      </div>
    </div>
  )
}