'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, 
  Lock, 

  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react'

interface PaymentMethod {
  id: string
  type: 'card'
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

interface PaymentMethodModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PaymentMethodModal({ isOpen, onClose }: PaymentMethodModalProps) {
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm-1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true
    }
  ])
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCard, setNewCard] = useState({
    number: '',
    expiryDate: '',
    cvv: '',
    name: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/.{1,4}/g)
    return match ? match.join(' ') : cleaned
  }

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular sucesso
      alert('Cartão adicionado com sucesso!')
      setShowAddForm(false)
      setNewCard({ number: '', expiryDate: '', cvv: '', name: '' })
      
    } catch {
      setError('Erro ao adicionar cartão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetDefault = (methodId: string) => {
    alert('Método de pagamento definido como padrão!')
  }

  const handleDeleteMethod = (methodId: string) => {
    if (confirm('Tem certeza que deseja remover este método de pagamento?')) {
      alert('Método de pagamento removido!')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Métodos de Pagamento
          </DialogTitle>
          <p className="text-center text-gray-600">
            Gerencie seus métodos de pagamento
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Métodos Existentes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Métodos Salvos</h3>
            
            {paymentMethods.map((method) => (
              <Card key={method.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">
                          {method.brand} •••• {method.last4}
                        </p>
                        {method.isDefault && (
                          <Badge variant="default" className="text-xs">
                            Padrão
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Expira em {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Definir como Padrão
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMethod(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Adicionar Novo Método */}
          {!showAddForm ? (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Novo Cartão
            </Button>
          ) : (
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Adicionar Cartão</h3>
              
              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número do Cartão
                  </label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={newCard.number}
                    onChange={(e) => setNewCard({
                      ...newCard,
                      number: formatCardNumber(e.target.value)
                    })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Validade
                    </label>
                    <Input
                      type="text"
                      placeholder="MM/AA"
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard({
                        ...newCard,
                        expiryDate: formatExpiryDate(e.target.value)
                      })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <Input
                      type="text"
                      placeholder="123"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({
                        ...newCard,
                        cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                      })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome no Cartão
                  </label>
                  <Input
                    type="text"
                    placeholder="Nome como está no cartão"
                    value={newCard.name}
                    onChange={(e) => setNewCard({
                      ...newCard,
                      name: e.target.value
                    })}
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Adicionando...' : 'Adicionar Cartão'}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Segurança */}
          <div className="flex items-center justify-center p-4 bg-gray-50 rounded-md">
            <Lock className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">
              Seus dados estão protegidos com criptografia SSL
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
