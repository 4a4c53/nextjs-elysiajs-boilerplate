import type { IconNameType } from '@/types/icon'
import type { Prettify } from '@/types/prettify'

/**
 * Base navigation item definition.
 */
type NavigationType = {
	/** Display label shown in the navigation UI. */
	name: string
	/** Target route for the navigation item. */
	href: string
	/** Optional icon name associated with this item. */
	icon?: IconNameType
}

/**
 * Navigation item that can include nested sub-items.
 *
 * Sub-items intentionally omit icons to keep secondary links text-focused.
 */
type NavigationSubItem = Prettify<
	NavigationType & {
		/** Optional nested links rendered under the parent navigation item. */
		subItems?: Omit<NavigationType, 'icon'>[]
	}
>

export type { NavigationSubItem, NavigationType }
