import React, { useMemo } from 'react'
import { Clock, MapPin, Navigation } from 'lucide-react' // Asumiendo que usas lucide-react, si no, puedes quitar los íconos

// --- INTERFACES ---
interface RouteSegment {
  from: string
  to: string
  distance_km: number
}

interface Simulation {
  id: number
  created_at: string
  total_distance_km: number
  duration_min: number
  route: string[]
  distances: string // Viene como string JSON
}

interface LastRouteFooterProps {
  allSimulations: Simulation[]
}

export default function LastRouteFooter({ allSimulations }: LastRouteFooterProps) {
  
  // --- LÓGICA DE CÁLCULO ---
  const routeDetails = useMemo(() => {
    // 1. Validar que existan datos
    if (!allSimulations || allSimulations.length === 0) return null

    // 2. Tomar la simulación más reciente (la primera del array, ID 7 en tu ejemplo)
    const lastSim = allSimulations[0]

    // 3. Parsear el string de distancias a un objeto real
    let segments: RouteSegment[] = []
    try {
      segments = JSON.parse(lastSim.distances)
    } catch (e) {
      console.error("Error parseando distances:", e)
      return null
    }

    // 4. Preparar fecha de inicio
    const startTime = new Date(lastSim.created_at)

    // 5. Calcular itinerario
    let accumulatedMinutes = 0
    
    const timeline = lastSim.route.map((nodeId, index) => {
      let arrivalTime = new Date(startTime.getTime() + accumulatedMinutes * 60000)

      // Si no es el último nodo, calculamos cuánto tomará llegar al siguiente
      // para acumularlo para la próxima iteración.
      // Nota: Para el nodo actual (index), el tiempo es el acumulado hasta AHORA.
      
      if (index > 0) {
         // Buscamos el segmento que conecta el nodo anterior con este
         const prevNode = lastSim.route[index - 1]
         const segment = segments.find(s => s.from === prevNode && s.to === nodeId)
         
         if (segment) {
            // REGLA DE TRES: (DistanciaTramo * TiempoTotal) / DistanciaTotal
            // Evitamos división por cero
            const segmentTime = lastSim.total_distance_km > 0 
                ? (segment.distance_km * lastSim.duration_min) / lastSim.total_distance_km
                : 0
            
            // Recalculamos el arrivalTime sumando este tramo al tiempo del nodo anterior
            // (Reajuste lógico: el loop calcula el tiempo de llegada AL nodo actual)
             accumulatedMinutes += segmentTime
             arrivalTime = new Date(startTime.getTime() + accumulatedMinutes * 60000)
         }
      }

      return {
        nodeId,
        time: arrivalTime,
        isStart: index === 0
      }
    })

    return {
      ...lastSim,
      timeline
    }

  }, [allSimulations])

  if (!routeDetails) return null

  return (
    <footer className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] py-4 px-6 border-t border-gray-200">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              Última Ruta Programada
            </h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-4">
                <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Creado: {new Date(routeDetails.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span>|</span>
                <span>Distancia: <strong>{routeDetails.total_distance_km.toFixed(2)} km</strong></span>
                <span>|</span>
                <span>Duración: <strong>{routeDetails.duration_min.toFixed(0)} min</strong></span>
            </p>
        </div>
      </div>

      {/* Timeline de nodos con Scroll horizontal si son muchos */}
      <div className="flex overflow-x-auto pb-2 gap-4 no-scrollbar">
        {routeDetails.timeline.map((item, index) => (
            <div key={index} className="flex items-center min-w-fit">
                
                {/* Nodo */}
                <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${index === 0 ? 'bg-blue-100 border-blue-600 text-blue-700' : 'bg-gray-50 border-gray-300 text-gray-600'}`}>
                        <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold mt-1 text-gray-700">{item.nodeId}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mt-1">
                        {item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                {/* Línea conectora (si no es el último) */}
                {index < routeDetails.timeline.length - 1 && (
                    <div className="h-0.5 w-12 bg-gray-300 mx-2 mt-[-20px]"></div>
                )}
            </div>
        ))}
      </div>

    </footer>
  )
}