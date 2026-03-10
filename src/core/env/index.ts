import { env as processEnv } from 'node:process'

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const env = createEnv({
	server: {
		DATABASE_URL: z.url().startsWith('postgresql://'),
		AUTH_SECRET: z.string().min(32, 'AUTH_SECRET must be at least 32 characters'),
	},
	client: {
		// Add client variables here if needed (must start with NEXT_PUBLIC_)
	},
	shared: {
		NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
		AUTH_URL: z.url().optional().default('http://localhost:3000'),
	},
	runtimeEnv: {
		NODE_ENV: processEnv.NODE_ENV,
		DATABASE_URL: processEnv.DATABASE_URL,
		AUTH_SECRET: processEnv.AUTH_SECRET,
		AUTH_URL: processEnv.AUTH_URL,
	},
})

export { env }
