import { cva } from 'class-variance-authority'

import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import type { Prettify } from '@/types/prettify'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'

import { cn } from '@/shared/lib/class-name'

function InputGroup({ className, ...props }: ComponentProps<'div'>) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: div used for complex styling with group selectors
		<div
			className={cn(
				'group/input-group relative flex h-8 w-full min-w-0 items-center rounded-none border border-input outline-none transition-colors in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-start]]:h-auto has-[>textarea]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot][aria-invalid=true]]:border-destructive has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-1 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:ring-1 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-start]]:[&>input]:pl-1.5',
				className,
			)}
			data-slot="input-group"
			role="group"
			{...props}
		/>
	)
}

const INPUT_GROUP_ADDON_VARIANTS = cva(
	"flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 font-medium text-muted-foreground text-xs group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-none [&>svg:not([class*='size-'])]:size-4",
	{
		variants: {
			align: {
				'inline-start': 'order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]',
				'inline-end': 'order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]',
				'block-start':
					'order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
				'block-end':
					'order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
			},
		},
		defaultVariants: {
			align: 'inline-start',
		},
	},
)

type InputGroupAddonProps = Prettify<
	ComponentProps<'div'> & VariantProps<typeof INPUT_GROUP_ADDON_VARIANTS>
>

function InputGroupAddon({ className, align = 'inline-start', ...props }: InputGroupAddonProps) {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: div used for complex group interactions
		// biome-ignore lint/a11y/useSemanticElements: div used for complex styling with group selectors
		<div
			className={cn(INPUT_GROUP_ADDON_VARIANTS({ align }), className)}
			data-align={align}
			data-slot="input-group-addon"
			onClick={(e) => {
				if ((e.target as HTMLElement).closest('button')) {
					return
				}
				e.currentTarget.parentElement?.querySelector('input')?.focus()
			}}
			role="group"
			{...props}
		/>
	)
}

const INPUT_GROUP_BUTTON_VARIANTS = cva('flex items-center gap-2 text-xs shadow-none', {
	variants: {
		size: {
			xs: "h-6 gap-1 rounded-none px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
			sm: '',
			'icon-xs': 'size-6 rounded-none p-0 has-[>svg]:p-0',
			'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
		},
	},
	defaultVariants: {
		size: 'xs',
	},
})

type InputGroupButtonProps = Prettify<
	Omit<ComponentProps<typeof Button>, 'size' | 'type'> &
		VariantProps<typeof INPUT_GROUP_BUTTON_VARIANTS> & {
			type?: 'button' | 'submit' | 'reset'
		}
>

function InputGroupButton(props: InputGroupButtonProps) {
	const { className, type = 'button', variant = 'ghost', size = 'xs', ...rest } = props

	return (
		<Button
			className={cn(INPUT_GROUP_BUTTON_VARIANTS({ size }), className)}
			data-size={size}
			type={type}
			variant={variant}
			{...rest}
		/>
	)
}

function InputGroupText({ className, ...props }: ComponentProps<'span'>) {
	return (
		<span
			className={cn(
				"flex items-center gap-2 text-muted-foreground text-xs [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	)
}

function InputGroupInput({ className, ...props }: ComponentProps<'input'>) {
	return (
		<Input
			className={cn(
				'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
				className,
			)}
			data-slot="input-group-control"
			{...props}
		/>
	)
}

function InputGroupTextarea({ className, ...props }: ComponentProps<'textarea'>) {
	return (
		<Textarea
			className={cn(
				'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
				className,
			)}
			data-slot="input-group-control"
			{...props}
		/>
	)
}

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
}
