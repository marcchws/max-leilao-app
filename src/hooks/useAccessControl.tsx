'use client'

import { useAuth } from '@/contexts/AuthContext'
import { FeatureLockedCard } from '@/components/features/subscription/FeatureLockedCard'

interface AccessControlProps {
  feature: 'filters' | 'alerts' | 'favorites' | 'calculator'
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AccessControl({ feature, children, fallback }: AccessControlProps) {
  const { user } = useAuth()

  // Verificar acesso baseado no usuário logado
  const hasFeatureAccess = () => {
    if (!user) return false
    
    // Usuários com trial ativo têm acesso completo
    if (user.subscriptionStatus === 'trial' && user.trialEndDate) {
      const trialEnd = new Date(user.trialEndDate)
      const now = new Date()
      if (trialEnd > now) return true
    }
    
    // Usuários com assinatura ativa têm acesso completo
    if (user.subscriptionStatus === 'active') return true
    
    // Usuários gratuitos não têm acesso às funcionalidades premium
    return false
  }

  if (hasFeatureAccess()) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  // Mostrar card específico para cada funcionalidade bloqueada
  return <FeatureLockedCard feature={feature} />
}

export function useAccessControl() {
  const { user } = useAuth()
  
  // Função para verificar acesso a funcionalidades
  const hasAccess = (): boolean => {
    if (!user) return false
    
    // Usuários com trial ativo têm acesso completo
    if (user.subscriptionStatus === 'trial' && user.trialEndDate) {
      const trialEnd = new Date(user.trialEndDate)
      const now = new Date()
      if (trialEnd > now) return true
    }
    
    // Usuários com assinatura ativa têm acesso completo
    if (user.subscriptionStatus === 'active') return true
    
    // Usuários gratuitos não têm acesso às funcionalidades premium
    return false
  }

  const isTrialActive = (): boolean => {
    if (!user?.trialEndDate) return false
    
    const trialEnd = new Date(user.trialEndDate)
    const now = new Date()
    
    return trialEnd > now && user.subscriptionStatus === 'trial'
  }

  const isSubscriptionActive = (): boolean => {
    return user?.subscriptionStatus === 'active' || false
  }

  const getDaysUntilExpiry = (): number => {
    if (isTrialActive() && user?.trialEndDate) {
      const trialEnd = new Date(user.trialEndDate)
      const now = new Date()
      const diffTime = trialEnd.getTime() - now.getTime()
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    
    return 0
  }

  const canViewVehicles = (): boolean => {
    // Todos os usuários podem ver veículos, mesmo sem login
    return true
  }

  const canUsePremiumFeatures = (): boolean => {
    return hasAccess()
  }

  const startTrial = async (userId: string): Promise<void> => {
    // Em uma implementação real, isso seria feito via API
    console.log('Trial iniciado para usuário:', userId)
  }

  return {
    hasAccess,
    isTrialActive,
    isSubscriptionActive,
    getDaysUntilExpiry,
    canViewVehicles,
    canUsePremiumFeatures,
    startTrial,
    canUseFilters: hasAccess(),
    canUseAlerts: hasAccess(),
    canUseFavorites: hasAccess(),
    canUseCalculator: hasAccess()
  }
}
