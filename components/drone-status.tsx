'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Battery, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DroneStatus {
  id: string
  battery: number
  status: 'active' | 'charging' | 'maintenance'
  lastMaintenance: string
  signalStrength: number
}

export function DroneStatus() {
  const [drones, setDrones] = useState<DroneStatus[]>([])

  useEffect(() => {
    // Simulated drone status updates
    const mockDrones: DroneStatus[] = Array.from({ length: 3 }, (_, i) => ({
      id: `drone-${i + 1}`,
      battery: Math.floor(Math.random() * 100),
      status: ['active', 'charging', 'maintenance'][Math.floor(Math.random() * 3)] as DroneStatus['status'],
      lastMaintenance: '2 days ago',
      signalStrength: Math.floor(Math.random() * 100),
    }))
    setDrones(mockDrones)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drone Fleet Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {drones.map((drone) => (
            <div key={drone.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Drone {drone.id}</h4>
                <Badge
                  variant={
                    drone.status === 'active'
                      ? 'default'
                      : drone.status === 'charging'
                      ? 'warning'
                      : 'destructive'
                  }
                >
                  {drone.status}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Battery className="h-4 w-4" />
                    Battery
                  </span>
                  <span>{drone.battery}%</span>
                </div>
                <Progress value={drone.battery} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Wifi className="h-4 w-4" />
                    Signal Strength
                  </span>
                  <span>{drone.signalStrength}%</span>
                </div>
                <Progress
                  value={drone.signalStrength}
                  className={cn(
                    drone.signalStrength < 30 && "text-destructive",
                    drone.signalStrength >= 30 && drone.signalStrength < 70 && "text-warning",
                    drone.signalStrength >= 70 && "text-success"
                  )}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Last maintenance: {drone.lastMaintenance}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

