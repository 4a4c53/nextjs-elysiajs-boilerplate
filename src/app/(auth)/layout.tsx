import Link from 'next/link'

import type { ChildrenProps } from '@/types/children'

import { FieldDescription } from '@/shared/ui/field'

import { AuthCard } from '@/features/auth/components/auth-card'
import { Icons } from '@/shared/components/icons'
import { ModeToggle } from '@/shared/components/mode-toggle'
import { APP } from '@/shared/constants/app'

function AuthLayout({ children }: ChildrenProps) {
	return (
		<main className="flex min-h-svh flex-col p-4">
			<div className="flex justify-between">
				<Link className="flex items-center gap-2 font-medium" href="/">
					<div className="flex aspect-square size-8 items-center justify-center rounded-none bg-primary text-primary-foreground">
						<Icons className="size-4" icon="home" />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{APP.NAME}</span>
						<span className="truncate text-xs">{APP.VERSION}</span>
					</div>
				</Link>
				<ModeToggle />
			</div>
			<div className="flex flex-1 items-center justify-center">
				<div className="flex w-full max-w-sm flex-col gap-6">
					<AuthCard>{children}</AuthCard>
					<FieldDescription className="px-6 text-center">
						By clicking continue, you agree to our <Link href="/">Terms of Service</Link> and{' '}
						<Link href="/">Privacy Policy</Link>.
					</FieldDescription>
				</div>
			</div>
		</main>
	)
}

export default AuthLayout
