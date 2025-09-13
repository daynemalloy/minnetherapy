# Claude Development Instructions

## Project Context
MinneTherapy is a healthcare platform connecting patients with occupational therapists in Minnesota. This is a Next.js 14 application with TypeScript, Prisma ORM, NextAuth v5, and Tailwind CSS.

## Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 (beta)
- **Payments**: Stripe integration
- **Maps**: Google Maps API
- **Email**: Nodemailer
- **Testing**: Playwright

## Code Style & Standards

### File Structure
- Use the Next.js 14 app router structure
- Place components in `src/components/`
- UI components go in `src/components/ui/`
- Keep pages in `src/app/`
- Database schema in `prisma/schema.prisma`

### TypeScript
- Always use TypeScript for new files
- Define proper interfaces and types
- Use strict type checking
- Prefer `interface` over `type` for object definitions

### React Best Practices
- Use functional components with hooks
- Prefer `const` for component declarations
- Use proper prop typing with TypeScript
- Implement error boundaries where appropriate
- Use React.memo() for performance optimization when needed

### Database & Prisma
- Always generate Prisma client after schema changes: `npx prisma generate`
- Use database migrations: `npx prisma migrate dev`
- Follow the existing schema patterns
- Handle database errors gracefully

### Authentication
- NextAuth v5 is in beta - expect some compatibility issues
- Use `--legacy-peer-deps` for npm installs if needed
- Follow the user role system: PATIENT, PROVIDER, ADMIN
- Implement proper session management

### UI/UX Guidelines
- Use shadcn/ui components consistently
- Follow the existing design system
- Ensure responsive design (mobile-first)
- Use Tailwind CSS utility classes
- Implement proper loading states
- Add error handling with user-friendly messages

## Development Commands

### Essential Commands
```bash
# Start development server
npm run dev

# Generate Prisma client (run after schema changes)
npx prisma generate

# Database migrations
npx prisma migrate dev

# View database in browser
npx prisma studio

# Build for production
npm run build
```

### Database Management
```bash
# Push schema changes without migration
npx prisma db push

# Reset database (careful!)
npx prisma migrate reset

# Seed database
npm run prisma:seed
```

## Key Features to Implement

### Authentication System
- User registration (patients vs providers)
- Email verification
- Password reset
- Profile management
- Role-based access control

### Provider Features
- Profile setup and verification
- Availability calendar
- Service offerings
- Rate setting
- Client management
- Revenue tracking

### Patient Features
- Therapist search and filtering
- Appointment booking
- Payment processing
- Review and rating system
- Medical history management

### Platform Features
- Admin dashboard
- Notification system
- Messaging between users
- Google Maps integration
- Stripe payment processing

## Code Generation Guidelines

When creating new components or features:

1. **Always provide complete, working code**
2. **Include proper TypeScript types**
3. **Add error handling**
4. **Follow the existing project structure**
5. **Use consistent naming conventions**
6. **Include necessary imports**
7. **Add comments for complex logic**

### Component Template
```typescript
import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentNameProps {
  // Define props with proper types
}

export function ComponentName({ 
  // Destructure props
  className,
  ...props 
}: ComponentNameProps) {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {/* Component content */}
    </div>
  )
}
```

### API Route Template
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Implementation here

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## Important Notes

- **NextAuth v5 Beta**: Use `--legacy-peer-deps` for installations
- **Prisma**: Always run `npx prisma generate` after schema changes
- **Environment Variables**: Check `.env.local` for required configurations
- **Database**: PostgreSQL connection required for full functionality
- **Payments**: Stripe keys needed for payment processing
- **Maps**: Google Maps API key required for location features

## Testing Strategy
- Use Playwright for E2E testing
- Test critical user flows (registration, booking, payments)
- Ensure responsive design across devices
- Test with different user roles

## Security Considerations
- Validate all user inputs
- Sanitize data before database operations
- Implement proper RBAC (Role-Based Access Control)
- Use HTTPS in production
- Secure API endpoints with proper authentication
- Handle sensitive data (medical information) with extra care

## Performance Optimization
- Use Next.js Image component for images
- Implement proper loading states
- Use React.memo for expensive components
- Optimize database queries
- Cache API responses where appropriate

When helping with this project, always consider the healthcare context and ensure compliance with relevant regulations and best practices for handling medical/personal information.
