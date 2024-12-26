import Link from 'next/link'
import { DrillIcon as Drone, Map, Package, Wind, User } from 'lucide-react'

export function MainNav() {
  return (
    <nav className="bg-background/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Drone className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-primary">Disaster Relief Drones</h1>
          </div>
          <div className="flex items-center space-x-6">
            <NavLink href="/" icon={<Map className="h-5 w-5" />} text="Dashboard" />
            <NavLink href="/missions" icon={<Package className="h-5 w-5" />} text="Missions" />
            <NavLink href="/weather" icon={<Wind className="h-5 w-5" />} text="Weather" />
            <NavLink href="/about" icon={<User className="h-5 w-5" />} text="About" />
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

