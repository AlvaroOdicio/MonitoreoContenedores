'use client'

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api'
import { useState, useEffect, useRef } from 'react'
import { GOOGLE_MAP_LIBRARIES } from '@/lib/googleMapsConfig'
import Image from 'next/image'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const centerDefault = {
  lat: -12.068572,
  lng: -77.043147,
}

interface LatLng {
  lat: number
  lng: number
}

interface Container {
  id: string
  location: LatLng
}

interface MapComponentProps {
  containers: Container[]
  selectedContainer: Container | null
  route?: LatLng[]
}

export default function MapComponent({
  containers,
  selectedContainer,
  route = [],
}: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: GOOGLE_MAP_LIBRARIES,
  })

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map
  }

  useEffect(() => {
    console.log("API Key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    console.log("Containers:", containers)
    if (
      selectedContainer &&
      mapRef.current &&
      typeof selectedContainer.location.lat === 'number' &&
      typeof selectedContainer.location.lng === 'number'
    ) {
      mapRef.current.panTo(selectedContainer.location)
    }
  }, [selectedContainer])

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined' || !window.google || route.length < 2) {
      setDirections(null)
      return
    }
  
    const cleanedRoute = route
      .map((point) => ({
        lat: Number(point.lat),
        lng: Number(point.lng),
      }))
      .filter(
        (p) =>
          typeof p.lat === 'number' &&
          typeof p.lng === 'number' &&
          !isNaN(p.lat) &&
          !isNaN(p.lng)
      )
  
    const directionsService = new window.google.maps.DirectionsService()
  
    directionsService.route(
      {
        origin: centerDefault,
        destination: cleanedRoute[cleanedRoute.length - 1],
        waypoints: cleanedRoute.slice(0, -1).map((point) => ({
          location: point,
          stopover: true,
        })),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result)
        } else {
          console.error('Error al calcular ruta:', status)
        }
      }
    )
  }, [isLoaded, route])
  
  
  


  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerDefault}
          zoom={14}
          onLoad={onLoad}
        >
          <Marker
            position={centerDefault}
            icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/truck.png' }}
            title="Base de camiones"
          />

          {containers.map((c, index) => {
            const lat = Number(c.location.lat)
            const lng = Number(c.location.lng)
            if (isNaN(lat) || isNaN(lng)) return null

            return (
              <Marker
                key={c.id}
                position={{ lat, lng }}
                title={c.id}
                label={(index + 1).toString()}
              />
            )
          })}

          {selectedContainer && selectedContainer.location && (
            <Marker
              position={{
                lat: Number(selectedContainer.location.lat),
                lng: Number(selectedContainer.location.lng),
              }}
              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' }}
            />
          )}

          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>

      {/* Panel lateral superpuesto */}
      {route.length > 0 && (
        <div
          style={{
            width: '250px',
            backgroundColor: 'white',
            borderLeft: '1px solid #ccc',
            padding: '1rem',
            overflowY: 'auto',
          }}
        >
          <h3 style={{ marginBottom: '0.5rem' }}>Orden de visita</h3>
          <ol style={{ paddingLeft: '1.2rem' }}>
      {route.map((point, index) => {
        const matched = containers.find(
          (c) =>
            Number(c.location.lat).toFixed(5) === Number(point.lat).toFixed(5) &&
            Number(c.location.lng).toFixed(5) === Number(point.lng).toFixed(5)
        )

        return (
          <li key={index}>
            <strong>{matched?.name || `Punto ${index + 1}`}</strong>
            <br />
            <small>
              Lat: {point.lat.toFixed(5)} <br />
              Lng: {point.lng.toFixed(5)}
            </small>
          </li>
        )
      })}
    </ol>

        </div>
      )}
    </div>
  )
}
