'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { VehicleGrid } from '@/components/features/auction-listing/VehicleGrid'
import { useFavorites } from '@/contexts/FavoritesContext'
import { AccessControl } from '@/hooks/useAccessControl'
import { TrialExpirationNotification } from '@/components/features/subscription/TrialExpirationNotification'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { Heart, Trash2 } from 'lucide-react'

export default function FavoritesPage() {
  const { favoriteVehicles, clearAllFavorites } = useFavorites()
  const { user, getDaysUntilExpiry } = useSubscription()
  const [showClearConfirmation, setShowClearConfirmation] = useState(false)

  const handleClearAllFavorites = () => {
    setShowClearConfirmation(true)
  }

  const confirmClearAll = () => {
    clearAllFavorites()
    setShowClearConfirmation(false)
  }

  return (
    <div className="space-y-6">
      {/* Notificação de Expiração do Trial */}
      {user?.subscriptionStatus === 'trial' && (
        <TrialExpirationNotification
          daysRemaining={getDaysUntilExpiry()}
          onSubscribe={() => window.location.href = '/subscription'}
        />
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Meus Favoritos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Acompanhe os veículos que você tem interesse
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-900 dark:text-red-100">
                {favoriteVehicles.length} veículo{favoriteVehicles.length !== 1 ? 's' : ''} favorito{favoriteVehicles.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {favoriteVehicles.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAllFavorites}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Todos
            </Button>
          )}
        </div>
      </div>

      {/* Favorites Content - com controle de acesso */}
      <AccessControl feature="favorites">
        {favoriteVehicles.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="font-semibold text-blue-900 dark:text-blue-100">
                  Seus Veículos Favoritos
                </h2>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Os lances e informações são atualizados automaticamente. Clique em qualquer veículo para acessar o leilão original.
              </p>
            </div>

            <VehicleGrid vehicles={favoriteVehicles} />
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6">
              <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum favorito ainda
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Navegue pelos veículos e clique no ❤️ para adicionar seus favoritos aqui
            </p>
            <Button
              onClick={() => window.location.href = '/vehicles'}
              className="bg-red-600 hover:bg-red-700"
            >
              <Heart className="h-4 w-4 mr-2" />
              Explorar Veículos
            </Button>
          </div>
        )}
      </AccessControl>

      {/* Modal de Confirmação */}
      <Dialog open={showClearConfirmation} onOpenChange={setShowClearConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja remover todos os seus favoritos? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClearConfirmation(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmClearAll}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}