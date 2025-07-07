import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, User, Ticket } from "lucide-react"

interface FlightData {
  passenger: {
    name: string
    confirmationCode: string
    frequentFlyer: string
  }
  flight: {
    airline: string
    flightNumber: string
    aircraft: string
    date: string
    departure: {
      airport: string
      city: string
      time: string
      gate: string
      terminal: string
    }
    arrival: {
      airport: string
      city: string
      time: string
      gate: string
      terminal: string
    }
    duration: string
    class: string
    seat: string
  }
  booking: {
    pnr: string
    ticketNumber: string
    price: number
    currency: string
  }
}

interface FlightTicketDisplayProps {
  data: FlightData
}

export function FlightTicketDisplay({ data }: FlightTicketDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Passenger Information */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Passenger Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-slate-800 text-xl">{data.passenger.name}</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Confirmation Code:</span>
              <p className="font-medium text-slate-800">{data.passenger.confirmationCode}</p>
            </div>
            <div>
              <span className="text-slate-600">Frequent Flyer:</span>
              <p className="font-medium text-slate-800">{data.passenger.frequentFlyer}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flight Route */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Flight Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Flight Header */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-800">
                  {data.flight.airline} {data.flight.flightNumber}
                </h4>
                <p className="text-sm text-slate-600">{data.flight.aircraft}</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {data.flight.class}
              </Badge>
            </div>

            {/* Route Visualization */}
            <div className="relative">
              <div className="flex items-center justify-between">
                {/* Departure */}
                <div className="text-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mx-auto mb-2"></div>
                  <h5 className="font-semibold text-slate-800">{data.flight.departure.airport}</h5>
                  <p className="text-sm text-slate-600">{data.flight.departure.city}</p>
                  <p className="text-lg font-bold text-slate-800 mt-1">{data.flight.departure.time}</p>
                  <div className="text-xs text-slate-500 mt-1">
                    <p>Gate {data.flight.departure.gate}</p>
                    <p>Terminal {data.flight.departure.terminal}</p>
                  </div>
                </div>

                {/* Flight Path */}
                <div className="flex-1 mx-4 relative">
                  <div className="border-t-2 border-dashed border-slate-300"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Plane className="h-5 w-5 text-slate-400 rotate-90" />
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm text-slate-600">{data.flight.duration}</p>
                  </div>
                </div>

                {/* Arrival */}
                <div className="text-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full mx-auto mb-2"></div>
                  <h5 className="font-semibold text-slate-800">{data.flight.arrival.airport}</h5>
                  <p className="text-sm text-slate-600">{data.flight.arrival.city}</p>
                  <p className="text-lg font-bold text-slate-800 mt-1">{data.flight.arrival.time}</p>
                  <div className="text-xs text-slate-500 mt-1">
                    <p>Gate {data.flight.arrival.gate}</p>
                    <p>Terminal {data.flight.arrival.terminal}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-sm">
              <div>
                <span className="text-slate-600">Date:</span>
                <p className="font-medium text-slate-800">{data.flight.date}</p>
              </div>
              <div>
                <span className="text-slate-600">Seat:</span>
                <p className="font-medium text-slate-800">{data.flight.seat}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Information */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Booking Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">PNR:</span>
              <p className="font-medium text-slate-800">{data.booking.pnr}</p>
            </div>
            <div>
              <span className="text-slate-600">Ticket Number:</span>
              <p className="font-medium text-slate-800 truncate">{data.booking.ticketNumber}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-800">Total Price:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${data.booking.price.toFixed(2)} {data.booking.currency}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
