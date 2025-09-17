'use client'

import React, { useState } from 'react'

interface PaymentFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  cpf: string
  email: string
  phone: string
}
import { useSubscription } from '@/contexts/SubscriptionContext'
import { PricingGrid } from '@/components/features/subscription/PricingCard'
import { CheckoutForm } from '@/components/features/subscription/CheckoutForm'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  Star, 
  Shield, 
  Zap, 
  Users, 
  Headphones
} from 'lucide-react'

export default function PricingPage() {
  const { 
    subscriptionPlans, 
    user, 
    subscription, 
    isLoading 
  } = useSubscription()
  
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    setShowCheckout(true)
  }

  const handleCheckout = async (paymentData: PaymentFormData) => {
    try {
      setIsProcessing(true)
      // Simular processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Aqui seria feita a integração real com o gateway de pagamento
      console.log('Processando pagamento:', paymentData)
      
      // Simular sucesso
      alert('Assinatura realizada com sucesso!')
      setShowCheckout(false)
      setSelectedPlan(null)
      
    } catch (error) {
      console.error('Erro no checkout:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setIsProcessing(false)
    }
  }

  const selectedPlanData = subscriptionPlans.find(plan => plan.id === selectedPlan)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simples */}
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
                {user?.subscriptionStatus === 'trial' ? 'Período de Teste' : 
                 user?.subscriptionStatus === 'active' ? 'Assinante' : 'Gratuito'}
              </Badge>
              <Button variant="outline" onClick={() => window.location.href = '/vehicles'}>
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
            Escolha seu Plano
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Desbloqueie todo o potencial do Max Leilão com nossos planos de assinatura
          </p>
          
          {/* Features destacadas */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Filtros Avançados</h3>
              <p className="text-sm text-gray-600">Busque veículos com precisão</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Alertas Personalizados</h3>
              <p className="text-sm text-gray-600">Notificações por WhatsApp</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Lista de Favoritos</h3>
              <p className="text-sm text-gray-600">Salve veículos de interesse</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Calculadora de Lucro</h3>
              <p className="text-sm text-gray-600">Calcule margens de lucro</p>
            </div>
          </div>
        </div>

        {/* Planos */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando planos...</p>
          </div>
        ) : (
          <PricingGrid
            plans={subscriptionPlans}
            onSelectPlan={handleSelectPlan}
            isLoading={isProcessing}
            currentPlan={subscription?.planId}
          />
        )}

        {/* Garantias */}
        <div className="mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Garantia de 7 dias</h3>
              <p className="text-sm text-gray-600">
                Cancele sua assinatura em até 7 dias e receba seu dinheiro de volta.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <Headphones className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Suporte 24/7</h3>
              <p className="text-sm text-gray-600">
                Nossa equipe está sempre disponível para ajudar você.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Atualizações Constantes</h3>
              <p className="text-sm text-gray-600">
                Novas funcionalidades são adicionadas regularmente.
              </p>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Perguntas Frequentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Posso cancelar a qualquer momento?
              </h3>
              <p className="text-sm text-gray-600">
                Sim, você pode cancelar sua assinatura a qualquer momento. 
                Você continuará tendo acesso até o final do período pago.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Como funciona o período de teste?
              </h3>
              <p className="text-sm text-gray-600">
                Todos os planos incluem um período de teste gratuito. 
                Você pode experimentar todas as funcionalidades sem compromisso.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Quais métodos de pagamento são aceitos?
              </h3>
              <p className="text-sm text-gray-600">
                Aceitamos cartões de crédito, PIX e boleto bancário. 
                Todos os pagamentos são processados com segurança.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Posso mudar de plano depois?
              </h3>
              <p className="text-sm text-gray-600">
                Sim, você pode fazer upgrade ou downgrade do seu plano 
                a qualquer momento através da sua conta.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlanData && (
        <CheckoutForm
          plan={selectedPlanData}
          isOpen={showCheckout}
          onClose={() => {
            setShowCheckout(false)
            setSelectedPlan(null)
          }}
          onSubmit={handleCheckout}
          isLoading={isProcessing}
        />
      )}
    </div>
  )
}
