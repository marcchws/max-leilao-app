'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lock, Crown, Zap, Bell, Heart, Calculator } from 'lucide-react'

interface FeatureLockedCardProps {
  feature: 'filters' | 'alerts' | 'favorites' | 'calculator'
}

const featureConfig = {
  filters: {
    icon: Zap,
    title: 'Filtros Avançados',
    description: 'Use filtros avançados para encontrar exatamente o que procura',
    color: 'blue'
  },
  alerts: {
    icon: Bell,
    title: 'Alertas Personalizados',
    description: 'Receba notificações no WhatsApp quando novos veículos aparecerem',
    color: 'green'
  },
  favorites: {
    icon: Heart,
    title: 'Lista de Favoritos',
    description: 'Salve seus veículos favoritos e acompanhe os lances',
    color: 'red'
  },
  calculator: {
    icon: Calculator,
    title: 'Calculadora de Lucro',
    description: 'Calcule o lucro potencial dos seus investimentos',
    color: 'purple'
  }
}

export function FeatureLockedCard({ feature }: FeatureLockedCardProps) {
  const config = featureConfig[feature]
  const Icon = config.icon

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          icon: 'text-blue-600 dark:text-blue-400',
          title: 'text-blue-900 dark:text-blue-100',
          description: 'text-blue-700 dark:text-blue-300',
          button: 'bg-blue-600 hover:bg-blue-700'
        }
      case 'green':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          icon: 'text-green-600 dark:text-green-400',
          title: 'text-green-900 dark:text-green-100',
          description: 'text-green-700 dark:text-green-300',
          button: 'bg-green-600 hover:bg-green-700'
        }
      case 'red':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          icon: 'text-red-600 dark:text-red-400',
          title: 'text-red-900 dark:text-red-100',
          description: 'text-red-700 dark:text-red-300',
          button: 'bg-red-600 hover:bg-red-700'
        }
      case 'purple':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          border: 'border-purple-200 dark:border-purple-800',
          icon: 'text-purple-600 dark:text-purple-400',
          title: 'text-purple-900 dark:text-purple-100',
          description: 'text-purple-700 dark:text-purple-300',
          button: 'bg-purple-600 hover:bg-purple-700'
        }
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
          icon: 'text-gray-600 dark:text-gray-400',
          title: 'text-gray-900 dark:text-gray-100',
          description: 'text-gray-700 dark:text-gray-300',
          button: 'bg-gray-600 hover:bg-gray-700'
        }
    }
  }

  const colors = getColorClasses(config.color)

  return (
    <Card className={`${colors.bg} ${colors.border} border-2 border-dashed`}>
      <div className="p-8 text-center">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <Icon className={`h-12 w-12 mx-auto mb-4 ${colors.icon}`} />
        </div>

        <div className="mb-4">
          <h3 className={`text-xl font-semibold mb-2 ${colors.title}`}>
            {config.title}
          </h3>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600 mb-3">
            <Lock className="h-3 w-3 mr-1" />
            Funcionalidade Premium
          </Badge>
          <p className={`text-sm ${colors.description}`}>
            {config.description}
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => window.location.href = '/subscription'}
            className={`${colors.button} text-white`}
          >
            <Crown className="h-4 w-4 mr-2" />
            Desbloquear Funcionalidade
          </Button>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Teste grátis por 7 dias • Cancele quando quiser
          </p>
        </div>
      </div>
    </Card>
  )
}