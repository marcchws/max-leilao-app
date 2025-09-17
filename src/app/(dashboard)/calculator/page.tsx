'use client'

import { AccessControl } from '@/hooks/useAccessControl'
import { TrialExpirationNotification } from '@/components/features/subscription/TrialExpirationNotification'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { ProfitCalculator } from '@/components/features/calculator/ProfitCalculator'

export default function CalculatorPage() {
  const { user, getDaysUntilExpiry } = useSubscription()

  return (
    <div className="space-y-6">
      {/* Notificação de Expiração do Trial */}
      {user?.subscriptionStatus === 'trial' && (
        <TrialExpirationNotification
          daysRemaining={getDaysUntilExpiry()}
          onSubscribe={() => window.location.href = '/subscription'}
        />
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calculadora de Lucro</h1>
      </div>

      {/* Calculator - com controle de acesso */}
      <AccessControl feature="calculator">
        <ProfitCalculator />
      </AccessControl>
    </div>
  )
}