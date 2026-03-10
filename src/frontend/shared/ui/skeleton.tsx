import type { ComponentProps } from 'react'

import { cn } from '@/frontend/shared/lib/class-name'

function Skeleton({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={cn('animate-pulse rounded-none bg-muted', className)}
			data-slot="skeleton"
			{...props}
		/>
	)
}

export { Skeleton }
