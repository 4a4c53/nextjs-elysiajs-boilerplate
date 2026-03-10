import type { ClassValue } from 'clsx'
import type { SVGProps } from 'react'
import type { IconNameType } from '@/types/icon'
import type { Prettify } from '@/types/prettify'

import { ICONS } from '@/frontend/shared/constants/icons'
import { cn } from '@/frontend/shared/lib/class-name'

type IconProps = Prettify<
	Omit<SVGProps<SVGSVGElement>, 'ref' | 'className'> & {
		icon?: IconNameType
		className?: ClassValue
	}
>

/**
 * A flexible icon component that renders different icon types based on the provided `icon` prop.
 *
 * @param props - The icon component props
 * @param props.icon - The icon to render. Can be a string key to look up in ICONS object or a React component
 * @param props.className - Optional CSS class names to apply to the icon
 * @param props...rest - Additional props to spread onto the icon component
 *
 * @returns A rendered icon component with aria-hidden set to true
 *
 * @remarks
 * - If no icon is provided, defaults to rendering the "svg" icon
 * - If the icon key is not found in ICONS, falls back to rendering the "error" icon
 * - All icons are automatically marked as `aria-hidden="true"` for accessibility
 *
 * @example
 * ```tsx
 * <Icons icon="home" className="text-blue-500" />
 * <Icons icon={CustomIconComponent} />
 * ```
 */
function Icons({ icon, className, ...props }: IconProps) {
	const IconComponent = typeof icon === 'string' ? (ICONS[icon] ?? ICONS['error-image']) : icon

	if (!IconComponent) {
		return <Icons icon="not-found" />
	}

	return <IconComponent aria-hidden="true" {...props} className={cn(className)} />
}

export { Icons }
