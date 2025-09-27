"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, User, Mail, Phone, Calendar, Globe, Languages, MapPin, UserPlus, FileText } from "lucide-react"
import Sidebar from "@/components/sidebar"

export default function SettingsPage() {
  const router = useRouter()

  

  const [userInfo, setUserInfo] = useState({
    displayName: "Admin Usuario",
    email: "admin@wastetrack.com",
    phone: "+51 987 654 321",
    dateOfBirth: "1990-01-01",
    nationality: "Perú",
    languages: "Español, Inglés",
    address: "Av. Lima 123, Lima",
    emergencyContact: "+51 987 654 322",
  })

  const handleChange = (field: string, value: string) => {
    setUserInfo({
      ...userInfo,
      [field]: value,
    })
  }

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    alert("Cambios guardados correctamente")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">Ajustes</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información del usuario */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Información del Usuario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Cambiar avatar
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="h-4 w-4 inline mr-2" />
                      Nombre completo
                    </label>
                    <Input
                      id="displayName"
                      value={userInfo.displayName}
                      onChange={(e) => handleChange("displayName", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Correo electrónico
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Número de teléfono
                    </label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Fecha de nacimiento
                      </label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={userInfo.dateOfBirth}
                        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                        <Globe className="h-4 w-4 inline mr-2" />
                        Nacionalidad
                      </label>
                      <Input
                        id="nationality"
                        value={userInfo.nationality}
                        onChange={(e) => handleChange("nationality", e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">
                      <Languages className="h-4 w-4 inline mr-2" />
                      Idiomas
                    </label>
                    <Input
                      id="languages"
                      value={userInfo.languages}
                      onChange={(e) => handleChange("languages", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="h-4 w-4 inline mr-2" />
                      Dirección
                    </label>
                    <Input
                      id="address"
                      value={userInfo.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                      <UserPlus className="h-4 w-4 inline mr-2" />
                      Contacto de emergencia
                    </label>
                    <Input
                      id="emergencyContact"
                      value={userInfo.emergencyContact}
                      onChange={(e) => handleChange("emergencyContact", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="pt-4">
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      Guardar cambios
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documentos y configuración */}
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Documentos de Recolección</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-3" />
                        <span>Reporte_Mayo_2023.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-3" />
                        <span>Reporte_Junio_2023.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-3" />
                        <span>Reporte_Julio_2023.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Documentos de Identificación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-3" />
                        <span>DNI</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-3" />
                        <span>Licencia de conducir</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-3" />
                        <span>Certificado de residencia</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full bg-gray-700 hover:bg-gray-800">
                        <Upload className="h-4 w-4 mr-2" />
                        Subir nuevo documento
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Preferencias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                        Idioma de la aplicación
                      </label>
                      <Select defaultValue="es">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="notifications" className="block text-sm font-medium text-gray-700 mb-1">
                        Notificaciones
                      </label>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Configurar notificaciones" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas las notificaciones</SelectItem>
                          <SelectItem value="important">Solo importantes</SelectItem>
                          <SelectItem value="none">Ninguna</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button className="bg-green-600 hover:bg-green-700">Guardar preferencias</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
