'use client'

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
  
  const updateFilter = (key: keyof FilterType, value: string | number | undefined) => {
    if (!canUseFilters) return
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
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-700 mb-1">Filtros Avançados</h4>
            <p className="text-sm text-gray-500 mb-3">
              Use filtros avançados para encontrar exatamente o que procura
            </p>
            <Button
              onClick={() => window.location.href = '/subscription'}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Crown className="h-4 w-4 mr-2" />
              Desbloquear Filtros
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
            <Input
              type="number"
              placeholder="Mín (R$)"
              value={filters.priceFrom || ''}
              onChange={(e) => updateFilter('priceFrom', e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              type="number"
              placeholder="Máx (R$)"
              value={filters.priceTo || ''}
              onChange={(e) => updateFilter('priceTo', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        {/* Year Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Ano</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="De"
              value={filters.yearFrom || ''}
              onChange={(e) => updateFilter('yearFrom', e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              type="number"
              placeholder="Até"
              value={filters.yearTo || ''}
              onChange={(e) => updateFilter('yearTo', e.target.value ? Number(e.target.value) : undefined)}
            />
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