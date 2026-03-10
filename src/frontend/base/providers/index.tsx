import type { ChildrenProps } from '@/types/children'

import { ThemeProvider } from '@/frontend/base/providers/theme-provider'

function Providers({ children }: ChildrenProps) {
	return (
		<ThemeProvider
			attribute="data-theme"
			defaultTheme="system"
			disableTransitionOnChange={true}
			enableSystem={true}
		>
			{children}
		</ThemeProvider>
	)
}

export { Providers }
