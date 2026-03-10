import { createAuthClient } from 'better-auth/client'

import { env } from '@/core/env'

const authClient = createAuthClient({
	basePath: '/api/v1/auth',
	baseURL: env.AUTH_URL,
})

export { authClient }
