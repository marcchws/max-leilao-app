'use client'

import { Alert } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { MessageSquare, ExternalLink, X } from 'lucide-react'
import { useState } from 'react'

interface WhatsAppNotificationProps {
  alert: Alert
  vehicleTitle: string
  vehicleLink: string
  onDismiss: () => void
}

export function WhatsAppNotification({ alert, vehicleTitle, vehicleLink, onDismiss }: WhatsAppNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss()
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-green-600 text-white rounded-lg shadow-lg p-4 z-50 animate-slide-up">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span className="font-semibold text-sm">WhatsApp - Max Leilão</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="text-white hover:bg-green-700 h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm">
          🚗 <strong>Novo veículo encontrado!</strong>
        </p>
        <p className="text-sm">
          Alerta: <em>&ldquo;{alert.name}&rdquo;</em>
        </p>
        <p className="text-sm font-medium">
          {vehicleTitle}
        </p>

        <div className="pt-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-full bg-white text-green-600 hover:bg-gray-100"
            onClick={() => window.open(vehicleLink, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Ver Veículo
          </Button>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-green-500 text-xs opacity-75">
        📱 Esta é uma simulação de notificação WhatsApp
      </div>
    </div>
  )
}

// Hook para simular notificações WhatsApp
export function useWhatsAppNotifications() {
  const [notifications, setNotifications] = useState<Array<{
    id: string
    alert: Alert
    vehicleTitle: string
    vehicleLink: string
  }>>([])

  const simulateNotification = (alert: Alert, vehicleTitle: string, vehicleLink: string) => {
    const notification = {
      id: Date.now().toString(),
      alert,
      vehicleTitle,
      vehicleLink
    }

    setNotifications(prev => [...prev, notification])

    // Auto remove after 8 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
    }, 8000)
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return {
    notifications,
    simulateNotification,
    dismissNotification
  }
}