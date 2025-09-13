import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const specialization = searchParams.get('specialization')
    const city = searchParams.get('city')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius') // in miles

    // Base query to get all verified providers
    let whereClause: any = {
      isVerified: true
    }

    // Add search filters
    if (search) {
      whereClause.OR = [
        {
          firstName: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          city: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          specializations: {
            some: {
              specialization: {
                name: {
                  contains: search,
                  mode: 'insensitive'
                }
              }
            }
          }
        }
      ]
    }

    // Add city filter
    if (city) {
      whereClause.city = {
        contains: city,
        mode: 'insensitive'
      }
    }

    // Add specialization filter
    if (specialization) {
      whereClause.specializations = {
        some: {
          specialization: {
            name: specialization
          }
        }
      }
    }

    const providers = await prisma.provider.findMany({
      where: whereClause,
      include: {
        specializations: {
          include: {
            specialization: true
          }
        },
        user: {
          select: {
            id: true,
            email: true
          }
        }
      },
      orderBy: [
        { membershipType: 'desc' }, // Premium first
        { yearsOfExperience: 'desc' },
        { firstName: 'asc' }
      ]
    })

    // If location search is requested, filter by radius
    let filteredProviders = providers
    if (lat && lng && radius) {
      const userLat = parseFloat(lat)
      const userLng = parseFloat(lng)
      const maxRadius = parseFloat(radius)

      filteredProviders = providers.filter(provider => {
        if (!provider.latitude || !provider.longitude) return false

        // Calculate distance using Haversine formula
        const R = 3959 // Earth's radius in miles
        const dLat = (provider.latitude - userLat) * Math.PI / 180
        const dLng = (provider.longitude - userLng) * Math.PI / 180
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(userLat * Math.PI / 180) * Math.cos(provider.latitude * Math.PI / 180) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c

        return distance <= maxRadius
      })
    }

    // Format the response
    const formattedProviders = filteredProviders.map(provider => ({
      id: provider.id,
      firstName: provider.firstName,
      lastName: provider.lastName,
      licenseNumber: provider.licenseNumber,
      phone: provider.phone,
      address: provider.address,
      city: provider.city,
      state: provider.state,
      zipCode: provider.zipCode,
      bio: provider.bio,
      yearsOfExperience: provider.yearsOfExperience,
      latitude: provider.latitude,
      longitude: provider.longitude,
      membershipType: provider.membershipType,
      isVerified: provider.isVerified,
      specializations: provider.specializations
    }))

    return NextResponse.json(formattedProviders)
  } catch (error) {
    console.error('Error fetching therapists:', error)
    return NextResponse.json(
      { error: 'Failed to fetch therapists' },
      { status: 500 }
    )
  }
}