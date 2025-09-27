export interface Container {
  id: string
  name: string
  location: { lat: number; lng: number }
  fillLevel: number
  type: string
  lastCollection: string
  address: string
  capacity: number
  status: "active" | "maintenance" | "inactive"
}

export const containers: Container[] = [
  {
    id: "1",
    name: "Contenedor A1",
    location: { lat: -12.046374, lng: -77.042793 },
    fillLevel: 75,
    type: "Plástico",
    lastCollection: "2023-10-15",
    address: "Av. Javier Prado 1234, San Isidro",
    capacity: 500,
    status: "active",
  },
  {
    id: "2",
    name: "Contenedor B2",
    location: { lat: -12.048374, lng: -77.045793 },
    fillLevel: 30,
    type: "Papel",
    lastCollection: "2023-10-17",
    address: "Av. Arequipa 567, Miraflores",
    capacity: 300,
    status: "active",
  },
  {
    id: "3",
    name: "Contenedor C3",
    location: { lat: -12.050374, lng: -77.043793 },
    fillLevel: 90,
    type: "Vidrio",
    lastCollection: "2023-10-10",
    address: "Av. La Marina 890, San Miguel",
    capacity: 400,
    status: "active",
  },
  {
    id: "4",
    name: "Contenedor D4",
    location: { lat: -12.047374, lng: -77.047793 },
    fillLevel: 50,
    type: "Orgánico",
    lastCollection: "2023-10-16",
    address: "Av. Brasil 123, Jesús María",
    capacity: 600,
    status: "active",
  },
  {
    id: "5",
    name: "Contenedor E5",
    location: { lat: -12.045374, lng: -77.044793 },
    fillLevel: 85,
    type: "Plástico",
    lastCollection: "2023-10-12",
    address: "Av. Salaverry 456, Lince",
    capacity: 500,
    status: "maintenance",
  },
  {
    id: "6",
    name: "Contenedor F6",
    location: { lat: -12.049374, lng: -77.041793 },
    fillLevel: 15,
    type: "Papel",
    lastCollection: "2023-10-18",
    address: "Av. Benavides 789, Surco",
    capacity: 300,
    status: "active",
  },
  {
    id: "7",
    name: "Contenedor G7",
    location: { lat: -12.051374, lng: -77.046793 },
    fillLevel: 60,
    type: "Vidrio",
    lastCollection: "2023-10-14",
    address: "Av. Primavera 234, San Borja",
    capacity: 400,
    status: "active",
  },
  {
    id: "8",
    name: "Contenedor H8",
    location: { lat: -12.044374, lng: -77.048793 },
    fillLevel: 40,
    type: "Orgánico",
    lastCollection: "2023-10-16",
    address: "Av. Angamos 567, Surquillo",
    capacity: 600,
    status: "inactive",
  },
]
