"use client"

import { useState } from "react"
import { Send, MapPin, Clock, Car, Zap, DollarSign, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ParkingSpot {
  id: string
  name: string
  address: string
  distance: string
  price: string
  availability: string
  rating: number
  features: string[]
  walkTime: string
}

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  parkingSpots?: ParkingSpot[]
}

const mockParkingSpots: ParkingSpot[] = [
  {
    id: "1",
    name: "Downtown Plaza Garage",
    address: "123 Main St, Downtown",
    distance: "0.2 miles",
    price: "$8/hour",
    availability: "Available now",
    rating: 4.5,
    features: ["Covered", "EV Charging", "24/7 Access"],
    walkTime: "3 min walk",
  },
  {
    id: "2",
    name: "City Center Parking",
    address: "456 Oak Ave, City Center",
    distance: "0.4 miles",
    price: "$6/hour",
    availability: "2 spots left",
    rating: 4.2,
    features: ["Ground Level", "Security Cameras"],
    walkTime: "5 min walk",
  },
  {
    id: "3",
    name: "Metro Station Lot",
    address: "789 Transit Blvd, Metro District",
    distance: "0.6 miles",
    price: "$4/hour",
    availability: "Available",
    rating: 4.0,
    features: ["Budget Friendly", "Near Transit"],
    walkTime: "8 min walk",
  },
]

export function ParkpalAIWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi! I'm your Parkpal AI assistant. I can help you find the perfect parking spot for your Tesla Model 3. Where would you like to park today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `I found some great parking options near "${inputValue}". Here are the best matches for your Tesla Model 3:`,
        timestamp: new Date(),
        parkingSpots: mockParkingSpots,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleBookSpot = (spot: ParkingSpot) => {
    const bookingMessage: Message = {
      id: Date.now().toString(),
      type: "ai",
      content: `Great choice! I'm booking ${spot.name} for you. You'll receive a confirmation shortly with QR code access and directions.`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, bookingMessage])
  }

  const ParkingSpotCard = ({ spot }: { spot: ParkingSpot }) => (
    <Card className="mb-4 border border-gray-200 hover:border-blue-300 transition-colors">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{spot.name}</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {spot.address}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-blue-600">{spot.price}</p>
            <p className="text-xs text-gray-500">{spot.distance}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {spot.walkTime}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {spot.rating}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              spot.availability === "Available now" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {spot.availability}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {spot.features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        <Button onClick={() => handleBookSpot(spot)} className="w-full bg-blue-600 hover:bg-blue-700">
          Book This Spot
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Car className="h-4 w-4 text-white" />
            </div>
            Parkpal AI Assistant
          </CardTitle>
          <p className="text-sm text-gray-600">Find the perfect parking spot with AI-powered recommendations</p>
        </CardHeader>

        <CardContent className="p-0">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {/* Parking Spots */}
            {messages.map(
              (message) =>
                message.parkingSpots && (
                  <div key={`spots-${message.id}`} className="w-full">
                    {message.parkingSpots.map((spot) => (
                      <ParkingSpotCard key={spot.id} spot={spot} />
                    ))}
                  </div>
                ),
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <span className="text-sm">Finding parking spots...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Where do you need to park? (e.g., 'near Starbucks on Main St')"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("downtown coffee shop")}
                className="text-xs"
              >
                Downtown coffee shop
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInputValue("shopping mall")} className="text-xs">
                Shopping mall
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInputValue("airport")} className="text-xs">
                Airport
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-4 text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">2,500+</p>
            <p className="text-sm text-gray-600">Parking Spots</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">500+</p>
            <p className="text-sm text-gray-600">EV Chargers</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">$2-15</p>
            <p className="text-sm text-gray-600">Price Range</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
