import type React from "react"
import { AdminAuthGuard } from "@/components/admin-auth-guard"
import { AdminNav } from "@/components/admin-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen flex flex-col">
        <AdminNav />
        <main className="flex-1">{children}</main>
      </div>
    </AdminAuthGuard>
  )
}
