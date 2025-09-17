'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 

  TrendingUp,
  ExternalLink,
  Award,
  Target
} from 'lucide-react'
import Image from 'next/image'
import { 
 
 
  periodFilters,
  mockAuctioneerClicks 
} from '@/lib/mock-data'

interface RankingLeiloeirosProps {
  className?: string
}

export function RankingLeiloeiros({ className }: RankingLeiloeirosProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('month')
  
  const currentData = mockAuctioneerClicks[selectedPeriod]
  const currentPeriodFilter = periodFilters.find(p => p.value === selectedPeriod)
  const totalClicks = currentData.reduce((sum, item) => sum + item.clicks, 0)

  const handlePeriodChange = (period: 'day' | 'week' | 'month') => {
    setSelectedPeriod(period)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Award className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Award className="h-5 w-5 text-gray-400" />
      case 2:
        return <Award className="h-5 w-5 text-orange-600" />
      default:
        return <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
    }
  }

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-yellow-50 border-yellow-200'
      case 1:
        return 'bg-gray-50 border-gray-200'
      case 2:
        return 'bg-orange-50 border-orange-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div className={className}>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Ranking de Cliques por Leiloeiro</h2>
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

      {/* Resumo */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Total de Cliques</h3>
              <p className="text-2xl font-bold text-blue-600">{formatNumber(totalClicks)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Período</p>
            <p className="font-semibold text-gray-900">{currentPeriodFilter?.label}</p>
          </div>
        </div>
      </Card>

      {/* Ranking */}
      <Card className="p-6">
        <div className="space-y-4">
          {currentData.map((auctioneer, index) => (
            <div
              key={auctioneer.id}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getRankColor(index)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Posição */}
                  <div className="flex items-center gap-2">
                    {getRankIcon(index)}
                  </div>

                  {/* Logo do Leiloeiro */}
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image 
                      src={auctioneer.logo} 
                      alt={auctioneer.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-car.jpg'
                      }}
                    />
                  </div>

                  {/* Informações */}
                  <div>
                    <h3 className="font-semibold text-gray-900">{auctioneer.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {formatNumber(auctioneer.clicks)} cliques
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {auctioneer.percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="flex-1 max-w-xs ml-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-500' :
                          'bg-blue-500'
                        }`}
                        style={{ width: `${auctioneer.percentage}%` }}
                      />
                    </div>
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé com Insights */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-600">Top 3 Leiloeiros</p>
              <p className="font-semibold text-gray-900">
                {((currentData.slice(0, 3).reduce((sum, item) => sum + item.clicks, 0) / totalClicks) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Maior Performance</p>
              <p className="font-semibold text-gray-900">{currentData[0]?.name}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Menor Performance</p>
              <p className="font-semibold text-gray-900">{currentData[currentData.length - 1]?.name}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Observação */}
      <Card className="p-4 mt-4 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <ExternalLink className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800">Insight Estratégico</h4>
            <p className="text-sm text-amber-700 mt-1">
              Com base nos dados do período selecionado, considere avaliar a viabilidade de manter 
              parcerias com leiloeiros que apresentam baixo volume de cliques, especialmente aqueles 
              com menos de 2% do total de cliques.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
