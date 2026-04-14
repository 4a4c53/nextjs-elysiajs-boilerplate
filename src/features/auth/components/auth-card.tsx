'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { ChildrenProps } from '@/types/children'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'
import { FieldDescription } from '@/shared/ui/field'

type AuthRoute = '/login' | '/register'

interface AuthConfig {
	title: string
	description: string
	footerText: string
	footerLinkText: string
	footerLinkHref: AuthRoute
}

const AUTH_CONFIG: Record<AuthRoute, AuthConfig> = {
	'/login': {
		title: 'Sign in to your account',
		description: 'Sign in to continue.',
		footerText: "Don't have an account?",
		footerLinkText: 'Sign up',
		footerLinkHref: '/register',
	},
	'/register': {
		title: 'Sign up for an account',
		description: 'Create a new account to get started.',
		footerText: 'Already have an account?',
		footerLinkText: 'Sign in',
		footerLinkHref: '/login',
	},
}

function AuthCard({ children }: ChildrenProps) {
	const pathname = usePathname() as AuthRoute
	const config = AUTH_CONFIG[pathname] ?? AUTH_CONFIG['/login']

	return (
		<Card>
			<CardHeader>
				<CardTitle>{config.title}</CardTitle>
				<CardDescription>{config.description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter className="justify-center">
				<FieldDescription>
					{config.footerText}{' '}
					<Link className="font-medium hover:underline" href={config.footerLinkHref}>
						{config.footerLinkText}
					</Link>
				</FieldDescription>
			</CardFooter>
		</Card>
	)
}

export { AuthCard }
