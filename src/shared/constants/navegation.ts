import type { NavigationSubItem, NavigationType } from '@/types/navigation'

const SIDEBAR_MAIN: NavigationType[] = [{ name: 'Home', href: '/', icon: 'home' }]

const SIDEBAR_PLATFORM: NavigationSubItem[] = [
	{
		name: 'Playground',
		href: '/playground',
		icon: 'playground',
		subItems: [
			{ name: 'History', href: '/playground/history' },
			{ name: 'Starred', href: '/playground/starred' },
			{ name: 'Settings', href: '/playground/settings' },
		],
	},
	{
		name: 'Models',
		href: '/models',
		icon: 'models',
		subItems: [
			{ name: 'Genesis', href: '/models/genesis' },
			{ name: 'Explorer', href: '/models/explorer' },
			{ name: 'Quantum', href: '/models/quantum' },
		],
	},
	{
		name: 'Documentation',
		href: '/documentation',
		icon: 'documentation',
		subItems: [
			{ name: 'Introduction', href: '/documentation/introduction' },
			{ name: 'Get Started', href: '/documentation/get-started' },
			{ name: 'Tutorials', href: '/documentation/tutorials' },
			{ name: 'Changelog', href: '/documentation/changelog' },
		],
	},
	{
		name: 'Settings',
		href: '/settings',
		icon: 'settings',
		subItems: [
			{ name: 'General', href: '/settings/general' },
			{ name: 'Team', href: '/settings/team' },
			{ name: 'Billing', href: '/settings/billing' },
			{ name: 'Limits', href: '/settings/limits' },
		],
	},
]

const SIDEBAR_SUPPORT: NavigationType[] = [
	{ name: 'Support', href: '/support', icon: 'support' },
	{ name: 'Feedback', href: '/feedback', icon: 'feedback' },
]

export { SIDEBAR_MAIN, SIDEBAR_PLATFORM, SIDEBAR_SUPPORT }
