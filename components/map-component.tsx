"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from "@react-google-maps/api"

interface Container {
  id: string
  name: string
  location: { lat: number; lng: number }
  fillLevel: number
  type: string
  lastCollection: string
}

interface Route {
  id: string
  name: string
  containers: string[]
  distance: number
  estimatedTime: number
  status: "active" | "completed" | "planned"
}

interface MapComponentProps {
  apiKey: string
  containers: Container[]
  routes: Route[]
  selectedContainer: Container | null
  selectedRoute: Route | null
}

const containerColors = {
  Plástico: "#3B82F6", // blue
  Papel: "#10B981", // green
  Vidrio: "#F59E0B", // amber
  Orgánico: "#6D28D9", // purple
  default: "#6B7280", // gray
}

const routeColors = {
  active: "#10B981", // green
  completed: "#3B82F6", // blue
  planned: "#F59E0B", // amber
  default: "#6B7280", // gray
}

const MapComponent: React.FC<MapComponentProps> = ({
  apiKey,
  containers,
  routes,
  selectedContainer,
  selectedRoute,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: -12.046374, lng: -77.042793 }) // Lima, Peru as default
  const [infoWindowData, setInfoWindowData] = useState<{
    container: Container
    position: google.maps.LatLng | null
  } | null>(null)

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  })

  // Get route path based on container locations
  const getRoutePath = useCallback(
    (route: Route) => {
      return route.containers
        .map((containerId) => {
          const container = containers.find((c) => c.id === containerId)
          return container ? container.location : null
        })
        .filter((location) => location !== null) as google.maps.LatLngLiteral[]
    },
    [containers],
  )

  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  // Center map on selected container or route
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return

    if (selectedContainer) {
      mapRef.current.panTo(selectedContainer.location)
      mapRef.current.setZoom(16)
    } else if (selectedRoute) {
      const path = getRoutePath(selectedRoute)
      if (path.length > 0) {
        // Create bounds that include all containers in the route
        const bounds = new window.google.maps.LatLngBounds()
        path.forEach((point) => bounds.extend(point))
        mapRef.current.fitBounds(bounds)
      }
    }
  }, [selectedContainer, selectedRoute, getRoutePath, isLoaded])

  // Get marker icon based on container type and fill level
  const getMarkerIcon = (container: Container) => {
    const fillColor = containerColors[container.type as keyof typeof containerColors] || containerColors.default
    const fillOpacity = container.fillLevel / 100

    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: fillColor,
      fillOpacity: fillOpacity,
      scale: 10,
      strokeColor: fillColor,
      strokeWeight: 2,
    }
  }

  // Handle marker click
  const handleMarkerClick = (container: Container) => {
    if (mapRef.current) {
      const position = new window.google.maps.LatLng(container.location.lat, container.location.lng)
      setInfoWindowData({ container, position })
    }
  }

  // Close info window
  const handleInfoWindowClose = () => {
    setInfoWindowData(null)
  }

  if (!isLoaded) return <div className="flex items-center justify-center h-full">Cargando mapa...</div>

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={mapCenter}
      zoom={14}
      onLoad={onMapLoad}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      {/* Render container markers */}
      {containers.map((container) => (
        <Marker
          key={container.id}
          position={container.location}
          icon={getMarkerIcon(container)}
          animation={selectedContainer?.id === container.id ? window.google.maps.Animation.BOUNCE : undefined}
          onClick={() => handleMarkerClick(container)}
        />
      ))}

      {/* Render routes as polylines */}
      {routes.map((route) => {
        const path = getRoutePath(route)
        const color = routeColors[route.status] || routeColors.default
        const isSelected = selectedRoute?.id === route.id

        return (
          <Polyline
            key={route.id}
            path={path}
            options={{
              strokeColor: color,
              strokeOpacity: isSelected ? 1.0 : 0.7,
              strokeWeight: isSelected ? 5 : 3,
            }}
          />
        )
      })}

      {/* Info window for clicked container */}
      {infoWindowData && (
        <InfoWindow position={infoWindowData.position} onCloseClick={handleInfoWindowClose}>
          <div className="p-1">
            <h3 className="font-medium text-sm">{infoWindowData.container.name}</h3>
            <p className="text-xs text-gray-600">{infoWindowData.container.type}</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div
                className={`h-1.5 rounded-full ${
                  infoWindowData.container.fillLevel > 80
                    ? "bg-red-600"
                    : infoWindowData.container.fillLevel > 50
                      ? "bg-yellow-500"
                      : "bg-green-600"
                }`}
                style={{ width: `${infoWindowData.container.fillLevel}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1">{infoWindowData.container.fillLevel}% lleno</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

export default MapComponent
