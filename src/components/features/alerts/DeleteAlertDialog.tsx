'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface DeleteAlertDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  alertName: string
}

export function DeleteAlertDialog({ isOpen, onClose, onConfirm, alertName }: DeleteAlertDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Confirmar Exclusão
          </DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir o alerta &ldquo;{alertName}&rdquo;? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir Alerta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
