import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthorInfo } from '@/components/author-info'

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary bg-background/80 p-4 rounded-lg">About the Project</h1>
      
      <Card className="bg-background/80">
        <CardHeader>
          <CardTitle className="text-primary">Disaster Relief Drone Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The Disaster Relief Drone Management System is an innovative project aimed at revolutionizing 
            disaster response and relief efforts. By leveraging advanced drone technology, real-time data 
            analysis, and a comprehensive management interface, this system enables rapid deployment of 
            resources and efficient coordination during critical situations.
          </p>
          <p>
            Key features of the system include:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Real-time drone tracking and mission management</li>
            <li>Integration with weather monitoring systems</li>
            <li>Seismic activity tracking for early warning</li>
            <li>Satellite imagery analysis for situational awareness</li>
            <li>Data-driven analytics for risk assessment and resource allocation</li>
          </ul>
        </CardContent>
      </Card>

      <AuthorInfo />

      <Card className="bg-background/80">
        <CardHeader>
          <CardTitle className="text-primary">Project Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Improve response times in disaster situations</li>
            <li>Enhance coordination between relief teams and agencies</li>
            <li>Provide accurate, real-time data for decision-making</li>
            <li>Minimize risks to human responders through drone utilization</li>
            <li>Develop a scalable and adaptable system for various disaster scenarios</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

