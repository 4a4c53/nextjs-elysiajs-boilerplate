import type { NextConfig } from 'next'
import '@/core/env'

const nextConfig: NextConfig = {
	poweredByHeader: false,
	devIndicators: {
		position: 'bottom-right',
	},
	experimental: {
		authInterrupts: true,
	},
}

export default nextConfig
