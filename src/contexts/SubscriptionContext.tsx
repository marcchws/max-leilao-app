'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, Subscription, SubscriptionPlan, PaymentMethod, PaymentHistory } from '@/lib/types'
import { useAuth } from './AuthContext'

interface SubscriptionContextType {
  user: User | null
  subscription: Subscription | null
  subscriptionPlans: SubscriptionPlan[]
  paymentMethods: PaymentMethod[]
  paymentHistory: PaymentHistory[]
  isLoading: boolean
  error: string | null
  
  // Actions
  updateUser: (user: User) => void
  updateSubscription: (subscription: Subscription) => void
  refreshSubscription: () => Promise<void>
  cancelSubscription: () => Promise<void>
  updatePaymentMethod: (paymentMethodId: string) => Promise<void>
  startTrial: (userId: string) => Promise<void>
  
  // Access control
  hasAccess: (feature: 'filters' | 'alerts' | 'favorites' | 'calculator') => boolean
  isTrialActive: () => boolean
  isSubscriptionActive: () => boolean
  getDaysUntilExpiry: () => number
  canViewVehicles: () => boolean
  canUsePremiumFeatures: () => boolean
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

interface SubscriptionProviderProps {
  children: ReactNode
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { user: authUser } = useAuth() // Usar usuário do AuthContext
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data - substituir por chamadas reais da API
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true)
        
        // Mock subscription plans
        const mockPlans: SubscriptionPlan[] = [
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
        
        setSubscriptionPlans(mockPlans)
        
        // Simular carregamento
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (err) {
        setError('Erro ao carregar dados da assinatura')
        console.error('Erro ao carregar dados:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const updateUser = (newUser: User) => {
    // Não precisamos mais gerenciar usuário aqui, pois vem do AuthContext
    console.log('updateUser chamado, mas usuário agora vem do AuthContext')
  }

  const updateSubscription = (newSubscription: Subscription) => {
    setSubscription(newSubscription)
    // Não precisamos mais atualizar user aqui, pois vem do AuthContext
  }

  const refreshSubscription = async () => {
    try {
      setIsLoading(true)
      // Simular chamada à API para atualizar dados da assinatura
      await new Promise(resolve => setTimeout(resolve, 500))
      // Aqui seria feita a chamada real para a API
    } catch (err) {
      setError('Erro ao atualizar assinatura')
    } finally {
      setIsLoading(false)
    }
  }

  const cancelSubscription = async () => {
    try {
      setIsLoading(true)
      // Simular cancelamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (subscription) {
        const canceledSubscription: Subscription = {
          ...subscription,
          status: 'canceled',
          cancelAtPeriodEnd: true,
          canceledAt: new Date().toISOString()
        }
        updateSubscription(canceledSubscription)
      }
    } catch (err) {
      setError('Erro ao cancelar assinatura')
    } finally {
      setIsLoading(false)
    }
  }

  const updatePaymentMethod = async (paymentMethodId: string) => {
    try {
      setIsLoading(true)
      // Simular atualização do método de pagamento
      await new Promise(resolve => setTimeout(resolve, 500))
      // Aqui seria feita a chamada real para a API
    } catch (err) {
      setError('Erro ao atualizar método de pagamento')
    } finally {
      setIsLoading(false)
    }
  }

  // Access control functions
  const hasAccess = (feature: 'filters' | 'alerts' | 'favorites' | 'calculator'): boolean => {
    if (!authUser) return false
    
    // Usuários com trial ativo têm acesso completo
    if (isTrialActive()) return true
    
    // Usuários com assinatura ativa têm acesso completo
    if (isSubscriptionActive()) return true
    
    // Usuários gratuitos não têm acesso às funcionalidades premium
    return false
  }

  // Função para iniciar período de teste gratuito
  const startTrial = async (userId: string): Promise<void> => {
    try {
      setIsLoading(true)
      
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Nota: Em uma implementação real, isso seria feito via API
      // e o AuthContext seria atualizado com os novos dados do usuário
      console.log('Trial iniciado para usuário:', userId)
      
    } catch (err) {
      setError('Erro ao iniciar período de teste')
      console.error('Erro ao iniciar trial:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para verificar se o usuário pode ver veículos (acesso básico)
  const canViewVehicles = (): boolean => {
    // Todos os usuários podem ver veículos, mesmo sem login
    return true
  }

  // Função para verificar se o usuário pode usar funcionalidades premium
  const canUsePremiumFeatures = (): boolean => {
    return hasAccess('filters') || hasAccess('alerts') || hasAccess('favorites') || hasAccess('calculator')
  }

  const isTrialActive = (): boolean => {
    if (!authUser?.trialEndDate) return false
    
    const trialEnd = new Date(authUser.trialEndDate)
    const now = new Date()
    
    return trialEnd > now && authUser.subscriptionStatus === 'trial'
  }

  const isSubscriptionActive = (): boolean => {
    if (!subscription) return false
    
    return subscription.status === 'active' && 
           new Date(subscription.currentPeriodEnd) > new Date()
  }

  const getDaysUntilExpiry = (): number => {
    if (isTrialActive() && authUser?.trialEndDate) {
      const trialEnd = new Date(authUser.trialEndDate)
      const now = new Date()
      const diffTime = trialEnd.getTime() - now.getTime()
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    
    if (isSubscriptionActive() && subscription) {
      const periodEnd = new Date(subscription.currentPeriodEnd)
      const now = new Date()
      const diffTime = periodEnd.getTime() - now.getTime()
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    
    return 0
  }

  const value: SubscriptionContextType = {
    user: authUser, // Usar usuário do AuthContext
    subscription,
    subscriptionPlans,
    paymentMethods,
    paymentHistory,
    isLoading,
    error,
    updateUser,
    updateSubscription,
    refreshSubscription,
    cancelSubscription,
    updatePaymentMethod,
    startTrial,
    hasAccess,
    isTrialActive,
    isSubscriptionActive,
    getDaysUntilExpiry,
    canViewVehicles,
    canUsePremiumFeatures
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription deve ser usado dentro de um SubscriptionProvider')
  }
  return context
}
