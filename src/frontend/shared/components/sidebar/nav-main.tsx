import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
} from '@/frontend/shared/ui/sidebar'

import { SidebarLink } from '@/frontend/shared/components/sidebar/sidebar-link'
import { SIDEBAR_MAIN } from '@/frontend/shared/constants/navegation'

export function NavMain() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
			<SidebarMenu>
				{SIDEBAR_MAIN.map((item) => (
					<SidebarMenuItem key={item.href}>
						<SidebarLink item={item} />
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
