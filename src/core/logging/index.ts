import { pino } from 'pino'

import type { LoggerOptions, Logger as PinoLogger } from 'pino'

import { env } from '@/core/env'
import { serializeError } from '@/core/logging/utils/serialize-error'
import { APP } from '@/shared/constants/app'

/**
 * Structured logger implementation using Pino
 * Provides leveled logging with automatic error serialization and context enrichment
 *
 * @example
 * ```typescript
 * const logger = new Logger()
 * logger.info('User logged in', { userId: '123' })
 * logger.error('Failed to process', new Error('Something went wrong'))
 *
 * // Create child logger with context
 * const requestLogger = logger.child({ requestId: 'req-123' })
 * ```
 */
class Logger {
	private readonly _logger: PinoLogger
	private readonly _isProduction: boolean

	/**
	 * Creates a new Logger instance
	 *
	 * @param logger - Optional pre-configured Pino logger instance. If not provided, creates a new one
	 */
	constructor(logger?: PinoLogger) {
		this._isProduction = env.NODE_ENV === 'production'
		this._logger = logger ?? this._createLogger()
	}

	/**
	 * Creates and configures the Pino logger instance
	 */
	private _createLogger(): PinoLogger {
		const options: LoggerOptions = {
			name: APP.NAME,
			level: this._isProduction ? 'info' : 'debug',
			browser: {
				asObject: true,
			},
			formatters: {
				bindings: ({ pid, hostname }) => ({
					pid,
					hostname,
					app: APP.NAME,
					version: APP.VERSION,
				}),
			},
			redact: {
				paths: ['password', '*.password', 'apiKey', '*.apiKey', 'token', '*.token'],
				censor: '[REDACTED]',
				remove: true,
			},
			transport: {
				targets: [
					{
						target: this._isProduction ? 'pino' : 'pino-pretty',
						options: {
							colorize: !this._isProduction,
							translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
							ignore: 'pid,hostname,app,version',
						},
					},
				],
			},
		}

		return pino(options)
	}

	/**
	 * Log at trace level
	 */
	trace(msg: string, context?: Record<string, unknown>): void {
		if (context) {
			this._logger.trace(context, msg)
		} else {
			this._logger.trace(msg)
		}
	}

	/**
	 * Log at debug level
	 */
	debug(msg: string, context?: Record<string, unknown>): void {
		if (context) {
			this._logger.debug(context, msg)
		} else {
			this._logger.debug(msg)
		}
	}

	/**
	 * Log at info level
	 */
	info(msg: string, context?: Record<string, unknown>): void {
		if (context) {
			this._logger.info(context, msg)
		} else {
			this._logger.info(msg)
		}
	}

	/**
	 * Log at warn level
	 */
	warn(msg: string, context?: Record<string, unknown> | Error): void {
		if (context instanceof Error) {
			this._logger.warn(serializeError(context), msg)
		} else if (context) {
			this._logger.warn(context, msg)
		} else {
			this._logger.warn(msg)
		}
	}

	/**
	 * Log at error level
	 */
	error(msg: string, context?: Record<string, unknown> | Error): void {
		if (context instanceof Error) {
			this._logger.error(serializeError(context), msg)
		} else if (context) {
			this._logger.error(context, msg)
		} else {
			this._logger.error(msg)
		}
	}

	/**
	 * Log at fatal level
	 */
	fatal(msg: string, context?: Record<string, unknown> | Error): void {
		if (context instanceof Error) {
			this._logger.fatal(serializeError(context), msg)
		} else if (context) {
			this._logger.fatal(context, msg)
		} else {
			this._logger.fatal(msg)
		}
	}

	/**
	 * Creates a child logger with additional bindings
	 */
	child(bindings: Record<string, unknown>): Logger {
		return new Logger(this._logger.child(bindings))
	}
}

/**
 * Singleton logger instance
 */
const log = new Logger()

export { Logger, log }
