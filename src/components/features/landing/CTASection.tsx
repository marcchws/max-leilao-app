import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section id="precos" className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main CTA */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pronto para revolucionar suas compras?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Comece seu teste gratuito hoje e descubra como o Max Leilão pode economizar seu tempo 
            e aumentar seus lucros em até 30%.
          </p>

          {/* Benefits List */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Economia de Tempo</h3>
              <p className="text-blue-100 text-sm">Reduza 80% do tempo gasto na busca por veículos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-white mb-2">Aumento de Lucros</h3>
              <p className="text-blue-100 text-sm">Encontre oportunidades que outros perdem</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">Precisão Total</h3>
              <p className="text-blue-100 text-sm">Dados sempre atualizados e confiáveis</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <Link href="/subscription">
                🚀 Começar Teste Gratuito Agora
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-12 py-6 text-xl rounded-2xl transition-all duration-300"
            >
              <Link href="/vehicles">
                👀 Ver Demonstração
              </Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>7 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Sem compromisso</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Suporte especializado</span>
            </div>
          </div>

          {/* Urgency */}
          <div className="mt-12 bg-yellow-400 text-gray-900 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">🔥</span>
              <span className="font-bold">Oferta Limitada!</span>
            </div>
            <p className="text-sm">
              Os primeiros 100 usuários ganham <strong>30 dias grátis</strong> em vez de 7. 
              Restam apenas <strong>23 vagas</strong>!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
