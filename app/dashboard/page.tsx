'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Bell, AlertTriangle, DrillIcon as Drone, Wind } from 'lucide-react'
import { DroneMap } from '@/components/drone-map'

interface WeatherData {
  temperature: number
  windSpeed: number
  conditions: string
}

export default function DashboardPage() {
  const [alerts, setAlerts] = useState<string[]>([])
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    // Simulate weather updates
    const interval = setInterval(() => {
      setWeather({
        temperature: Math.floor(Math.random() * 30) + 10,
        windSpeed: Math.floor(Math.random() * 30),
        conditions: ['Clear', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)],
      })
    }, 10000)

    // Simulate alerts
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setAlerts(prev => [...prev, `Alert: Drone status update at ${new Date().toLocaleTimeString()}`])
      }
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(alertInterval)
    }
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Disaster Relief Drone Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Drones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weather Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            {weather && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  <span>{weather.windSpeed} km/h</span>
                </div>
                <div>{weather.temperature}°C</div>
                <Badge>{weather.conditions}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.slice(-3).map((alert, i) => (
                <Alert key={i} variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Alert</AlertTitle>
                  <AlertDescription>{alert}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <DroneMap />
    </div>
  )
}

