import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              MinneTherapy
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-primary">
                For Providers
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="mb-6 text-5xl font-bold">
              Find Your Perfect Occupational Therapist
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Connect with qualified OT professionals in Minnesota
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register">
                <Button size="lg">Find a Therapist</Button>
              </Link>
              <Link href="/register?role=provider">
                <Button size="lg" variant="outline">
                  Join as Provider
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Why Choose MinneTherapy?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 text-4xl">🔍</div>
                <h3 className="mb-2 text-xl font-semibold">Easy Search</h3>
                <p className="text-muted-foreground">
                  Find therapists by location, specialization, and availability
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-4xl">✅</div>
                <h3 className="mb-2 text-xl font-semibold">Verified Providers</h3>
                <p className="text-muted-foreground">
                  All providers are licensed and verified professionals
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-4xl">💬</div>
                <h3 className="mb-2 text-xl font-semibold">Direct Messaging</h3>
                <p className="text-muted-foreground">
                  Communicate directly with therapists before booking
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">
              Ready to Start Your Therapy Journey?
            </h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Join thousands of patients and providers in Minnesota
            </p>
            <Link href="/register">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 MinneTherapy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
