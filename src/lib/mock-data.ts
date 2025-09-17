import { Vehicle, Alert, AdminUser, UserManagementAction } from '@/lib/types'

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    title: 'Honda Civic 2018/2019 - LX CVT',
    category: 'car',
    brand: 'Honda',
    model: 'Civic',
    year: 2018,
    currentBid: 45000,
    auctionDate: '2025-01-25T14:00:00',
    location: {
      city: 'São Paulo',
      state: 'SP'
    },
    auctioneerName: 'Leilões Zukerman',
    auctioneerLogo: '/logos/zukerman.png',
    images: [
      '/vehicles/civic-1.jpg',
      '/vehicles/civic-2.jpg'
    ],
    originalUrl: 'https://www.leiloeszukerman.com.br/veiculo/honda-civic-2018-2019-lx-cvt'
  },
  {
    id: '2',
    title: 'Toyota Corolla Cross 2022/2023 - XR',
    category: 'car',
    brand: 'Toyota',
    model: 'Corolla Cross',
    year: 2022,
    currentBid: 78000,
    auctionDate: '2025-01-26T15:30:00',
    location: {
      city: 'Campinas',
      state: 'SP'
    },
    auctioneerName: 'Sodré Santoro',
    auctioneerLogo: '/logos/sodre-santoro.png',
    images: [
      '/vehicles/corolla-cross-1.jpg',
      '/vehicles/corolla-cross-2.jpg'
    ],
    originalUrl: 'https://www.sodresantoro.com.br/leilao/toyota-corolla-cross-2022-2023'
  },
  {
    id: '3',
    title: 'Volkswagen Gol 2014/2015 - 1.0 Mi City',
    category: 'car',
    brand: 'Volkswagen',
    model: 'Gol',
    year: 2014,
    currentBid: 18500,
    auctionDate: '2025-01-27T10:00:00',
    location: {
      city: 'Santos',
      state: 'SP'
    },
    auctioneerName: 'F1 Leilões',
    auctioneerLogo: '/logos/f1-leiloes.png',
    images: [
      '/vehicles/gol-1.jpg',
      '/vehicles/gol-2.jpg'
    ],
    originalUrl: 'https://www.f1leiloes.com.br/veiculo/volkswagen-gol-2014-2015'
  },
  {
    id: '4',
    title: 'Honda CB 600F Hornet 2012/2013',
    category: 'motorcycle',
    brand: 'Honda',
    model: 'CB 600F Hornet',
    year: 2012,
    currentBid: 25000,
    auctionDate: '2025-01-28T16:00:00',
    location: {
      city: 'Ribeirão Preto',
      state: 'SP'
    },
    auctioneerName: 'Lance Certo',
    auctioneerLogo: '/logos/lance-certo.png',
    images: [
      '/vehicles/hornet-1.jpg',
      '/vehicles/hornet-2.jpg'
    ],
    originalUrl: 'https://www.lancecerto.com.br/moto/honda-cb600f-hornet-2012'
  },
  {
    id: '5',
    title: 'Ford Cargo 816 2015/2016 - Baú',
    category: 'heavy',
    brand: 'Ford',
    model: 'Cargo 816',
    year: 2015,
    currentBid: 95000,
    auctionDate: '2025-01-29T11:30:00',
    location: {
      city: 'Guarulhos',
      state: 'SP'
    },
    auctioneerName: 'Mega Leilões',
    auctioneerLogo: '/logos/mega-leiloes.png',
    images: [
      '/vehicles/cargo-1.jpg',
      '/vehicles/cargo-2.jpg'
    ],
    originalUrl: 'https://www.megaleiloes.com.br/caminhao/ford-cargo-816-2015'
  },
  {
    id: '6',
    title: 'Chevrolet Onix 2020/2021 - LT 1.0 Turbo',
    category: 'car',
    brand: 'Chevrolet',
    model: 'Onix',
    year: 2020,
    currentBid: 52000,
    auctionDate: '2025-01-30T14:30:00',
    location: {
      city: 'Sorocaba',
      state: 'SP'
    },
    auctioneerName: 'Leilões Brasil',
    auctioneerLogo: '/logos/leiloes-brasil.png',
    images: [
      '/vehicles/onix-1.jpg',
      '/vehicles/onix-2.jpg'
    ],
    originalUrl: 'https://www.leiloesbrasil.com.br/veiculo/chevrolet-onix-2020-2021'
  }
]

export const mockAlerts: Alert[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Busca Van Master',
    filters: {
      category: 'heavy',
      brand: 'Renault',
      model: 'Master'
    },
    isActive: true,
    createdAt: '2025-01-15T10:30:00Z',
    lastTriggered: '2025-01-16T14:20:00Z'
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Honda Civic para Revenda',
    filters: {
      category: 'car',
      brand: 'Honda',
      model: 'Civic',
      yearFrom: 2015,
      priceFrom: 30000,
      priceTo: 60000
    },
    isActive: true,
    createdAt: '2025-01-10T08:15:00Z'
  },
  {
    id: '3',
    userId: 'user1',
    name: 'Motos Honda até R$ 30k',
    filters: {
      category: 'motorcycle',
      brand: 'Honda',
      priceTo: 30000
    },
    isActive: false,
    createdAt: '2025-01-08T16:45:00Z',
    lastTriggered: '2025-01-12T09:30:00Z'
  }
]

// Mock data para usuários administrativos
export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '+5511999999999',
    subscriptionStatus: 'trial',
    trialEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    totalLogins: 12,
    isActive: true,
    notes: 'Cliente interessado em veículos Honda',
    subscription: {
      id: 'sub1',
      userId: '1',
      planId: 'basic',
      status: 'trialing',
      currentPeriodStart: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      currentPeriodEnd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      trialStart: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      trialEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      gatewaySubscriptionId: 'sub_stripe_123',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '+5511888888888',
    subscriptionStatus: 'active',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    totalLogins: 45,
    isActive: true,
    notes: 'Assinante premium, muito ativa na plataforma',
    subscription: {
      id: 'sub2',
      userId: '2',
      planId: 'premium',
      status: 'active',
      currentPeriodStart: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      currentPeriodEnd: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      gatewaySubscriptionId: 'sub_stripe_456',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    phone: '+5511777777777',
    subscriptionStatus: 'expired',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    totalLogins: 8,
    isActive: false,
    notes: 'Trial expirado, não renovou',
    subscription: {
      id: 'sub3',
      userId: '3',
      planId: 'basic',
      status: 'canceled',
      currentPeriodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      currentPeriodEnd: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: true,
      canceledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      trialStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      trialEnd: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
      gatewaySubscriptionId: 'sub_stripe_789',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: '4',
    name: 'Ana Lima',
    email: 'ana@email.com',
    phone: '+5511666666666',
    subscriptionStatus: 'suspended',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalLogins: 15,
    isActive: false,
    notes: 'Suspensa por violação dos termos de uso',
    subscription: {
      id: 'sub4',
      userId: '4',
      planId: 'premium',
      status: 'past_due',
      currentPeriodStart: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      currentPeriodEnd: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      gatewaySubscriptionId: 'sub_stripe_101',
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: '5',
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    subscriptionStatus: 'free',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    totalLogins: 3,
    isActive: true,
    notes: 'Usuário gratuito, ainda não converteu'
  },
  {
    id: '6',
    name: 'Fernanda Rodrigues',
    email: 'fernanda@email.com',
    phone: '+5511555555555',
    subscriptionStatus: 'trial',
    trialEndDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    lastActivityAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    totalLogins: 7,
    isActive: true,
    notes: 'Trial terminando em breve, enviar lembrete',
    subscription: {
      id: 'sub6',
      userId: '6',
      planId: 'premium',
      status: 'trialing',
      currentPeriodStart: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      currentPeriodEnd: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      trialStart: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      trialEnd: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      gatewaySubscriptionId: 'sub_stripe_202',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  }
]

// Mock data para ações administrativas
export const mockUserActions: UserManagementAction[] = [
  {
    id: 'action1',
    userId: '1',
    type: 'extend_trial',
    description: 'Trial estendido por 7 dias',
    duration: 168, // 7 dias em horas
    reason: 'Problema com cartão de crédito',
    performedBy: 'Vitor (Admin)',
    performedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'action2',
    userId: '3',
    type: 'grant_access',
    description: 'Acesso temporário concedido por 48 horas',
    duration: 48,
    reason: 'Cliente ligou pedindo mais tempo para resolver pagamento',
    performedBy: 'Vitor (Admin)',
    performedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'action3',
    userId: '4',
    type: 'suspend_user',
    description: 'Usuário suspenso por violação dos termos',
    reason: 'Uso inadequado da plataforma',
    performedBy: 'Vitor (Admin)',
    performedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Mock data para métricas do dashboard
export interface DashboardMetrics {
  totalUsers: number
  activeSubscribers: number
  newRegistrations: number
  revenue: number
  churnRate: number
  failedPayments: number
}

export interface AuctioneerClickData {
  id: string
  name: string
  logo: string
  clicks: number
  percentage: number
}

export interface PeriodFilter {
  label: string
  value: 'day' | 'week' | 'month'
  days: number
}

export const periodFilters: PeriodFilter[] = [
  { label: 'Hoje', value: 'day', days: 1 },
  { label: 'Esta Semana', value: 'week', days: 7 },
  { label: 'Este Mês', value: 'month', days: 30 }
]

// Mock data para métricas por período
export const mockDashboardMetrics: Record<string, DashboardMetrics> = {
  day: {
    totalUsers: 1247,
    activeSubscribers: 342,
    newRegistrations: 3,
    revenue: 428.50,
    churnRate: 0.2,
    failedPayments: 1
  },
  week: {
    totalUsers: 1247,
    activeSubscribers: 342,
    newRegistrations: 18,
    revenue: 2999.50,
    churnRate: 1.4,
    failedPayments: 3
  },
  month: {
    totalUsers: 1247,
    activeSubscribers: 342,
    newRegistrations: 50,
    revenue: 12850.50,
    churnRate: 5.2,
    failedPayments: 8
  }
}

// Mock data para ranking de cliques por leiloeiro
export const mockAuctioneerClicks: Record<string, AuctioneerClickData[]> = {
  day: [
    { id: '1', name: 'Freitas Leiloeiro', logo: '/logos/freitas.png', clicks: 120, percentage: 35.3 },
    { id: '2', name: 'Copart', logo: '/logos/copart.png', clicks: 95, percentage: 27.9 },
    { id: '3', name: 'Leilões Zukerman', logo: '/logos/zukerman.png', clicks: 65, percentage: 19.1 },
    { id: '4', name: 'Sodré Santoro', logo: '/logos/sodre-santoro.png', clicks: 40, percentage: 11.8 },
    { id: '5', name: 'F1 Leilões', logo: '/logos/f1-leiloes.png', clicks: 20, percentage: 5.9 }
  ],
  week: [
    { id: '1', name: 'Freitas Leiloeiro', logo: '/logos/freitas.png', clicks: 840, percentage: 35.0 },
    { id: '2', name: 'Copart', logo: '/logos/copart.png', clicks: 665, percentage: 27.7 },
    { id: '3', name: 'Leilões Zukerman', logo: '/logos/zukerman.png', clicks: 455, percentage: 19.0 },
    { id: '4', name: 'Sodré Santoro', logo: '/logos/sodre-santoro.png', clicks: 280, percentage: 11.7 },
    { id: '5', name: 'F1 Leilões', logo: '/logos/f1-leiloes.png', clicks: 140, percentage: 5.8 },
    { id: '6', name: 'Lance Certo', logo: '/logos/lance-certo.png', clicks: 70, percentage: 2.9 },
    { id: '7', name: 'Mega Leilões', logo: '/logos/mega-leiloes.png', clicks: 35, percentage: 1.5 },
    { id: '8', name: 'Leilões Brasil', logo: '/logos/leiloes-brasil.png', clicks: 20, percentage: 0.8 }
  ],
  month: [
    { id: '1', name: 'Freitas Leiloeiro', logo: '/logos/freitas.png', clicks: 3000, percentage: 35.3 },
    { id: '2', name: 'Copart', logo: '/logos/copart.png', clicks: 2500, percentage: 29.4 },
    { id: '3', name: 'Leilões Zukerman', logo: '/logos/zukerman.png', clicks: 1950, percentage: 22.9 },
    { id: '4', name: 'Sodré Santoro', logo: '/logos/sodre-santoro.png', clicks: 800, percentage: 9.4 },
    { id: '5', name: 'F1 Leilões', logo: '/logos/f1-leiloes.png', clicks: 200, percentage: 2.4 },
    { id: '6', name: 'Lance Certo', logo: '/logos/lance-certo.png', clicks: 50, percentage: 0.6 }
  ]
}