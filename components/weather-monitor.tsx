'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Cloud, Droplets, Sun, Thermometer, Wind } from 'lucide-react'

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  conditions: string
  warning?: string
}

export function WeatherMonitor() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // In a real application, replace this with an actual API call
        const mockWeather: WeatherData = {
          temperature: Math.floor(Math.random() * 30) + 10,
          humidity: Math.floor(Math.random() * 100),
          windSpeed: Math.floor(Math.random() * 30),
          conditions: ['Clear', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)],
        }

        if (mockWeather.windSpeed > 20) {
          mockWeather.warning = 'High wind speeds detected. Some drone operations may be restricted.'
        }

        setWeather(mockWeather)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeatherData()
    const interval = setInterval(fetchWeatherData, 600000) // Update every 10 minutes

    return () => clearInterval(interval)
  }, [])

  if (!weather) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            <span>{weather.temperature}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4" />
            <span>{weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            <span>{weather.conditions}</span>
          </div>
        </div>
        {weather.warning && (
          <Alert variant="warning" className="mt-4">
            <AlertTitle>Weather Warning</AlertTitle>
            <AlertDescription>{weather.warning}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

