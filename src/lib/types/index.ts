// Vehicle related types
export interface Vehicle {
  id: string
  title: string
  brand: string
  model: string
  year: number
  currentBid: number
  auctionDate: string
  location: {
    state: string
    city: string
  }
  images: string[]
  auctioneerLogo: string
  auctioneerName: string
  originalUrl: string
  category: 'car' | 'motorcycle' | 'heavy'
  description?: string
  mileage?: number
  fuel?: string
  transmission?: string
}

// Filter types
export interface VehicleFilters {
  category?: 'car' | 'motorcycle' | 'heavy'
  state?: string
  city?: string
  yearFrom?: number
  yearTo?: number
  priceFrom?: number
  priceTo?: number
  brand?: string
  model?: string
}

// User and subscription types
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  subscriptionStatus: 'free' | 'trial' | 'active' | 'expired' | 'suspended'
  trialEndDate?: string
  createdAt: string
  lastLoginAt?: string
  subscription?: Subscription
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  canceledAt?: string
  trialStart?: string
  trialEnd?: string
  paymentMethodId?: string
  gatewaySubscriptionId: string
  createdAt: string
  updatedAt: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  trialDays: number
  isPopular?: boolean
  isActive: boolean
}

export interface PaymentMethod {
  id: string
  userId: string
  type: 'card' | 'pix' | 'boleto'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  createdAt: string
}

export interface PaymentHistory {
  id: string
  userId: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'succeeded' | 'pending' | 'failed' | 'canceled'
  paymentMethod: string
  gatewayPaymentId: string
  paidAt?: string
  failedAt?: string
  createdAt: string
}

// Alert types
export interface Alert {
  id: string
  userId: string
  name: string
  filters: VehicleFilters
  isActive: boolean
  createdAt: string
  lastTriggered?: string
}

// Favorites types
export interface Favorite {
  id: string
  userId: string
  vehicleId: string
  createdAt: string
}

// Calculator types
export interface CalculatorSimulation {
  id: string
  userId: string
  name: string
  vehicleInfo?: {
    title: string
    vehicleId?: string
  }
  purchasePrice: number
  auctioneerCommissionPercent: number
  maintenanceItems: MaintenanceItem[]
  estimatedSalePrice: number
  createdAt: string
  updatedAt: string
}

export interface MaintenanceItem {
  id: string
  description: string
  cost: number
}

export interface CalculatorResult {
  totalMaintenanceCost: number
  totalVehicleCost: number
  profitMargin: number
  profitPercentage: number
}

// Admin dashboard types
export interface AdminMetrics {
  totalUsers: number
  activeSubscribers: number
  trialUsers: number
  newRegistrations: number
  period: string
  revenue: number
  churnRate: number
  failedPayments: number
}

export interface AdminNotification {
  id: string
  type: 'payment_failed' | 'subscription_canceled' | 'trial_ending' | 'new_subscription'
  title: string
  message: string
  userId: string
  subscriptionId?: string
  isRead: boolean
  createdAt: string
}

// Admin user management types
export interface AdminUser extends User {
  subscription?: Subscription
  paymentMethods?: PaymentMethod[]
  lastActivityAt?: string
  totalLogins: number
  isActive: boolean
  notes?: string
}

export interface UserManagementAction {
  id: string
  userId: string
  type: 'extend_trial' | 'suspend_user' | 'activate_user' | 'grant_access' | 'revoke_access'
  description: string
  duration?: number // em horas para extensões temporárias
  reason?: string
  performedBy: string
  performedAt: string
  expiresAt?: string
}

export interface CreateUserRequest {
  name: string
  email: string
  phone?: string
  subscriptionStatus: 'free' | 'trial' | 'active'
  trialDays?: number
  notes?: string
}

export interface UserSearchFilters {
  name?: string
  email?: string
  subscriptionStatus?: 'free' | 'trial' | 'active' | 'expired' | 'suspended'
  isActive?: boolean
  dateFrom?: string
  dateTo?: string
}

export interface AuctioneerClickStats {
  auctioneerName: string
  clickCount: number
  percentage: number
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}