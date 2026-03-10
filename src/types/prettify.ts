/**
 * A utility type that expands and flattens object types for better readability in IDE tooltips.
 *
 * @template T - The type to prettify
 *
 * @example
 * ```typescript
 * type User = { name: string } & { age: number }
 * type PrettyUser = Prettify<User> // { name: string; age: number }
 * ```
 */
type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

export type { Prettify }
