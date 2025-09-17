'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Star, AlertTriangle } from 'lucide-react'

interface TrialNotificationProps {
  daysRemaining: number
  onSubscribe: () => void
  onDismiss?: () => void
}

export function TrialNotification({ daysRemaining, onSubscribe, onDismiss }: TrialNotificationProps) {
  const isUrgent = daysRemaining <= 3
  const isExpiring = daysRemaining <= 1

  if (daysRemaining <= 0) {
    return (
      <Card className="border-red-200 bg-red-50 p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-800 mb-1">
              Período de teste expirado
            </h3>
            <p className="text-red-700 text-sm mb-3">
              Seu período de teste gratuito expirou. Assine agora para continuar usando todas as funcionalidades.
            </p>
            <div className="flex gap-2">
              <Button onClick={onSubscribe} className="bg-red-600 hover:bg-red-700">
                Assinar Agora
              </Button>
              {onDismiss && (
                <Button variant="outline" onClick={onDismiss}>
                  Fechar
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={`p-4 mb-6 ${
      isUrgent 
        ? 'border-yellow-200 bg-yellow-50' 
        : 'border-blue-200 bg-blue-50'
    }`}>
      <div className="flex items-start">
        {isExpiring ? (
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
        ) : isUrgent ? (
          <Clock className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
        ) : (
          <Star className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold ${
              isUrgent ? 'text-yellow-800' : 'text-blue-800'
            }`}>
              Período de teste ativo
            </h3>
            <Badge variant="secondary" className="text-xs">
              {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'} restantes
            </Badge>
          </div>
          
          <p className={`text-sm mb-3 ${
            isUrgent ? 'text-yellow-700' : 'text-blue-700'
          }`}>
            {isUrgent 
              ? 'Seu período de teste está acabando! Assine agora para não perder o acesso às funcionalidades.'
              : 'Você está aproveitando seu período de teste gratuito. Assine para continuar após o período.'
            }
          </p>
          
          <div className="flex gap-2">
            <Button 
              onClick={onSubscribe} 
              className={`${
                isUrgent 
                  ? 'bg-yellow-600 hover:bg-yellow-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Assinar Agora
            </Button>
            {onDismiss && (
              <Button variant="outline" onClick={onDismiss}>
                Lembrar depois
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

interface SubscriptionBannerProps {
  userStatus: 'free' | 'trial' | 'active' | 'expired' | 'suspended'
  daysRemaining?: number
  onSubscribe: () => void
}

export function SubscriptionBanner({ userStatus, daysRemaining, onSubscribe }: SubscriptionBannerProps) {
  if (userStatus === 'active') {
    return null // Não mostrar banner para usuários com assinatura ativa
  }

  if (userStatus === 'trial' && daysRemaining !== undefined) {
    return (
      <TrialNotification 
        daysRemaining={daysRemaining}
        onSubscribe={onSubscribe}
      />
    )
  }

  if (userStatus === 'free' || userStatus === 'expired' || userStatus === 'suspended') {
    return (
      <Card className="border-gray-200 bg-gray-50 p-4 mb-6">
        <div className="flex items-start">
          <Star className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-1">
              Desbloqueie todas as funcionalidades
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              Assine agora e tenha acesso completo aos filtros avançados, alertas personalizados e muito mais.
            </p>
            <Button onClick={onSubscribe}>
              Ver Planos
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return null
}
