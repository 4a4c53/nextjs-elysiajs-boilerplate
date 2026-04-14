import type { ComponentProps } from 'react'

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
} from '@/shared/ui/sidebar'

import { SidebarLink } from '@/shared/components/sidebar/sidebar-link'
import { SIDEBAR_SUPPORT } from '@/shared/constants/navegation'

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
