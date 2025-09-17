import { MainNavigation } from '@/components/features/navigation/MainNavigation'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SubscriptionProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-background">
          <MainNavigation />
          <main className="container mx-auto py-6">
            {children}
          </main>
        </div>
      </FavoritesProvider>
    </SubscriptionProvider>
  )
}