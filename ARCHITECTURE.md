# Arquitetura do Sistema Max Leilão

## Visão Geral

O Max Leilão foi estruturado como uma aplicação SaaS moderna usando Next.js 15 com App Router, seguindo os princípios de componentes reutilizáveis e arquitetura orientada a funcionalidades.

## Estrutura de Pastas

```
src/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Grupo de rotas autenticadas
│   │   ├── layout.tsx           # Layout compartilhado com navegação
│   │   ├── vehicles/            # RF-001: Listagem de veículos
│   │   ├── favorites/           # RF-004: Lista de favoritos
│   │   ├── alerts/              # RF-003: Alertas personalizados
│   │   └── calculator/          # RF-005: Calculadora de lucro
│   ├── admin/                   # RF-009/010: Painel administrativo
│   │   ├── layout.tsx           # Layout do admin
│   │   ├── page.tsx             # Dashboard de métricas
│   │   └── users/               # Gerenciamento de usuários
│   ├── page.tsx                 # RF-008: Landing Page
│   ├── layout.tsx               # Layout raiz
│   └── globals.css              # Estilos globais
├── components/
│   ├── ui/                      # Componentes Shadcn/UI
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   └── features/                # Componentes organizados por funcionalidade
│       ├── auction-listing/     # RF-001: Componentes de listagem
│       ├── filters/             # RF-002: Sistema de filtros
│       ├── favorites/           # RF-004: Componentes de favoritos
│       ├── alerts/              # RF-003: Componentes de alertas
│       ├── calculator/          # RF-005: Calculadora de lucro
│       ├── admin/               # RF-009/010: Componentes administrativos
│       ├── navigation/          # Navegação principal
│       └── landing/             # RF-008: Componentes da landing page
├── lib/
│   ├── types/                   # Definições TypeScript
│   │   └── index.ts             # Tipos do sistema
│   └── utils.ts                 # Utilitários compartilhados
└── hooks/                       # Hooks customizados do React
```

## Componentes Principais Criados

### 1. VehicleCard (`/components/features/auction-listing/VehicleCard.tsx`)
**Relacionado a**: RF-001 - Visualização e Redirecionamento de Anúncios

**Funcionalidades**:
- Exibe foto, título, lance atual, data do leilão
- Mostra logo e nome do leiloeiro
- Localização do veículo
- Botão de favoritar integrado
- Redirecionamento para site original em nova aba
- Responsivo e acessível

### 2. VehicleFilters (`/components/features/filters/VehicleFilters.tsx`)
**Relacionado a**: RF-002 - Filtros de Busca

**Funcionalidades**:
- Filtro por categoria (Carro, Moto, Pesado)
- Seleção de estado e cidade
- Faixa de preço e ano
- Busca por marca e modelo
- Contador de filtros ativos
- Função de limpar todos os filtros
- Interface intuitiva inspirada no Web Motors

### 3. ProfitCalculator (`/components/features/calculator/ProfitCalculator.tsx`)
**Relacionado a**: RF-005 - Calculadora de Lucro

**Funcionalidades**:
- Nomeação e salvamento de simulações
- Cálculo de comissão do leiloeiro
- Lista dinâmica de itens de manutenção
- Cálculo automático de margem de lucro
- Indicadores visuais (verde/vermelho)
- Interface de fácil uso

### 4. MainNavigation (`/components/features/navigation/MainNavigation.tsx`)
**Componente de Navegação Principal**

**Funcionalidades**:
- Logo do Max Leilão
- Menu de navegação responsivo
- Indicador de página ativa
- Menu de usuário
- Design consistente com a identidade visual

## Sistema de Tipos TypeScript

Criado arquivo `/lib/types/index.ts` com definições completas:

- **Vehicle**: Estrutura de dados dos veículos
- **VehicleFilters**: Interface para sistema de filtros
- **User**: Dados do usuário e assinatura
- **Alert**: Configuração de alertas personalizados
- **CalculatorSimulation**: Simulações da calculadora
- **AdminMetrics**: Métricas do painel administrativo
- **ApiResponse**: Padrão de resposta da API

## Roteamento com App Router

### Rotas Públicas
- `/` - Landing Page (RF-008)

### Rotas Autenticadas (Grupo `/dashboard`)
- `/vehicles` - Listagem de veículos (RF-001, RF-002)
- `/favorites` - Lista de favoritos (RF-004)
- `/alerts` - Alertas personalizados (RF-003)
- `/calculator` - Calculadora de lucro (RF-005)

### Rotas Administrativas
- `/admin` - Dashboard de métricas (RF-010)
- `/admin/users` - Gerenciamento de usuários (RF-009)

## Componentes Shadcn/UI Instalados

Componentes essenciais para a interface:
- **Button**: Ações e navegação
- **Input**: Formulários e filtros
- **Dialog**: Modais e confirmações
- **Dropdown Menu**: Seleções e menus
- **Checkbox**: Filtros múltiplos
- **Badge**: Status e categorias
- **Avatar**: Perfil do usuário
- **Multiselect**: Seleções múltiplas

## Próximos Passos para Implementação

### Fase 1: Desenvolvimento Core
1. **Integração com API de Scraping**
   - Configurar endpoints para receber dados
   - Implementar sistema de sincronização
   - Criar cache de dados

2. **Sistema de Autenticação**
   - Login/registro de usuários
   - Gerenciamento de sessões
   - Controle de acesso por planos

3. **Banco de Dados**
   - Schema para veículos, usuários, favoritos
   - Sistema de favoritos por usuário
   - Armazenamento de alertas e simulações

### Fase 2: Funcionalidades Avançadas
1. **Sistema de Alertas WhatsApp**
   - Integração com API do WhatsApp
   - Templates de mensagens
   - Agendamento de verificações

2. **Sistema de Assinatura**
   - Integração com gateway de pagamento
   - Controle de acesso por funcionalidades
   - Período de teste de 7 dias

3. **Painel Administrativo Completo**
   - Métricas em tempo real
   - Gráficos de performance
   - Gestão de usuários

### Fase 3: Otimização e Lançamento
1. **Performance**
   - Otimização de imagens
   - Cache de dados
   - SEO completo

2. **Testes**
   - Testes unitários
   - Testes de integração
   - Testes e2e com Playwright

3. **Deploy**
   - Configuração Vercel
   - Monitoramento
   - Analytics

## Considerações Técnicas

### Performance
- Lazy loading de componentes
- Paginação inteligente
- Cache de filtros frequentes

### Escalabilidade
- Componentização modular
- Types centralizados
- Hooks reutilizáveis

### UX/UI
- Design system consistente
- Feedback visual imediato
- Responsividade completa

### Segurança
- Validação de dados
- Sanitização de inputs
- Controle de acesso granular

---

Esta arquitetura fornece uma base sólida para implementar todas as funcionalidades do Max Leilão, mantendo o código organizado, escalável e de fácil manutenção.