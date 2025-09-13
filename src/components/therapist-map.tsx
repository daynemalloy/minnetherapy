'use client'

import { useEffect, useRef, useState } from 'react'

// Extend window interface for Google Maps
declare global {
  interface Window {
    google: any
  }
}

interface Therapist {
  id: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  latitude?: number
  longitude?: number
  specializations: Array<{
    specialization: {
      name: string
    }
  }>
}

interface TherapistMapProps {
  therapists: Therapist[]
  className?: string
}

export function TherapistMap({ therapists, className = '' }: TherapistMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMap = async () => {
      try {
        setLoading(true)

        // Load Google Maps script manually
        if (!window.google) {
          const script = document.createElement('script')
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
          script.async = true
          script.defer = true
          document.head.appendChild(script)

          await new Promise((resolve) => {
            script.onload = resolve
          })
        }

        if (!mapRef.current) return

        // Center on Minnesota (Minneapolis-St. Paul area)
        const minnesotaCenter = { lat: 44.9778, lng: -93.2650 }

        // Create map
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: minnesotaCenter,
          zoom: 8,
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'poi.medical',
              stylers: [{ visibility: 'simplified' }]
            }
          ]
        })

        setMap(mapInstance)

        // Add markers for therapists with location data
        const validTherapists = therapists.filter(t => t.latitude && t.longitude)

        validTherapists.forEach(therapist => {
          if (!therapist.latitude || !therapist.longitude) return

          // Create standard marker
          const marker = new google.maps.Marker({
            map: mapInstance,
            position: { lat: therapist.latitude, lng: therapist.longitude },
            title: `${therapist.firstName} ${therapist.lastName}`,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: '#3b82f6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            }
          })

          // Create info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-4 max-w-sm">
                <h3 class="font-semibold text-lg mb-2">${therapist.firstName} ${therapist.lastName}</h3>
                <p class="text-sm text-gray-600 mb-2">${therapist.address}<br>${therapist.city}, ${therapist.state}</p>
                <div class="mb-3">
                  <p class="text-sm font-medium mb-1">Specializations:</p>
                  <div class="flex flex-wrap gap-1">
                    ${therapist.specializations.map(spec =>
                      `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${spec.specialization.name}</span>`
                    ).join('')}
                  </div>
                </div>
                <div class="flex gap-2">
                  <button class="bg-primary text-white text-xs px-3 py-1 rounded hover:bg-primary/90">
                    View Profile
                  </button>
                  <button class="border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded hover:bg-gray-50">
                    Message
                  </button>
                </div>
              </div>
            `
          })

          // Add click listener to marker
          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker)
          })
        })

        // Adjust map bounds to fit all markers if there are therapists
        if (validTherapists.length > 0) {
          const bounds = new google.maps.LatLngBounds()
          validTherapists.forEach(therapist => {
            if (therapist.latitude && therapist.longitude) {
              bounds.extend({ lat: therapist.latitude, lng: therapist.longitude })
            }
          })
          mapInstance.fitBounds(bounds)

          // Ensure minimum zoom level
          const listener = google.maps.event.addListener(mapInstance, 'bounds_changed', () => {
            if (mapInstance.getZoom()! > 12) {
              mapInstance.setZoom(12)
            }
            google.maps.event.removeListener(listener)
          })
        }

        setLoading(false)
      } catch (err) {
        console.error('Error loading map:', err)
        setError('Failed to load map. Please check your Google Maps API key.')
        setLoading(false)
      }
    }

    if (mapRef.current) {
      initMap()
    }
  }, [therapists])

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-96 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-96 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <p className="text-red-600 mb-2">⚠️ {error}</p>
          <p className="text-sm text-gray-600">
            To enable maps, add your Google Maps API key to the environment variables.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-96 rounded-lg" />
      <div className="mt-4 text-sm text-gray-600">
        <p>📍 Showing {therapists.filter(t => t.latitude && t.longitude).length} therapists with location data</p>
      </div>
    </div>
  )
}