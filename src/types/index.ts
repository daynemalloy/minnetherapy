import { User as PrismaUser } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    role: string
  }

  interface Session {
    user: User & {
      id: string
      email: string
      role: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
  }
}

export type UserRole = "PATIENT" | "PROVIDER" | "ADMIN"
export type MembershipType = "FREE" | "PREMIUM"
export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"

export interface SearchFilters {
  location?: {
    lat: number
    lng: number
    radius: number
  }
  specializations?: string[]
  availability?: {
    dayOfWeek?: number
    timeOfDay?: string
  }
  membershipType?: MembershipType
}
