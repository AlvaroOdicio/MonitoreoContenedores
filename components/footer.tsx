import Link from "next/link"
import { Trash2, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Trash2 className="h-6 w-6 text-green-600" />
              <span className="font-bold text-xl text-green-800">WasteTrack</span>
            </div>
            <p className="text-gray-600 mb-4">
              Plataforma de gestión inteligente para optimizar la recolección de residuos y reducir el impacto
              ambiental.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-600 hover:text-green-600">
                  Mapa
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-green-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/monitoring" className="text-gray-600 hover:text-green-600">
                  Monitoreo de contenedores
                </Link>
              </li>
              <li>
                <Link href="/services/routes" className="text-gray-600 hover:text-green-600">
                  Optimización de rutas
                </Link>
              </li>
              <li>
                <Link href="/services/analytics" className="text-gray-600 hover:text-green-600">
                  Análisis de datos
                </Link>
              </li>
              <li>
                <Link href="/services/integration" className="text-gray-600 hover:text-green-600">
                  Integración de sistemas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-gray-600">Lima, Perú</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-600" />
                <a href="mailto:info@wastetrack.com" className="text-gray-600 hover:text-green-600">
                  info@wastetrack.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-600" />
                <a href="tel:+51123456789" className="text-gray-600 hover:text-green-600">
                  +51 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} WasteTrack. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
