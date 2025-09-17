'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3
} from 'lucide-react'

export default function AdminReportsPage() {
  const mockReports = [
    {
      id: '1',
      name: 'Relatório de Usuários',
      description: 'Análise completa da base de usuários e conversões',
      type: 'users',
      lastGenerated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      icon: Users
    },
    {
      id: '2',
      name: 'Relatório Financeiro',
      description: 'Receitas, churn e métricas financeiras',
      type: 'financial',
      lastGenerated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      icon: DollarSign
    },
    {
      id: '3',
      name: 'Relatório de Crescimento',
      description: 'Crescimento de usuários e engajamento',
      type: 'growth',
      lastGenerated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      icon: TrendingUp
    },
    {
      id: '4',
      name: 'Relatório de Assinaturas',
      description: 'Análise de planos e conversões',
      type: 'subscriptions',
      lastGenerated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      icon: BarChart3
    }
  ]

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Relatórios e Análises</h1>
          <p className="text-gray-600 mt-1">
            Gere relatórios detalhados sobre o sistema
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-4 w-4 mr-2" />
          Agendar Relatório
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Relatórios Gerados</h3>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Este Mês</h3>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Downloads</h3>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Download className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray-600">Agendados</h3>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockReports.map((report) => {
          const Icon = report.icon
          return (
            <Card key={report.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Última geração:</p>
                <p className="text-sm text-gray-700">{formatDate(report.lastGenerated)}</p>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Gerar Novo
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="p-6">
          <h3 className="font-semibold mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Relatório de Usuários gerado</p>
                <p className="text-xs text-gray-500">Há 2 horas</p>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Relatório Financeiro agendado</p>
                <p className="text-xs text-gray-500">Há 4 horas</p>
              </div>
              <Button size="sm" variant="outline">
                Ver
              </Button>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Relatório de Assinaturas baixado</p>
                <p className="text-xs text-gray-500">Ontem</p>
              </div>
              <Button size="sm" variant="outline">
                Regenerar
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
