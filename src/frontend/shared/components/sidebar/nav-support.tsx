import type { ComponentProps } from 'react'

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
} from '@/frontend/shared/ui/sidebar'

import { SidebarLink } from '@/frontend/shared/components/sidebar/sidebar-link'
import { SIDEBAR_SUPPORT } from '@/frontend/shared/constants/navegation'

interface NavSupportProps extends ComponentProps<typeof SidebarGroup> {}

function NavSupport(props: NavSupportProps) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{SIDEBAR_SUPPORT.map((item) => (
						<SidebarMenuItem key={item.href}>
							<SidebarLink item={item} />
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}

export { NavSupport }
