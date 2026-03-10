import { Elysia } from 'elysia'

const elysiaApp = new Elysia({ prefix: '/api/v1' }).get('/hello', () => 'Hello, Elysia!')

// HTTP method handlers
const GET = elysiaApp.handle
const POST = elysiaApp.handle

export { GET, POST, elysiaApp }
