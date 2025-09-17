import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    produto: [
      { label: "Como Funciona", href: "#como-funciona" },
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Preços", href: "/subscription" },
      { label: "Teste Grátis", href: "/subscription" }
    ],
    suporte: [
      { label: "Central de Ajuda", href: "#ajuda" },
      { label: "Contato", href: "#contato" },
      { label: "Status do Sistema", href: "#status" },
      { label: "Tutorial", href: "#tutorial" }
    ],
    empresa: [
      { label: "Sobre Nós", href: "#sobre" },
      { label: "Blog", href: "#blog" },
      { label: "Carreiras", href: "#carreiras" },
      { label: "Imprensa", href: "#imprensa" }
    ],
    legal: [
      { label: "Termos de Uso", href: "#termos" },
      { label: "Política de Privacidade", href: "#privacidade" },
      { label: "Cookies", href: "#cookies" },
      { label: "LGPD", href: "#lgpd" }
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-4">
                Max <span className="text-blue-400">Leilão</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                A plataforma mais completa para monitoramento de leilões de veículos no Brasil. 
                Centralize, filtre e receba alertas de mais de 3.000 leiloeiros em tempo real.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <span>📧</span>
                <span>contato@maxleilao.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <span>📱</span>
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <span>📍</span>
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                🐦
              </a>
              <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                💼
              </a>
              <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                📱
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              {footerLinks.produto.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-4">Receba nossas novidades</h4>
            <p className="text-gray-300 mb-4">
              Fique por dentro das últimas funcionalidades e dicas para maximizar seus lucros.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Max Leilão. Todos os direitos reservados.
            </div>
            
            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Security Badges */}
            <div className="flex gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <span>🔒</span>
                <span>SSL Seguro</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🛡️</span>
                <span>LGPD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
