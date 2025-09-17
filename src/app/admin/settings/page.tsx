'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Save,
  RefreshCw,
  Shield,
  Bell,
  Database,
  Mail,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react'

export default function AdminSettingsPage() {
  const settings = [
    {
      id: 'general',
      title: 'Configurações Gerais',
      description: 'Configurações básicas do sistema',
      icon: Settings,
      items: [
        { name: 'Nome da Plataforma', value: 'Max Leilão', type: 'text' },
        { name: 'URL Base', value: 'https://maxleilao.com.br', type: 'url' },
        { name: 'Email de Contato', value: 'contato@maxleilao.com.br', type: 'email' },
        { name: 'Telefone de Suporte', value: '+55 11 99999-9999', type: 'tel' }
      ]
    },
    {
      id: 'security',
      title: 'Segurança',
      description: 'Configurações de segurança e acesso',
      icon: Shield,
      items: [
        { name: 'Sessão Admin (minutos)', value: '60', type: 'number' },
        { name: 'Tentativas de Login', value: '5', type: 'number' },
        { name: '2FA Obrigatório', value: 'Ativado', type: 'toggle' },
        { name: 'Log de Acessos', value: 'Ativado', type: 'toggle' }
      ]
    },
    {
      id: 'notifications',
      title: 'Notificações',
      description: 'Configurações de notificações do sistema',
      icon: Bell,
      items: [
        { name: 'Email de Notificações', value: 'notificacoes@maxleilao.com.br', type: 'email' },
        { name: 'WhatsApp Business', value: '+55 11 99999-9999', type: 'tel' },
        { name: 'Notificações Push', value: 'Ativado', type: 'toggle' },
        { name: 'Alertas por Email', value: 'Ativado', type: 'toggle' }
      ]
    },
    {
      id: 'database',
      title: 'Banco de Dados',
      description: 'Configurações de backup e manutenção',
      icon: Database,
      items: [
        { name: 'Backup Automático', value: 'Diário', type: 'select' },
        { name: 'Retenção de Logs (dias)', value: '90', type: 'number' },
        { name: 'Limpeza Automática', value: 'Ativado', type: 'toggle' },
        { name: 'Último Backup', value: 'Hoje 02:00', type: 'text' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
          <p className="text-gray-600 mt-1">
            Gerencie as configurações da plataforma
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Resetar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Status do Sistema</h3>
              <Badge className="bg-green-100 text-green-800 mt-1">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
            <Globe className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Usuários Online</h3>
              <p className="text-2xl font-bold text-gray-900">247</p>
            </div>
            <Smartphone className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Uptime</h3>
              <p className="text-2xl font-bold text-gray-900">99.9%</p>
            </div>
            <Lock className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Última Atualização</h3>
              <p className="text-sm font-bold text-gray-900">Há 2 horas</p>
            </div>
            <RefreshCw className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settings.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.id} className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {item.name}
                    </label>
                    {item.type === 'toggle' ? (
                      <div className="flex items-center space-x-2">
                        <Badge className={item.value === 'Ativado' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {item.value}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Alterar
                        </Button>
                      </div>
                    ) : item.type === 'select' ? (
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {item.value}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Alterar
                        </Button>
                      </div>
                    ) : (
                      <Input
                        type={item.type}
                        defaultValue={item.value}
                        className="w-full"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200 bg-red-50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-red-100 text-red-600 p-2 rounded-lg">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-red-900">Zona de Perigo</h3>
            <p className="text-sm text-red-700">Ações irreversíveis do sistema</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
            <div>
              <h4 className="font-medium text-red-900">Limpar Cache do Sistema</h4>
              <p className="text-sm text-red-700">Remove todos os dados em cache</p>
            </div>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
              Limpar Cache
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
            <div>
              <h4 className="font-medium text-red-900">Resetar Configurações</h4>
              <p className="text-sm text-red-700">Volta todas as configurações para o padrão</p>
            </div>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
              Resetar
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
            <div>
              <h4 className="font-medium text-red-900">Manutenção do Sistema</h4>
              <p className="text-sm text-red-700">Coloca o sistema em modo de manutenção</p>
            </div>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
              Ativar Manutenção
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
