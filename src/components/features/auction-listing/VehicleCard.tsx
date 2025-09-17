'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Vehicle } from '@/lib/types'
import { Heart, MapPin, Calendar, ExternalLink, Lock, AlertTriangle } from 'lucide-react'
import { useAccessControl } from '@/hooks/useAccessControl'

interface VehicleCardProps {
  vehicle: Vehicle
  onFavoriteToggle?: (vehicleId: string) => void
  isFavorited?: boolean
}

export function VehicleCard({ vehicle, onFavoriteToggle, isFavorited = false }: VehicleCardProps) {
  const { canUseFavorites } = useAccessControl()
  const [isCheckingLink, setIsCheckingLink] = useState(false)
  const [linkStatus, setLinkStatus] = useState<'unknown' | 'available' | 'unavailable'>('unknown')
  
  const checkLinkStatus = async (url: string): Promise<'available' | 'unavailable'> => {
    try {
      await fetch(url, { 
        method: 'HEAD',
        mode: 'no-cors' // Para evitar CORS issues
      })
      return 'available'
    } catch {
      return 'unavailable'
    }
  }

  const handleBidClick = async () => {
    // Verificação de URL válida antes do redirecionamento
    if (!vehicle.originalUrl || vehicle.originalUrl === '') {
      alert('❌ URL do anúncio não disponível para este veículo.\n\nEntre em contato com o suporte se o problema persistir.')
      return
    }

    setIsCheckingLink(true)
    
    try {
      // Verificar status do link
      const status = await checkLinkStatus(vehicle.originalUrl)
      setLinkStatus(status)
      
      if (status === 'unavailable') {
        alert('⚠️ O site do leiloeiro parece estar temporariamente fora do ar.\n\nPor favor, tente novamente mais tarde ou entre em contato diretamente com o leiloeiro.')
        return
      }
      
      // Abre em nova aba se o link estiver disponível
      window.open(vehicle.originalUrl, '_blank', 'noopener,noreferrer')
      
    } catch (error) {
      console.error('Erro ao verificar link:', error)
      // Mesmo com erro, tenta abrir o link
      window.open(vehicle.originalUrl, '_blank', 'noopener,noreferrer')
    } finally {
      setIsCheckingLink(false)
    }
  }

  const handleFavoriteClick = () => {
    if (!canUseFavorites) {
      // Mostra alerta específico para favoritos
      alert('⭐ Lista de Favoritos é Premium!\n\nSalve veículos de interesse e acompanhe lances em tempo real.\n\nExperimente 7 dias grátis!')
      window.location.href = '/subscription'
      return
    }
    onFavoriteToggle?.(vehicle.id)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      {/* Vehicle Image */}
      <div className="relative h-48 w-full">
        <Image
          src={vehicle.images[0] || '/placeholder-car.jpg'}
          alt={vehicle.title}
          fill
          className="object-cover rounded-t-lg"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors ${
            !canUseFavorites ? 'cursor-pointer' : ''
          }`}
          title={!canUseFavorites ? 'Lista de Favoritos - Funcionalidade Premium (clique para saber mais)' : ''}
        >
          {canUseFavorites ? (
            <Heart
              className={`h-4 w-4 ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          ) : (
            <Lock className="h-4 w-4 text-gray-400" />
          )}
        </button>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="capitalize">
            {vehicle.category === 'car' ? 'Carro' :
             vehicle.category === 'motorcycle' ? 'Moto' : 'Pesado'}
          </Badge>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {vehicle.title}
        </h3>

        {/* Current Bid */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">Lance atual</p>
          <p className="text-xl font-bold text-green-600">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(vehicle.currentBid)}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(vehicle.auctionDate).toLocaleDateString('pt-BR')}
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2" />
            {vehicle.location.city}, {vehicle.location.state}
          </div>
        </div>

        {/* Auctioneer Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Image
              src={vehicle.auctioneerLogo}
              alt={vehicle.auctioneerName}
              width={24}
              height={24}
              className="rounded"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {vehicle.auctioneerName}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleBidClick}
          className="w-full"
          disabled={isCheckingLink || linkStatus === 'unavailable'}
        >
          {isCheckingLink ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Verificando...
            </>
          ) : linkStatus === 'unavailable' ? (
            <>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Site Indisponível
            </>
          ) : (
            <>
              <ExternalLink className="h-4 w-4 mr-2" />
              Dar Lance
            </>
          )}
        </Button>
      </div>
    </div>
  )
}