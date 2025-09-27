"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Trash2, Map, User } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Trash2 className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl text-green-800">WasteTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-green-600 font-medium">
              Inicio
            </Link>
            <Link href="/map" className="text-gray-600 hover:text-green-600 font-medium">
              Mapa
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 font-medium">
              Acerca de nosotros
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              Iniciar sesión
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">Registrarse</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 hover:text-green-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Trash2 className="h-5 w-5" />
              <span>Inicio</span>
            </Link>
            <Link
              href="/map"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Map className="h-5 w-5" />
              <span>Mapa</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Acerca de nosotros</span>
            </Link>

            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                Iniciar sesión
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700">Registrarse</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
