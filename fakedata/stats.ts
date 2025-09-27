export interface DailyCollection {
  date: string
  plasticKg: number
  paperKg: number
  glassKg: number
  organicKg: number
}

export interface ContainerFillRate {
  containerId: string
  containerName: string
  fillRate: number[] // Porcentaje de llenado por día (últimos 7 días)
  dates: string[] // Fechas correspondientes
}

export interface RouteEfficiency {
  routeId: string
  routeName: string
  plannedTime: number // Tiempo planificado en minutos
  actualTime: number // Tiempo real en minutos
  date: string
}

export const dailyCollections: DailyCollection[] = [
  {
    date: "2023-10-14",
    plasticKg: 320,
    paperKg: 450,
    glassKg: 280,
    organicKg: 620,
  },
  {
    date: "2023-10-15",
    plasticKg: 340,
    paperKg: 420,
    glassKg: 300,
    organicKg: 580,
  },
  {
    date: "2023-10-16",
    plasticKg: 360,
    paperKg: 480,
    glassKg: 260,
    organicKg: 650,
  },
  {
    date: "2023-10-17",
    plasticKg: 380,
    paperKg: 440,
    glassKg: 290,
    organicKg: 600,
  },
  {
    date: "2023-10-18",
    plasticKg: 350,
    paperKg: 460,
    glassKg: 310,
    organicKg: 630,
  },
  {
    date: "2023-10-19",
    plasticKg: 330,
    paperKg: 430,
    glassKg: 270,
    organicKg: 610,
  },
  {
    date: "2023-10-20",
    plasticKg: 370,
    paperKg: 470,
    glassKg: 320,
    organicKg: 640,
  },
]

export const containerFillRates: ContainerFillRate[] = [
  {
    containerId: "1",
    containerName: "Contenedor A1",
    fillRate: [30, 45, 60, 75, 85, 90, 75],
    dates: ["2023-10-14", "2023-10-15", "2023-10-16", "2023-10-17", "2023-10-18", "2023-10-19", "2023-10-20"],
  },
  {
    containerId: "2",
    containerName: "Contenedor B2",
    fillRate: [20, 25, 30, 40, 50, 60, 30],
    dates: ["2023-10-14", "2023-10-15", "2023-10-16", "2023-10-17", "2023-10-18", "2023-10-19", "2023-10-20"],
  },
  {
    containerId: "3",
    containerName: "Contenedor C3",
    fillRate: [40, 55, 70, 80, 90, 95, 90],
    dates: ["2023-10-14", "2023-10-15", "2023-10-16", "2023-10-17", "2023-10-18", "2023-10-19", "2023-10-20"],
  },
  {
    containerId: "4",
    containerName: "Contenedor D4",
    fillRate: [10, 20, 30, 40, 50, 60, 50],
    dates: ["2023-10-14", "2023-10-15", "2023-10-16", "2023-10-17", "2023-10-18", "2023-10-19", "2023-10-20"],
  },
]

export const routeEfficiencies: RouteEfficiency[] = [
  {
    routeId: "1",
    routeName: "Ruta Norte",
    plannedTime: 45,
    actualTime: 50,
    date: "2023-10-14",
  },
  {
    routeId: "1",
    routeName: "Ruta Norte",
    plannedTime: 45,
    actualTime: 48,
    date: "2023-10-15",
  },
  {
    routeId: "1",
    routeName: "Ruta Norte",
    plannedTime: 45,
    actualTime: 43,
    date: "2023-10-16",
  },
  {
    routeId: "2",
    routeName: "Ruta Sur",
    plannedTime: 40,
    actualTime: 45,
    date: "2023-10-14",
  },
  {
    routeId: "2",
    routeName: "Ruta Sur",
    plannedTime: 40,
    actualTime: 42,
    date: "2023-10-15",
  },
  {
    routeId: "2",
    routeName: "Ruta Sur",
    plannedTime: 40,
    actualTime: 38,
    date: "2023-10-16",
  },
]
