'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Mission {
  id: string
  status: 'active' | 'completed' | 'pending'
  location: string
  cargo: string
  eta: string
}

function MissionDetails({ mission }: { mission: Mission }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">Location</h4>
        <p>{mission.location}</p>
      </div>
      <div>
        <h4 className="font-semibold">Cargo</h4>
        <p>{mission.cargo}</p>
      </div>
      <div>
        <h4 className="font-semibold">ETA</h4>
        <p>{mission.eta}</p>
      </div>
      <div>
        <h4 className="font-semibold">Status</h4>
        <Badge
          variant={
            mission.status === 'active'
              ? 'default'
              : mission.status === 'completed'
              ? 'success'
              : 'secondary'
          }
        >
          {mission.status}
        </Badge>
      </div>
    </div>
  )
}

export function MissionsList() {
  const [missions, setMissions] = useState<Mission[]>([])

  useEffect(() => {
    // Simulated mission updates
    const mockMissions: Mission[] = Array.from({ length: 5 }, (_, i) => ({
      id: `mission-${i + 1}`,
      status: ['active', 'completed', 'pending'][Math.floor(Math.random() * 3)] as Mission['status'],
      location: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata'][Math.floor(Math.random() * 4)],
      cargo: ['Medical Supplies', 'Food', 'Water'][Math.floor(Math.random() * 3)],
      eta: `${Math.floor(Math.random() * 60)} minutes`,
    }))
    setMissions(mockMissions)
  }, [])

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h3 className="font-medium">{mission.location}</h3>
              <p className="text-sm text-muted-foreground">{mission.cargo}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={
                  mission.status === 'active'
                    ? 'default'
                    : mission.status === 'completed'
                    ? 'success'
                    : 'secondary'
                }
              >
                {mission.status}
              </Badge>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Mission Details</DialogTitle>
                  </DialogHeader>
                  <MissionDetails mission={mission} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

