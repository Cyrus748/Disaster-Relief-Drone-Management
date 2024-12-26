'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Cloud, Sun, Wind } from 'lucide-react'

interface WeatherData {
  temperature: number
  windSpeed: number
  conditions: string
  warning?: string
}

export function WeatherAlert() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    // Simulated weather updates
    const interval = setInterval(() => {
      const mockWeather: WeatherData = {
        temperature: Math.floor(Math.random() * 30) + 10,
        windSpeed: Math.floor(Math.random() * 30),
        conditions: ['Clear', 'Cloudy', 'Stormy'][Math.floor(Math.random() * 3)],
      }

      if (mockWeather.windSpeed > 20) {
        mockWeather.warning = 'High wind speeds detected. Some drone operations may be restricted.'
      }

      setWeather(mockWeather)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (!weather) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <span>{weather.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4" />
              <span>{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              <span>{weather.conditions}</span>
            </div>
          </div>
          {weather.warning && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Weather Warning</AlertTitle>
              <AlertDescription>{weather.warning}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

