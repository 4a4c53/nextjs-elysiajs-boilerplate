import type { ComponentProps } from 'react'
import type { GetSessionResponse } from '@/types/auth'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarRail,
} from '@/shared/ui/sidebar'

import { NavHome } from '@/shared/components/sidebar/nav-home'
import { NavMain } from '@/shared/components/sidebar/nav-main'
import { NavPlatform } from '@/shared/components/sidebar/nav-platform'
import { NavSupport } from '@/shared/components/sidebar/nav-support'
import { NavUser } from '@/shared/components/sidebar/nav-user'

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
	user: Promise<GetSessionResponse>
}

function AppSidebar({ user, ...props }: AppSidebarProps) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<NavHome />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
				<NavPlatform />
				<NavSupport className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

export { AppSidebar }
