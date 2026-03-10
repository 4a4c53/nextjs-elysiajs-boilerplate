'use server'

import { headers } from 'next/headers'
import { unauthorized } from 'next/navigation'
import { cache } from 'react'

import type { AuthContextType, GetSessionResponse, SessionType } from '@/types/auth'

import { auth } from '@/core/auth/server'

const getSession: () => Promise<SessionType> = cache(async () => {
	const res = await auth.api.getSession({ headers: await headers() })

	if (!res) {
		unauthorized()
	}

	return res.session
})

const getAuthSession: () => Promise<AuthContextType> = cache(async () => {
	const res = await auth.api.getSession({ headers: await headers() })

	if (!res) {
		unauthorized()
	}

	return res
})

const getUser: () => Promise<GetSessionResponse> = cache(async () => {
	const res = await auth.api.getSession({ headers: await headers() })

	if (!res) {
		unauthorized()
	}

	return {
		id: res.user.id,
		name: res.user.name,
		email: res.user.email,
		image: res.user.image,
	}
})

export { getSession, getAuthSession, getUser }
