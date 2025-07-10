"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from "lucide-react"

interface Booking {
  id: string
  location: string
  date: string
  time: string
  duration: string
  status: "active" | "upcoming" | "completed"
  price: string
}

const bookings: Booking[] = [
  {
    id: "1",
    location: "Downtown Mall - Level 2",
    date: "Today",
    time: "1:15 PM",
    duration: "4 hours",
    status: "active",
    price: "$12.00",
  },
  {
    id: "2",
    location: "City Center Plaza",
    date: "Tomorrow",
    time: "9:00 AM",
    duration: "2 hours",
    status: "upcoming",
    price: "$8.00",
  },
  {
    id: "3",
    location: "Airport Terminal 1",
    date: "Dec 15",
    time: "6:30 AM",
    duration: "8 hours",
    status: "upcoming",
    price: "$24.00",
  },
  {
    id: "4",
    location: "Office Complex B",
    date: "Dec 12",
    time: "8:00 AM",
    duration: "9 hours",
    status: "completed",
    price: "$18.00",
  },
]

export default function BookingsTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200"
      case "upcoming":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "completed":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Recent Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <h4 className="font-medium text-gray-900 text-sm">{booking.location}</h4>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {booking.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {booking.time} • {booking.duration}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 text-sm">{booking.price}</span>
                <Badge variant="outline" className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
