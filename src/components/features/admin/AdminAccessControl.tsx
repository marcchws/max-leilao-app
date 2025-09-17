'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface AdminAccessControlProps {
  children: React.ReactNode
}

export function AdminAccessControl({ children }: AdminAccessControlProps) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    // Simular verificação de acesso administrativo
    const checkAdminAccess = async () => {
      try {
        // Simular delay de verificação
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock: Verificar se o usuário é admin
        // Em produção, isso seria uma verificação real com API
        const isAdmin = localStorage.getItem('admin_access') === 'true' || 
                       window.location.search.includes('admin=true')
        
        if (isAdmin) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } catch (error) {
        console.error('Erro ao verificar acesso administrativo:', error)
        setIsAuthorized(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAccess()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso administrativo...</p>
        </Card>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className="mb-6">
            <div className="bg-red-100 text-red-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Acesso Negado
            </h1>
            <p className="text-gray-600 mb-6">
              Você não tem permissão para acessar a área administrativa.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                localStorage.setItem('admin_access', 'true')
                window.location.reload()
              }}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Acesso de Desenvolvimento
            </Button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Para desenvolvimento:</strong> Use o botão acima para simular acesso administrativo.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
