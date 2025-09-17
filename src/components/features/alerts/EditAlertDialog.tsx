'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, VehicleFilters } from '@/lib/types'

interface EditAlertDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (alertId: string, name: string, filters: VehicleFilters) => void
  alert: Alert | null
}

export function EditAlertDialog({ isOpen, onClose, onSave, alert }: EditAlertDialogProps) {
  const [alertName, setAlertName] = useState('')
  const [filters, setFilters] = useState<VehicleFilters>({})

  useEffect(() => {
    if (alert) {
      setAlertName(alert.name)
      setFilters(alert.filters)
    }
  }, [alert])

  const handleSave = () => {
    if (alertName.trim() && alert) {
      onSave(alert.id, alertName.trim(), filters)
      onClose()
    }
  }

  const handleClose = () => {
    setAlertName('')
    setFilters({})
    onClose()
  }

  const getFiltersSummary = () => {
    const parts = []

    if (filters.category) {
      const categoryLabels = {
        'car': 'Carro',
        'motorcycle': 'Moto',
        'heavy': 'Caminhão/Pesados'
      }
      parts.push(categoryLabels[filters.category])
    }

    if (filters.brand) {
      parts.push(`Marca: ${filters.brand}`)
    }

    if (filters.model) {
      parts.push(`Modelo: ${filters.model}`)
    }

    if (filters.state) {
      parts.push(`Estado: ${filters.state}`)
    }

    if (filters.city) {
      parts.push(`Cidade: ${filters.city}`)
    }

    if (filters.yearFrom || filters.yearTo) {
      if (filters.yearFrom && filters.yearTo) {
        parts.push(`Ano: ${filters.yearFrom} - ${filters.yearTo}`)
      } else if (filters.yearFrom) {
        parts.push(`Ano: a partir de ${filters.yearFrom}`)
      } else if (filters.yearTo) {
        parts.push(`Ano: até ${filters.yearTo}`)
      }
    }

    if (filters.priceFrom || filters.priceTo) {
      if (filters.priceFrom && filters.priceTo) {
        parts.push(`Preço: R$ ${filters.priceFrom.toLocaleString()} - R$ ${filters.priceTo.toLocaleString()}`)
      } else if (filters.priceFrom) {
        parts.push(`Preço: a partir de R$ ${filters.priceFrom.toLocaleString()}`)
      } else if (filters.priceTo) {
        parts.push(`Preço: até R$ ${filters.priceTo.toLocaleString()}`)
      }
    }

    return parts.length > 0 ? parts.join(', ') : 'Nenhum filtro aplicado'
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Alerta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label htmlFor="alert-name" className="text-sm font-medium mb-2 block">
              Nome do Alerta
            </label>
            <Input
              id="alert-name"
              placeholder="Ex: Honda Civic para revenda"
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Filtros que serão monitorados:
            </label>
            <div className="bg-muted p-3 rounded-md text-sm">
              {getFiltersSummary()}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>💡 Como funciona:</strong> Você receberá uma notificação no WhatsApp
              sempre que um novo veículo correspondente a estes filtros for encontrado.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!alertName.trim()}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
