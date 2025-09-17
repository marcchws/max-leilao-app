'use client'

import { Alert } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, BellOff, Edit, Trash2, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface AlertCardProps {
  alert: Alert
  onToggleActive: (alertId: string) => void
  onEdit: (alertId: string) => void
  onDelete: (alertId: string) => void
}

export function AlertCard({ alert, onToggleActive, onEdit, onDelete }: AlertCardProps) {
  const getFilterDescription = () => {
    const parts = []

    if (alert.filters.category) {
      const categoryLabels = {
        'car': 'Carro',
        'motorcycle': 'Moto',
        'heavy': 'Caminhão/Pesados'
      }
      parts.push(categoryLabels[alert.filters.category])
    }

    if (alert.filters.brand) {
      parts.push(alert.filters.brand)
    }

    if (alert.filters.model) {
      parts.push(alert.filters.model)
    }

    if (alert.filters.yearFrom || alert.filters.yearTo) {
      if (alert.filters.yearFrom && alert.filters.yearTo) {
        parts.push(`${alert.filters.yearFrom}-${alert.filters.yearTo}`)
      } else if (alert.filters.yearFrom) {
        parts.push(`a partir de ${alert.filters.yearFrom}`)
      } else if (alert.filters.yearTo) {
        parts.push(`até ${alert.filters.yearTo}`)
      }
    }

    if (alert.filters.priceFrom || alert.filters.priceTo) {
      if (alert.filters.priceFrom && alert.filters.priceTo) {
        parts.push(`R$ ${alert.filters.priceFrom.toLocaleString()} - R$ ${alert.filters.priceTo.toLocaleString()}`)
      } else if (alert.filters.priceFrom) {
        parts.push(`a partir de R$ ${alert.filters.priceFrom.toLocaleString()}`)
      } else if (alert.filters.priceTo) {
        parts.push(`até R$ ${alert.filters.priceTo.toLocaleString()}`)
      }
    }

    if (alert.filters.state) {
      parts.push(alert.filters.state)
    }

    if (alert.filters.city) {
      parts.push(alert.filters.city)
    }

    return parts.length > 0 ? parts.join(' • ') : 'Sem filtros específicos'
  }

  return (
    <div className="bg-card rounded-lg border p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{alert.name}</h3>
          <p className="text-sm text-muted-foreground">
            {getFilterDescription()}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant={alert.isActive ? 'default' : 'secondary'}>
            {alert.isActive ? 'Ativo' : 'Inativo'}
          </Badge>
          {alert.isActive ? (
            <Bell className="h-4 w-4 text-green-600" />
          ) : (
            <BellOff className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      {alert.lastTriggered && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            Última notificação: {formatDistanceToNow(new Date(alert.lastTriggered), {
              addSuffix: true,
              locale: ptBR
            })}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Criado em {new Date(alert.createdAt).toLocaleDateString('pt-BR')}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleActive(alert.id)}
          >
            {alert.isActive ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            {alert.isActive ? 'Pausar' : 'Ativar'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(alert.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(alert.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}