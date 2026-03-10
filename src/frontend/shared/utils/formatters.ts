/**
 * Utility class for formatting and transforming data.
 *
 * @remarks
 * This class provides static methods for common formatting operations such as
 * extracting parts from strings, converting formats, and validating data.
 *
 * @example
 * ```ts
 * const formatter = new Formatter()
 * formatter.initials('Luis Felipe Silva') // returns 'LS' by default
 * formatter.initials('Luis Felipe Silva', { mode: 'firstTwo' }) // returns 'LF'
 * formatter.initials('Luis') // returns 'LU'
 * formatter.initials('') // throws an error
 * ```
 */
class Formatter {
	/**
	 * Generates initials from a full name.
	 *
	 * Behavior:
	 * - Single name: returns the first two letters (e.g. "Luis" => "LU")
	 * - Two names: returns the first letters of first and last (e.g. "Luis Felipe" => "LF")
	 * - More than two names:
	 *   - mode 'firstAndLast': first and last initials (e.g. "Luis Felipe Silva" => "LS")
	 *   - mode 'firstTwo': first and second initials (e.g. "Luis Felipe Silva" => "LF")
	 *
	 * @param name - The full name string
	 * @param options - Optional configuration
	 * @param options.mode - 'firstAndLast' (default) | 'firstTwo'
	 * @param options.uppercase - Return result uppercased (default: true)
	 * @returns A string with initials according to the options
	 */
	initials(
		name: string,
		options?: {
			mode?: 'firstAndLast' | 'firstTwo'
			uppercase?: boolean
		},
	): string {
		const { mode = 'firstAndLast', uppercase = true } = options || {}

		if (!name || name.trim().length === 0) {
			throw new Error('Name cannot be empty')
		}

		const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		const nameParts = normalized.trim().split(/\s+/).filter(Boolean)

		const formatResult = (text: string) => (uppercase ? text.toUpperCase() : text.toLowerCase())

		if (nameParts.length === 1) {
			return formatResult(`${nameParts[0][0]}${nameParts[0][1]}`)
		}

		const firstInitial = nameParts[0]?.[0] ?? ''
		const secondInitial = nameParts[1]?.[0] ?? ''
		const lastInitial = nameParts.at(-1)?.[0] ?? ''

		if (mode === 'firstTwo') {
			return formatResult(`${firstInitial}${secondInitial}`)
		}

		return formatResult(`${firstInitial}${lastInitial}`)
	}
}

const formatter = new Formatter()

export { formatter }
