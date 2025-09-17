'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'user'
  subscriptionStatus: 'free' | 'trial' | 'active' | 'expired' | 'suspended'
  trialEndDate?: string
  createdAt: string
  lastLoginAt?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
  updateUserSubscription: (subscriptionStatus: User['subscriptionStatus']) => void
  updateUserInfo: (userData: { name: string; email: string; phone?: string }) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  phone?: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// Mock users database
const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Vitor Admin',
    email: 'vitor@maxleilao.com.br',
    phone: '+5511999999999',
    role: 'admin',
    subscriptionStatus: 'active',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  },
  {
    id: 'user-1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '+5511999999999',
    role: 'user',
    subscriptionStatus: 'trial',
    trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  },
  {
    id: 'user-2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '+5511888888888',
    role: 'user',
    subscriptionStatus: 'active',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  }
]

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Verificar se há usuário logado no localStorage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('auth_user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch {
        console.error('Erro ao verificar autenticação:', error)
        localStorage.removeItem('auth_user')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Buscar usuário no mock database
      const foundUser = mockUsers.find(u => u.email === email)
      
      if (!foundUser) {
        return { success: false, error: 'Usuário não encontrado' }
      }
      
      // Simular verificação de senha (em produção seria hash + salt)
      if (password !== '123456') {
        return { success: false, error: 'Senha incorreta' }
      }
      
      // Atualizar último login
      const updatedUser = {
        ...foundUser,
        lastLoginAt: new Date().toISOString()
      }
      
      setUser(updatedUser)
      localStorage.setItem('auth_user', JSON.stringify(updatedUser))
      
      // Verificar se há redirecionamento pendente
      const redirectAfterLogin = localStorage.getItem('redirect_after_login')
      if (redirectAfterLogin) {
        localStorage.removeItem('redirect_after_login')
        router.push(redirectAfterLogin)
      }
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verificar se email já existe
      const existingUser = mockUsers.find(u => u.email === userData.email)
      if (existingUser) {
        return { success: false, error: 'Email já cadastrado' }
      }
      
      // Criar novo usuário
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'user',
        subscriptionStatus: 'free',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      }
      
      // Adicionar ao mock database
      mockUsers.push(newUser)
      
      // Fazer login automático
      setUser(newUser)
      localStorage.setItem('auth_user', JSON.stringify(newUser))
      
      // Verificar se há redirecionamento pendente
      const redirectAfterLogin = localStorage.getItem('redirect_after_login')
      if (redirectAfterLogin) {
        localStorage.removeItem('redirect_after_login')
        router.push(redirectAfterLogin)
      }
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    router.push('/')
  }

  const updateUserSubscription = (subscriptionStatus: User['subscriptionStatus']) => {
    if (user) {
      const updatedUser = {
        ...user,
        subscriptionStatus
      }
      setUser(updatedUser)
      localStorage.setItem('auth_user', JSON.stringify(updatedUser))
    }
  }

  const updateUserInfo = async (userData: { name: string; email: string; phone?: string }) => {
    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    try {
      setIsLoading(true)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Atualizar usuário no mock database
      const userIndex = mockUsers.findIndex(u => u.id === user.id)
      if (userIndex !== -1) {
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        }
      }
      
      // Atualizar usuário no estado
      const updatedUser = {
        ...user,
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      }
      
      setUser(updatedUser)
      localStorage.setItem('auth_user', JSON.stringify(updatedUser))
      
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateUserSubscription,
    updateUserInfo
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
