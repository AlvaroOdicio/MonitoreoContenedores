'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import GoogleMapSelector from '@/components/GoogleMapSelector'
import { createContainer } from '@/app/services/containers/containersManagement'
import { time } from 'console'
export default function AddContainerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [container, setContainer] = useState({
    address: '',
    latitude: '',
    longitude: '',
    limit: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      name: container.address,
      latitude: container.latitude,
      longitude: container.longitude,
      capacity: Math.floor(Math.random() * 100), // puedes fijarlo si prefieres
      limit: container.limit
    }

      try{
      const response = await createContainer(payload)
      if (response) {
        //mostrar mensaje de éxito si es necesario en popup o notificación, no en la consola

        console.log('Contenedor creado exitosamente:', response)
        alert('Contenedor creado exitosamente. Redirigiendo...')

        setLoading(false)
        setTimeout(() => {
          router.push('/containers')
        }, 3000) // redirigir después de 3 segundos

      }
    } catch (error) {
      setLoading(false)
      console.error('Error creating container:', error)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">Registrar nuevo contenedor</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-200 rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <Input
                  value={container.address}
                  onChange={(e) => setContainer({ ...container, address: e.target.value })}
                  className="w-full bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación del contenedor</label>
                <GoogleMapSelector
                  initialPosition={{
                    lat: parseFloat(container.latitude) || -12.0464, // valor por defecto si no hay latitud
                    lng: parseFloat(container.longitude) || -77.0428, // valor por defecto si no hay longitud
                  }}
                  onLocationChange={(lat, lng) =>
                    setContainer((prev) => ({
                      ...prev,
                      latitude: lat.toString(),
                      longitude: lng.toString(),
                    }))
                  }
                />
                <p className="text-xs text-gray-600 mt-1">
                  Latitud: {container.latitude} | Longitud: {container.longitude}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Limite de alerta</label>
                <Input
                  value={container.limit}
                  onChange={(e) => setContainer({ ...container, limit: parseInt(e.target.value) })} 
                  className="w-full bg-white"
                  required
                  type='number'
                />
              </div>

              <div className="pt-4 flex justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                >
                  {loading ? 'Procesando...' : 'Registrar contenedor'}
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
