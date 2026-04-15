import { Elysia } from 'elysia'

import { auth } from '@/core/auth/server'

const elysiaApp = new Elysia({ prefix: '/api/v1' }).mount('/_internal/auth', auth.handler)

// HTTP method handlers
const GET = elysiaApp.handle
const POST = elysiaApp.handle

export { elysiaApp, GET, POST }
