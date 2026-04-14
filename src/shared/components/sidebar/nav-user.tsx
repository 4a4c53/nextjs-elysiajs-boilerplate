import {
	IconBell,
	IconCreditCard,
	IconRosetteDiscountCheck,
	IconSelector,
	IconSparkles,
} from '@tabler/icons-react'
import { use } from 'react'

import type { GetSessionResponse } from '@/types/auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar'

import { DynamicDropdownMenuContent } from '@/shared/components/dropdown-menu-content-dynamic'
import { Icons } from '@/shared/components/icons'
import { formatter } from '@/shared/utils/formatters'

interface NavUserProps {
	user: Promise<GetSessionResponse>
}

function NavUser({ user }: NavUserProps) {
	const data = use(user)

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={<SidebarMenuButton className="aria-expanded:bg-muted" size="lg" />}
					>
						<Avatar>
							<AvatarImage alt={data.name} src={data.image || undefined} />
							<AvatarFallback>{formatter.initials(data.name)}</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{data.name}</span>
							<span className="truncate text-xs">{data.email}</span>
						</div>
						<IconSelector className="ml-auto size-4" />
					</DropdownMenuTrigger>
					<DynamicDropdownMenuContent align="end" className="min-w-56 rounded-lg" sideOffset={4}>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar>
										<AvatarImage alt={data.name} src={data.image || undefined} />
										<AvatarFallback>{formatter.initials(data.name)}</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{data.name}</span>
										<span className="truncate text-xs">{data.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<IconSparkles />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<IconRosetteDiscountCheck />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<IconCreditCard />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<IconBell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<form action="/logout" method="POST">
							<DropdownMenuItem
								className="w-full justify-start"
								nativeButton={true}
								render={<button type="submit" />}
							>
								<Icons icon="logout" />
								Log out
							</DropdownMenuItem>
						</form>
					</DynamicDropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export { NavUser }
