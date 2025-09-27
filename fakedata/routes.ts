export interface Route {
  id: string
  name: string
  containers: string[]
  distance: number
  estimatedTime: number
  status: "active" | "completed" | "planned"
  driver: string
  vehicle: string
  startTime?: string
  endTime?: string
  date: string
}

export const routes: Route[] = [
  {
    id: "1",
    name: "Ruta Norte",
    containers: ["1", "2"],
    distance: 5.2,
    estimatedTime: 45,
    status: "active",
    driver: "Carlos Rodríguez",
    vehicle: "Camión 01 - XYZ-123",
    startTime: "08:00",
    date: "2023-10-20",
  },
  {
    id: "2",
    name: "Ruta Sur",
    containers: ["3", "4"],
    distance: 4.8,
    estimatedTime: 40,
    status: "planned",
    driver: "Ana Gómez",
    vehicle: "Camión 02 - ABC-456",
    date: "2023-10-21",
  },
  {
    id: "3",
    name: "Ruta Este",
    containers: ["5", "6"],
    distance: 6.5,
    estimatedTime: 55,
    status: "completed",
    driver: "Luis Torres",
    vehicle: "Camión 03 - DEF-789",
    startTime: "09:00",
    endTime: "10:15",
    date: "2023-10-19",
  },
  {
    id: "4",
    name: "Ruta Oeste",
    containers: ["7", "8"],
    distance: 7.1,
    estimatedTime: 60,
    status: "planned",
    driver: "María Sánchez",
    vehicle: "Camión 04 - GHI-012",
    date: "2023-10-22",
  },
]
