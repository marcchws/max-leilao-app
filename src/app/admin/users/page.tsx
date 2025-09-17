'use client'

import { useState, useEffect } from 'react'
import { AdminUser, CreateUserRequest, UserManagementAction } from '@/lib/types'
import { mockAdminUsers, mockUserActions } from '@/lib/mock-data'
import { UserManagementTable } from '@/components/features/admin/UserManagementTable'
import { UserActionsDialog } from '@/components/features/admin/UserActionsDialog'
import { AddUserDialog } from '@/components/features/admin/AddUserDialog'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  UserCheck, 
  Clock, 
  AlertTriangle
} from 'lucide-react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [, setUserActions] = useState<UserManagementAction[]>([])
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [selectedAction, setSelectedAction] = useState<string>('')
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados mock
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simular carregamento
        await new Promise(resolve => setTimeout(resolve, 1000))
        setUsers(mockAdminUsers)
        setUserActions(mockUserActions)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Calcular métricas
  const metrics = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    trialUsers: users.filter(u => u.subscriptionStatus === 'trial').length,
    expiredUsers: users.filter(u => u.subscriptionStatus === 'expired').length,
    suspendedUsers: users.filter(u => u.subscriptionStatus === 'suspended').length,
    trialEndingSoon: users.filter(u => {
      if (u.subscriptionStatus !== 'trial' || !u.trialEndDate) return false
      const trialEnd = new Date(u.trialEndDate)
      const now = new Date()
      const diffTime = trialEnd.getTime() - now.getTime()
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return days <= 3 && days > 0
    }).length
  }

  // Handlers para ações
  const handleUserAction = (userId: string, action: string, data?: Record<string, unknown>) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    setSelectedUser(user)
    setSelectedAction(action)
    setIsActionDialogOpen(true)
  }

  const handleConfirmAction = async (action: string, data: Record<string, unknown>) => {
    if (!selectedUser) return

    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000))

      const updatedUser = { ...selectedUser }
      let newAction: UserManagementAction | null = null

      switch (action) {
        case 'extend_trial':
          if (data.duration) {
            const days = parseInt(data.duration as string)
            const newTrialEnd = new Date()
            newTrialEnd.setDate(newTrialEnd.getDate() + days)
            
            updatedUser.trialEndDate = newTrialEnd.toISOString()
            updatedUser.subscriptionStatus = 'trial'
            updatedUser.isActive = true
            
            newAction = {
              id: `action_${Date.now()}`,
              userId: selectedUser.id,
              type: 'extend_trial',
              description: `Trial estendido por ${days} dias`,
              duration: days * 24,
              reason: (data.reason as string) || 'Extensão administrativa',
              performedBy: 'Vitor (Admin)',
              performedAt: new Date().toISOString(),
              expiresAt: newTrialEnd.toISOString()
            }
          }
          break

        case 'grant_access':
          if (data.duration) {
            const hours = parseInt(data.duration as string)
            const expiresAt = new Date()
            expiresAt.setHours(expiresAt.getHours() + hours)
            
            updatedUser.isActive = true
            updatedUser.subscriptionStatus = 'active'
            
            newAction = {
              id: `action_${Date.now()}`,
              userId: selectedUser.id,
              type: 'grant_access',
              description: `Acesso temporário concedido por ${hours} horas`,
              duration: hours,
              reason: (data.reason as string) || 'Acesso administrativo',
              performedBy: 'Vitor (Admin)',
              performedAt: new Date().toISOString(),
              expiresAt: expiresAt.toISOString()
            }
          }
          break

        case 'suspend':
          updatedUser.isActive = false
          updatedUser.subscriptionStatus = 'suspended'
          
          newAction = {
            id: `action_${Date.now()}`,
            userId: selectedUser.id,
            type: 'suspend_user',
            description: 'Usuário suspenso',
            reason: (data.reason as string) || 'Suspensão administrativa',
            performedBy: 'Vitor (Admin)',
            performedAt: new Date().toISOString()
          }
          break

        case 'activate':
          updatedUser.isActive = true
          if (updatedUser.subscriptionStatus === 'suspended') {
            updatedUser.subscriptionStatus = 'active'
          }
          
          newAction = {
            id: `action_${Date.now()}`,
            userId: selectedUser.id,
            type: 'activate_user',
            description: 'Usuário ativado',
            reason: (data.reason as string) || 'Ativação administrativa',
            performedBy: 'Vitor (Admin)',
            performedAt: new Date().toISOString()
          }
          break

        case 'delete':
          setUsers(prev => prev.filter(u => u.id !== selectedUser.id))
          setIsActionDialogOpen(false)
          return
      }

      // Atualizar usuário
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? updatedUser : u))

      // Adicionar ação ao histórico
      if (newAction) {
        setUserActions(prev => [newAction!, ...prev])
      }

      setIsActionDialogOpen(false)
    } catch (error) {
      console.error('Erro ao executar ação:', error)
    }
  }

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newUser: AdminUser = {
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        subscriptionStatus: userData.subscriptionStatus,
        trialEndDate: userData.subscriptionStatus === 'trial' 
          ? new Date(Date.now() + (userData.trialDays || 7) * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
        createdAt: new Date().toISOString(),
        lastLoginAt: undefined,
        lastActivityAt: undefined,
        totalLogins: 0,
        isActive: true,
        notes: userData.notes
      }

      setUsers(prev => [newUser, ...prev])
      setIsAddUserDialogOpen(false)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-gray-600 mt-1">
            Gerencie usuários, assinaturas e conceda exceções
          </p>
        </div>
        <Button 
          onClick={() => setIsAddUserDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Adicionar Usuário
        </Button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Total de Usuários</h3>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Usuários Ativos</h3>
              <p className="text-2xl font-bold text-gray-900">{metrics.activeUsers}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Em Trial</h3>
              <p className="text-2xl font-bold text-gray-900">{metrics.trialUsers}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Trial Terminando</h3>
              <p className="text-2xl font-bold text-gray-900">{metrics.trialEndingSoon}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Alertas */}
      {metrics.trialEndingSoon > 0 && (
        <Card className="p-4 border-orange-200 bg-orange-50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-800">
                {metrics.trialEndingSoon} usuário(s) com trial terminando em breve
              </h3>
              <p className="text-sm text-orange-700">
                Considere entrar em contato ou estender o período de trial
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Tabela de Usuários */}
      <UserManagementTable
        users={users}
        onUserAction={handleUserAction}
        onCreateUser={() => setIsAddUserDialogOpen(true)}
        isLoading={isLoading}
      />

      {/* Dialogs */}
      <UserActionsDialog
        isOpen={isActionDialogOpen}
        onClose={() => setIsActionDialogOpen(false)}
        user={selectedUser}
        action={selectedAction}
        onConfirm={handleConfirmAction}
      />

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onClose={() => setIsAddUserDialogOpen(false)}
        onCreateUser={handleCreateUser}
      />
    </div>
  )
}