'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Shield,
  ArrowLeft,
  Bell,
  FileText
} from 'lucide-react'

export function AdminNavigation() {
  const pathname = usePathname()

  const adminNavItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Visão geral do sistema'
    },
    {
      href: '/admin/users',
      label: 'Usuários',
      icon: Users,
      description: 'Gerenciar usuários e assinaturas'
    },
    {
      href: '/admin/notifications',
      label: 'Notificações',
      icon: Bell,
      description: 'Central de notificações'
    },
    {
      href: '/admin/reports',
      label: 'Relatórios',
      icon: FileText,
      description: 'Relatórios e análises'
    },
    {
      href: '/admin/settings',
      label: 'Configurações',
      icon: Settings,
      description: 'Configurações do sistema'
    }
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        {/* Header do Admin */}
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="bg-red-600 text-white p-2 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  Vitor
                </Badge>
              </div>
            </Link>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar ao Site</span>
              </Button>
            </Link>
            
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>

        {/* Navegação Principal */}
        <nav className="flex items-center space-x-1 pb-4">
          {adminNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className="flex items-center space-x-2 h-10"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Breadcrumb */}
        <div className="pb-2">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Link>
            <span>/</span>
            <Link href="/admin" className="hover:text-gray-700">
              Admin
            </Link>
            {pathname !== '/admin' && (
              <>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {adminNavItems.find(item => item.href === pathname)?.label || 'Página'}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
