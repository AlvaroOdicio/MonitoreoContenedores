"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Home, Map, Trash2, LogOut, Settings, Info } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/auth/login")
  }

  return (
    <div className="w-56 bg-green-600 text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-green-500">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wasteTrackLogo-At4isWGBWjroCmtuzvcsTsvQdvAapf.png"
          alt="WasteTrack Logo"
          width={150}
          height={50}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className={`flex items-center px-4 py-3 text-sm ${
                isActive("/") ? "bg-green-700 font-medium" : "hover:bg-green-700"
              } rounded-md mx-2`}
            >
              <Home className="h-5 w-5 mr-3" />
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/map"
              className={`flex items-center px-4 py-3 text-sm ${
                isActive("/map") ? "bg-green-700 font-medium" : "hover:bg-green-700"
              } rounded-md mx-2`}
            >
              <Map className="h-5 w-5 mr-3" />
              Mapa de contenedores y rutas
            </Link>
          </li>
          <li>
            <Link
              href="/containers"
              className={`flex items-center px-4 py-3 text-sm ${
                isActive("/containers") || pathname.startsWith("/containers/")
                  ? "bg-green-700 font-medium"
                  : "hover:bg-green-700"
              } rounded-md mx-2`}
            >
              <Trash2 className="h-5 w-5 mr-3" />
              Contenedores
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={`flex items-center px-4 py-3 text-sm ${
                isActive("/settings") ? "bg-green-700 font-medium" : "hover:bg-green-700"
              } rounded-md mx-2`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Ajustes
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`flex items-center px-4 py-3 text-sm ${
                isActive("/about") ? "bg-green-700 font-medium" : "hover:bg-green-700"
              } rounded-md mx-2`}
            >
              <Info className="h-5 w-5 mr-3" />
              Acerca de nosotros
            </Link>
          </li>
        </ul>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-green-500">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm hover:bg-green-700 rounded-md"
        >
          <Avatar className="h-8 w-8 mr-3 bg-green-800">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span>Cerrar sesión</span>
          <LogOut className="h-4 w-4 ml-auto" />
        </button>
      </div>
    </div>
  )
}
