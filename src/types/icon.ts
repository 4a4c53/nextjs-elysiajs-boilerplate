import type { TablerIcon } from '@tabler/icons-react'
import type { ComponentType, SVGProps } from 'react'
import type { ICONS } from '@/shared/constants/icons'

/**
 * Represents a valid icon component type.
 * Can be either a React component that accepts SVG props or a Lucide icon component.
 */
type IconComponentType = ComponentType<SVGProps<SVGSVGElement>> | TablerIcon

/**
 * A record/dictionary type for storing icon components with string keys.
 */
type IconType = Record<string, IconComponentType>

/**
 * Represents a valid icon name or component.
 * Can be either an icon component directly or a string key referencing an icon from the ICONS constant.
 */
type IconNameType = IconComponentType | keyof typeof ICONS

export type { IconNameType, IconType }
