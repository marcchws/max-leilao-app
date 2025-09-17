export function FeaturesSection() {
  const features = [
    {
      icon: "🔍",
      title: "Agregação Inteligente",
      description: "Centralizamos leilões de mais de 3.000 leiloeiros em uma única plataforma, economizando horas de busca manual.",
      benefits: ["Busca unificada", "Atualizações em tempo real", "Histórico de preços"]
    },
    {
      icon: "⚡",
      title: "Filtros Avançados",
      description: "Encontre exatamente o que procura com filtros precisos por categoria, localização, ano, preço e muito mais.",
      benefits: ["Filtros personalizados", "Busca por localização", "Faixa de preço"]
    },
    {
      icon: "📱",
      title: "Alertas WhatsApp",
      description: "Receba notificações instantâneas sobre novos veículos que correspondem ao seu interesse, direto no seu WhatsApp.",
      benefits: ["Notificações instantâneas", "Filtros personalizados", "Zero spam"]
    },
    {
      icon: "🧮",
      title: "Calculadora de Lucro",
      description: "Simule custos e margem de lucro antes de dar seu lance, incluindo comissões e custos de manutenção.",
      benefits: ["Simulação de custos", "Margem de lucro", "Análise de viabilidade"]
    },
    {
      icon: "❤️",
      title: "Lista de Favoritos",
      description: "Salve veículos de interesse e acompanhe o progresso dos leilões sem perder nenhuma oportunidade.",
      benefits: ["Acompanhamento fácil", "Histórico de interesses", "Notificações de mudanças"]
    },
    {
      icon: "📊",
      title: "Relatórios Detalhados",
      description: "Acesse estatísticas completas sobre leiloeiros, tendências de preços e performance do mercado.",
      benefits: ["Análise de mercado", "Tendências de preços", "Dados históricos"]
    }
  ]

  return (
    <section id="funcionalidades" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Por que escolher o <span className="text-blue-600">Max Leilão</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nossa plataforma foi desenvolvida especificamente para profissionais do setor automotivo 
            que precisam de eficiência e precisão na busca por veículos em leilão.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center text-2xl mb-6">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-green-500 mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para economizar tempo e encontrar melhores oportunidades?
            </h3>
            <p className="text-blue-100 mb-6">
              Junte-se a centenas de profissionais que já usam o Max Leilão para otimizar suas compras.
            </p>
            <a 
              href="/subscription"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Começar Teste Gratuito
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
