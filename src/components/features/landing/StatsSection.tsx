export function StatsSection() {
  const stats = [
    {
      number: "3.000+",
      label: "Leiloeiros Monitorados",
      description: "Cobertura nacional completa"
    },
    {
      number: "50.000+",
      label: "Veículos por Mês",
      description: "Atualizações constantes"
    },
    {
      number: "95%",
      label: "Precisão dos Dados",
      description: "Informações sempre atualizadas"
    },
    {
      number: "24/7",
      label: "Monitoramento",
      description: "Nunca perca uma oportunidade"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Números que impressionam
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Nossa plataforma processa milhares de dados diariamente para garantir 
            que você tenha acesso às melhores oportunidades do mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-blue-100 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Tecnologia de ponta para resultados excepcionais
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">🤖</div>
                <div className="font-semibold">IA & Machine Learning</div>
                <div className="text-sm text-blue-100">Algoritmos inteligentes</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-semibold">Processamento Rápido</div>
                <div className="text-sm text-blue-100">Atualizações em segundos</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">🔒</div>
                <div className="font-semibold">Segurança Total</div>
                <div className="text-sm text-blue-100">Dados protegidos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
