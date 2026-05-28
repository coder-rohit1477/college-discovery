import { PrismaClient, CollegeType, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')

  // Clear existing data
  await prisma.comparisonHistory.deleteMany()
  await prisma.savedCollege.deleteMany()
  await prisma.review.deleteMany()
  await prisma.course.deleteMany()
  await prisma.college.deleteMany()
  await prisma.user.deleteMany()

  // Create dummy users for reviews
  const users = await Promise.all([
    prisma.user.create({
      data: {
        clerkId: 'user_1',
        email: 'rahul.sharma@example.com',
        firstName: 'Rahul',
        lastName: 'Sharma',
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_2',
        email: 'priya.patel@example.com',
        firstName: 'Priya',
        lastName: 'Patel',
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_3',
        email: 'amit.verma@example.com',
        firstName: 'Amit',
        lastName: 'Verma',
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_4',
        email: 'sneha.reddy@example.com',
        firstName: 'Sneha',
        lastName: 'Reddy',
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_5',
        email: 'ananya.iyer@example.com',
        firstName: 'Ananya',
        lastName: 'Iyer',
      },
    }),
  ])

  const collegeData = [
    {
      name: 'Indian Institute of Technology (IIT) Delhi',
      slug: 'iit-delhi',
      location: 'Hauz Khas, New Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      type: CollegeType.PUBLIC,
      ranking: 2,
      established: 1961,
      placementPercentage: 94.5,
      averagePackage: 18.5,
      description: 'One of the premier engineering institutes in India, known for its excellence in research and technology.',
    },
    {
      name: 'Indian Institute of Technology (IIT) Bombay',
      slug: 'iit-bombay',
      location: 'Powai, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: CollegeType.PUBLIC,
      ranking: 1,
      established: 1958,
      placementPercentage: 96.2,
      averagePackage: 21.0,
      description: 'A global leader in engineering education and research, located in the heart of India\'s financial capital.',
    },
    {
      name: 'Birla Institute of Technology and Science (BITS) Pilani',
      slug: 'bits-pilani',
      location: 'Vidya Vihar, Pilani',
      city: 'Pilani',
      state: 'Rajasthan',
      type: CollegeType.PRIVATE,
      ranking: 5,
      established: 1964,
      placementPercentage: 92.0,
      averagePackage: 15.6,
      description: 'A premier private university known for its merit-based admissions and strong industry connections.',
    },
    {
      name: 'Vellore Institute of Technology (VIT)',
      slug: 'vit-vellore',
      location: 'Katpadi, Vellore',
      city: 'Vellore',
      state: 'Tamil Nadu',
      type: CollegeType.PRIVATE,
      ranking: 11,
      established: 1984,
      placementPercentage: 88.5,
      averagePackage: 8.2,
      description: 'A leading private institution known for its state-of-the-art infrastructure and diverse student community.',
    },
    {
      name: 'National Institute of Technology (NIT) Trichy',
      slug: 'nit-trichy',
      location: 'Tanjore Main Road, Tiruchirappalli',
      city: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      type: CollegeType.PUBLIC,
      ranking: 9,
      established: 1964,
      placementPercentage: 91.2,
      averagePackage: 12.8,
      description: 'The top-ranked NIT in India, offering excellent academic programs in various engineering disciplines.',
    },
    {
      name: 'Delhi Technological University (DTU)',
      slug: 'dtu-delhi',
      location: 'Shahbad Daulatpur, Bawana Road',
      city: 'Delhi',
      state: 'Delhi',
      type: CollegeType.PUBLIC,
      ranking: 15,
      established: 1941,
      placementPercentage: 89.0,
      averagePackage: 11.5,
      description: 'Formerly known as Delhi College of Engineering, it is one of the oldest and most prestigious engineering colleges in India.',
    },
    {
      name: 'Manipal Institute of Technology',
      slug: 'manipal-mit',
      location: 'Manipal',
      city: 'Udupi',
      state: 'Karnataka',
      type: CollegeType.PRIVATE,
      ranking: 20,
      established: 1957,
      placementPercentage: 85.0,
      averagePackage: 7.5,
      description: 'A constituent college of Manipal Academy of Higher Education, offering a wide range of engineering programs.',
    },
    {
      name: 'Shri Ram College of Commerce (SRCC)',
      slug: 'srcc-delhi',
      location: 'University Enclave',
      city: 'Delhi',
      state: 'Delhi',
      type: CollegeType.PUBLIC,
      ranking: 1, // Commerce ranking
      established: 1926,
      placementPercentage: 90.0,
      averagePackage: 9.8,
      description: 'The premier institute for commerce and economics education in India, part of Delhi University.',
    },
    {
      name: 'All India Institute of Medical Sciences (AIIMS) Delhi',
      slug: 'aiims-delhi',
      location: 'Ansari Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      type: CollegeType.PUBLIC,
      ranking: 1, // Medical ranking
      established: 1956,
      placementPercentage: 100,
      averagePackage: 14.0,
      description: 'The topmost medical college and hospital in India, established as an institute of national importance.',
    },
    {
      name: 'Indian Institute of Management (IIM) Ahmedabad',
      slug: 'iim-ahmedabad',
      location: 'Vastrapur',
      city: 'Ahmedabad',
      state: 'Gujarat',
      type: CollegeType.PUBLIC,
      ranking: 1, // Management ranking
      established: 1961,
      placementPercentage: 100,
      averagePackage: 32.5,
      description: 'The world-renowned business school, known for its rigorous academic standards and elite placements.',
    },
  ]

  // Add more colleges to reach 40+
  const indianCities = [
    { city: 'Bangalore', state: 'Karnataka' },
    { city: 'Chennai', state: 'Tamil Nadu' },
    { city: 'Hyderabad', state: 'Telangana' },
    { city: 'Kolkata', state: 'West Bengal' },
    { city: 'Pune', state: 'Maharashtra' },
    { city: 'Jaipur', state: 'Rajasthan' },
    { city: 'Lucknow', state: 'Uttar Pradesh' },
    { city: 'Chandigarh', state: 'Punjab' },
  ]

  for (let i = 1; i <= 35; i++) {
    const cityData = indianCities[i % indianCities.length]
    const type = i % 3 === 0 ? CollegeType.PRIVATE : CollegeType.PUBLIC
    collegeData.push({
      name: `${type === CollegeType.PUBLIC ? 'National' : 'Global'} Institute of Technology ${i}`,
      slug: `git-college-${i}`,
      location: `Area ${i}, ${cityData.city}`,
      city: cityData.city,
      state: cityData.state,
      type: type,
      ranking: 20 + i,
      established: 1950 + (i * 2),
      placementPercentage: 70 + (Math.random() * 25),
      averagePackage: 4 + (Math.random() * 10),
      description: `A well-established ${type.toLowerCase()} institution in ${cityData.city} providing quality education.`,
    })
  }

  const commonCourses = [
    { name: 'B.Tech Computer Science', level: CourseLevel.UNDERGRADUATE, duration: '4 Years', fees: 250000 },
    { name: 'B.Tech Electronics', level: CourseLevel.UNDERGRADUATE, duration: '4 Years', fees: 220000 },
    { name: 'MBA General', level: CourseLevel.POSTGRADUATE, duration: '2 Years', fees: 500000 },
    { name: 'B.Com Honors', level: CourseLevel.UNDERGRADUATE, duration: '3 Years', fees: 50000 },
    { name: 'M.Tech AI & Data Science', level: CourseLevel.POSTGRADUATE, duration: '2 Years', fees: 150000 },
    { name: 'B.A. English Literature', level: CourseLevel.UNDERGRADUATE, duration: '3 Years', fees: 30000 },
    { name: 'MBBS', level: CourseLevel.UNDERGRADUATE, duration: '5.5 Years', fees: 100000 },
  ]

  const reviewTemplates = [
    { rating: 5, content: 'Excellent faculty and world-class infrastructure. Best 4 years of my life!' },
    { rating: 4, content: 'Great placements, but the academic pressure is quite high.' },
    { rating: 5, content: 'The campus life is amazing. So many opportunities for personal growth.' },
    { rating: 3, content: 'Good college but needs improvement in hostel facilities.' },
    { rating: 4, content: 'Teaching standards are high. Very supportive alumni network.' },
  ]

  for (const collegeItem of collegeData) {
    const college = await prisma.college.create({
      data: {
        ...collegeItem,
      },
    })

    // Create 3-5 courses for each college
    const numCourses = 3 + Math.floor(Math.random() * 3)
    const shuffledCourses = [...commonCourses].sort(() => 0.5 - Math.random())
    
    for (let j = 0; j < numCourses; j++) {
      const courseTemplate = shuffledCourses[j]
      await prisma.course.create({
        data: {
          name: courseTemplate.name,
          level: courseTemplate.level,
          duration: courseTemplate.duration,
          fees: courseTemplate.fees + (Math.random() * 50000),
          collegeId: college.id,
        },
      })
    }

    // Create 2-4 reviews for each college
    const numReviews = 2 + Math.floor(Math.random() * 3)
    const shuffledUsers = [...users].sort(() => 0.5 - Math.random())
    
    for (let k = 0; k < numReviews; k++) {
      const reviewTemplate = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)]
      await prisma.review.create({
        data: {
          rating: reviewTemplate.rating,
          content: reviewTemplate.content,
          userId: shuffledUsers[k].id,
          collegeId: college.id,
        },
      })
    }
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
