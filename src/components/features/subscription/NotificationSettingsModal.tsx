'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bell, 
  Mail, 
  MessageSquare,
  Smartphone,
  Check,
  AlertCircle
} from 'lucide-react'

interface NotificationSettings {
  email: {
    newVehicles: boolean
    priceAlerts: boolean
    auctionReminders: boolean
    paymentReminders: boolean
    systemUpdates: boolean
  }
  whatsapp: {
    newVehicles: boolean
    priceAlerts: boolean
    auctionReminders: boolean
  }
  push: {
    newVehicles: boolean
    priceAlerts: boolean
    auctionReminders: boolean
  }
}

interface NotificationSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationSettingsModal({ isOpen, onClose }: NotificationSettingsModalProps) {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      newVehicles: true,
      priceAlerts: true,
      auctionReminders: true,
      paymentReminders: true,
      systemUpdates: false
    },
    whatsapp: {
      newVehicles: true,
      priceAlerts: true,
      auctionReminders: false
    },
    push: {
      newVehicles: true,
      priceAlerts: false,
      auctionReminders: false
    }
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleToggle = (category: keyof NotificationSettings, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[category]]
      }
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess('Configurações salvas com sucesso!')
      setTimeout(() => {
        onClose()
      }, 1500)
      
    } catch (err) {
      setError('Erro ao salvar configurações. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setError('')
    setSuccess('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Configurações de Notificações
          </DialogTitle>
          <p className="text-center text-gray-600">
            Configure como você deseja receber notificações
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Notifications */}
          <Card className="p-4">
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Notificações por Email</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { key: 'newVehicles', label: 'Novos veículos disponíveis', desc: 'Receba alertas quando novos veículos forem adicionados' },
                { key: 'priceAlerts', label: 'Alertas de preço', desc: 'Notificações quando preços dos seus favoritos mudarem' },
                { key: 'auctionReminders', label: 'Lembretes de leilão', desc: 'Lembretes antes dos leilões começarem' },
                { key: 'paymentReminders', label: 'Lembretes de pagamento', desc: 'Notificações sobre vencimento de assinatura' },
                { key: 'systemUpdates', label: 'Atualizações do sistema', desc: 'Novidades e melhorias da plataforma' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggle('email', item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.email[item.key as keyof typeof settings.email] 
                        ? 'bg-blue-600' 
                        : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.email[item.key as keyof typeof settings.email] 
                          ? 'translate-x-6' 
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* WhatsApp Notifications */}
          <Card className="p-4">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold">Notificações por WhatsApp</h3>
              <Badge variant="secondary" className="ml-2">Premium</Badge>
            </div>
            
            <div className="space-y-3">
              {[
                { key: 'newVehicles', label: 'Novos veículos disponíveis', desc: 'Receba alertas quando novos veículos forem adicionados' },
                { key: 'priceAlerts', label: 'Alertas de preço', desc: 'Notificações quando preços dos seus favoritos mudarem' },
                { key: 'auctionReminders', label: 'Lembretes de leilão', desc: 'Lembretes antes dos leilões começarem' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggle('whatsapp', item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.whatsapp[item.key as keyof typeof settings.whatsapp] 
                        ? 'bg-green-600' 
                        : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.whatsapp[item.key as keyof typeof settings.whatsapp] 
                          ? 'translate-x-6' 
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Push Notifications */}
          <Card className="p-4">
            <div className="flex items-center mb-4">
              <Smartphone className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold">Notificações Push</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { key: 'newVehicles', label: 'Novos veículos disponíveis', desc: 'Receba alertas quando novos veículos forem adicionados' },
                { key: 'priceAlerts', label: 'Alertas de preço', desc: 'Notificações quando preços dos seus favoritos mudarem' },
                { key: 'auctionReminders', label: 'Lembretes de leilão', desc: 'Lembretes antes dos leilões começarem' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggle('push', item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.push[item.key as keyof typeof settings.push] 
                        ? 'bg-purple-600' 
                        : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.push[item.key as keyof typeof settings.push] 
                          ? 'translate-x-6' 
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Messages */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <Check className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
