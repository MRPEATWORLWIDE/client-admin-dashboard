"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Zap, Navigation } from "lucide-react"

interface ChargingStation {
  id: string
  name: string
  distance: string
  available: number
  total: number
  price: string
  fastCharge: boolean
}

const chargingStations: ChargingStation[] = [
  {
    id: "1",
    name: "Downtown Charging Hub",
    distance: "0.2 mi",
    available: 3,
    total: 8,
    price: "$0.35/kWh",
    fastCharge: true,
  },
  {
    id: "2",
    name: "Mall Parking Garage",
    distance: "0.5 mi",
    available: 5,
    total: 6,
    price: "$0.28/kWh",
    fastCharge: false,
  },
  {
    id: "3",
    name: "City Center Station",
    distance: "0.8 mi",
    available: 2,
    total: 4,
    price: "$0.32/kWh",
    fastCharge: true,
  },
  {
    id: "4",
    name: "Airport Terminal",
    distance: "2.1 mi",
    available: 8,
    total: 12,
    price: "$0.40/kWh",
    fastCharge: true,
  },
]

export default function EVMap() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Zap className="w-5 h-5 text-green-600" />
          Nearby EV Charging
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Interactive Map</p>
            <p className="text-xs text-gray-400">Charging stations near you</p>
          </div>
        </div>
        {/* Charging Stations List */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 text-sm">Available Stations</h4>
          {chargingStations.map((station) => (
            <div
              key={station.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-gray-900 text-sm">{station.name}</h5>
                  {station.fastCharge && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
                      Fast
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    {station.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {station.available}/{station.total} available
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 text-sm">{station.price}</p>
                <p className="text-xs text-gray-500">per kWh</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
