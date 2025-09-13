import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const minnesotaCities = [
  { name: 'Minneapolis', lat: 44.9778, lng: -93.2650, zip: '55401' },
  { name: 'Saint Paul', lat: 44.9537, lng: -93.0900, zip: '55102' },
  { name: 'Rochester', lat: 44.0121, lng: -92.4802, zip: '55901' },
  { name: 'Duluth', lat: 46.7867, lng: -92.1005, zip: '55802' },
  { name: 'Bloomington', lat: 44.8408, lng: -93.2982, zip: '55425' },
  { name: 'Brooklyn Park', lat: 45.0941, lng: -93.3563, zip: '55443' },
  { name: 'Plymouth', lat: 45.0105, lng: -93.4555, zip: '55447' },
  { name: 'Saint Cloud', lat: 45.5608, lng: -94.1624, zip: '56301' },
  { name: 'Eagan', lat: 44.8041, lng: -93.1668, zip: '55121' },
  { name: 'Woodbury', lat: 44.9239, lng: -92.9594, zip: '55125' },
  { name: 'Maple Grove', lat: 45.0725, lng: -93.4557, zip: '55369' },
  { name: 'Eden Prairie', lat: 44.8547, lng: -93.4708, zip: '55344' },
  { name: 'Coon Rapids', lat: 45.1200, lng: -93.3030, zip: '55433' },
  { name: 'Burnsville', lat: 44.7678, lng: -93.2777, zip: '55337' },
  { name: 'Minnetonka', lat: 44.9211, lng: -93.4688, zip: '55305' }
]

const specializations = [
  { name: 'Pediatric Therapy', description: 'Specialized care for children and adolescents' },
  { name: 'Hand Therapy', description: 'Treatment for hand, wrist, and upper extremity conditions' },
  { name: 'Neurological Rehabilitation', description: 'Recovery support for stroke, brain injury, and neurological conditions' },
  { name: 'Mental Health', description: 'Occupational therapy for mental health and wellness' },
  { name: 'Geriatric Care', description: 'Specialized therapy for older adults' },
  { name: 'Sensory Integration', description: 'Treatment for sensory processing disorders' },
  { name: 'Work Rehabilitation', description: 'Return-to-work and ergonomic assessments' },
  { name: 'Autism Spectrum', description: 'Specialized support for individuals with autism' },
  { name: 'Physical Rehabilitation', description: 'Recovery from injuries and physical impairments' },
  { name: 'Cognitive Therapy', description: 'Support for cognitive and executive functioning' }
]

const therapistData = [
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    licenseNumber: 'OT001234',
    phone: '612-555-0101',
    bio: 'Experienced pediatric occupational therapist with over 10 years helping children reach their developmental goals. Specializes in sensory integration and autism spectrum support.',
    yearsOfExperience: 10,
    specializations: ['Pediatric Therapy', 'Sensory Integration', 'Autism Spectrum']
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    licenseNumber: 'OT001235',
    phone: '651-555-0102',
    bio: 'Hand therapy specialist with expertise in post-surgical rehabilitation and ergonomic assessments. Certified Hand Therapist (CHT) with 8 years of experience.',
    yearsOfExperience: 8,
    specializations: ['Hand Therapy', 'Work Rehabilitation', 'Physical Rehabilitation']
  },
  {
    firstName: 'Emily',
    lastName: 'Rodriguez',
    licenseNumber: 'OT001236',
    phone: '507-555-0103',
    bio: 'Neurological rehabilitation expert helping stroke and brain injury survivors regain independence. Passionate about evidence-based practice.',
    yearsOfExperience: 12,
    specializations: ['Neurological Rehabilitation', 'Physical Rehabilitation', 'Cognitive Therapy']
  },
  {
    firstName: 'David',
    lastName: 'Thompson',
    licenseNumber: 'OT001237',
    phone: '218-555-0104',
    bio: 'Mental health occupational therapist focused on helping individuals develop coping strategies and life skills for improved well-being.',
    yearsOfExperience: 6,
    specializations: ['Mental Health', 'Cognitive Therapy']
  },
  {
    firstName: 'Lisa',
    lastName: 'Anderson',
    licenseNumber: 'OT001238',
    phone: '952-555-0105',
    bio: 'Geriatric specialist with extensive experience in fall prevention, home safety assessments, and maintaining independence in older adults.',
    yearsOfExperience: 15,
    specializations: ['Geriatric Care', 'Physical Rehabilitation']
  },
  {
    firstName: 'James',
    lastName: 'Wilson',
    licenseNumber: 'OT001239',
    phone: '763-555-0106',
    bio: 'Pediatric OT specializing in early intervention and school-based therapy. Enjoys helping children develop the skills they need for daily activities.',
    yearsOfExperience: 7,
    specializations: ['Pediatric Therapy', 'Sensory Integration']
  },
  {
    firstName: 'Amanda',
    lastName: 'Brown',
    licenseNumber: 'OT001240',
    phone: '651-555-0107',
    bio: 'Work rehabilitation specialist helping individuals return to work after injury. Certified in functional capacity evaluations and job site assessments.',
    yearsOfExperience: 9,
    specializations: ['Work Rehabilitation', 'Physical Rehabilitation', 'Hand Therapy']
  },
  {
    firstName: 'Robert',
    lastName: 'Davis',
    licenseNumber: 'OT001241',
    phone: '612-555-0108',
    bio: 'Experienced OT with a holistic approach to therapy. Specializes in helping individuals with autism develop life skills and independence.',
    yearsOfExperience: 11,
    specializations: ['Autism Spectrum', 'Cognitive Therapy', 'Mental Health']
  },
  {
    firstName: 'Jennifer',
    lastName: 'Garcia',
    licenseNumber: 'OT001242',
    phone: '507-555-0109',
    bio: 'Sensory integration specialist with advanced certification in Ayres Sensory Integration. Passionate about helping children process sensory information effectively.',
    yearsOfExperience: 8,
    specializations: ['Sensory Integration', 'Pediatric Therapy']
  },
  {
    firstName: 'Christopher',
    lastName: 'Miller',
    licenseNumber: 'OT001243',
    phone: '218-555-0110',
    bio: 'Neurological rehabilitation therapist with expertise in stroke recovery and traumatic brain injury rehabilitation. Uses innovative technology in treatment.',
    yearsOfExperience: 10,
    specializations: ['Neurological Rehabilitation', 'Cognitive Therapy', 'Physical Rehabilitation']
  },
  {
    firstName: 'Michelle',
    lastName: 'Taylor',
    licenseNumber: 'OT001244',
    phone: '952-555-0111',
    bio: 'Geriatric occupational therapist focused on maintaining quality of life and independence. Specializes in dementia care and adaptive strategies.',
    yearsOfExperience: 13,
    specializations: ['Geriatric Care', 'Cognitive Therapy']
  },
  {
    firstName: 'Kevin',
    lastName: 'White',
    licenseNumber: 'OT001245',
    phone: '763-555-0112',
    bio: 'Hand therapy and upper extremity specialist. Board-certified Hand Therapist with extensive post-surgical rehabilitation experience.',
    yearsOfExperience: 9,
    specializations: ['Hand Therapy', 'Physical Rehabilitation']
  },
  {
    firstName: 'Rachel',
    lastName: 'Lewis',
    licenseNumber: 'OT001246',
    phone: '651-555-0113',
    bio: 'Mental health OT with training in cognitive behavioral therapy techniques. Helps individuals develop healthy routines and coping mechanisms.',
    yearsOfExperience: 5,
    specializations: ['Mental Health', 'Cognitive Therapy']
  },
  {
    firstName: 'Daniel',
    lastName: 'Clark',
    licenseNumber: 'OT001247',
    phone: '612-555-0114',
    bio: 'Pediatric therapy specialist with expertise in feeding therapy and developmental delays. Creates fun, engaging therapy sessions for children.',
    yearsOfExperience: 8,
    specializations: ['Pediatric Therapy', 'Sensory Integration']
  },
  {
    firstName: 'Nicole',
    lastName: 'Hall',
    licenseNumber: 'OT001248',
    phone: '507-555-0115',
    bio: 'Work rehabilitation and ergonomics expert. Helps employers and employees create safer, more productive work environments.',
    yearsOfExperience: 7,
    specializations: ['Work Rehabilitation', 'Physical Rehabilitation']
  }
]

async function main() {
  console.log('🌱 Starting seed process...')

  // Create specializations
  console.log('📝 Creating specializations...')
  for (const spec of specializations) {
    await prisma.specialization.upsert({
      where: { name: spec.name },
      update: {},
      create: spec
    })
  }

  // Create therapist providers
  console.log('👨‍⚕️ Creating therapist providers...')
  for (let i = 0; i < therapistData.length; i++) {
    const therapist = therapistData[i]
    const city = minnesotaCities[i % minnesotaCities.length]
    const hashedPassword = await bcrypt.hash('password123', 12)

    // Create user account
    const user = await prisma.user.upsert({
      where: { email: `${therapist.firstName.toLowerCase()}.${therapist.lastName.toLowerCase()}@minnetherapy.com` },
      update: {},
      create: {
        email: `${therapist.firstName.toLowerCase()}.${therapist.lastName.toLowerCase()}@minnetherapy.com`,
        password: hashedPassword,
        role: 'PROVIDER',
        emailVerified: new Date()
      }
    })

    // Create provider profile
    const provider = await prisma.provider.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        firstName: therapist.firstName,
        lastName: therapist.lastName,
        licenseNumber: therapist.licenseNumber,
        phone: therapist.phone,
        address: `${Math.floor(Math.random() * 9999) + 1000} ${['Oak', 'Maple', 'Pine', 'Cedar'][Math.floor(Math.random() * 4)]} Street`,
        city: city.name,
        state: 'MN',
        zipCode: city.zip,
        bio: therapist.bio,
        yearsOfExperience: therapist.yearsOfExperience,
        latitude: city.lat + (Math.random() - 0.5) * 0.1, // Add some variance within city
        longitude: city.lng + (Math.random() - 0.5) * 0.1,
        membershipType: Math.random() > 0.7 ? 'PREMIUM' : 'FREE',
        isVerified: true
      }
    })

    // Link specializations
    for (const specName of therapist.specializations) {
      const specialization = await prisma.specialization.findUnique({
        where: { name: specName }
      })

      if (specialization) {
        await prisma.providerSpecialization.upsert({
          where: {
            providerId_specializationId: {
              providerId: provider.id,
              specializationId: specialization.id
            }
          },
          update: {},
          create: {
            providerId: provider.id,
            specializationId: specialization.id
          }
        })
      }
    }

    // Create availability (Monday-Friday, 9-5 with some variance)
    const daysOfWeek = [1, 2, 3, 4, 5] // Monday-Friday
    for (const day of daysOfWeek) {
      const startHour = 8 + Math.floor(Math.random() * 2) // 8-9 AM start
      const endHour = 16 + Math.floor(Math.random() * 2) // 4-5 PM end

      await prisma.providerAvailability.upsert({
        where: {
          providerId_dayOfWeek_startTime: {
            providerId: provider.id,
            dayOfWeek: day,
            startTime: `${startHour.toString().padStart(2, '0')}:00`
          }
        },
        update: {},
        create: {
          providerId: provider.id,
          dayOfWeek: day,
          startTime: `${startHour.toString().padStart(2, '0')}:00`,
          endTime: `${endHour.toString().padStart(2, '0')}:00`
        }
      })
    }

    console.log(`✅ Created provider: ${therapist.firstName} ${therapist.lastName} in ${city.name}`)
  }

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })