'use client'

import React, { useState } from 'react'
import { AdminNotification } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  AlertTriangle, 
  CreditCard, 
  UserX, 
  Bell,
  CheckCircle,
  X,
  Eye,
  EyeOff
} from 'lucide-react'

interface AdminNotificationCardProps {
  notification: AdminNotification
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
}

export function AdminNotificationCard({ 
  notification, 
  onMarkAsRead, 
  onDismiss 
}: AdminNotificationCardProps) {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'payment_failed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'subscription_canceled':
        return <UserX className="h-5 w-5 text-orange-500" />
      case 'trial_ending':
        return <Bell className="h-5 w-5 text-yellow-500" />
      case 'new_subscription':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationColor = () => {
    switch (notification.type) {
      case 'payment_failed':
        return 'border-red-200 bg-red-50'
      case 'subscription_canceled':
        return 'border-orange-200 bg-orange-50'
      case 'trial_ending':
        return 'border-yellow-200 bg-yellow-50'
      case 'new_subscription':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getNotificationBadge = () => {
    switch (notification.type) {
      case 'payment_failed':
        return <Badge className="bg-red-100 text-red-800">Pagamento Falhou</Badge>
      case 'subscription_canceled':
        return <Badge className="bg-orange-100 text-orange-800">Assinatura Cancelada</Badge>
      case 'trial_ending':
        return <Badge className="bg-yellow-100 text-yellow-800">Trial Terminando</Badge>
      case 'new_subscription':
        return <Badge className="bg-green-100 text-green-800">Nova Assinatura</Badge>
      default:
        return <Badge variant="secondary">Notificação</Badge>
    }
  }

  return (
    <Card className={`p-4 ${getNotificationColor()} ${notification.isRead ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {getNotificationIcon()}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
              {getNotificationBadge()}
            </div>
            <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(notification.createdAt).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!notification.isRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkAsRead(notification.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(notification.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

interface AdminNotificationsPanelProps {
  notifications: AdminNotification[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
  onMarkAllAsRead: () => void
  onDismissAll: () => void
}

export function AdminNotificationsPanel({
  notifications,
  onMarkAsRead,
  onDismiss,
  onMarkAllAsRead,
  onDismissAll
}: AdminNotificationsPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead
    if (filter === 'read') return notification.isRead
    return true
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Notificações Administrativas
          </h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {unreadCount} não lidas
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            <Eye className="h-4 w-4 mr-2" />
            Marcar Todas como Lidas
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDismissAll}
            disabled={notifications.length === 0}
          >
            <X className="h-4 w-4 mr-2" />
            Descartar Todas
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Todas ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          Não Lidas ({unreadCount})
        </Button>
        <Button
          variant={filter === 'read' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('read')}
        >
          Lidas ({notifications.length - unreadCount})
        </Button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <AdminNotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onDismiss={onDismiss}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma notificação
          </h3>
          <p className="text-gray-600">
            {filter === 'unread' 
              ? 'Não há notificações não lidas no momento.'
              : filter === 'read'
              ? 'Não há notificações lidas.'
              : 'Não há notificações no momento.'
            }
          </p>
        </Card>
      )}
    </div>
  )
}
