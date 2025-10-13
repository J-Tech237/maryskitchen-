import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section Skeleton */}
        <section className="text-center py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-6 w-32 mx-auto mb-4" />
            <Skeleton className="h-16 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-8" />
            <Skeleton className="h-6 w-64 mx-auto mb-8" />
          </div>
        </section>

        {/* Contact Info Cards Skeleton */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-6 border rounded-lg">
                <Skeleton className="h-8 w-8 mx-auto mb-4" />
                <Skeleton className="h-6 w-20 mx-auto mb-3" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 mx-auto" />
                  <Skeleton className="h-4 w-28 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form & Map Skeleton */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form Skeleton */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-6 w-40" />
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Map & Additional Info Skeleton */}
              <div className="space-y-8">
                <div className="border rounded-lg">
                  <Skeleton className="h-64 w-full rounded-lg" />
                </div>
                <div className="border rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-4 w-4" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-4 w-4" />
                      <div>
                        <Skeleton className="h-4 w-40 mb-1" />
                        <Skeleton className="h-3 w-36" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <div className="border-t bg-muted/50">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
