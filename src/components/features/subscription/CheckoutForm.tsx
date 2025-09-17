'use client'

import React, { useState } from 'react'
import { SubscriptionPlan } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CreditCard, Lock, Check } from 'lucide-react'

interface CheckoutFormProps {
  plan: SubscriptionPlan
  isOpen: boolean
  onClose: () => void
  onSubmit: (paymentData: PaymentFormData) => Promise<void>
  isLoading?: boolean
}

interface PaymentFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  cpf: string
  email: string
  phone: string
}

export function CheckoutForm({ plan, isOpen, onClose, onSubmit, isLoading }: CheckoutFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    cpf: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {}

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Número do cartão inválido'
    }

    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Data de validade inválida (MM/AA)'
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido'
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Nome do portador é obrigatório'
    }

    if (!formData.cpf || formData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = 'CPF inválido'
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.phone || formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Erro no checkout:', error)
    }
  }

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

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Finalizar Assinatura - {plan.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Resumo do Plano */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-3">Resumo da Assinatura</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Plano:</span>
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor:</span>
                  <span className="font-medium">R$ {plan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cobrança:</span>
                  <span className="font-medium">{plan.interval === 'month' ? 'Mensal' : 'Anual'}</span>
                </div>
                {plan.trialDays > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Período de teste:</span>
                    <span className="font-medium">{plan.trialDays} dias grátis</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Recursos do Plano */}
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-3">Recursos Inclusos</h3>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Formulário de Pagamento */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Dados do Cartão
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número do Cartão
                  </label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      cardNumber: formatCardNumber(e.target.value)
                    })}
                    className={errors.cardNumber ? 'border-red-500' : ''}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Validade
                    </label>
                    <Input
                      type="text"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({
                        ...formData,
                        expiryDate: formatExpiryDate(e.target.value)
                      })}
                      className={errors.expiryDate ? 'border-red-500' : ''}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <Input
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => setFormData({
                        ...formData,
                        cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                      })}
                      className={errors.cvv ? 'border-red-500' : ''}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome no Cartão
                  </label>
                  <Input
                    type="text"
                    placeholder="Nome como está no cartão"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({
                      ...formData,
                      cardholderName: e.target.value
                    })}
                    className={errors.cardholderName ? 'border-red-500' : ''}
                  />
                  {errors.cardholderName && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-4">Dados Pessoais</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF
                  </label>
                  <Input
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({
                      ...formData,
                      cpf: formatCPF(e.target.value)
                    })}
                    className={errors.cpf ? 'border-red-500' : ''}
                  />
                  {errors.cpf && (
                    <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      email: e.target.value
                    })}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <Input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      phone: formatPhone(e.target.value)
                    })}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-md">
              <Lock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                Seus dados estão protegidos com criptografia SSL
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
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
                {isLoading ? 'Processando...' : `Assinar por R$ ${plan.price.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
