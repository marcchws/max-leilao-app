'use client'

import { useState } from 'react'
import { AdminUser, UserSearchFilters } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserPlus, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface UserManagementTableProps {
  users: AdminUser[]
  onUserAction: (userId: string, action: string, data?: any) => void
  onCreateUser: () => void
  isLoading?: boolean
}

export function UserManagementTable({ 
  users, 
  onUserAction, 
  onCreateUser, 
  isLoading = false 
}: UserManagementTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Filtrar usuários
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || user.subscriptionStatus === statusFilter
    const matchesActive = activeFilter === 'all' || 
                         (activeFilter === 'active' && user.isActive) ||
                         (activeFilter === 'inactive' && !user.isActive)
    
    return matchesSearch && matchesStatus && matchesActive
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Ativo</Badge>
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Trial</Badge>
      case 'expired':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Expirado</Badge>
      case 'suspended':
        return <Badge className="bg-orange-100 text-orange-800"><AlertTriangle className="h-3 w-3 mr-1" />Suspenso</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Gratuito</Badge>
    }
  }

  const getDaysUntilExpiry = (user: AdminUser) => {
    if (user.subscriptionStatus === 'trial' && user.trialEndDate) {
      const trialEnd = new Date(user.trialEndDate)
      const now = new Date()
      const diffTime = trialEnd.getTime() - now.getTime()
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return days > 0 ? days : 0
    }
    
    if (user.subscription?.currentPeriodEnd) {
      const periodEnd = new Date(user.subscription.currentPeriodEnd)
      const now = new Date()
      const diffTime = periodEnd.getTime() - now.getTime()
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return days > 0 ? days : 0
    }
    
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-4">
      {/* Filtros e Busca */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="trial">Trial</option>
              <option value="expired">Expirado</option>
              <option value="suspended">Suspenso</option>
              <option value="free">Gratuito</option>
            </select>
            
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
          
          <Button onClick={onCreateUser} className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Usuário
          </Button>
        </div>
      </Card>

      {/* Tabela de Usuários */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acesso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cadastro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Carregando usuários...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const daysUntilExpiry = getDaysUntilExpiry(user)
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                            {user.phone && (
                              <div className="text-xs text-gray-400">
                                {user.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {getStatusBadge(user.subscriptionStatus)}
                          {daysUntilExpiry !== null && daysUntilExpiry <= 3 && daysUntilExpiry > 0 && (
                            <div className="text-xs text-orange-600">
                              Expira em {daysUntilExpiry} dias
                            </div>
                          )}
                          {daysUntilExpiry === 0 && (
                            <div className="text-xs text-red-600">
                              Expirado hoje
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActivityAt ? formatDate(user.lastActivityAt) : 'Nunca'}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onUserAction(user.id, 'view')}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUserAction(user.id, 'edit')}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            
                            {user.subscriptionStatus === 'trial' && (
                              <DropdownMenuItem onClick={() => onUserAction(user.id, 'extend_trial')}>
                                <Clock className="h-4 w-4 mr-2" />
                                Estender Trial
                              </DropdownMenuItem>
                            )}
                            
                            {user.subscriptionStatus === 'expired' && (
                              <DropdownMenuItem onClick={() => onUserAction(user.id, 'grant_access')}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Conceder Acesso
                              </DropdownMenuItem>
                            )}
                            
                            {user.isActive ? (
                              <DropdownMenuItem 
                                onClick={() => onUserAction(user.id, 'suspend')}
                                className="text-orange-600"
                              >
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Suspender
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => onUserAction(user.id, 'activate')}
                                className="text-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Ativar
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem 
                              onClick={() => onUserAction(user.id, 'delete')}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginação */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-3 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {filteredUsers.length} de {users.length} usuários
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
