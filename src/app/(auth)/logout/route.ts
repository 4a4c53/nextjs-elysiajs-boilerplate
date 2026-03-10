import { auth } from '@/core/auth/server'

async function POST(request: Request) {
	try {
		await auth.api.signOut({ headers: request.headers })

		return Response.redirect('/login', 303)
	} catch {
		return Response.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export { POST }
