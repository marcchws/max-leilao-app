'use client'

import React from 'react'
import { Subscription, SubscriptionPlan } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Settings
} from 'lucide-react'

interface SubscriptionStatusProps {
  subscription: Subscription | null
  plan: SubscriptionPlan | null
  onManageSubscription: () => void
  onUpdatePaymentMethod: () => void
}

export function SubscriptionStatus({ 
  subscription, 
  plan, 
  onManageSubscription, 
  onUpdatePaymentMethod 
}: SubscriptionStatusProps) {
  if (!subscription || !plan) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma Assinatura Ativa
          </h3>
          <p className="text-gray-600 mb-4">
            Você ainda não possui uma assinatura ativa.
          </p>
          <Button onClick={onManageSubscription}>
            Escolher Plano
          </Button>
        </div>
      </Card>
    )
  }

  const getStatusInfo = () => {
    switch (subscription.status) {
      case 'active':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          badge: <Badge className="bg-green-100 text-green-800">Ativa</Badge>,
          color: 'text-green-600'
        }
      case 'trialing':
        return {
          icon: <Clock className="h-5 w-5 text-blue-500" />,
          badge: <Badge className="bg-blue-100 text-blue-800">Período de Teste</Badge>,
          color: 'text-blue-600'
        }
      case 'past_due':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          badge: <Badge className="bg-yellow-100 text-yellow-800">Pagamento Pendente</Badge>,
          color: 'text-yellow-600'
        }
      case 'canceled':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          badge: <Badge className="bg-red-100 text-red-800">Cancelada</Badge>,
          color: 'text-red-600'
        }
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5 text-gray-500" />,
          badge: <Badge className="bg-gray-100 text-gray-800">Inativa</Badge>,
          color: 'text-gray-600'
        }
    }
  }

  const statusInfo = getStatusInfo()
  const currentPeriodEnd = new Date(subscription.currentPeriodEnd)
  const isExpiringSoon = currentPeriodEnd.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          {statusInfo.icon}
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {plan.name}
            </h3>
            <p className="text-sm text-gray-600">
              R$ {plan.price.toFixed(2)}/{plan.interval === 'month' ? 'mês' : 'ano'}
            </p>
          </div>
        </div>
        {statusInfo.badge}
      </div>

      <div className="space-y-4">
        {/* Status da assinatura */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Status:</span>
          <span className={`text-sm font-medium ${statusInfo.color}`}>
            {subscription.status === 'active' ? 'Ativa' : 
             subscription.status === 'trialing' ? 'Período de Teste' :
             subscription.status === 'past_due' ? 'Pagamento Pendente' :
             subscription.status === 'canceled' ? 'Cancelada' : 'Inativa'}
          </span>
        </div>

        {/* Próxima cobrança */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Próxima cobrança:</span>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span className={`text-sm ${isExpiringSoon ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              {currentPeriodEnd.toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Cancelamento */}
        {subscription.cancelAtPeriodEnd && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Cancelamento:</span>
            <span className="text-sm text-red-600 font-medium">
              Será cancelada em {currentPeriodEnd.toLocaleDateString('pt-BR')}
            </span>
          </div>
        )}

        {/* Período de teste */}
        {subscription.trialEnd && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Período de teste:</span>
            <span className="text-sm text-blue-600">
              Até {new Date(subscription.trialEnd).toLocaleDateString('pt-BR')}
            </span>
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="mt-6 flex gap-2">
        <Button 
          variant="outline" 
          onClick={onUpdatePaymentMethod}
          className="flex-1"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Método de Pagamento
        </Button>
        <Button 
          onClick={onManageSubscription}
          className="flex-1"
        >
          <Settings className="h-4 w-4 mr-2" />
          Gerenciar
        </Button>
      </div>

      {/* Avisos */}
      {subscription.status === 'past_due' && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Pagamento pendente
              </p>
              <p className="text-sm text-yellow-700">
                Atualize seu método de pagamento para continuar usando o serviço.
              </p>
            </div>
          </div>
        </div>
      )}

      {isExpiringSoon && subscription.status === 'active' && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex">
            <Clock className="h-5 w-5 text-blue-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                Renovação próxima
              </p>
              <p className="text-sm text-blue-700">
                Sua assinatura será renovada automaticamente em breve.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
