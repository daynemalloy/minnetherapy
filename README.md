# MinneTherapy - Project Overview

## Vision
MinneTherapy is a comprehensive healthcare platform designed to connect patients with qualified occupational therapists across Minnesota. Our mission is to make OT services more accessible while providing therapists with tools to grow their practice.

## Target Users

### Primary Users
- **Patients**: Individuals seeking occupational therapy services
- **Providers**: Licensed occupational therapists and OT practices
- **Admins**: Platform administrators managing the ecosystem

### Secondary Users
- **Caregivers**: Family members managing care for patients
- **Insurance Companies**: Partners for coverage verification
- **Healthcare Systems**: Potential integration partners

## Core Value Propositions

### For Patients
- **Easy Discovery**: Find qualified OTs by location, specialization, and availability
- **Transparent Pricing**: Clear rates and insurance coverage information
- **Streamlined Booking**: Simple appointment scheduling and management
- **Verified Providers**: All therapists are licensed and background-checked
- **Integrated Payments**: Secure payment processing with insurance handling

### For Providers
- **Practice Growth**: Expanded patient reach and marketing tools
- **Efficient Operations**: Automated scheduling, billing, and client management
- **Professional Network**: Connect with other healthcare providers
- **Revenue Optimization**: Dynamic pricing and performance analytics

## Feature Roadmap

## Phase 1: MVP (Current Focus)
**Timeline: 30 days**

### Authentication & User Management
- [x] Basic project structure
- [ ] User registration (Patient/Provider)
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Basic profile management
- [ ] Role-based access control

### Provider Onboarding
- [ ] License verification system
- [ ] Background check integration
- [ ] Service offering setup
- [ ] Availability calendar
- [ ] Rate setting interface

### Patient Experience
- [ ] Provider search and filtering
- [ ] Provider profile viewing
- [ ] Basic appointment booking
- [ ] Payment processing (Stripe)
- [ ] Appointment confirmation emails

### Core Platform
- [ ] Admin dashboard
- [ ] Basic messaging system
- [ ] Email notifications
- [ ] Review and rating system
- [ ] Mobile-responsive design

## Phase 2: Enhanced Features
**Timeline: 2-3 months after MVP**

### Advanced Search & Matching
- [ ] Advanced filtering (insurance, specializations)
- [ ] Geographic radius search
- [ ] Availability-based search
- [ ] Waitlist functionality

### Provider Tools
- [ ] Advanced calendar management
- [ ] Client progress tracking
- [ ] Performance analytics dashboard

### Patient Features
- [ ] Medical history management
- [ ] Appointment reminders (SMS/Email)
- [ ] Telehealth integration
- [ ] Insurance verification
- [ ] Care plan tracking
- [ ] Family/caregiver access

### Platform Enhancements
- [ ] Mobile app development
- [ ] Advanced reporting for admins

## Phase 3: Scale & Integration
**Timeline: 3-6 months**

### Healthcare Ecosystem
- [ ] EHR/EMR integrations
- [ ] Insurance company partnerships
- [ ] Healthcare system partnerships
- [ ] Physician referral system
- [ ] Outcome tracking and reporting

### Advanced Platform Features
- [ ] AI-powered insights
- [ ] Predictive analytics
- [ ] Advanced fraud detection
- [ ] Multi-language support
- [ ] Compliance automation (HIPAA, etc.)

### Business Intelligence
- [ ] Advanced analytics dashboard
- [ ] Market insights for providers
- [ ] Demand forecasting
- [ ] Revenue optimization tools
- [ ] Competitive analysis tools

## Technical Architecture

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query + Zustand
- **Testing**: Playwright for E2E

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **File Storage**: Google Cloud Storage
- **Email**: Nodemailer with SMTP

### Third-Party Services
- **Payments**: Stripe
- **Maps**: Google Maps API
- **Communications**: Twilio (SMS) + SendGrid (Email)
- **Monitoring**: Vercel Analytics + Sentry
- **Hosting**: Vercel (Frontend) + Railway (Database)

## Business Model

### Revenue Streams
1. **Subscription Plans**: Monthly fees for advanced provider features and enhanced verification

### Pricing Strategy for Providers
- **Free Tier**: Basic profile with patient messaging
- **Professional**: $50/month - Full features for individual providers including patient booking system and access to provider forum
- **Enterprise**: $200/month - All features in Professional plan for multi-location, multiple therapist practices 


### Pricing Strategy for Patients
- **Free Tier**: Search functionality and messaging to providers

## Success Metrics

### User Acquisition
- Monthly active users (patients and providers)
- Provider sign-up and verification completion rates
- Patient registration to first booking conversion
- Geographic coverage across Minnesota

### Engagement
- Average sessions per user
- Booking completion rates
- Provider utilization rates
- Patient retention and repeat bookings

### Business Metrics
- Monthly Recurring Revenue (MRR)
- Transaction volume
- Average order value
- Customer acquisition cost (CAC)
- Lifetime value (LTV)

## Compliance & Security

### Healthcare Compliance
- **HIPAA**: Full compliance for handling PHI
- **State Licensing**: Integration with Minnesota licensing boards
- **Insurance**: NCCI compliance for insurance processing
- **Accessibility**: ADA compliance for web accessibility

### Data Security
- **Encryption**: End-to-end encryption for sensitive data
- **Access Control**: Role-based permissions and audit trails
- **Backup**: Automated backups with disaster recovery
- **Monitoring**: 24/7 security monitoring and incident response

## Market Opportunity

### Market Size
- **Minnesota Population**: 5.6M people
- **Potential OT Patients**: ~280K annually (5% of population)
- **Licensed OTs in Minnesota**: ~2,500
- **Average OT Session Cost**: $150-250

### Competitive Landscape
- **Direct Competitors**: Psychology Today, BetterHelp (mental health focus)
- **Indirect Competitors**: Healthcare systems, private practice websites
- **Differentiation**: OT-specific features, Minnesota focus, integrated payments

## Launch Strategy

### Go-to-Market
1. **Provider Acquisition**: Direct outreach to OT practices
2. **Patient Acquisition**: Digital marketing and healthcare partnerships
3. **Geographic Expansion**: Start with Twin Cities, expand statewide
4. **Partnership Development**: Insurance companies and healthcare systems

### Marketing Channels
- **Digital**: SEO, Google Ads, Facebook/Instagram advertising
- **Healthcare**: Medical conference presence, professional associations
- **Referrals**: Incentive programs for providers and patients
- **Content**: Educational blog, webinars, healthcare professional resources

This project represents a significant opportunity to improve healthcare access while building a sustainable technology business focused on occupational therapy services in Minnesota.

