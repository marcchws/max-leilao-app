'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { SubscriptionStatus } from '@/components/features/subscription/SubscriptionStatus'
import { EditUserInfoModal } from '@/components/features/auth/EditUserInfoModal'
import { PaymentMethodModal } from '@/components/features/subscription/PaymentMethodModal'
import { NotificationSettingsModal } from '@/components/features/subscription/NotificationSettingsModal'
import { ManageSubscriptionModal } from '@/components/features/subscription/ManageSubscriptionModal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  CreditCard, 
  Settings, 
  Download, 
  Bell,
  Calendar,
  DollarSign,
  Home
} from 'lucide-react'

export default function AccountPage() {
  const { user: authUser } = useAuth()
  const { 
    subscription, 
    subscriptionPlans, 
    paymentHistory, 
    isLoading,
    cancelSubscription
  } = useSubscription()
  
  const [isCanceling, setIsCanceling] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [showManageSubscriptionModal, setShowManageSubscriptionModal] = useState(false)

  const currentPlan = subscriptionPlans.find(plan => plan.id === subscription?.planId)

  const handleCancelSubscription = async () => {
    if (!confirm('Tem certeza que deseja cancelar sua assinatura? Você perderá o acesso às funcionalidades premium.')) {
      return
    }

    try {
      setIsCanceling(true)
      await cancelSubscription()
      alert('Assinatura cancelada com sucesso.')
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error)
      alert('Erro ao cancelar assinatura. Tente novamente.')
    } finally {
      setIsCanceling(false)
    }
  }

  const handleUpdatePaymentMethod = () => {
    setShowPaymentMethodModal(true)
  }

  const handleNotificationSettings = () => {
    setShowNotificationModal(true)
  }

  const handleManageSubscription = () => {
    setShowManageSubscriptionModal(true)
  }

  const handleBackToDashboard = () => {
    window.location.href = '/vehicles'
  }

  const handleEditInfo = () => {
    setShowEditModal(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando dados da conta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simples - igual ao /subscription */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/vehicles" className="flex items-center space-x-2">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Max Leilão</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                {authUser?.subscriptionStatus === 'trial' ? 'Período de Teste' : 
                 authUser?.subscriptionStatus === 'active' ? 'Assinante' : 'Gratuito'}
              </Badge>
              <Button variant="outline" onClick={handleBackToDashboard}>
                <Home className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Minha Conta
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gerencie suas informações pessoais e configurações de assinatura
          </p>
        </div>


        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações do Usuário */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Informações Pessoais
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <p className="text-sm text-gray-900">{authUser?.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">{authUser?.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <p className="text-sm text-gray-900">{authUser?.phone || 'Não informado'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Membro desde
                  </label>
                  <p className="text-sm text-gray-900">
                    {authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" size="sm" onClick={handleEditInfo}>
                  Editar Informações
                </Button>
              </div>
            </Card>

            {/* Status da Assinatura */}
            <SubscriptionStatus
              subscription={subscription}
              plan={currentPlan || null}
              onManageSubscription={handleManageSubscription}
              onUpdatePaymentMethod={handleUpdatePaymentMethod}
            />

            {/* Histórico de Pagamentos */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Histórico de Pagamentos
                  </h2>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
              
              {paymentHistory.length > 0 ? (
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {payment.status === 'succeeded' ? 'Pagamento realizado' : 
                           payment.status === 'pending' ? 'Pagamento pendente' :
                           payment.status === 'failed' ? 'Pagamento falhou' : 'Pagamento cancelado'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(payment.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          R$ {payment.amount.toFixed(2)}
                        </p>
                        <Badge 
                          variant={payment.status === 'succeeded' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Nenhum pagamento encontrado</p>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ações Rápidas */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ações Rápidas
              </h3>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleManageSubscription}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Gerenciar Assinatura
                </Button>
                
                <Button 
                  onClick={handleUpdatePaymentMethod}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Método de Pagamento
                </Button>
                
                <Button 
                  onClick={handleNotificationSettings}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </Button>
              </div>
            </Card>

            {/* Próximas Cobranças */}
            {subscription && (
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Próximas Cobranças
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Próxima cobrança:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Valor:</span>
                    <span className="text-sm font-medium text-gray-900">
                      R$ {currentPlan?.price.toFixed(2) || '0,00'}
                    </span>
                  </div>
                  
                  {subscription.cancelAtPeriodEnd && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-xs text-red-700">
                        Assinatura será cancelada em {new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Cancelar Assinatura */}
            {subscription && subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
              <Card className="p-6 border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Cancelar Assinatura
                </h3>
                <p className="text-sm text-red-700 mb-4">
                  Você perderá o acesso às funcionalidades premium após o período pago.
                </p>
                <Button 
                  onClick={handleCancelSubscription}
                  disabled={isCanceling}
                  variant="destructive"
                  className="w-full"
                >
                  {isCanceling ? 'Cancelando...' : 'Cancelar Assinatura'}
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Modais */}
      <EditUserInfoModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
      
      <PaymentMethodModal
        isOpen={showPaymentMethodModal}
        onClose={() => setShowPaymentMethodModal(false)}
      />
      
      <NotificationSettingsModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      />
      
      <ManageSubscriptionModal
        isOpen={showManageSubscriptionModal}
        onClose={() => setShowManageSubscriptionModal(false)}
        subscription={subscription}
        currentPlan={currentPlan || null}
        onUpgrade={(planId) => console.log('Upgrade to:', planId)}
        onDowngrade={(planId) => console.log('Downgrade to:', planId)}
        onCancel={handleCancelSubscription}
      />
    </div>
  )
}
