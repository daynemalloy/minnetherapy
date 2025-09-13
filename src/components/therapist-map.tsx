'use client'

import { useEffect, useRef, useState } from 'react'

// Extend window interface for Google Maps
declare global {
  interface Window {
    google: any
    initMap?: () => void
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
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(false)  // Changed to false initially
  const [error, setError] = useState<string | null>(null)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // Callback ref to capture the div element
  const mapRef = (element: HTMLDivElement | null) => {
    console.log('mapRef callback called with element:', !!element)
    setMapContainer(element)
  }

  // Check if API key is available
  useEffect(() => {
    console.log('API Key available:', !!apiKey)
    console.log('Map component mounted, therapists count:', therapists.length)
  }, [apiKey, therapists.length])

  const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        console.log('Google Maps already loaded')
        resolve(window.google.maps)
        return
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector('script[data-google-maps="true"]')
      if (existingScript) {
        console.log('Google Maps script already in DOM, waiting...')
        const checkLoaded = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkLoaded)
            resolve(window.google.maps)
          }
        }, 100)

        // Add timeout for waiting
        setTimeout(() => {
          clearInterval(checkLoaded)
          reject(new Error('Timeout waiting for Google Maps to load'))
        }, 10000)
        return
      }

      console.log('Loading Google Maps script...')
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.setAttribute('data-google-maps', 'true')

      script.onload = () => {
        console.log('Google Maps script loaded successfully')
        // Check if there are any immediate API errors
        setTimeout(() => {
          if (window.google && window.google.maps) {
            resolve(window.google.maps)
          } else {
            reject(new Error('Google Maps API failed to initialize'))
          }
        }, 100)
      }

      script.onerror = (error) => {
        console.error('Failed to load Google Maps script:', error)
        reject(new Error('Failed to load Google Maps script - check your API key'))
      }

      document.head.appendChild(script)
    })
  }

  const initializeMap = async () => {
    try {
      console.log('Initializing map...')
      setLoading(true)
      setError(null)

      if (!apiKey) {
        throw new Error('Google Maps API key is not configured')
      }

      if (!mapContainer) {
        throw new Error('Map container not found')
      }

      // Load Google Maps API
      await loadGoogleMapsScript()
      setIsScriptLoaded(true)

      // Check for API key errors
      if (window.google && window.google.maps && window.google.maps.error) {
        throw new Error(`Google Maps API Error: ${window.google.maps.error}`)
      }

      // Center on Minnesota (Minneapolis-St. Paul area)
      const minnesotaCenter = { lat: 44.9778, lng: -93.2650 }

      console.log('Creating map instance...')
      const mapInstance = new window.google.maps.Map(mapContainer, {
        center: minnesotaCenter,
        zoom: 8,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      console.log('Map created, adding markers...')

      // Add markers for therapists with location data
      const validTherapists = therapists.filter(t => t.latitude && t.longitude)
      console.log('Valid therapists with coordinates:', validTherapists.length)

      validTherapists.forEach((therapist, index) => {
        if (!therapist.latitude || !therapist.longitude) return

        console.log(`Creating marker ${index + 1} for ${therapist.firstName} ${therapist.lastName}`)

        // Create marker
        const marker = new window.google.maps.Marker({
          position: { lat: therapist.latitude, lng: therapist.longitude },
          map: mapInstance,
          title: `${therapist.firstName} ${therapist.lastName}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        })

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 300px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${therapist.firstName} ${therapist.lastName}</h3>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${therapist.address}<br>${therapist.city}, ${therapist.state}</p>
              <div style="margin-bottom: 12px;">
                <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 500;">Specializations:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  ${therapist.specializations.map(spec =>
                    `<span style="background: #e3f2fd; color: #1976d2; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${spec.specialization.name}</span>`
                  ).join('')}
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">View Profile</button>
                <button style="border: 1px solid #ccc; color: #333; background: white; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">Message</button>
              </div>
            </div>
          `
        })

        // Add click listener
        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker)
        })
      })

      // Fit bounds to show all markers
      if (validTherapists.length > 0) {
        const bounds = new window.google.maps.LatLngBounds()
        validTherapists.forEach(therapist => {
          if (therapist.latitude && therapist.longitude) {
            bounds.extend({ lat: therapist.latitude, lng: therapist.longitude })
          }
        })
        mapInstance.fitBounds(bounds)

        // Ensure minimum zoom level
        const listener = window.google.maps.event.addListener(mapInstance, 'bounds_changed', () => {
          if (mapInstance.getZoom() > 12) {
            mapInstance.setZoom(12)
          }
          window.google.maps.event.removeListener(listener)
        })
      }

      console.log('Map initialization complete!')
      setLoading(false)
    } catch (err) {
      console.error('Error initializing map:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to load map'

      // Check for common API key issues
      if (errorMessage.includes('API key') || errorMessage.includes('InvalidKey')) {
        setError('Invalid Google Maps API key. Please check your API key configuration in Google Cloud Console.')
      } else {
        setError(errorMessage)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('useEffect triggered - mapContainer:', !!mapContainer, 'therapists.length:', therapists.length)

    if (mapContainer && therapists.length > 0) {
      console.log('Conditions met, calling initializeMap()')
      initializeMap()
    } else {
      console.log('Conditions not met - mapContainer:', !!mapContainer, 'therapists:', therapists.length)
    }

    // Cleanup function
    return () => {
      console.log('Component cleanup')
      setLoading(false)
      setError(null)
    }
  }, [mapContainer, therapists, apiKey])

  console.log('Render - apiKey:', !!apiKey, 'loading:', loading, 'error:', error)

  if (!apiKey) {
    console.log('Rendering: No API key')
    return (
      <div className={`flex items-center justify-center h-96 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <p className="text-red-600 mb-2">⚠️ Google Maps API key not found</p>
          <p className="text-sm text-gray-600">
            Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    console.log('Rendering: Loading state')
    return (
      <div className={`flex items-center justify-center h-96 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
          {isScriptLoaded && <p className="text-sm text-gray-500">Initializing...</p>}
        </div>
      </div>
    )
  }

  if (error) {
    console.log('Rendering: Error state')
    return (
      <div className={`flex items-center justify-center h-96 bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <p className="text-red-600 mb-2">⚠️ Map Error</p>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={initializeMap}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  console.log('Rendering: Map container')
  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-96 rounded-lg border" />
      <div className="mt-4 text-sm text-gray-600">
        <p>📍 Showing {therapists.filter(t => t.latitude && t.longitude).length} therapists with location data</p>
      </div>
    </div>
  )
}