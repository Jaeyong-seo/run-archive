'use client'

import { useEffect, useState } from 'react'
import type { GarminActivityData } from '@/types/garmin'

export default function MePage() {
  const [activities, setActivities] = useState<GarminActivityData[]>([])

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('runlog')
      if (storedData) {
        setActivities(JSON.parse(storedData))
      }
    } catch (err) {
      console.error('Error loading activities:', err)
    }
  }, [])

  if (activities.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto text-center mt-20">
          <p className="text-gray-400">No activities found. Import some runs first!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Running Log</h1>
        
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="bg-neutral-900 rounded-lg p-6 space-y-2 hover:bg-neutral-800 transition-colors"
            >
              <h2 className="text-xl font-bold text-white">{activity.title}</h2>
              <p className="text-gray-400">{activity.description}</p>
              <a 
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-orange-500 text-sm inline-block transition-colors"
              >
                View on Garmin Connect →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 