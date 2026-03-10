'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

import type { ToasterProps } from 'sonner'

import { Icons } from '@/frontend/shared/components/icons'

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme()

	return (
		<Sonner
			className="toaster group"
			icons={{
				success: <Icons className="size-4" icon="success" />,
				info: <Icons className="size-4" icon="info" />,
				warning: <Icons className="size-4" icon="warning" />,
				error: <Icons className="size-4" icon="error" />,
				loading: <Icons className="size-4 animate-spin" icon="loading" />,
			}}
			theme={theme as ToasterProps['theme']}
			toastOptions={{
				classNames: {
					toast: 'toast-styled',
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
