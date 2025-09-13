'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TherapistMap } from '@/components/therapist-map'

interface Therapist {
  id: string
  firstName: string
  lastName: string
  licenseNumber: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  bio?: string
  yearsOfExperience?: number
  latitude?: number
  longitude?: number
  membershipType: string
  isVerified: boolean
  specializations: Array<{
    specialization: {
      id: string
      name: string
      description?: string
    }
  }>
}

export function TherapistSearch() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  useEffect(() => {
    fetchTherapists()
  }, [])

  const fetchTherapists = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/therapists')
      if (response.ok) {
        const data = await response.json()
        setTherapists(data)
      }
    } catch (error) {
      console.error('Error fetching therapists:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = !searchTerm ||
      `${therapist.firstName} ${therapist.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specializations.some(spec =>
        spec.specialization.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchesSpecialization = !selectedSpecialization ||
      therapist.specializations.some(spec => spec.specialization.name === selectedSpecialization)

    return matchesSearch && matchesSpecialization
  })

  const allSpecializations = Array.from(
    new Set(
      therapists.flatMap(therapist =>
        therapist.specializations.map(spec => spec.specialization.name)
      )
    )
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading therapists...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="bg-card p-6 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-2">
              Search by name, city, or specialization
            </label>
            <Input
              id="search"
              type="text"
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="specialization" className="block text-sm font-medium mb-2">
              Specialization
            </label>
            <select
              id="specialization"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="">All Specializations</option>
              {allSpecializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedSpecialization('')
              }}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {filteredTherapists.length} Therapist{filteredTherapists.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            onClick={() => setViewMode('map')}
          >
            Map View
          </Button>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'map' ? (
        <TherapistMap therapists={filteredTherapists} className="w-full" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTherapists.map(therapist => (
          <Card key={therapist.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    {therapist.firstName} {therapist.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {therapist.isVerified && '✓ Verified'} • {therapist.yearsOfExperience} years experience
                  </p>
                </div>
                {therapist.membershipType === 'PREMIUM' && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Premium
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="text-sm">
                <p className="font-medium">{therapist.city}, {therapist.state}</p>
                <p className="text-muted-foreground">{therapist.address}</p>
                <p className="text-muted-foreground">{therapist.phone}</p>
              </div>

              {/* Specializations */}
              <div>
                <p className="text-sm font-medium mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {therapist.specializations.map(spec => (
                    <span
                      key={spec.specialization.id}
                      className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded"
                    >
                      {spec.specialization.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio Preview */}
              {therapist.bio && (
                <div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {therapist.bio}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Message
                </Button>
              </div>
            </div>
          </Card>
        ))}
        </div>
      )}

      {filteredTherapists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No therapists found matching your criteria.
          </p>
          <Button
            onClick={() => {
              setSearchTerm('')
              setSelectedSpecialization('')
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}