'use client'

import { useState } from 'react'
import { AdminUser, UserManagementAction } from '@/lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  User, 


  Shield
} from 'lucide-react'

interface UserActionsDialogProps {
  isOpen: boolean
  onClose: () => void
  user: AdminUser | null
  action: string
  onConfirm: (action: string, data: Record<string, unknown>) => void
}

export function UserActionsDialog({ 
  isOpen, 
  onClose, 
  user, 
  action, 
  onConfirm 
}: UserActionsDialogProps) {
  const [formData, setFormData] = useState({
    duration: '',
    reason: '',
    notes: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  if (!user) return null

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await onConfirm(action, formData)
      onClose()
      setFormData({ duration: '', reason: '', notes: '' })
    } catch (error) {
      console.error('Erro ao executar ação:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getActionTitle = () => {
    switch (action) {
      case 'extend_trial':
        return 'Estender Período de Trial'
      case 'grant_access':
        return 'Conceder Acesso Temporário'
      case 'suspend':
        return 'Suspender Usuário'
      case 'activate':
        return 'Ativar Usuário'
      case 'view':
        return 'Detalhes do Usuário'
      case 'edit':
        return 'Editar Usuário'
      case 'delete':
        return 'Excluir Usuário'
      default:
        return 'Ação do Usuário'
    }
  }

  const getActionIcon = () => {
    switch (action) {
      case 'extend_trial':
      case 'grant_access':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'suspend':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case 'activate':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'view':
        return <User className="h-5 w-5 text-gray-600" />
      case 'edit':
        return <User className="h-5 w-5 text-blue-600" />
      case 'delete':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Shield className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Ativo</Badge>
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Trial</Badge>
      case 'expired':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Expirado</Badge>
      case 'suspended':
        return <Badge className="bg-orange-100 text-orange-800"><AlertTriangle className="h-3 w-3 mr-1" />Suspenso</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Gratuito</Badge>
    }
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

  const renderActionForm = () => {
    switch (action) {
      case 'extend_trial':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estender por quantos dias?
              </label>
              <Input
                type="number"
                min="1"
                max="30"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Ex: 7"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo da extensão
              </label>
              <Input
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Ex: Problema com pagamento"
              />
            </div>
          </div>
        )

      case 'grant_access':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conceder acesso por quantas horas?
              </label>
              <Input
                type="number"
                min="1"
                max="168"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Ex: 48"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo do acesso temporário
              </label>
              <Input
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Ex: Problema com cartão de crédito"
              />
            </div>
          </div>
        )

      case 'suspend':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo da suspensão
              </label>
              <Input
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Ex: Violação dos termos de uso"
              />
            </div>
          </div>
        )

      case 'delete':
        return (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Atenção: Esta ação é irreversível
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Ao excluir este usuário, todos os dados associados serão removidos permanentemente, 
                      incluindo histórico de assinaturas, alertas e favoritos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo da exclusão
              </label>
              <Input
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Ex: Solicitação do usuário"
                required
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getConfirmButtonText = () => {
    switch (action) {
      case 'extend_trial':
        return 'Estender Trial'
      case 'grant_access':
        return 'Conceder Acesso'
      case 'suspend':
        return 'Suspender Usuário'
      case 'activate':
        return 'Ativar Usuário'
      case 'delete':
        return 'Excluir Usuário'
      default:
        return 'Confirmar'
    }
  }

  const getConfirmButtonVariant = () => {
    switch (action) {
      case 'delete':
        return 'destructive'
      case 'suspend':
        return 'secondary'
      default:
        return 'default'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getActionIcon()}
            {getActionTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Usuário */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-lg font-medium text-gray-700">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="mt-1">
                  {getStatusBadge(user.subscriptionStatus)}
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Cadastro:</span>
                <p className="font-medium">{formatDate(user.createdAt)}</p>
              </div>
              <div>
                <span className="text-gray-500">Último acesso:</span>
                <p className="font-medium">
                  {user.lastActivityAt ? formatDate(user.lastActivityAt) : 'Nunca'}
                </p>
              </div>
              {user.subscriptionStatus === 'trial' && user.trialEndDate && (
                <div className="col-span-2">
                  <span className="text-gray-500">Trial expira:</span>
                  <p className="font-medium">{formatDate(user.trialEndDate)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Formulário da Ação */}
          {renderActionForm()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            variant={getConfirmButtonVariant()}
            onClick={handleSubmit}
            disabled={isLoading || (action === 'extend_trial' && !formData.duration) || (action === 'grant_access' && !formData.duration)}
          >
            {isLoading ? 'Processando...' : getConfirmButtonText()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
