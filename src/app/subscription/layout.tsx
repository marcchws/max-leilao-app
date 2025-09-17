import { SubscriptionProvider } from '@/contexts/SubscriptionContext'

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </SubscriptionProvider>
  )
}
