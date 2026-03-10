import type { ChildrenProps } from '@/types/children'
import type { IconNameType } from '@/types/icon'
import type { Prettify } from '@/types/prettify'

import { Button } from '@/frontend/shared/ui/button'

import { Icons } from '@/frontend/shared/components/icons'

type SubmitButtonProps = Prettify<
	ChildrenProps & {
		isLoading: boolean
		icon?: IconNameType
	}
>

function SubmitButton({ isLoading, children, icon }: SubmitButtonProps) {
	return (
		<Button className="cursor-pointer" disabled={isLoading} type="submit">
			<Icons className={{ 'animate-spin': isLoading }} icon={isLoading ? 'loading' : icon} />
			{children}
		</Button>
	)
}

export { SubmitButton }
