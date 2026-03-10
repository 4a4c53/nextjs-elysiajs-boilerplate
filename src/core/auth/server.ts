import { hash, password } from 'bun'

import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'

import { prisma } from '@/core/database/prisma'
import { env } from '@/core/env'
import { APP } from '@/shared/constants/app'

const auth = betterAuth({
	appName: APP.NAME,
	baseURL: env.AUTH_URL,
	basePath: '/api/v1/auth',
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	plugins: [nextCookies()],
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		minPasswordLength: 8,
		maxPasswordLength: 20,
		requireEmailVerification: false,
		password: {
			hash: async (pwd) => await password.hash(pwd),
			verify: async (creds) => await password.verify(creds.password, creds.hash),
		},
	},
	rateLimit: {
		storage: 'database',
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // Update session every 24 hours
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
			strategy: 'jwe',
		},
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => ({
					data: {
						...user,
						image: `https://avatar.vercel.sh/${hash(user.email)}.png?size=32`,
					},
				}),
			},
		},
	},
	advanced: {
		ipAddress: {
			ipAddressHeaders: ['x-client-ip', 'x-forwarded-for', 'x-real-ip'],
		},
		cookiePrefix: `${APP.NAME_SNAKE_CASE}_auth`,
		defaultCookieAttributes: {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
		},
		database: {
			generateId: false,
		},
	},
})

export { auth }
