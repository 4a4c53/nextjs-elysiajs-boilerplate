import { name, version } from '../../../package.json' with { type: 'json' }
import { env } from '../../core/env'

const APP = {
	NAME: name,
	VERSION: `v${version}`,
	URL: env.AUTH_URL,
	NAME_SNAKE_CASE: name.replace(/[@/\s-]+/g, '_').toLowerCase(),
} as const

export { APP }
