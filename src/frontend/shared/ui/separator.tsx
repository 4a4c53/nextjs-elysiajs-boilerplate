import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'

import { cn } from '@/frontend/shared/lib/class-name'

function Separator(props: SeparatorPrimitive.Props) {
	const { className, orientation = 'horizontal', ...rest } = props

	return (
		<SeparatorPrimitive
			className={cn(
				'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
				className,
			)}
			data-slot="separator"
			orientation={orientation}
			{...rest}
		/>
	)
}

export { Separator }
