'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, 
  Calendar,
  DollarSign,
  Settings,
  AlertTriangle,
  Check,
  X,
  ArrowRight,
  Star
} from 'lucide-react'
import { Subscription, SubscriptionPlan } from '@/lib/types'

interface ManageSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  subscription: Subscription | null
  currentPlan: SubscriptionPlan | null
  onUpgrade?: (planId: string) => void
  onDowngrade?: (planId: string) => void
  onCancel?: () => void
}

export function ManageSubscriptionModal({ 
  isOpen, 
  onClose, 
  subscription, 
  currentPlan,
  onUpgrade,
  onDowngrade,
  onCancel
}: ManageSubscriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  // Mock plans para comparação
  const availablePlans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Plano Básico',
      description: 'Acesso completo às funcionalidades essenciais',
      price: 29.90,
      currency: 'BRL',
      interval: 'month',
      features: [
        'Filtros avançados de busca',
        'Alertas personalizados',
        'Lista de favoritos',
        'Calculadora de lucro',
        'Suporte por email'
      ],
      trialDays: 7,
      isActive: true
    },
    {
      id: 'premium',
      name: 'Plano Premium',
      description: 'Todas as funcionalidades + recursos exclusivos',
      price: 49.90,
      currency: 'BRL',
      interval: 'month',
      features: [
        'Todas as funcionalidades do Básico',
        'Alertas por WhatsApp',
        'Relatórios detalhados',
        'Suporte prioritário',
        'API de integração'
      ],
      trialDays: 7,
      isPopular: true,
      isActive: true
    },
    {
      id: 'enterprise',
      name: 'Plano Empresarial',
      description: 'Solução completa para empresas',
      price: 99.90,
      currency: 'BRL',
      interval: 'month',
      features: [
        'Todas as funcionalidades do Premium',
        'Múltiplos usuários',
        'Dashboard personalizado',
        'Suporte dedicado',
        'Treinamento personalizado'
      ],
      trialDays: 14,
      isActive: true
    }
  ]

  const handleUpgrade = async (planId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert(`Upgrade para ${availablePlans.find(p => p.id === planId)?.name} realizado com sucesso!`)
      onUpgrade?.(planId)
      onClose()
    } catch {
      alert('Erro ao fazer upgrade. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDowngrade = async (planId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert(`Downgrade para ${availablePlans.find(p => p.id === planId)?.name} realizado com sucesso!`)
      onDowngrade?.(planId)
      onClose()
    } catch (error) {
      alert('Erro ao fazer downgrade. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Assinatura cancelada com sucesso!')
      onCancel?.()
      onClose()
    } catch (error) {
      alert('Erro ao cancelar assinatura. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!subscription || !currentPlan) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Gerenciar Assinatura
          </DialogTitle>
          <p className="text-center text-gray-600">
            Gerencie seu plano atual e explore outras opções
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plano Atual */}
          <Card className="p-6 border-2 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">
                    {currentPlan.name}
                  </h3>
                  <p className="text-blue-700">{currentPlan.description}</p>
                </div>
              </div>
              <Badge variant="default" className="bg-blue-600">
                Plano Atual
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  <strong>R$ {currentPlan.price.toFixed(2)}</strong> /mês
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Próxima cobrança: {new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Status: {subscription.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>

            {subscription.cancelAtPeriodEnd && (
              <div className="p-3 bg-red-100 border border-red-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800">
                    Sua assinatura será cancelada em {new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            )}
          </Card>

          {/* Outros Planos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Outros Planos Disponíveis</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {availablePlans
                .filter(plan => plan.id !== currentPlan.id)
                .map((plan) => (
                  <Card key={plan.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{plan.name}</h4>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                      </div>
                      {plan.isPopular && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          Popular
                        </Badge>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        R$ {plan.price.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 3 && (
                        <p className="text-xs text-gray-500">
                          +{plan.features.length - 3} outros recursos
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={() => {
                        const isUpgrade = plan.price > currentPlan.price
                        if (isUpgrade) {
                          handleUpgrade(plan.id)
                        } else {
                          handleDowngrade(plan.id)
                        }
                      }}
                      disabled={isLoading}
                      className="w-full"
                      variant={plan.price > currentPlan.price ? "default" : "outline"}
                    >
                      {isLoading ? 'Processando...' : 
                       plan.price > currentPlan.price ? 'Fazer Upgrade' : 'Fazer Downgrade'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Card>
                ))}
            </div>
          </div>

          {/* Ações de Gerenciamento */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Ações de Gerenciamento</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => alert('Redirecionando para portal de pagamento...')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Atualizar Método de Pagamento
              </Button>

              <Button
                variant="outline"
                className="justify-start"
                onClick={() => alert('Redirecionando para histórico...')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Ver Histórico de Pagamentos
              </Button>
            </div>

            {/* Cancelar Assinatura */}
            {!subscription.cancelAtPeriodEnd && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-800">Cancelar Assinatura</h4>
                    <p className="text-sm text-red-600">
                      Você perderá o acesso às funcionalidades premium
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => setShowCancelConfirm(true)}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Confirmação de Cancelamento */}
          {showCancelConfirm && (
            <Card className="p-4 border-red-200 bg-red-50">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-red-800">Confirmar Cancelamento</h4>
              </div>
              <p className="text-sm text-red-700 mb-4">
                Tem certeza que deseja cancelar sua assinatura? Você perderá o acesso às funcionalidades premium 
                após {new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR')}.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1"
                >
                  Manter Assinatura
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Cancelando...' : 'Sim, Cancelar'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
