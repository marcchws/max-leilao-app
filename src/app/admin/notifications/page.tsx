'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Bell,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

export default function AdminNotificationsPage() {
  const mockNotifications = [
    {
      id: '1',
      type: 'payment_failed',
      title: 'Pagamento falhou - João Silva',
      message: 'O pagamento da assinatura do usuário João Silva falhou. Valor: R$ 29,90',
      isRead: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      type: 'trial_ending',
      title: 'Trial terminando - Maria Santos',
      message: 'O período de teste do usuário Maria Santos termina em 2 dias',
      isRead: false,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      type: 'new_subscription',
      title: 'Nova assinatura - Pedro Costa',
      message: 'Pedro Costa assinou o Plano Premium. Valor: R$ 49,90/mês',
      isRead: true,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment_failed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'trial_ending':
        return <Bell className="h-5 w-5 text-orange-600" />
      case 'new_subscription':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'payment_failed':
        return <Badge className="bg-red-100 text-red-800">Pagamento</Badge>
      case 'trial_ending':
        return <Badge className="bg-orange-100 text-orange-800">Trial</Badge>
      case 'new_subscription':
        return <Badge className="bg-green-100 text-green-800">Nova Assinatura</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Geral</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Central de Notificações</h1>
          <p className="text-gray-600 mt-1">
            Gerencie todas as notificações do sistema
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Marcar Todas como Lidas
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Total</h3>
              <p className="text-2xl font-bold text-gray-900">{mockNotifications.length}</p>
            </div>
            <Bell className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Não Lidas</h3>
              <p className="text-2xl font-bold text-gray-900">
                {mockNotifications.filter(n => !n.isRead).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Lidas</h3>
              <p className="text-2xl font-bold text-gray-900">
                {mockNotifications.filter(n => n.isRead).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <div className="p-6">
          <h3 className="font-semibold mb-4">Notificações Recentes</h3>
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.isRead 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-white border-blue-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {getNotificationBadge(notification.type)}
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
