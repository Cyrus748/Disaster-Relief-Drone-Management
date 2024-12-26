import { Server } from 'socket.io'
import { NextApiResponseServerIO } from '@/types/socket'

const ioHandler = (res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('Client connected')

      // Simulate drone updates
      const droneUpdateInterval = setInterval(() => {
        const mockDrones = generateMockDroneData()
        socket.emit('droneUpdate', mockDrones)
      }, 5000)

      // Simulate weather updates
      const weatherUpdateInterval = setInterval(() => {
        const mockWeather = generateMockWeatherData()
        socket.emit('weatherUpdate', mockWeather)
      }, 10000)

      socket.on('disconnect', () => {
        clearInterval(droneUpdateInterval)
        clearInterval(weatherUpdateInterval)
        console.log('Client disconnected')
      })
    })
  }

  res.end()
}

function generateMockDroneData() {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `drone-${i + 1}`,
    location: [
      20.5937 + Math.random() * 2 - 1,
      78.9629 + Math.random() * 2 - 1,
    ] as [number, number],
    status: ['active', 'maintenance', 'emergency'][Math.floor(Math.random() * 3)] as 'active' | 'maintenance' | 'emergency',
    cargo: ['Medical Supplies', 'Food', 'Water', 'Emergency Equipment'][
      Math.floor(Math.random() * 4)
    ],
    battery: Math.floor(Math.random() * 100),
  }))
}

function generateMockWeatherData() {
  return {
    temperature: Math.floor(Math.random() * 30) + 10,
    windSpeed: Math.floor(Math.random() * 30),
    conditions: ['Clear', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)],
  }
}

export { ioHandler as GET }

