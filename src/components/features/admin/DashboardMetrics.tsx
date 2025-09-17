'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  CreditCard, 
  UserPlus, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar
} from 'lucide-react'
import { 
  DashboardMetrics, 
  PeriodFilter, 
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value)
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

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total de Usuários */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Total de Usuários</h3>
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

        {/* Assinantes Ativos */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Assinantes Ativos</h3>
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

        {/* Novos Cadastros */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Novos Cadastros</h3>
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

        {/* Receita */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Receita</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentMetrics.revenue)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {selectedPeriod === 'day' ? 'Hoje' : selectedPeriod === 'week' ? 'Esta semana' : 'Este mês'}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Taxa de Churn */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Taxa de Churn</h3>
              <p className="text-2xl font-bold text-gray-900">{currentMetrics.churnRate}%</p>
              <Badge 
                variant={currentMetrics.churnRate > 5 ? 'destructive' : 'secondary'}
                className="text-xs mt-1"
              >
                {currentMetrics.churnRate > 5 ? 'Alto' : 'Baixo'}
              </Badge>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </Card>

        {/* Pagamentos Falhos */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">Pagamentos Falhos</h3>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(currentMetrics.failedPayments)}</p>
              <Badge 
                variant={currentMetrics.failedPayments > 5 ? 'destructive' : 'secondary'}
                className="text-xs mt-1"
              >
                {currentMetrics.failedPayments > 5 ? 'Atenção' : 'Normal'}
              </Badge>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
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
