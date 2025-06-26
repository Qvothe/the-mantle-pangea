import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Search, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
            <Search className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
          <p className="text-gray-600">
            Looks like this page took a trip to Goa and forgot to come back!
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 text-left">
            The page you're looking for doesn't exist. It might have been moved, deleted, 
            or you may have typed the URL incorrectly.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              Back to The Mantle
            </Button>
          </Link>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          Error Code: 404 | Page Not Found
        </div>
      </Card>
    </div>
  )
}