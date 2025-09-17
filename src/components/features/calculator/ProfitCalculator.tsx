'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCalculator } from '@/contexts/CalculatorContext'
import { Calculator, Plus, Minus, Trash2 } from 'lucide-react'

export function ProfitCalculator() {
  const {
    simulations,
    currentSimulation,
    createSimulation,
    updateSimulation,
    deleteSimulation,
    selectSimulation,
    addMaintenanceItem,
    updateMaintenanceItem,
    removeMaintenanceItem,
    calculateResults
  } = useCalculator()

  const [showNewForm, setShowNewForm] = useState(!currentSimulation)
  const [newSimulationName, setNewSimulationName] = useState('')
  const [newMaintenanceDescription, setNewMaintenanceDescription] = useState('')
  const [newMaintenanceCost, setNewMaintenanceCost] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const results = calculateResults()

  const validateInput = (field: string, value: number) => {
    const errors = { ...validationErrors }
    
    if (value < 0) {
      errors[field] = 'Valor não pode ser negativo'
    } else if (field === 'auctioneerCommissionPercent' && value > 100) {
      errors[field] = 'Comissão não pode ser maior que 100%'
    } else {
      delete errors[field]
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateSimulation = () => {
    if (!newSimulationName.trim()) {
      setValidationErrors({ name: 'Nome da simulação é obrigatório' })
      return
    }
    
    if (newSimulationName.trim()) {
      createSimulation(newSimulationName.trim())
      setNewSimulationName('')
      setShowNewForm(false)
      setValidationErrors({})
    }
  }

  const handleAddMaintenanceItem = () => {
    if (newMaintenanceDescription.trim() && newMaintenanceCost) {
      addMaintenanceItem(newMaintenanceDescription.trim(), parseFloat(newMaintenanceCost))
      setNewMaintenanceDescription('')
      setNewMaintenanceCost('')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400">
            Simule os custos e estime sua margem de lucro em leilões
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowNewForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Simulação
          </Button>
        </div>
      </div>

      {/* Nova Simulação Form */}
      {showNewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nova Simulação</CardTitle>
            <CardDescription>
              Crie uma nova simulação para calcular a margem de lucro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="simulation-name">Nome da Simulação</Label>
              <Input
                id="simulation-name"
                placeholder="Ex: Honda Civic Azul 2019"
                value={newSimulationName}
                onChange={(e) => {
                  setNewSimulationName(e.target.value)
                  if (validationErrors.name) {
                    setValidationErrors(prev => ({ ...prev, name: '' }))
                  }
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateSimulation()}
              />
              {validationErrors.name && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.name}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateSimulation} disabled={!newSimulationName.trim()}>
                Criar Simulação
              </Button>
              <Button variant="outline" onClick={() => setShowNewForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Simulações Existentes */}
      {simulations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Simulações Salvas</CardTitle>
            <CardDescription>
              Selecione uma simulação para editar ou criar uma nova
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {simulations.map((simulation) => (
                <div
                  key={simulation.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    currentSimulation?.id === simulation.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => selectSimulation(simulation.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {simulation.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Criado em {new Date(simulation.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSimulation(simulation.id)
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formulário da Calculadora */}
      {currentSimulation && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário de Entrada */}
          <div className="space-y-6">
            {/* Dados Básicos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {currentSimulation.name}
                </CardTitle>
                <CardDescription>
                  Preencha os dados para calcular a margem de lucro
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="purchase-price">Valor da Compra / Lance (R$)</Label>
                  <Input
                    id="purchase-price"
                    type="number"
                    min="0"
                    placeholder="0,00"
                    value={currentSimulation.purchasePrice || ''}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0
                      if (validateInput('purchasePrice', value)) {
                        updateSimulation({ purchasePrice: value })
                      }
                    }}
                  />
                  {validationErrors.purchasePrice && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.purchasePrice}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="commission">Comissão do Leiloeiro (%)</Label>
                  <Input
                    id="commission"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="5,0"
                    value={currentSimulation.auctioneerCommissionPercent || ''}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0
                      if (validateInput('auctioneerCommissionPercent', value)) {
                        updateSimulation({ auctioneerCommissionPercent: value })
                      }
                    }}
                  />
                  {validationErrors.auctioneerCommissionPercent && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.auctioneerCommissionPercent}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="sale-price">Preço de Venda Estimado (R$)</Label>
                  <Input
                    id="sale-price"
                    type="number"
                    min="0"
                    placeholder="0,00"
                    value={currentSimulation.estimatedSalePrice || ''}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0
                      if (validateInput('estimatedSalePrice', value)) {
                        updateSimulation({ estimatedSalePrice: value })
                      }
                    }}
                  />
                  {validationErrors.estimatedSalePrice && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.estimatedSalePrice}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Custos de Manutenção */}
            <Card>
              <CardHeader>
                <CardTitle>Custos de Manutenção</CardTitle>
                <CardDescription>
                  Adicione os custos de reparo e manutenção estimados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Lista de itens existentes */}
                {currentSimulation.maintenanceItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="flex-1">
                      <Input
                        placeholder="Descrição"
                        value={item.description}
                        onChange={(e) => updateMaintenanceItem(item.id, e.target.value, item.cost)}
                      />
                    </div>
                    <div className="w-32">
                      <Input
                        type="number"
                        min="0"
                        placeholder="0,00"
                        value={item.cost || ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0
                          if (value >= 0) {
                            updateMaintenanceItem(item.id, item.description, value)
                          }
                        }}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMaintenanceItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {/* Adicionar novo item */}
                <div className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <div className="flex-1">
                    <Input
                      placeholder="Descrição da manutenção"
                      value={newMaintenanceDescription}
                      onChange={(e) => setNewMaintenanceDescription(e.target.value)}
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      placeholder="0,00"
                      value={newMaintenanceCost}
                      onChange={(e) => setNewMaintenanceCost(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleAddMaintenanceItem}
                    disabled={!newMaintenanceDescription.trim() || !newMaintenanceCost}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resultado da Simulação</CardTitle>
                <CardDescription>
                  Cálculos automáticos baseados nos dados inseridos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Valor da Compra:</span>
                    <span className="font-medium">{formatCurrency(currentSimulation.purchasePrice)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Comissão ({currentSimulation.auctioneerCommissionPercent}%):
                    </span>
                    <span className="font-medium">
                      {formatCurrency((currentSimulation.purchasePrice * currentSimulation.auctioneerCommissionPercent) / 100)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Manutenção:</span>
                    <span className="font-medium">{formatCurrency(results.totalMaintenanceCost)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Custo Total do Veículo:</span>
                    <span>{formatCurrency(results.totalVehicleCost)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Preço de Venda Estimado:</span>
                    <span className="font-medium">{formatCurrency(currentSimulation.estimatedSalePrice)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Margem de Lucro:</span>
                    <span className={getProfitColor(results.profitMargin)}>
                      {formatCurrency(results.profitMargin)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Margem (%):</span>
                    <span className={`font-medium ${getProfitColor(results.profitMargin)}`}>
                      {results.profitPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Indicador visual da margem */}
                <div className={`mt-6 p-4 rounded-lg border ${
                  results.profitMargin >= 0
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${getProfitColor(results.profitMargin)}`}>
                      {results.profitMargin >= 0
                        ? '✓ Negócio Viável - Margem Positiva'
                        : '⚠️ Prejuízo - Revisar Valores'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentSimulation && !showNewForm && (
        <div className="text-center py-16">
          <Calculator className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Nenhuma simulação ativa
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Crie uma nova simulação para começar a calcular margens de lucro
          </p>
          <Button
            onClick={() => setShowNewForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeira Simulação
          </Button>
        </div>
      )}
    </div>
  )
}