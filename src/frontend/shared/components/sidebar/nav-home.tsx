'use client'

import Link from 'next/link'

import { SidebarMenuButton } from '@/frontend/shared/ui/sidebar'

import { Icons } from '@/frontend/shared/components/icons'
import { APP } from '@/shared/constants/app'

function NavHome() {
	return (
		<SidebarMenuButton render={<Link href="/" />} size="lg">
			<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
				<Icons icon="home" />
			</div>
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-semibold first-letter:uppercase">{APP.NAME}</span>
				<span className="truncate text-xs">{APP.VERSION}</span>
			</div>
		</SidebarMenuButton>
	)
}

export { NavHome }
