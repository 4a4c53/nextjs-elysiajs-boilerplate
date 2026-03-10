'use client'

import { memo } from 'react'

import type { ComponentProps } from 'react'

import { DropdownMenuContent } from '@/frontend/shared/ui/dropdown-menu'
import { useSidebar } from '@/frontend/shared/ui/sidebar'

const DynamicDropdownMenuContent = memo(
	({ children, ...props }: ComponentProps<typeof DropdownMenuContent>) => {
		const { isMobile } = useSidebar()

		return (
			<DropdownMenuContent side={isMobile ? 'bottom' : 'right'} {...props}>
				{children}
			</DropdownMenuContent>
		)
	},
)

export { DynamicDropdownMenuContent }
