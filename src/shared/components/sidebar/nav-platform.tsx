import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/shared/ui/sidebar'

import { Icons } from '@/shared/components/icons'
import { SIDEBAR_PLATFORM } from '@/shared/constants/navegation'

function NavPlatform() {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{SIDEBAR_PLATFORM.map((item) => (
					<Collapsible className="group/collapsible" key={item.href} render={<SidebarMenuItem />}>
						<CollapsibleTrigger render={<SidebarMenuButton tooltip={item.name} />}>
							{item.icon ? <Icons icon={item.icon} /> : null}
							<span>{item.name}</span>
							<IconChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								{item.subItems?.map((subItem) => (
									<SidebarMenuSubItem key={subItem.name}>
										<SidebarMenuSubButton render={<Link href={subItem.href} />}>
											<span>{subItem.name}</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))}
							</SidebarMenuSub>
						</CollapsibleContent>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}

export { NavPlatform }
