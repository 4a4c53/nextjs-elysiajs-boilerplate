'use client'

import { IconPlus, IconSelector } from '@tabler/icons-react'
import { useState } from 'react'

import type { ReactNode } from 'react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/frontend/shared/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/frontend/shared/ui/sidebar'

import { APP } from '@/shared/constants/app'

interface TeamSwitcherProps {
	teams: Array<{
		name: string
		logo: ReactNode
		plan: string
	}>
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
	const { isMobile } = useSidebar()
	const [activeTeam, setActiveTeam] = useState(teams[0])

	if (!activeTeam) return null

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton
								className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
								size="lg"
							/>
						}
					>
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
							{activeTeam.logo}
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{activeTeam.name}</span>
							<span className="truncate text-xs">{APP.VERSION}</span>
						</div>
						<IconSelector className="ml-auto" />
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						className="min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="text-muted-foreground text-xs">Teams</DropdownMenuLabel>
							{teams.map((team, index) => (
								<DropdownMenuItem
									className="gap-2 p-2"
									key={team.name}
									onClick={() => setActiveTeam(team)}
								>
									<div className="flex size-6 items-center justify-center rounded-md border">
										{team.logo}
									</div>
									{team.name}
									<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="gap-2 p-2">
								<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
									<IconPlus className="size-4" />
								</div>
								<div className="font-medium text-muted-foreground">Add team</div>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
