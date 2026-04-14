---
name: documentation-generator
description: Generate and improve code documentation with a focus on concise, accurate JSDoc in English. Use when users ask to add, rewrite, or standardize documentation comments.
user-invocable: true
---

# Documentation Generator

Use this skill when the user requests documentation updates in code, especially JSDoc.

## Goals

- Add clear, minimal, and accurate documentation.
- Preserve behavior and public APIs unless explicitly requested.
- Keep comments aligned with the real implementation.

## Default Rules

- Write documentation in English unless the user asks for another language.
- Prefer documenting only exported symbols.
- Avoid redundant comments that repeat obvious code.
- Do not add comments inside executable blocks unless necessary for complex logic.
- Keep style and formatting consistent with the file.

## JSDoc Rules

- Use sentence case and concise phrasing.
- Start with a one-line summary.
- Add `@param` only when extra context is useful.
- Add `@returns` when return semantics are not obvious.
- Include format details when values follow a contract (for example `tag:ciphertext:iv`).
- Use `@throws {ErrorType}` to document known failure modes.
- Use `@typeParam T` for generic type parameters.
- Use `@example` blocks for complex functions — wrap code in triple-backtick TypeScript fences.
- Use `@deprecated` with a migration note when marking old APIs.
- Use `@see {@link Symbol}` to cross-reference related items.
- Use `@remarks` for implementation notes that don't belong in the summary line.
- Use `@internal` to exclude symbols from public API docs.
- Use `@readonly` for properties that cannot be mutated after initialization.
- Use `@alpha` and `@beta` to indicate unstable APIs.
- Use `@public`, `@private`, and `@protected` to indicate intended visibility.
- Use `@override` for methods that override a superclass method.

## Documentation Patterns

### Functions

```typescript
/**
 * Calculates the total price including tax.
 *
 * @param price - The base price before tax
 * @param taxRate - The tax rate as a decimal (e.g., 0.08 for 8%)
 * @returns The total price including tax
 *
 * @example
 * ```typescript
 * const total = calculateTotal(100, 0.08); // 108
 * ```
 */
```

### Async functions

```typescript
/**
 * Fetches user data from the API.
 *
 * @param userId - The unique identifier of the user
 * @returns A promise that resolves to the user data
 *
 * @throws {NotFoundError} When the user does not exist
 * @throws {NetworkError} When the request fails
 */
```

### Generic functions

```typescript
/**
 * Filters an array based on a predicate function.
 *
 * @typeParam T - The type of elements in the array
 * @param array - The array to filter
 * @param predicate - Returns true for elements to keep
 * @returns A new array with only the elements that pass the predicate
 */
```

### Interfaces

```typescript
/**
 * Represents a user in the system.
 */
export interface User {
  /** The unique identifier for the user. */
  id: string;

  /**
   * The user's role in the system.
   * @default 'user'
   */
  role: 'admin' | 'user' | 'guest';
}
```

### Classes

```typescript
/**
 * A client for interacting with the API.
 *
 * @remarks
 * Handles authentication, retries, and error handling automatically.
 * Use the {@link ApiClient.create} factory method to create an instance.
 *
 * @example
 * ```typescript
 * const client = ApiClient.create({ baseUrl: 'https://api.example.com' });
 * const users = await client.get<User[]>('/users');
 * ```
 */
```

### Enums

```typescript
/**
 * Status codes for order processing.
 *
 * @remarks
 * Orders progress through these statuses in sequence,
 * though they may skip directly to `Cancelled` from any state.
 */
export enum OrderStatus {
  /** Order has been created but not yet processed */
  Pending = 'pending',
  /** Order has been cancelled */
  Cancelled = 'cancelled',
}
```

### React components

```typescript
/**
 * A customizable button component.
 *
 * @example
 * ```tsx
 * <Button variant="secondary" size="lg">Submit</Button>
 * <Button loading>Submitting...</Button>
 * ```
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';

  /**
   * Whether the button is in a loading state.
   * When true, the button is disabled and shows a spinner.
   * @default false
   */
  loading?: boolean;
}
```

## JSDoc Tags Reference

| Tag | Use when |
|-----|----------|
| `@param name - desc` | Parameter needs extra context |
| `@returns desc` | Return semantics are not obvious |
| `@typeParam T - desc` | Generic type parameters |
| `@throws {Type} desc` | Known failure modes |
| `@example` | Complex or non-obvious usage |
| `@remarks` | Implementation details beyond the summary |
| `@see {@link Symbol}` | Cross-reference related types or functions |
| `@deprecated msg` | API is being replaced; include migration note |
| `@since version` | When the symbol was introduced |
| `@version version` | Current version of the symbol |
| `@author name` | Original author of the code |
| `@default value` | Default value for optional params/props |
| `@internal` | Exclude from generated docs |
| `@readonly` | Property cannot be mutated |
| `@alpha` | Indicates an alpha-level API, subject to change |
| `@beta` | Indicates a beta-level API, may have breaking changes |
| `@public` | Indicates a public API (default if not marked) |
| `@private` | Indicates a private API, not for external use |
| `@protected` | Indicates a protected API, for internal use and subclasses |
| `@override` | Indicates a method that overrides a superclass method |

## Safe Editing Workflow

1. Read the current file before editing.
2. Update documentation only in the requested scope.
3. Avoid moving logic or changing runtime behavior.
4. Run diagnostics for edited files and fix introduced issues.

## Behavior

- Confirm the requested scope before editing (for example, exported symbols only).
- Read the file first, then edit only documentation comments unless explicitly asked otherwise.
- Keep comments synchronized with actual implementation details and naming.
- Prefer the smallest possible diff and preserve existing formatting conventions.
- If implementation and docs conflict, prioritize code truth and update docs accordingly.

## Examples

Example request: Add JSDoc for exported functions only.

"""
Update documentation comments in `src/shared/lib/crypto.ts`.
- Language: English
- Style: concise JSDoc
- Scope: exported symbols
- Do not change behavior
"""

Example request: Rewrite existing comments to match implementation.

"""
Rewrite inaccurate JSDoc in `src/features/customers/services/create-customer.ts`.
- Keep current formatting style
- Fix `@param` and `@returns` descriptions only where needed
- Do not modify runtime code
"""

Example request: Crypto namespace/functions only.

"""
Document `src/shared/lib/crypto.ts` with concise JSDoc.
- Language: English
- Scope: namespace and functions only
- Include payload format details when applicable
- Skip interfaces and type aliases
"""

## Prompt Template

Use this template when generating documentation updates:

"""
Update documentation comments in [file] with these constraints:
- Language: English
- Style: concise JSDoc
- Scope: [namespace/functions only | exported symbols | full public API]
- Do not change behavior
- Keep existing code style and formatting
"""
