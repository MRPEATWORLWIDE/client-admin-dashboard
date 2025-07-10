"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarInset } from "@/components/ui/sidebar"
import ParkpalChatWidget from "@/components/parkpal-chat-widget"
import VehicleCard from "@/components/vehicle-card"
import BookingsTable from "@/components/bookings-table"
import EVMap from "@/components/ev-map"

export default function Dashboard() {
  const userVehicle = "Tesla Model 3" // This would come from user data

  return (
    <SidebarInset>
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Where would you like to Park your, {userVehicle}?</h1>
            <p className="text-gray-600 mt-1">Find and book parking spaces near you</p>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-600 rounded-full"></span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main content area - 3 columns */}
            <div className="xl:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Left side - Vehicle Card and Bookings Table */}
                <div className="space-y-6">
                  <VehicleCard />
                  <BookingsTable />
                </div>
                {/* Right side - EV Map */}
                <div>
                  <EVMap />
                </div>
              </div>
            </div>
            {/* Sidebar with chat widget - 1 column */}
            <div className="xl:col-span-1">
              <ParkpalChatWidget />
            </div>
          </div>
        </div>
      </main>
    </SidebarInset>
  )
}
