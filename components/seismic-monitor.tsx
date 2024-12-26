'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Activity } from 'lucide-react'

interface SeismicEvent {
  magnitude: number
  location: string
  timestamp: Date
}

export function SeismicMonitor() {
  const [seismicEvents, setSeismicEvents] = useState<SeismicEvent[]>([])

  useEffect(() => {
    const fetchSeismicData = async () => {
      try {
        // In a real application, replace this with an actual API call
        const mockData: SeismicEvent[] = [
          { magnitude: 4.5, location: 'Northern California', timestamp: new Date() },
          { magnitude: 3.2, location: 'Central Japan', timestamp: new Date(Date.now() - 3600000) },
        ]
        setSeismicEvents(mockData)
      } catch (error) {
        console.error('Error fetching seismic data:', error)
      }
    }

    fetchSeismicData()
    const interval = setInterval(fetchSeismicData, 300000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seismic Activity Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        {seismicEvents.map((event, index) => (
          <Alert key={index} variant={event.magnitude > 4 ? 'destructive' : 'default'}>
            <Activity className="h-4 w-4" />
            <AlertTitle>Magnitude {event.magnitude}</AlertTitle>
            <AlertDescription>
              {event.location} - {event.timestamp.toLocaleString()}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}

