import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AuthorInfo() {
  return (
    <Card className="w-full max-w-md mx-auto glass-effect">
      <CardHeader>
        <CardTitle className="text-white">About the Author</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Image
          src="/assets/author.webp"
          alt="Aditya Negi"
          width={80}
          height={80}
          className="rounded-full border-2 border-primary"
        />
        <div>
          <h3 className="font-semibold text-lg text-white">Aditya Negi</h3>
          <p className="text-sm text-gray-200">
            Bachelor of Engineering in Computer Science
          </p>
          <p className="text-sm text-gray-200">
            Chandigarh University
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

