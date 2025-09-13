import { User as PrismaUser } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    role: string
  }

  interface Session {
    user: User & {
      i
