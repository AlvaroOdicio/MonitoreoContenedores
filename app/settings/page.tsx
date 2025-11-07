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

// 1. Definimos los roles posibles (igual que en Sidebar)
type UserRole = 'citizen' | 'worker' | null;

export default function SettingsPage() {
  const router = useRouter()

  // 2. Añadimos estado para el rol y la carga
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // 3. Leemos el rol del usuario de localStorage al montar el componente
  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('role');
      if (storedRole) {
        const roleString = JSON.parse(storedRole).toLowerCase();
        if (roleString === 'worker' || roleString === 'citizen') {
          setUserRole(roleString as UserRole);
        }
      }
    } catch (error) {
      console.error("Error al leer el rol de localStorage:", error);
    } finally {
      setIsLoading(false); // Terminamos la carga
    }
  }, []); // El array vacío asegura que se ejecute solo una vez

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

  // 4. Mostramos un estado de carga mientras se obtiene el rol
  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p>Cargando ajustes...</p>
          {/* Puedes poner un spinner aquí */}
        </div>
      </div>
    );
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
            
            {/* --- SECCIÓN PARA TODOS --- */}
            {/* Información del usuario */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Información del Usuario</CardTitle>
              </CardHeader>
              <CardContent>
                {/* ... (Todo el contenido del formulario de usuario) ... */}
                <div className="flex items-center mb-6">
                  {/* ... Avatar ... */}
                </div>
                <div className="space-y-4">
                  {/* ... Campos de Input ... */}
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
                  {/* ... (Resto de campos: email, phone, etc.) ... */}
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

              {/* --- 5. RENDERIZADO CONDICIONAL --- */}
              {/* Estas secciones solo se muestran si el rol es 'worker' */}
              {userRole === 'worker' && (
                <>
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Documentos de Recolección</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* ... (Contenido de Documentos de Recolección) ... */}
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
                        {/* ... (Otros reportes) ... */}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Documentos de Identificación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* ... (Contenido de Documentos de Identificación) ... */}
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
                        {/* ... (Otros documentos) ... */}
                        <div className="pt-2">
                          <Button className="w-full bg-gray-700 hover:bg-gray-800">
                            <Upload className="h-4 w-4 mr-2" />
                            Subir nuevo documento
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* --- SECCIÓN PARA TODOS --- */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Preferencias</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* ... (Contenido de Preferencias) ... */}
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
                    {/* ... (Otras preferencias) ... */}
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