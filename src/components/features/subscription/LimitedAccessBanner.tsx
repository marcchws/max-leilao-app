'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoginSignupModal } from './LoginSignupModal'
import { Lock, Crown, Users, Zap } from 'lucide-react'

interface LimitedAccessBannerProps {
  onSignUp?: () => void
  onLogin?: () => void
  className?: string
}

export function LimitedAccessBanner({ 
  onSignUp, 
  onLogin, 
  className 
}: LimitedAccessBannerProps) {
  const [showModal, setShowModal] = useState(false)

  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp()
    } else {
      setShowModal(true)
    }
  }

  const handleLogin = () => {
    if (onLogin) {
      onLogin()
    } else {
      setShowModal(true)
    }
  }
  return (
    <Card className={`bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-blue-900">
                  Acesso Limitado
                </h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Gratuito
                </Badge>
              </div>
              
              <p className="text-blue-800 mb-4">
                Você está visualizando apenas alguns veículos. Para usar filtros avançados, 
                alertas personalizados e outras funcionalidades premium, faça login ou cadastre-se.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-blue-700">
                  <Zap className="h-4 w-4" />
                  <span>Filtros avançados de busca</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-blue-700">
                  <Users className="h-4 w-4" />
                  <span>Alertas personalizados por WhatsApp</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-blue-700">
                  <Crown className="h-4 w-4" />
                  <span>Lista de favoritos e calculadora de lucro</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-4">
                <Button
                  onClick={handleSignUp}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Cadastrar-se (7 dias grátis)
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleLogin}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  Fazer Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <LoginSignupModal />
      )}
    </Card>
  )
}
