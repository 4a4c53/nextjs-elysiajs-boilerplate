import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/class-name'

function Label({ className, ...props }: ComponentProps<'label'>) {
	return (
		<label
			className={cn(
				'flex select-none items-center gap-2 text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-content:after:text-destructive data-content:after:content-data group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
				className,
			)}
			data-slot="label"
			{...props}
		/>
	)
}

export { Label }
