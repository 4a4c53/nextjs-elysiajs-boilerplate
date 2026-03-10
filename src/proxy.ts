import { getSessionCookie } from 'better-auth/cookies'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

import { APP } from '@/shared/constants/app'
import { PUBLIC_ROUTES } from '@/shared/constants/public-routes'

export function proxy(request: NextRequest) {
	const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname)
	const sessionCookie = getSessionCookie(request, { cookiePrefix: `${APP.NAME_SNAKE_CASE}_auth` })

	if (sessionCookie && isPublicRoute) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (!sessionCookie && !isPublicRoute) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/data|_next/static|_next/image|.*\\.png$|manifest.webmanifest|favicon.ico).*)',
	],
}
