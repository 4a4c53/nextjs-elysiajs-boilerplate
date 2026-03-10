import {
	IconAlertOctagonFilled,
	IconAlertTriangleFilled,
	IconBlocks,
	IconCheck,
	IconChevronDown,
	IconChevronLeft,
	IconChevronRight,
	IconChevronUp,
	IconCircleCheckFilled,
	IconDots,
	IconError404,
	IconFileTypeDoc,
	IconHelpCircle,
	IconHome,
	IconInfoCircleFilled,
	IconLoader3,
	IconLogin,
	IconLogout,
	IconMessages,
	IconMoon,
	IconPhotoOff,
	IconSettings,
	IconSun,
	IconSunMoon,
	IconTerminal,
	IconUserPlus,
	IconX,
} from '@tabler/icons-react'

import type { IconType } from '@/types/icon'

const ICONS = {
	home: IconHome,

	// platform
	playground: IconTerminal,
	models: IconBlocks,
	documentation: IconFileTypeDoc,
	settings: IconSettings,

	// support
	support: IconHelpCircle,
	feedback: IconMessages,

	// auth
	login: IconLogin,
	logout: IconLogout,
	register: IconUserPlus,

	// mode toggle
	light: IconSun,
	dark: IconMoon,
	system: IconSunMoon,

	// sonner icons
	success: IconCircleCheckFilled,
	info: IconInfoCircleFilled,
	warning: IconAlertTriangleFilled,
	error: IconAlertOctagonFilled,

	// actions
	close: IconX,
	more: IconDots,
	check: IconCheck,
	loading: IconLoader3,

	// arrows
	'chevron-up': IconChevronUp,
	'chevron-down': IconChevronDown,
	'chevron-left': IconChevronLeft,
	'chevron-right': IconChevronRight,

	// errors
	'not-found': IconError404,
	'error-image': IconPhotoOff,
} as const satisfies IconType

export { ICONS }
