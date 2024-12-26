'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Satellite } from 'lucide-react'
import Image from 'next/image'

interface SatelliteImage {
  url: string
  timestamp: Date
  description: string
}

export function SatelliteData() {
  const [satelliteImages, setSatelliteImages] = useState<SatelliteImage[]>([])

  useEffect(() => {
    const fetchSatelliteData = async () => {
      try {
        // In a real application, replace this with an actual API call
        const mockData: SatelliteImage[] = [
          {
            url: '/assets/satellite-image-1.jpg',
            timestamp: new Date(),
            description: 'Tropical storm forming in the Atlantic',
          },
          {
            url: '/assets/satellite-image-2.jpg',
            timestamp: new Date(Date.now() - 3600000),
            description: 'Wildfire detected in California',
          },
        ]
        setSatelliteImages(mockData)
      } catch (error) {
        console.error('Error fetching satellite data:', error)
      }
    }

    fetchSatelliteData()
    const interval = setInterval(fetchSatelliteData, 1800000) // Update every 30 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Satellite className="h-5 w-5" />
          Satellite Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {satelliteImages.map((image, index) => (
            <div key={index} className="space-y-2">
              <Image
                src={image.url}
                alt={image.description}
                width={400}
                height={300}
                className="rounded-lg"
              />
              <p className="text-sm font-medium">{image.description}</p>
              <p className="text-xs text-muted-foreground">
                {image.timestamp.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

