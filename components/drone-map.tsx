'use client'

import { useEffect, useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

interface Drone {
  id: string
  position: {
    lat: number
    lng: number
  }
  status: 'active' | 'warning' | 'danger'
  cargo: string
}

export function DroneMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<google.maps.Map | null>(null)
  const [drones, setDrones] = useState<Drone[]>([])
  const [mapError, setMapError] = useState<string | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    const initMap = () => {
      try {
        if (!window.google) {
          setMapError('Google Maps failed to load. Please refresh the page.')
          return
        }

        // Clear existing map instance if it exists
        if (googleMapRef.current) {
          return
        }

        // Create new map instance
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 },
          zoom: 5,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        // Start drone updates after map is initialized
        startDroneUpdates()
      } catch (error) {
        console.error('Error initializing map:', error)
        setMapError('Failed to initialize map. Please refresh the page.')
      }
    }

    // Check if Google Maps is loaded
    if (window.google && window.google.maps) {
      initMap()
    } else {
      // Wait for Google Maps to load
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps)
          initMap()
        }
      }, 100)

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkGoogleMaps)
        if (!window.google) {
          setMapError('Google Maps failed to load. Please refresh the page.')
        }
      }, 10000)
    }

    return () => {
      // Cleanup markers on unmount
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []
    }
  }, [])

  // Function to start drone updates
  const startDroneUpdates = () => {
    const updateDrones = () => {
      const mockDrones: Drone[] = Array.from({ length: 3 }, (_, i) => ({
        id: `drone-${i + 1}`,
        position: {
          lat: 20.5937 + (Math.random() * 2 - 1),
          lng: 78.9629 + (Math.random() * 2 - 1)
        },
        status: ['active', 'warning', 'danger'][Math.floor(Math.random() * 3)] as Drone['status'],
        cargo: ['Medical Supplies', 'Food', 'Water'][Math.floor(Math.random() * 3)]
      }))
      setDrones(mockDrones)
    }

    updateDrones() // Initial update
    const interval = setInterval(updateDrones, 3000)
    return interval
  }

  // Update markers when drones change
  useEffect(() => {
    if (!googleMapRef.current || !window.google) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    // Create new markers
    drones.forEach(drone => {
      const marker = new window.google.maps.Marker({
        position: drone.position,
        map: googleMapRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: 
            drone.status === 'active' ? '#4CAF50' : 
            drone.status === 'warning' ? '#FFC107' : '#F44336',
          fillOpacity: 0.8,
          strokeWeight: 1,
          strokeColor: '#ffffff',
          scale: 8
        }
      })

      // Add click listener for info window
      marker.addListener('click', () => {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0;">Drone ${drone.id}</h3>
              <p style="margin: 4px 0;">Status: ${drone.status}</p>
              <p style="margin: 4px 0;">Cargo: ${drone.cargo}</p>
            </div>
          `
        })
        infoWindow.open(googleMapRef.current, marker)
      })

      markersRef.current.push(marker)
    })
  }, [drones])

  if (mapError) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-destructive">{mapError}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        {!googleMapRef.current && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>Loading map...</p>
            </div>
          </div>
        )}
        <div 
          ref={mapRef} 
          className="h-[400px] w-full rounded-lg"
          style={{ position: 'relative' }}
        />
      </CardContent>
    </Card>
  )
}

