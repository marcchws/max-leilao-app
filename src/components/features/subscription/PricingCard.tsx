'use client'

import React from 'react'
import { SubscriptionPlan } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Star } from 'lucide-react'

interface PricingCardProps {
  plan: SubscriptionPlan
  onSelect: (planId: string) => void
  isLoading?: boolean
  currentPlan?: string
}

export function PricingCard({ plan, onSelect, isLoading, currentPlan }: PricingCardProps) {
  const isCurrentPlan = currentPlan === plan.id
  const isPopular = plan.isPopular

  return (
    <div className={`relative rounded-lg border p-6 ${
      isPopular 
        ? 'border-blue-500 bg-blue-50 shadow-lg' 
        : 'border-gray-200 bg-white'
    }`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-blue-600 text-white">
            <Star className="mr-1 h-3 w-3" />
            Mais Popular
          </Badge>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
        <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
        
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">
            R$ {plan.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">/{plan.interval === 'month' ? 'mês' : 'ano'}</span>
        </div>
        
        {plan.trialDays > 0 && (
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {plan.trialDays} dias grátis
            </Badge>
          </div>
        )}
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button
          onClick={() => onSelect(plan.id)}
          disabled={isLoading || isCurrentPlan}
          className={`w-full ${
            isPopular 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-900 hover:bg-gray-800'
          }`}
        >
          {isCurrentPlan ? 'Plano Atual' : 'Escolher Plano'}
        </Button>
      </div>
    </div>
  )
}

interface PricingGridProps {
  plans: SubscriptionPlan[]
  onSelectPlan: (planId: string) => void
  isLoading?: boolean
  currentPlan?: string
}

export function PricingGrid({ plans, onSelectPlan, isLoading, currentPlan }: PricingGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          onSelect={onSelectPlan}
          isLoading={isLoading}
          currentPlan={currentPlan}
        />
      ))}
    </div>
  )
}
