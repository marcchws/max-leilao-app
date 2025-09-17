'use client'

import { AdminNavigation } from '@/components/features/admin/AdminNavigation'
import { AdminAccessControl } from '@/components/features/admin/AdminAccessControl'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAccessControl>
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </AdminAccessControl>
  )
}