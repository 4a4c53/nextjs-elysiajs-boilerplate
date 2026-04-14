import { treaty } from '@elysiajs/eden'

import { elysiaApp } from '@/server/v1/index'
import { APP } from '@/shared/constants/app'

const api = {
	v1: typeof process !== 'undefined' ? treaty(elysiaApp) : treaty<typeof elysiaApp>(APP.URL),
}

export { api }
