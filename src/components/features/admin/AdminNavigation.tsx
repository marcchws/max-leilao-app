'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  BarChart3,
  LogOut,
  ArrowLeft,
  Bell
} from 'lucide-react'

export function AdminNavigation() {
  const pathname = usePathname()

  const adminNavItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: BarChart3
    },
    {
      href: '/admin/users',
      label: 'Usuários',
      icon: Users
    },
    {
      href: '/admin/notifications',
      label: 'Notificações',
      icon: Bell
    }
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ML</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">Max Leilão</span>
                <Badge variant="secondary" className="text-xs">Admin</Badge>
              </div>
            </Link>

            {/* Menu Principal */}
            <div className="flex items-center space-x-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center space-x-2">
            <Link href="/vehicles">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar ao App
              </Button>
            </Link>

            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-1" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
