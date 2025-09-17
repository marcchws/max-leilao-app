'use client'

import { useState, useEffect } from 'react'
import { AdminNotificationsPanel } from '@/components/features/admin/AdminNotifications'
import { DashboardMetricsComponent } from '@/components/features/admin/DashboardMetrics'
import { RankingLeiloeiros } from '@/components/features/admin/RankingLeiloeiros'
import { AdminNotification } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  AlertTriangle,
  BarChart3,
  TrendingUp
} from 'lucide-react'

export default function AdminDashboard() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([])

  // Mock data - substituir por chamadas reais da API
  useEffect(() => {
    const loadMockData = async () => {
      // Mock notifications
      const mockNotifications: AdminNotification[] = [
        {
          id: '1',
          type: 'payment_failed',
          title: 'Pagamento falhou - João Silva',
          message: 'O pagamento da assinatura do usuário João Silva falhou. Valor: R$ 29,90',
          userId: 'user1',
          subscriptionId: 'sub1',
          isRead: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          type: 'new_subscription',
          title: 'Nova assinatura - Maria Santos',
          message: 'Maria Santos assinou o Plano Premium. Valor: R$ 49,90/mês',
          userId: 'user2',
          subscriptionId: 'sub2',
          isRead: false,
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          type: 'trial_ending',
          title: 'Trial terminando - Pedro Costa',
          message: 'O período de teste do usuário Pedro Costa termina em 2 dias',
          userId: 'user3',
          isRead: true,
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '4',
          type: 'subscription_canceled',
          title: 'Assinatura cancelada - Ana Lima',
          message: 'Ana Lima cancelou sua assinatura do Plano Básico',
          userId: 'user4',
          subscriptionId: 'sub4',
          isRead: true,
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        }
      ]

      setNotifications(mockNotifications)
    }

    loadMockData()
  }, [])

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const handleDismiss = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const handleDismissAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        {unreadCount > 0 && (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {unreadCount} notificações não lidas
          </Badge>
        )}
      </div>

      {/* Dashboard de Métricas */}
      <DashboardMetricsComponent />

      {/* Notifications */}
      <AdminNotificationsPanel
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDismiss={handleDismiss}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDismissAll={handleDismissAll}
      />

      {/* Ranking de Leiloeiros */}
      <RankingLeiloeiros />

      {/* Gráficos Adicionais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold">Crescimento de Usuários</h3>
          </div>
          <div className="text-sm text-gray-500">
            Gráfico de crescimento será implementado aqui
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold">Receita por Período</h3>
          </div>
          <div className="text-sm text-gray-500">
            Gráfico de receita será implementado aqui
          </div>
        </Card>
      </div>
    </div>
  )
}