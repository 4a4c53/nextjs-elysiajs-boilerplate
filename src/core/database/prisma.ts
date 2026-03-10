import { PrismaPg } from '@prisma/adapter-pg'

import { env } from '@/core/env'
import { PrismaClient } from '@/generated/client'

const ADAPTER = new PrismaPg({ connectionString: env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: ADAPTER })

export { prisma }
