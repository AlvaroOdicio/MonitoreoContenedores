'use client'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useRef } from 'react'
import {  MapPinIcon } from 'lucide-react'
import { GOOGLE_MAP_LIBRARIES } from '@/lib/googleMapsConfig'


const containerStyle = {
  width: '100%',
  height: '300px',
}

const defaultCenter = {
  lat: -12.0464,
  lng: -77.0428,
}

export default function GoogleMapSelector({ initialPosition, onLocationChange }:
  { initialPosition: { lat: number; lng: number }; onLocationChange: (lat: number, lng: number) => void }) {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      libraries: GOOGLE_MAP_LIBRARIES,
    })
    
  const mapRef = useRef<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const onIdle = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter()
      if (center) {
        onLocationChange(center.lat(), center.lng())
      }
    }
  }, [onLocationChange])

  if (!isLoaded) return <p>Cargando mapa...</p>

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialPosition || defaultCenter}
        zoom={15}
        onLoad={onLoad}
        onIdle={onIdle}
        options={{ disableDefaultUI: true }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <MapPinIcon className="h-8 w-8 text-red-500" />
      </div>
    </div>
  )
}
