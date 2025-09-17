'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface AuthRedirectProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireRole?: 'admin' | 'user'
  redirectTo?: string
}

export function AuthRedirect({ 
  children, 
  requireAuth = false, 
  requireRole, 
  redirectTo 
}: AuthRedirectProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    // Se não requer autenticação, não faz nada
    if (!requireAuth) return

    // Se requer autenticação mas usuário não está logado
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Se requer role específico
    if (requireRole && user?.role !== requireRole) {
      if (user?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/vehicles')
      }
      return
    }

    // Redirecionamento personalizado
    if (redirectTo) {
      router.push(redirectTo)
      return
    }

    // Redirecionamento padrão baseado no role
    if (user?.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/vehicles')
    }
  }, [isAuthenticated, user, isLoading, requireAuth, requireRole, redirectTo, router])

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Se requer autenticação mas não está logado, não renderiza nada
  if (requireAuth && !isAuthenticated) {
    return null
  }

  // Se requer role específico mas não tem o role correto, não renderiza nada
  if (requireRole && user?.role !== requireRole) {
    return null
  }

  return <>{children}</>
}
