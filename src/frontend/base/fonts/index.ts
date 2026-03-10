import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

const INTER = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
	preload: true,
	fallback: ['BlinkMacSystemFont', 'Segoe UI', 'Roboto'],
})

const JETBRAINS_MONO = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jet-brains-mono',
	display: 'swap',
	preload: false,
	fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo'],
})

const SPACE_GROTESK = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-space-grotesk',
	display: 'swap',
	preload: false,
	fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export { INTER, JETBRAINS_MONO, SPACE_GROTESK }
