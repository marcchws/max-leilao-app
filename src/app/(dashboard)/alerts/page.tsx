'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCard } from '@/components/features/alerts/AlertCard'
import { CreateAlertDialog } from '@/components/features/alerts/CreateAlertDialog'
import { WhatsAppNotification, useWhatsAppNotifications } from '@/components/features/alerts/WhatsAppNotification'
import { AccessControl } from '@/hooks/useAccessControl'
import { TrialExpirationNotification } from '@/components/features/subscription/TrialExpirationNotification'
import { mockAlerts } from '@/lib/mock-data'
import { Alert, VehicleFilters } from '@/lib/types'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { Plus } from 'lucide-react'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { notifications, dismissNotification } = useWhatsAppNotifications()
  const { user, getDaysUntilExpiry } = useSubscription()

  const handleToggleActive = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, isActive: !alert.isActive }
          : alert
      )
    )
    console.log('Toggle alert active:', alertId)
  }

  const handleEditAlert = (alertId: string) => {
    console.log('Edit alert:', alertId)
  }

  const handleDeleteAlert = (alertId: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId))
    console.log('Delete alert:', alertId)
  }

  const handleCreateAlert = (name: string, filters: VehicleFilters) => {
    const newAlert: Alert = {
      id: Date.now().toString(),
      userId: 'user1',
      name,
      filters,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    setAlerts(prevAlerts => [newAlert, ...prevAlerts])
    console.log('Created new alert:', newAlert)
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
            Meus Alertas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Receba notificações quando novos veículos corresponderem aos seus critérios
          </p>
        </div>

      </div>

      {/* Alerts Grid - com controle de acesso */}
      <AccessControl feature="alerts">
        {alerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onToggleActive={handleToggleActive}
                onEdit={handleEditAlert}
                onDelete={handleDeleteAlert}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              Nenhum alerta criado ainda
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Alerta
            </Button>
          </div>
        )}
      </AccessControl>

      {/* Create Alert Dialog */}
      <CreateAlertDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateAlert}
      />

      {/* WhatsApp Notifications */}
      {notifications.map((notification) => (
        <WhatsAppNotification
          key={notification.id}
          alert={notification.alert}
          vehicleTitle={notification.vehicleTitle}
          vehicleLink={notification.vehicleLink}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}
    </div>
  )
}