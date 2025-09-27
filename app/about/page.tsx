"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, Truck, Globe, Users, Target, Award, Heart } from "lucide-react"
import Sidebar from "@/components/sidebar"

export default function AboutPage() {
  const router = useRouter()


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">Acerca de nosotros</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Hero Section */}
          <div className="bg-green-600 text-white rounded-lg p-8 mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wasteTrackLogo-At4isWGBWjroCmtuzvcsTsvQdvAapf.png"
                  alt="WasteTrack Logo"
                  width={100}
                  height={100}
                  className="mr-4"
                />
                <h2 className="text-3xl font-bold">WasteTrack</h2>
              </div>
              <p className="text-xl mb-4">Transformando la gestión de residuos con tecnología inteligente</p>
              <p className="max-w-2xl">
                WasteTrack es una plataforma innovadora diseñada para optimizar la recolección y gestión de residuos
                urbanos mediante el uso de tecnologías IoT, análisis de datos y rutas inteligentes, contribuyendo a
                ciudades más limpias y sostenibles.
              </p>
            </div>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "url('/placeholder.svg?height=400&width=800')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          {/* Misión y Visión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Target className="mr-2 h-5 w-5 text-green-600" />
                  Nuestra Misión
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  Nuestra misión es revolucionar la gestión de residuos urbanos mediante soluciones tecnológicas
                  innovadoras que optimicen la recolección, reduzcan costos operativos y minimicen el impacto ambiental,
                  contribuyendo a la creación de ciudades más limpias, eficientes y sostenibles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-green-600" />
                  Nuestra Visión
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  Aspiramos a ser líderes globales en soluciones inteligentes para la gestión de residuos, transformando
                  este sector crítico mediante la integración de tecnologías avanzadas, datos en tiempo real y análisis
                  predictivo, creando un futuro donde la gestión de residuos sea eficiente, sostenible y contribuya
                  positivamente al medio ambiente y la calidad de vida urbana.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Valores */}
          <Card className="mb-8">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Heart className="mr-2 h-5 w-5 text-green-600" />
                Nuestros Valores
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 bg-green-100 rounded-full mb-4">
                    <Recycle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Sostenibilidad</h3>
                  <p className="text-sm text-gray-600">
                    Nos comprometemos a desarrollar soluciones que minimicen el impacto ambiental y promuevan prácticas
                    sostenibles en la gestión de residuos.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 bg-green-100 rounded-full mb-4">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Excelencia</h3>
                  <p className="text-sm text-gray-600">
                    Buscamos la excelencia en todo lo que hacemos, desde el desarrollo de tecnología hasta el servicio
                    al cliente, manteniendo los más altos estándares de calidad.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 bg-green-100 rounded-full mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Colaboración</h3>
                  <p className="text-sm text-gray-600">
                    Creemos en el poder de la colaboración entre gobiernos, empresas y ciudadanos para crear soluciones
                    efectivas que beneficien a toda la comunidad.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Características principales */}
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg font-semibold">Características principales</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Optimización de rutas</h3>
                    <p className="text-sm text-gray-600">
                      Algoritmos avanzados que calculan las rutas más eficientes para la recolección de residuos,
                      reduciendo tiempos y costos operativos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <Recycle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Monitoreo en tiempo real</h3>
                    <p className="text-sm text-gray-600">
                      Sensores IoT que proporcionan datos en tiempo real sobre el nivel de llenado de los contenedores,
                      permitiendo una recolección más eficiente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Análisis de datos</h3>
                    <p className="text-sm text-gray-600">
                      Herramientas analíticas que transforman los datos recopilados en información valiosa para la toma
                      de decisiones y la mejora continua del servicio.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Participación ciudadana</h3>
                    <p className="text-sm text-gray-600">
                      Plataformas que permiten a los ciudadanos reportar incidencias y participar activamente en la
                      mejora de la gestión de residuos en su comunidad.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
