'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Clock, Crown, AlertTriangle } from 'lucide-react'

interface TrialExpirationNotificationProps {
  daysRemaining: number
  onSubscribe: () => void
  onDismiss?: () => void
  className?: string
}

export function TrialExpirationNotification({ 
  daysRemaining, 
  onSubscribe, 
  onDismiss,
  className 
}: TrialExpirationNotificationProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  if (isDismissed) return null

  const isExpired = daysRemaining <= 0
  const isExpiringSoon = daysRemaining <= 2

  const getNotificationContent = () => {
    if (isExpired) {
      return {
        title: 'Período de Teste Expirado',
        message: 'Seu período de teste gratuito expirou. Para continuar usando todas as funcionalidades, assine um de nossos planos.',
        icon: AlertTriangle,
        variant: 'destructive' as const,
        bgColor: 'bg-red-50 border-red-200',
        textColor: 'text-red-900',
        iconColor: 'text-red-600'
      }
    }

    if (isExpiringSoon) {
      return {
        title: 'Período de Teste Expirando',
        message: `Seu período de teste gratuito expira em ${daysRemaining} dia${daysRemaining !== 1 ? 's' : ''}. Não perca o acesso às funcionalidades premium!`,
        icon: Clock,
        variant: 'secondary' as const,
        bgColor: 'bg-orange-50 border-orange-200',
        textColor: 'text-orange-900',
        iconColor: 'text-orange-600'
      }
    }

    return {
      title: 'Período de Teste Ativo',
      message: `Você tem ${daysRemaining} dias restantes no seu período de teste gratuito. Aproveite todas as funcionalidades!`,
      icon: Crown,
      variant: 'default' as const,
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-900',
      iconColor: 'text-blue-600'
    }
  }

  const content = getNotificationContent()
  const IconComponent = content.icon

  return (
    <Card className={`${content.bgColor} ${className}`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${content.iconColor} bg-white/50`}>
              <IconComponent className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`font-semibold ${content.textColor}`}>
                  {content.title}
                </h3>
                {!isExpired && (
                  <Badge variant={content.variant} className="text-xs">
                    {daysRemaining} dia{daysRemaining !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              <p className={`text-sm ${content.textColor} mb-3`}>
                {content.message}
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={onSubscribe}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Crown className="h-4 w-4 mr-1" />
                  {isExpired ? 'Assinar Agora' : 'Ver Planos'}
                </Button>
                
                {!isExpired && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDismiss}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Lembrar depois
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className={`p-1 rounded-full hover:bg-white/50 transition-colors ${content.textColor}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  )
}
