'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Sidebar from '@/components/sidebar'
import { Switch } from '@/components/ui/switch'
import GoogleMapSelector from '@/components/GoogleMapSelector'
import { getContainerByGuid, updateContainer, deleteContainer } from '@/app/services/containers/containersManagement'
import { time } from 'console'

export default function ContainerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const containerId = params.id as string

  const [loading, setLoading] = useState(true)
  const [container, setContainer] = useState<null | {
    name: string
    latitude: string
    longitude: string
    capacity: number
    status: string
    isFavorite: boolean
    limit: number
  }>(null)

  // Cargar datos del contenedor desde la API
  useEffect(() => {
    const fetchContainer = async () => {
      try {
        const res = await getContainerByGuid(containerId)
        if (res) {
          setContainer({
            name: res.name || '',
            latitude: res.latitude || '',
            longitude: res.longitude || '',
            capacity: res.capacity || 0,
            status: res.status || 'active',
            isFavorite: res.isFavorite || false,
            limit: res.limit || 0
          })
        } else {
          console.error('Contenedor no encontrado')
          router.push('/containers')
        }
      } catch (error) {
        console.error('Error al cargar contenedor:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContainer()
  }, [containerId])

  const handleSave = async () => {
    if (!container) return
    setLoading(true)

    try{
      const result = await updateContainer(containerId, {
        name: container.name,
        latitude: container.latitude,
        longitude: container.longitude,
        capacity: container.capacity,
        status: container.status,
        isFavorite: container.isFavorite,
        limit: container.limit
      })
      if (result) {
        alert('Contenedor actualizado exitosamente.')
        setLoading(false)
        setTimeout(() => {
          router.push('/containers')
        }, 2000) // Redirigir después de 2 segundos
      } else {
        alert('Error al actualizar el contenedor. Inténtalo de nuevo.')
      }


    }
    catch (error) {
      console.error('Error al actualizar contenedor:', error)
      alert('Error al actualizar el contenedor. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!container) return
    if (confirm('¿Está seguro que desea eliminar este contenedor?')) {
      setLoading(true)

      try{
        const res = await deleteContainer(containerId)
        setLoading(false)

        alert('Contenedor eliminado exitosamente.')

          setTimeout(() => {
            router.push('/containers')
          }, 1000) // Redirigir después de 2 segundos
        
      }
      catch (error) {
        console.error('Error al eliminar contenedor:', error)
        alert('Error al eliminar el contenedor. Por favor, inténtalo de nuevo.')
      } finally {
        setLoading(false)
      }
      
    }
  }

  if (loading || !container) return <p className="p-6">Cargando contenedor...</p>

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">Contenedor #{containerId}</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-gray-200 rounded-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <Input
                value={container.name}
                onChange={(e) => setContainer({ ...container, name: e.target.value })}
                className="w-full bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitud</label>
                <Input
                  value={container.latitude}
                  onChange={(e) => setContainer({ ...container, latitude: e.target.value })}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitud</label>
                <Input
                  value={container.longitude}
                  onChange={(e) => setContainer({ ...container, longitude: e.target.value })}
                  className="w-full bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación en el mapa</label>
              <GoogleMapSelector
                initialPosition={{
                  lat: parseFloat(container.latitude),
                  lng: parseFloat(container.longitude),
                }}
                onLocationChange={(lat, lng) =>
                  setContainer((prev) =>
                    prev ? { ...prev, latitude: lat.toString(), longitude: lng.toString() } : prev
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad actual (%)</label>
              <Input value={container.capacity.toString()} disabled className="w-full bg-white text-gray-600" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Limite de alerta</label>
                <Input
                  value={container.limit}
                  onChange={(e) => setContainer({ ...container, limit: parseInt(e.target.value) })}
                  className="w-full bg-white"
                  type='number'
                />
              </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado operativo</label>
              <Select
                value={container.status}
                onValueChange={(value) => setContainer({ ...container, status: value })}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <Switch
                id="isFavorite"
                checked={container.isFavorite}
                onCheckedChange={(checked) => setContainer({ ...container, isFavorite: checked })}
              />
              <label htmlFor="isFavorite" className="text-sm text-gray-700">
                Marcar como favorito
              </label>
            </div>

            <div className="pt-6 flex justify-center gap-4">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-800 hover:bg-green-900 text-white px-8 py-2"
              >
                Guardar cambios
              </Button>
              <Button
                onClick={handleDelete}
                disabled={loading}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-2"
              >
                Eliminar contenedor
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
