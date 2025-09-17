'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { LoginModal } from '@/components/features/auth/LoginModal'

export function HeroSection() {
  const { isAuthenticated, user } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Se já está logado, redireciona baseado no role
      if (user?.role === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/vehicles'
      }
    } else {
      // Se não está logado, abre modal de login
      setIsLoginModalOpen(true)
    }
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <Image 
                src="/logo.svg" 
                alt="Max Leilão" 
                width={128}
                height={128}
                className="h-24 md:h-32 w-auto"
                priority
              />
            </div>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Centralize todos os leilões de veículos do Brasil
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Monitore mais de <span className="font-semibold text-blue-600">3.000 leiloeiros</span> no Brasil, 
            receba alertas personalizados e encontre as melhores oportunidades de compra sem perder tempo.
          </p>

          {/* Value Proposition */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">3.000+</div>
                <div className="text-gray-600 dark:text-gray-300">Leiloeiros Monitorados</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-300">Atualizações Automáticas</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600 dark:text-gray-300">Gratuito no Teste</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {isAuthenticated 
                ? (user?.role === 'admin' ? '🏢 Ir para Admin' : '🚀 Continuar para Dashboard')
                : '🚀 Começar meu teste gratuito'
              }
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
            >
              <Link href="/vehicles">
                🔍 Ver Veículos Disponíveis
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </section>
  )
}
