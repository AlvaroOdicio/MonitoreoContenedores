"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trash2, AlertTriangle, CheckCircle } from "lucide-react"

interface Container {
  id: string
  name: string
  location: { lat: number; lng: number }
  fillLevel: number
  type: string
  lastCollection: string
}

interface ContainerListProps {
  containers: Container[]
  onSelectContainer: (container: Container) => void
  selectedContainer: Container | null
}

export default function ContainerList({ containers, onSelectContainer, selectedContainer }: ContainerListProps) {
  // Ordenar contenedores por nivel de llenado (descendente)
  const sortedContainers = [...containers].sort((a, b) => b.fillLevel - a.fillLevel)

  return (
    <div className="space-y-3">
      {containers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No se encontraron contenedores</div>
      ) : (
        sortedContainers.map((container) => (
          <Card
            key={container.id}
            className={`cursor-pointer transition-all ${
              selectedContainer?.id === container.id ? "border-green-500 shadow-md" : "hover:border-gray-300"
            }`}
            onClick={() => onSelectContainer(container)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      container.fillLevel > 80
                        ? "bg-red-100 text-red-600"
                        : container.fillLevel > 50
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {container.fillLevel > 80 ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : container.fillLevel > 50 ? (
                      <Trash2 className="h-5 w-5" />
                    ) : (
                      <CheckCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{container.name}</h3>
                    <p className="text-sm text-gray-500">{container.type}</p>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            container.fillLevel > 80
                              ? "bg-red-600"
                              : container.fillLevel > 50
                                ? "bg-yellow-500"
                                : "bg-green-600"
                          }`}
                          style={{ width: `${container.fillLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium ml-2">{container.fillLevel}%</span>
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
