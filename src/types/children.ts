import type { ReactNode } from 'react'

/**
 * Props type for components that accept children.
 * @property children - The React nodes to be rendered as children
 */
type ChildrenProps = Readonly<{ children: ReactNode }>

export type { ChildrenProps }
