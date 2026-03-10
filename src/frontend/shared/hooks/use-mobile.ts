import { useSyncExternalStore } from 'react'

const MOBILE_BREAKPOINT = 768

function useIsMobile() {
	const getSnapshot = () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
	const getServerSnapshot = () => false

	const subscribe = (callback: () => void) => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
		mql.addEventListener('change', callback)
		return () => mql.removeEventListener('change', callback)
	}

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export { useIsMobile }
