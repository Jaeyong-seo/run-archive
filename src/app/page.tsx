'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { GarminActivityData } from '@/types/garmin'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const form = e.currentTarget
    const input = form.elements.namedItem('url') as HTMLInputElement
    const url = input.value

    try {
      const response = await fetch(`/api/parse?url=${encodeURIComponent(url)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse activity')
      }

      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('runlog') || '[]') as GarminActivityData[]
      localStorage.setItem('runlog', JSON.stringify([...existingData, data]))

      // Clear input
      input.value = ''
      setError(null)

      // Navigate to /me page
      router.push('/me')

    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to process activity')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-block rounded-2xl bg-black/30 px-4 py-2 mb-6">
              <span className="text-primary font-medium">Beta</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              Run Archive
              <span className="inline-block ml-2 transition-transform hover:scale-110 duration-200">🏃‍♂️</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-sm mx-auto">
              Transform your Garmin activities into beautiful running memories
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="url"
                placeholder="Paste your Garmin activity link..."
                className="w-full max-w-md bg-black border border-gray-700 rounded-xl 
                         px-4 py-3 text-foreground placeholder-gray-500
                         focus:outline-none focus:border-primary focus:ring-1 
                         focus:ring-primary/30 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-black rounded-full font-semibold 
                       px-6 py-3 transition-all duration-200
                       hover:bg-orange-500 hover:shadow-lg hover:shadow-primary/20 
                       active:transform active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Import Activity'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Footer */}
          <p className="text-sm text-gray-500 text-center">
            One run at a time, build your running story
          </p>
        </div>
      </div>
    </div>
  )
}
