'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { NavigationType } from '@/types/navigation'

import { SidebarMenuButton, useSidebar } from '@/frontend/shared/ui/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/frontend/shared/ui/tooltip'

import { Icons } from '@/frontend/shared/components/icons'

interface SidebarLinkProps {
	item: NavigationType
}

function SidebarLink({ item }: SidebarLinkProps) {
	const { isMobile, state } = useSidebar()
	const pathname = usePathname()
	const isActive = pathname === item.href

	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<SidebarMenuButton
						aria-current={isActive ? 'page' : undefined}
						isActive={isActive}
						render={<Link className="data-active:pointer-events-none" href={item.href} />}
					/>
				}
			>
				<Icons icon={item.icon} />
				<span>{item.name}</span>
			</TooltipTrigger>
			<TooltipContent align="center" hidden={state !== 'collapsed' || isMobile} side="right">
				{item.name}
			</TooltipContent>
		</Tooltip>
	)
}

export { SidebarLink }
