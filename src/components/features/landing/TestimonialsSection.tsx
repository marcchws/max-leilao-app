export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Comprador Profissional",
      company: "AutoMax Veículos",
      content: "O Max Leilão revolucionou minha forma de trabalhar. Antes eu perdia horas navegando entre diferentes sites de leilão. Agora encontro tudo em um lugar só!",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Maria Santos",
      role: "Revendedora",
      company: "Carros Premium SP",
      content: "Os alertas do WhatsApp são incríveis! Recebo notificações instantâneas sobre veículos que me interessam. Nunca mais perdi uma oportunidade.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "João Oliveira",
      role: "Mecânico & Comprador",
      company: "Oficina Central",
      content: "A calculadora de lucro me ajuda muito na tomada de decisão. Consigo simular todos os custos antes de dar um lance. É uma ferramenta essencial!",
      rating: 5,
      avatar: "👨‍🔧"
    },
    {
      name: "Ana Costa",
      role: "Gerente de Compras",
      company: "Frota Nacional",
      content: "A precisão dos dados é impressionante. Sempre que preciso verificar informações, estão atualizadas. Economizo muito tempo com isso.",
      rating: 5,
      avatar: "👩‍💻"
    },
    {
      name: "Roberto Lima",
      role: "Investidor Automotivo",
      company: "AutoInvest",
      content: "O histórico de preços me ajuda a entender as tendências do mercado. É uma funcionalidade que não encontro em nenhum outro lugar.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Fernanda Rocha",
      role: "Proprietária de Concessionária",
      company: "Rocha Motors",
      content: "A interface é muito intuitiva e os filtros são perfeitos. Consigo encontrar exatamente o tipo de veículo que preciso em segundos.",
      rating: 5,
      avatar: "👩‍💼"
    }
  ]

  return (
    <section id="depoimentos" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Mais de 1.000 profissionais já confiam no Max Leilão para otimizar suas compras e aumentar seus lucros.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Junte-se a centenas de profissionais satisfeitos
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1.000+</div>
                <div className="text-gray-600 dark:text-gray-300">Usuários Ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
                <div className="text-gray-600 dark:text-gray-300">Avaliação Média</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-300">Satisfação</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
                <div className="text-gray-600 dark:text-gray-300">Suporte</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
