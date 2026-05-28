import { PrismaClient } from '@prisma/client'

async function main() {
  // @ts-ignore - testing datasourceUrl for Prisma 7
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
  })
  try {
    const users = await prisma.user.findMany()
    console.log('Users:', users)
  } catch (e) {
    console.error('Error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
