'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { VehicleFilters as FilterType } from '@/lib/types'
import { ChevronDown, X, Filter, Bell, Lock, Crown } from 'lucide-react'
import { useAccessControl } from '@/hooks/useAccessControl'

interface VehicleFiltersProps {
  filters: FilterType
  onFiltersChange: (filters: FilterType) => void
  onSaveAlert?: (filters: FilterType) => void
  className?: string
}

const categories = [
  { value: 'car', label: 'Carro' },
  { value: 'motorcycle', label: 'Moto' },
  { value: 'heavy', label: 'Caminhão/Pesados' },
]

const states = [
  'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'ES', 'PE'
]

export function VehicleFilters({ filters, onFiltersChange, onSaveAlert, className }: VehicleFiltersProps) {
  const { canUseFilters, canUseAlerts } = useAccessControl()
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  
  const updateFilter = (key: keyof FilterType, value: string | number | undefined) => {
    if (!canUseFilters) return
    
    // Limpar erro anterior
    setValidationErrors(prev => ({ ...prev, [key]: '' }))
    
    // Validações específicas para cada campo
    if (key === 'priceFrom' && typeof value === 'number' && filters.priceTo && value > filters.priceTo) {
      setValidationErrors(prev => ({ ...prev, [key]: 'O valor mínimo não pode ser maior que o máximo' }))
      return
    }
    
    if (key === 'priceTo' && typeof value === 'number' && filters.priceFrom && value < filters.priceFrom) {
      setValidationErrors(prev => ({ ...prev, [key]: 'O valor máximo não pode ser menor que o mínimo' }))
      return
    }
    
    if (key === 'yearFrom' && typeof value === 'number') {
      const currentYear = new Date().getFullYear()
      if (value < 1900 || value > currentYear + 1) {
        setValidationErrors(prev => ({ ...prev, [key]: `Ano deve estar entre 1900 e ${currentYear + 1}` }))
        return
      }
    }
    
    if (key === 'yearTo' && typeof value === 'number') {
      const currentYear = new Date().getFullYear()
      if (value < 1900 || value > currentYear + 1) {
        setValidationErrors(prev => ({ ...prev, [key]: `Ano deve estar entre 1900 e ${currentYear + 1}` }))
        return
      }
    }
    
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    if (!canUseFilters) return
    onFiltersChange({})
  }

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value =>
      value !== undefined && value !== null && value !== ''
    ).length
  }

  const activeFiltersCount = getActiveFiltersCount()

  // Se não tem acesso aos filtros, mostra versão limitada
  if (!canUseFilters) {
    return (
      <div className={`bg-card rounded-lg border p-4 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <h3 className="font-semibold text-gray-500">Filtros</h3>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              <Lock className="h-3 w-3 mr-1" />
              Limitado
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
            <div className="relative inline-block mb-3">
              <Filter className="h-8 w-8 text-blue-400 mx-auto" />
              <Lock className="h-4 w-4 text-blue-600 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
            </div>

            <h4 className="font-semibold text-blue-900 mb-2">🔍 Filtros Avançados Premium</h4>
            <div className="space-y-1 text-sm text-blue-700 mb-4">
              <p>✓ Busca por Estado e Cidade</p>
              <p>✓ Faixa de Preço personalizada</p>
              <p>✓ Filtro por Ano do veículo</p>
              <p>✓ Busca por Marca e Modelo</p>
            </div>

            <Button
              onClick={() => window.location.href = '/subscription'}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Crown className="h-4 w-4 mr-2" />
              Liberar Filtros (7 dias grátis)
            </Button>
          </div>

          {/* Mostra apenas categoria básica */}
          <div>
            <label className="text-sm font-medium mb-2 block text-gray-500">Categoria</label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={filters.category === category.value}
                    onCheckedChange={(checked) =>
                      updateFilter('category', checked ? category.value : undefined)
                    }
                    disabled={!canUseFilters}
                  />
                  <label
                    htmlFor={`category-${category.value}`}
                    className="text-sm cursor-pointer hover:text-primary transition-colors text-gray-500"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-card rounded-lg border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <h3 className="font-semibold">Filtros</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <>
              {onSaveAlert && canUseAlerts && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSaveAlert(filters)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Bell className="h-4 w-4 mr-1" />
                  Salvar Alerta
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Categoria</label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.value}`}
                  checked={filters.category === category.value}
                  onCheckedChange={(checked) =>
                    updateFilter('category', checked ? category.value : undefined)
                  }
                />
                <label
                  htmlFor={`category-${category.value}`}
                  className="text-sm cursor-pointer hover:text-primary transition-colors"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Estado</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {filters.state || 'Selecionar estado'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {states.map((state) => (
                  <DropdownMenuItem
                    key={state}
                    onClick={() => updateFilter('state', state)}
                  >
                    {state}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Cidade</label>
            <Input
              placeholder="Ex: São Paulo, Rio de Janeiro..."
              value={filters.city || ''}
              onChange={(e) => updateFilter('city', e.target.value || undefined)}
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Faixa de Preço</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                placeholder="Mín (R$)"
                value={filters.priceFrom || ''}
                onChange={(e) => updateFilter('priceFrom', e.target.value ? Number(e.target.value) : undefined)}
              />
              {validationErrors.priceFrom && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.priceFrom}</p>
              )}
            </div>
            <div>
              <Input
                type="number"
                placeholder="Máx (R$)"
                value={filters.priceTo || ''}
                onChange={(e) => updateFilter('priceTo', e.target.value ? Number(e.target.value) : undefined)}
              />
              {validationErrors.priceTo && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.priceTo}</p>
              )}
            </div>
          </div>
        </div>

        {/* Year Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Ano</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                placeholder="De"
                value={filters.yearFrom || ''}
                onChange={(e) => updateFilter('yearFrom', e.target.value ? Number(e.target.value) : undefined)}
              />
              {validationErrors.yearFrom && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.yearFrom}</p>
              )}
            </div>
            <div>
              <Input
                type="number"
                placeholder="Até"
                value={filters.yearTo || ''}
                onChange={(e) => updateFilter('yearTo', e.target.value ? Number(e.target.value) : undefined)}
              />
              {validationErrors.yearTo && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.yearTo}</p>
              )}
            </div>
          </div>
        </div>

        {/* Brand/Model Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Marca</label>
          <Input
            placeholder="Ex: Honda, Toyota..."
            value={filters.brand || ''}
            onChange={(e) => updateFilter('brand', e.target.value || undefined)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Modelo</label>
          <Input
            placeholder="Ex: Civic, Corolla..."
            value={filters.model || ''}
            onChange={(e) => updateFilter('model', e.target.value || undefined)}
          />
        </div>
      </div>
    </div>
  )
}