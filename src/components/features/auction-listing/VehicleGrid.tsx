'use client'

import { VehicleCard } from './VehicleCard'
import { Vehicle } from '@/lib/types'
import { useFavorites } from '@/contexts/FavoritesContext'

interface VehicleGridProps {
  vehicles: Vehicle[]
  className?: string
}

export function VehicleGrid({ vehicles, className }: VehicleGridProps) {
  const { isFavorited, toggleFavorite } = useFavorites()

  const handleFavoriteToggle = (vehicleId: string) => {
    toggleFavorite(vehicleId)
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          Nenhum veículo encontrado
        </div>
        <p className="text-gray-400 dark:text-gray-500 mt-2">
          Tente ajustar os filtros de busca
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorited={isFavorited(vehicle.id)}
        />
      ))}
    </div>
  )
}