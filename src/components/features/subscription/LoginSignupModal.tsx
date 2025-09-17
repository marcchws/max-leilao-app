'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAccessControl } from '@/hooks/useAccessControl'
import { Crown, User, Mail, Phone, Calendar } from 'lucide-react'

export function LoginSignupModal() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const { startTrial } = useAccessControl()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLogin) {
      // Simular login
      console.log('Login:', formData.email)
    } else {
      // Simular cadastro e iniciar trial
      console.log('Cadastro:', formData)
      await startTrial('user-' + Date.now())
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-8 w-8 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Fazer Login' : 'Cadastrar-se'}
              </h2>
            </div>
            
            {!isLogin && (
              <Badge className="bg-green-100 text-green-800 mb-2">
                <Calendar className="h-3 w-3 mr-1" />
                7 dias grátis
              </Badge>
            )}
            
            <p className="text-gray-600 text-sm">
              {isLogin 
                ? 'Entre na sua conta para acessar todas as funcionalidades'
                : 'Crie sua conta e ganhe 7 dias de acesso completo'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Telefone (WhatsApp)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Crown className="h-4 w-4 mr-2" />
              {isLogin ? 'Entrar' : 'Cadastrar e Começar Teste Grátis'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLogin 
                ? 'Não tem conta? Cadastre-se grátis'
                : 'Já tem conta? Faça login'
              }
            </button>
          </div>

          {!isLogin && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700 text-center">
                Ao cadastrar-se, você concorda com nossos termos de uso e política de privacidade.
                O período de teste é gratuito e pode ser cancelado a qualquer momento.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
