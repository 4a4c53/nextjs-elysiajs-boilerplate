import type { SerializedError } from 'pino'
import type { Prettify } from '@/types/prettify'

type SerializedErrorOutput = Prettify<
	Omit<SerializedError, 'raw' | 'stack'> & {
		stack?: string
	}
>

function serializeError(error: unknown): SerializedErrorOutput {
	if (error instanceof Error) {
		const serialized: SerializedErrorOutput = {
			type: error.constructor.name,
			message: error.message,
			stack: error.stack,
		}

		// Handle error code (common in Node.js errors)
		if ('code' in error) {
			serialized.code = error.code as string | number
		}

		// Handle nested cause (ES2022 Error cause)
		if ('cause' in error && error.cause) {
			serialized.cause = serializeError(error.cause)
		}

		// Copy any additional enumerable properties
		for (const key of Object.keys(error)) {
			if (!(key in serialized)) {
				serialized[key] = (error as unknown as Record<string, unknown>)[key]
			}
		}

		return serialized
	}

	// Handle non-Error objects
	if (typeof error === 'object' && error !== null) {
		return {
			type: 'Object',
			message: String(error),
			...error,
		}
	}

	return {
		type: typeof error,
		message: String(error),
	}
}

export { serializeError }
