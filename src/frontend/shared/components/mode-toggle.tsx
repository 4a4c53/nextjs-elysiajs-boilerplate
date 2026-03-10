'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/frontend/shared/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/frontend/shared/ui/dropdown-menu'

import { Icons } from '@/frontend/shared/components/icons'

type ThemeIcon = 'light' | 'dark' | 'system'

function ModeToggle() {
	const { theme, themes, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<Button aria-label="Toggle theme" disabled={true} size="icon" variant="outline">
				<Icons className="animate-spin" icon="loading" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		)
	}

	const getThemeIcon = () => {
		if (theme === 'system') {
			return 'system'
		}

		return theme
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label="Toggle theme"
				render={<Button size="icon" variant="outline" />}
				tabIndex={-1}
			>
				<Icons
					className="h-[1.2rem] w-[1.2rem] transition-transform duration-200 ease-in-out"
					icon={getThemeIcon() as ThemeIcon}
				/>
				<span className="sr-only">Toggle theme</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{themes.map((item) => (
					<DropdownMenuItem key={item} onClick={() => setTheme(item)}>
						<Icons className="mr-2 size-4" icon={item as ThemeIcon} />
						{item.charAt(0).toUpperCase() + item.slice(1)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { ModeToggle }
