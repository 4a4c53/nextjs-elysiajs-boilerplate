import { edenFetch } from '@elysiajs/eden'

import type { elysiaApp } from '@/backend/v1/elysia'

import { APP } from '@/shared/constants/app'

type App = typeof elysiaApp

const fetchApi = edenFetch<App>(APP.URL, {
	credentials: 'include',
})

export { fetchApi }
