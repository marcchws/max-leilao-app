'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { LoginModal } from '@/components/features/auth/LoginModal'
import {
  Car,
  Heart,
  Bell,
  Calculator,
  Settings,
  LogOut,
  Menu,
  User,
  CreditCard,
  Shield,
  LogIn
} from 'lucide-react'

export function MainNavigation() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const navigationItems = [
    {
      href: '/vehicles',
      label: 'Veículos',
      icon: Car,
    },
    {
      href: '/favorites',
      label: 'Favoritos',
      icon: Heart,
    },
    {
      href: '/alerts',
      label: 'Alertas',
      icon: Bell,
    },
    {
      href: '/calculator',
      label: 'Calculadora',
      icon: Calculator,
    },
  ]

  const isActive = (href: string) => pathname === href

  const getDaysUntilExpiry = () => {
    if (user?.subscriptionStatus === 'trial' && user?.trialEndDate) {
      const trialEnd = new Date(user.trialEndDate)
      const now = new Date()
      const diffTime = trialEnd.getTime() - now.getTime()
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return days > 0 ? days : 0
    }
    return 0
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Car className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">Max Leilão</span>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Trial Badge */}
                {user?.subscriptionStatus === 'trial' && (
                  <Badge variant="secondary" className="text-xs">
                    {getDaysUntilExpiry()} dias restantes
                  </Badge>
                )}

                {/* Admin Access - Only show for admin users */}
                {user?.role === 'admin' && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}

                <Link href="/subscription">
                  <Button variant="ghost" size="sm">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Assinatura
                  </Button>
                </Link>

                <Link href="/account">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Conta
                  </Button>
                </Link>

                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>

                <Avatar className="h-8 w-8">
                  <div className="bg-blue-600 text-white w-full h-full flex items-center justify-center text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </Avatar>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
                
                <Link href="/login">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Criar Conta
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  )
}