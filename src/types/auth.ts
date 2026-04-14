import type { auth } from '@/core/auth/server'
import type { Prettify } from './prettify'

type UserType = typeof auth.$Infer.Session.user
type SessionType = typeof auth.$Infer.Session.session
type AuthContextType = typeof auth.$Infer.Session

type GetSessionResponse = Prettify<Omit<UserType, 'emailVerified' | 'createdAt' | 'updatedAt'>>

export type { AuthContextType, GetSessionResponse, SessionType, UserType }
