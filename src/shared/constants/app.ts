import { env } from '@/core/env'
import packageJson from '../../../package.json' with { type: 'json' }

const { name, version } = packageJson

const APP = {
	NAME: name,
	VERSION: `v${version}`,
	URL: env.AUTH_URL,
	NAME_SNAKE_CASE: name.replace(/[@/\s-]+/g, '_').toLowerCase(),
} as const

export { APP }
