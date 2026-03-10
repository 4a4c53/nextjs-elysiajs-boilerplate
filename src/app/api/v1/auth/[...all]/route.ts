import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '@/core/auth/server'

export const { POST, GET } = toNextJsHandler(auth)
