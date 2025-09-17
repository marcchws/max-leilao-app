'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CalculatorSimulation, MaintenanceItem, CalculatorResult } from '@/lib/types'
import { Plus, Trash2, Calculator, Save } from 'lucide-react'

interface ProfitCalculatorProps {
  simulation?: CalculatorSimulation
  onSave?: (simulation: Partial<CalculatorSimulation>) => void
  className?: string
}

export function ProfitCalculator({ simulation, onSave, className }: ProfitCalculatorProps) {
  const [name, setName] = useState(simulation?.name || '')
  const [purchasePrice, setPurchasePrice] = useState(simulation?.purchasePrice || 0)
  const [commissionPercent, setCommissionPercent] = useState(simulation?.auctioneerCommissionPercent || 5)
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>(
    simulation?.maintenanceItems || []
  )
  const [estimatedSalePrice, setEstimatedSalePrice] = useState(simulation?.estimatedSalePrice || 0)

  const addMaintenanceItem = () => {
    const newItem: MaintenanceItem = {
      id: Date.now().toString(),
      description: '',
      cost: 0
    }
    setMaintenanceItems([...maintenanceItems, newItem])
  }

  const updateMaintenanceItem = (id: string, field: 'description' | 'cost', value: string | number) => {
    setMaintenanceItems(items =>
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const removeMaintenanceItem = (id: string) => {
    setMaintenanceItems(items => items.filter(item => item.id !== id))
  }

  const calculateResults = (): CalculatorResult => {
    const totalMaintenanceCost = maintenanceItems.reduce((sum, item) => sum + item.cost, 0)
    const commissionCost = purchasePrice * (commissionPercent / 100)
    const totalVehicleCost = purchasePrice + commissionCost + totalMaintenanceCost
    const profitMargin = estimatedSalePrice - totalVehicleCost
    const profitPercentage = estimatedSalePrice > 0 ? (profitMargin / estimatedSalePrice) * 100 : 0

    return {
      totalMaintenanceCost,
      totalVehicleCost,
      profitMargin,
      profitPercentage
    }
  }

  const results = calculateResults()

  const handleSave = () => {
    if (!name.trim()) {
      alert('Por favor, digite um nome para a simulação')
      return
    }

    const simulationData: Partial<CalculatorSimulation> = {
      name: name.trim(),
      purchasePrice,
      auctioneerCommissionPercent: commissionPercent,
      maintenanceItems,
      estimatedSalePrice
    }

    onSave?.(simulationData)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className={`bg-card rounded-lg border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Calculadora de Lucro</h3>
        </div>

        <Button onClick={handleSave} size="sm">
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>

      <div className="space-y-6">
        {/* Simulation Name */}
        <div>
          <label className="text-sm font-medium mb-2 block">Nome da Simulação</label>
          <Input
            placeholder="Ex: Honda Civic Azul 2019"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Purchase Price */}
        <div>
          <label className="text-sm font-medium mb-2 block">Valor da Compra / Lance (R$)</label>
          <Input
            type="number"
            value={purchasePrice || ''}
            onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
          />
        </div>

        {/* Commission */}
        <div>
          <label className="text-sm font-medium mb-2 block">Comissão do Leiloeiro (%)</label>
          <Input
            type="number"
            step="0.1"
            value={commissionPercent || ''}
            onChange={(e) => setCommissionPercent(Number(e.target.value) || 0)}
          />
        </div>

        {/* Maintenance Items */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Custos de Manutenção</label>
            <Button onClick={addMaintenanceItem} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </div>

          <div className="space-y-2">
            {maintenanceItems.map((item) => (
              <div key={item.id} className="flex gap-2">
                <Input
                  placeholder="Descrição (Ex: Troca de pneus)"
                  value={item.description}
                  onChange={(e) => updateMaintenanceItem(item.id, 'description', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Valor (R$)"
                  value={item.cost || ''}
                  onChange={(e) => updateMaintenanceItem(item.id, 'cost', Number(e.target.value) || 0)}
                  className="w-32"
                />
                <Button
                  onClick={() => removeMaintenanceItem(item.id)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Sale Price */}
        <div>
          <label className="text-sm font-medium mb-2 block">Preço de Venda Estimado (R$)</label>
          <Input
            type="number"
            value={estimatedSalePrice || ''}
            onChange={(e) => setEstimatedSalePrice(Number(e.target.value) || 0)}
          />
        </div>

        {/* Results */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Resumo da Simulação</h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Valor do Lance:</span>
              <span>{formatCurrency(purchasePrice)}</span>
            </div>

            <div className="flex justify-between">
              <span>Comissão ({commissionPercent}%):</span>
              <span>{formatCurrency(purchasePrice * (commissionPercent / 100))}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Manutenção:</span>
              <span>{formatCurrency(results.totalMaintenanceCost)}</span>
            </div>

            <div className="flex justify-between font-medium border-t pt-2">
              <span>Custo Total:</span>
              <span>{formatCurrency(results.totalVehicleCost)}</span>
            </div>

            <div className="flex justify-between">
              <span>Preço de Venda:</span>
              <span>{formatCurrency(estimatedSalePrice)}</span>
            </div>

            <div className={`flex justify-between font-bold text-lg border-t pt-2 ${
              results.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>Lucro:</span>
              <div className="text-right">
                <div>{formatCurrency(results.profitMargin)}</div>
                <Badge
                  variant={results.profitMargin >= 0 ? "default" : "destructive"}
                  className="mt-1"
                >
                  {results.profitPercentage.toFixed(1)}%
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}