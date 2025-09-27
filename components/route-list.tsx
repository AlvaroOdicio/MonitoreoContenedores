"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Route, Clock, MapPin } from "lucide-react"

interface RouteType {
  id: string
  name: string
  containers: string[]
  distance: number
  estimatedTime: number
  status: "active" | "completed" | "planned"
}

interface RouteListProps {
  routes: RouteType[]
  onSelectRoute: (route: RouteType) => void
  selectedRoute: RouteType | null
}

export default function RouteList({ routes, onSelectRoute, selectedRoute }: RouteListProps) {
  // Función para obtener el color según el estado de la ruta
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-600"
      case "completed":
        return "bg-blue-100 text-blue-600"
      case "planned":
        return "bg-yellow-100 text-yellow-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Función para obtener el texto del estado en español
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activa"
      case "completed":
        return "Completada"
      case "planned":
        return "Planificada"
      default:
        return status
    }
  }

  return (
    <div className="space-y-3">
      {routes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No se encontraron rutas</div>
      ) : (
        routes.map((route) => (
          <Card
            key={route.id}
            className={`cursor-pointer transition-all ${
              selectedRoute?.id === route.id ? "border-green-500 shadow-md" : "hover:border-gray-300"
            }`}
            onClick={() => onSelectRoute(route)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{route.name}</h3>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(route.status)}`}>
                      {getStatusText(route.status)}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{route.containers.length} contenedores</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Route className="h-3.5 w-3.5 mr-1" />
                      <span>{route.distance} km</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{route.estimatedTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
