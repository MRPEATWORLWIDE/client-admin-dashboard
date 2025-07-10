"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Battery, MapPin, Clock } from "lucide-react"

export default function VehicleCard() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Car className="w-5 h-5 text-blue-600" />
          My Vehicle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Tesla Model 3</h3>
            <p className="text-sm text-gray-500">License: ABC-123</p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">85%</p>
              <p className="text-xs text-gray-500">Battery</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Zone A</p>
              <p className="text-xs text-gray-500">Current</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Clock className="w-4 h-4 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-900">Parking until 3:30 PM</p>
            <p className="text-xs text-blue-700">2 hours 15 minutes remaining</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
