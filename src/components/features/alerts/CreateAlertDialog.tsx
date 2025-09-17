'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { VehicleFilters } from '@/lib/types'

interface CreateAlertDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, filters: VehicleFilters) => void
  initialFilters?: VehicleFilters
}

export function CreateAlertDialog({ isOpen, onClose, onSave, initialFilters = {} }: CreateAlertDialogProps) {
  const [alertName, setAlertName] = useState('')

  const handleSave = () => {
    if (alertName.trim()) {
      onSave(alertName.trim(), initialFilters)
      setAlertName('')
      onClose()
    }
  }

  const handleClose = () => {
    setAlertName('')
    onClose()
  }

  const getFiltersSummary = () => {
    const parts = []

    if (initialFilters.category) {
      const categoryLabels = {
        'car': 'Carro',
        'motorcycle': 'Moto',
        'heavy': 'Caminhão/Pesados'
      }
      parts.push(categoryLabels[initialFilters.category])
    }

    if (initialFilters.brand) {
      parts.push(`Marca: ${initialFilters.brand}`)
    }

    if (initialFilters.model) {
      parts.push(`Modelo: ${initialFilters.model}`)
    }

    if (initialFilters.state) {
      parts.push(`Estado: ${initialFilters.state}`)
    }

    if (initialFilters.city) {
      parts.push(`Cidade: ${initialFilters.city}`)
    }

    if (initialFilters.yearFrom || initialFilters.yearTo) {
      if (initialFilters.yearFrom && initialFilters.yearTo) {
        parts.push(`Ano: ${initialFilters.yearFrom} - ${initialFilters.yearTo}`)
      } else if (initialFilters.yearFrom) {
        parts.push(`Ano: a partir de ${initialFilters.yearFrom}`)
      } else if (initialFilters.yearTo) {
        parts.push(`Ano: até ${initialFilters.yearTo}`)
      }
    }

    if (initialFilters.priceFrom || initialFilters.priceTo) {
      if (initialFilters.priceFrom && initialFilters.priceTo) {
        parts.push(`Preço: R$ ${initialFilters.priceFrom.toLocaleString()} - R$ ${initialFilters.priceTo.toLocaleString()}`)
      } else if (initialFilters.priceFrom) {
        parts.push(`Preço: a partir de R$ ${initialFilters.priceFrom.toLocaleString()}`)
      } else if (initialFilters.priceTo) {
        parts.push(`Preço: até R$ ${initialFilters.priceTo.toLocaleString()}`)
      }
    }

    return parts.length > 0 ? parts.join(', ') : 'Nenhum filtro aplicado'
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Novo Alerta</DialogTitle>
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
            Criar Alerta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}