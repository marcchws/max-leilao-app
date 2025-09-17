'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { formatPhoneNumber, isValidEmail } from '@/lib/utils'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone,
  AlertCircle,
  Car,
  Shield,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login, register, user, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/vehicles')
      }
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password)
        if (result.success) {
          // Redirecionamento será feito pelo useEffect
        } else {
          setError(result.error || 'Erro ao fazer login')
        }
      } else {
        // Validações para registro
        if (!formData.name.trim()) {
          setError('Nome é obrigatório')
          return
        }
        
        if (!isValidEmail(formData.email)) {
          setError('E-mail inválido')
          return
        }
        
        if (formData.password !== formData.confirmPassword) {
          setError('As senhas não conferem')
          return
        }
        if (formData.password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres')
          return
        }

        const result = await register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })

        if (result.success) {
          // Redirecionamento será feito pelo useEffect
        } else {
          setError(result.error || 'Erro ao criar conta')
        }
      }
    } catch {
      setError('Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
    setError('')
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setError('')
    resetForm()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Car className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Max Leilão</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Entrar na Conta' : 'Criar Nova Conta'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin 
              ? 'Faça login para acessar sua conta' 
              : 'Crie sua conta para começar a usar a plataforma'
            }
          </p>
        </div>

        {/* Form Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome (apenas no registro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: João Silva"
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ex: joao@email.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Telefone (apenas no registro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone (opcional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                    placeholder="Ex: (11) 99999-9999"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={isLogin ? 'Digite sua senha' : 'Mínimo 6 caracteres'}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirmar Senha (apenas no registro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirme sua senha"
                    className="pl-10 pr-10"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Erro */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Botões */}
            <div className="space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{isLogin ? 'Entrando...' : 'Criando conta...'}</span>
                  </div>
                ) : (
                  isLogin ? 'Entrar' : 'Criar Conta'
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {isLogin 
                    ? 'Não tem uma conta? Criar conta' 
                    : 'Já tem uma conta? Fazer login'
                  }
                </button>
              </div>
            </div>
          </form>
        </Card>

        {/* Credenciais de teste */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-2 mb-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <h4 className="text-sm font-medium text-blue-800">Credenciais de Teste</h4>
          </div>
          <div className="space-y-2 text-xs text-blue-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p><strong>Admin:</strong> vitor@maxleilao.com.br / 123456</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p><strong>Usuário:</strong> joao@email.com / 123456</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p><strong>Usuário:</strong> maria@email.com / 123456</p>
            </div>
          </div>
        </Card>

        {/* Voltar para home */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
