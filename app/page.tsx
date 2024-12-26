'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DroneMap } from '@/components/drone-map'
import { MissionsList } from '@/components/missions-list'
import { WeatherMonitor } from '@/components/weather-monitor'
import { DroneStatus } from '@/components/drone-status'
import { SeismicMonitor } from '@/components/seismic-monitor'
import { SatelliteData } from '@/components/satellite-data'
import { AuthorInfo } from '@/components/author-info'
import { AlertTriangle, BarChart } from 'lucide-react'

interface Analytics {
  riskLevel: 'low' | 'medium' | 'high'
  prediction: string
}

export default function DashboardPage() {
  const [activeMissions, setActiveMissions] = useState(0)
  const [completedMissions, setCompletedMissions] = useState(0)
  const [availableDrones, setAvailableDrones] = useState(0)
  const [analytics, setAnalytics] = useState<Analytics | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setActiveMissions(Math.floor(Math.random() * 5) + 1)
      setCompletedMissions((prev) => prev + Math.floor(Math.random() * 2))
      setAvailableDrones(Math.floor(Math.random() * 3) + 2)

      const mockAnalytics: Analytics = {
        riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Analytics['riskLevel'],
        prediction: 'Potential flooding in coastal areas within the next 48 hours.',
      }
      setAnalytics(mockAnalytics)
    }

    fetchData()
    const interval = setInterval(fetchData, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center space-y-4 glass-effect p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white">Disaster Relief Drone Management</h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          Empowering rapid response and saving lives through advanced drone technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="col-span-full glass-effect">
          <CardHeader>
            <CardTitle className="text-white">System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-200">
              Our Disaster Relief Drone Management system utilizes cutting-edge technology to provide real-time monitoring,
              rapid response capabilities, and data-driven decision making in crisis situations. By integrating drone
              operations with weather monitoring, seismic activity tracking, and satellite imagery, we enable faster and
              more effective disaster relief efforts.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="relative w-full h-[300px]">
            <Image
              src="/assets/drone.jpg"
              alt="Professional disaster relief drone with advanced camera system"
              fill
              className="rounded-lg shadow-lg hover:scale-[1.02] transition-transform"
            />
          </div>
          <Card className="glass-effect">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-white">Advanced Drone Technology</h3>
              <p className="text-sm text-gray-200">
                Our fleet includes state-of-the-art drones equipped with high-resolution cameras and sensors for precise disaster area assessment.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="relative w-full h-[300px]">
            <Image
              src="/assets/construction.jpg"
              alt="Drone monitoring system in action at a construction site"
              fill
              className="rounded-lg shadow-lg hover:scale-[1.02] transition-transform"
            />
          </div>
          <Card className="glass-effect">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-white">Real-time Monitoring</h3>
              <p className="text-sm text-gray-200">
                Comprehensive monitoring systems enable effective coordination and rapid response in disaster scenarios.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 glass-effect">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Active Missions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{activeMissions}</p>
              </CardContent>
            </Card>
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Completed Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{completedMissions}</p>
              </CardContent>
            </Card>
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">Available Drones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{availableDrones}</p>
              </CardContent>
            </Card>
          </div>
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-white">Live Drone Map</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <DroneMap />
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <WeatherMonitor />
            <DroneStatus />
          </div>
        </TabsContent>
        <TabsContent value="missions">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-white">Active Missions</CardTitle>
            </CardHeader>
            <CardContent>
              <MissionsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SeismicMonitor />
            <WeatherMonitor />
          </div>
          <SatelliteData />
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart className="h-5 w-5" />
                Data Analytics and Early Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analytics && (
                <Alert variant={analytics.riskLevel === 'high' ? 'destructive' : (analytics.riskLevel === 'medium' ? 'warning' : 'default')}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Risk Level: {analytics.riskLevel.toUpperCase()}</AlertTitle>
                  <AlertDescription>{analytics.prediction}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AuthorInfo />
    </div>
  )
}

