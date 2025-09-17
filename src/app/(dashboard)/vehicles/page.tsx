'use client'

import { useState, useEffect } from 'react'
import { VehicleGrid } from '@/components/features/auction-listing/VehicleGrid'
import { VehicleFilters as VehicleFiltersComponent } from '@/components/features/filters/VehicleFilters'
import { CreateAlertDialog } from '@/components/features/alerts/CreateAlertDialog'
import { AccessControl } from '@/hooks/useAccessControl'
import { TrialExpirationNotification } from '@/components/features/subscription/TrialExpirationNotification'
import { LimitedAccessBanner } from '@/components/features/subscription/LimitedAccessBanner'
import { Vehicle, VehicleFilters } from '@/lib/types'
import { mockVehicles } from '@/lib/mock-data'
import { useAuth } from '@/contexts/AuthContext'
import { Search } from 'lucide-react'

export default function VehiclesPage() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles)
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles)
  const [filters, setFilters] = useState<VehicleFilters>({})
  const [isCreateAlertDialogOpen, setIsCreateAlertDialogOpen] = useState(false)
  const [alertFilters, setAlertFilters] = useState<VehicleFilters>({})
  
  const { user, isAuthenticated } = useAuth()
  
  // Função para calcular dias até expiração do trial
  const getDaysUntilExpiry = () => {
    if (user?.subscriptionStatus === 'trial' && user?.trialEndDate) {
      const trialEnd = new Date(user.trialEndDate)
      const now = new Date()
      const diffTime = trialEnd.getTime() - now.getTime()
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return days > 0 ? days : 0
    }
    return 0
  }
  
  // Funções de controle de acesso
  const canViewVehicles = () => true // Todos podem ver veículos
  const canUsePremiumFeatures = () => {
    return user?.subscriptionStatus === 'active' || user?.subscriptionStatus === 'trial'
  }

  // Aplicar filtros aos veículos
  useEffect(() => {
    let filtered = [...vehicles]

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(vehicle => vehicle.category === filters.category)
    }

    // Filtro por estado
    if (filters.state) {
      filtered = filtered.filter(vehicle =>
        vehicle.location.state.toLowerCase().includes(filters.state.toLowerCase())
      )
    }

    // Filtro por cidade
    if (filters.city) {
      filtered = filtered.filter(vehicle =>
        vehicle.location.city.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    // Filtro por faixa de preço
    if (filters.priceFrom && filters.priceFrom > 0) {
      filtered = filtered.filter(vehicle => vehicle.currentBid >= filters.priceFrom!)
    }
    if (filters.priceTo && filters.priceTo > 0) {
      filtered = filtered.filter(vehicle => vehicle.currentBid <= filters.priceTo!)
    }

    // Filtro por faixa de ano
    if (filters.yearFrom && filters.yearFrom > 0) {
      filtered = filtered.filter(vehicle => vehicle.year >= filters.yearFrom!)
    }
    if (filters.yearTo && filters.yearTo > 0) {
      filtered = filtered.filter(vehicle => vehicle.year <= filters.yearTo!)
    }

    // Filtro por marca
    if (filters.brand) {
      filtered = filtered.filter(vehicle =>
        vehicle.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      )
    }

    // Filtro por modelo
    if (filters.model) {
      filtered = filtered.filter(vehicle =>
        vehicle.model.toLowerCase().includes(filters.model!.toLowerCase())
      )
    }

    setFilteredVehicles(filtered)
  }, [vehicles, filters])

  const handleFiltersChange = (newFilters: VehicleFilters) => {
    setFilters(newFilters)
  }

  const handleSaveAlert = (filters: VehicleFilters) => {
    setAlertFilters(filters)
    setIsCreateAlertDialogOpen(true)
  }

  const handleCreateAlert = (name: string, filters: VehicleFilters) => {
    console.log('Alert created from vehicles page:', { name, filters })
    alert(`Alerta "${name}" criado com sucesso! Você receberá notificações no WhatsApp quando novos veículos correspondentes aos seus filtros forem encontrados.`)
  }

  const activeFiltersCount = [
    filters.category ? 1 : 0,
    filters.state ? 1 : 0,
    filters.city ? 1 : 0,
    (filters.priceFrom && filters.priceFrom > 0) || (filters.priceTo && filters.priceTo > 0) ? 1 : 0,
    (filters.yearFrom && filters.yearFrom > 0) || (filters.yearTo && filters.yearTo > 0) ? 1 : 0,
    filters.brand ? 1 : 0,
    filters.model ? 1 : 0
  ].reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-6">
      {/* Notificação de Expiração do Trial */}
      {user?.subscriptionStatus === 'trial' && (
        <TrialExpirationNotification
          daysRemaining={getDaysUntilExpiry()}
          onSubscribe={() => window.location.href = '/subscription'}
        />
      )}

      {/* Banner de Acesso Limitado para usuários não logados */}
      {!isAuthenticated && (
        <LimitedAccessBanner
          onSignUp={() => window.location.href = '/subscription'}
          onLogin={() => window.location.href = '/login'}
        />
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Veículos em Leilão
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Encontre as melhores oportunidades de compra em leilões de veículos
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {filteredVehicles.length} veículo{filteredVehicles.length !== 1 ? 's' : ''} encontrado{filteredVehicles.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} ativo{activeFiltersCount !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filters - com controle de acesso */}
      <AccessControl feature="filters">
        <VehicleFiltersComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onSaveAlert={handleSaveAlert}
        />
      </AccessControl>

      {/* Vehicle Grid */}
      <VehicleGrid vehicles={filteredVehicles} />

      {/* Results Summary */}
      {filteredVehicles.length > 0 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t">
          Exibindo {filteredVehicles.length} de {vehicles.length} veículos disponíveis
        </div>
      )}

      {/* Create Alert Dialog */}
      <CreateAlertDialog
        isOpen={isCreateAlertDialogOpen}
        onClose={() => setIsCreateAlertDialogOpen(false)}
        onSave={handleCreateAlert}
        initialFilters={alertFilters}
      />
    </div>
  )
}