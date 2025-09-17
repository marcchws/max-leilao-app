import { MainNavigation } from '@/components/features/navigation/MainNavigation'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import { CalculatorProvider } from '@/contexts/CalculatorContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SubscriptionProvider>
      <FavoritesProvider>
        <CalculatorProvider>
          <div className="min-h-screen bg-background">
            <MainNavigation />
            <main className="container mx-auto py-6">
              {children}
            </main>
          </div>
        </CalculatorProvider>
      </FavoritesProvider>
    </SubscriptionProvider>
  )
}