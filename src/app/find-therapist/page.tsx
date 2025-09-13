import { Suspense } from 'react'
import { TherapistSearch } from '@/components/therapist-search'

export default function FindTherapistPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - can be extracted to a component later */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-primary">
              MinneTherapy
            </a>
            <div className="flex items-center gap-6">
              <a href="/about" className="text-sm font-medium hover:text-primary">
                About
              </a>
              <a href="/pricing" className="text-sm font-medium hover:text-primary">
                For Providers
              </a>
              <a href="/login" className="text-sm font-medium hover:text-primary">
                Login
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Therapist</h1>
          <p className="text-xl text-muted-foreground">
            Search for qualified occupational therapists in Minnesota
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <TherapistSearch />
        </Suspense>
      </main>
    </div>
  )
}