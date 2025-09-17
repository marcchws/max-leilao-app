'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  CreditCard,
  UserPlus,
  Calendar
} from 'lucide-react'
import {
  periodFilters,
  mockDashboardMetrics
} from '@/lib/mock-data'

interface DashboardMetricsProps {
  className?: string
}

export function DashboardMetricsComponent({ className }: DashboardMetricsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('month')
  
  const currentMetrics = mockDashboardMetrics[selectedPeriod]
  const currentPeriodFilter = periodFilters.find(p => p.value === selectedPeriod)

  const handlePeriodChange = (period: 'day' | 'week' | 'month') => {
    setSelectedPeriod(period)
  }


  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  return (
    <div className={className}>
      {/* Filtros de Período */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Métricas do Dashboard</h2>
        </div>
        <div className="flex gap-2">
          {periodFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedPeriod === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePeriodChange(filter.value)}
              className="text-sm"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Cards de Métricas - Apenas as especificadas no RF-010 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total de Usuários Ativos */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Total de Usuários Ativos</h3>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(currentMetrics.totalUsers)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Período: {currentPeriodFilter?.label}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Total de Assinantes Pagantes */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Total de Assinantes Pagantes</h3>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(currentMetrics.activeSubscribers)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {((currentMetrics.activeSubscribers / currentMetrics.totalUsers) * 100).toFixed(1)}% do total
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Novos Cadastros no Período */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Novos Cadastros no Período</h3>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(currentMetrics.newRegistrations)}</p>
              <p className="text-xs text-gray-500 mt-1">
                No período selecionado
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <UserPlus className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Resumo do Período */}
      <Card className="p-4 mt-6 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Dados atualizados para o período: <strong>{currentPeriodFilter?.label}</strong>
          </span>
          <span>
            Última atualização: {new Date().toLocaleString('pt-BR')}
          </span>
        </div>
      </Card>
    </div>
  )
}
