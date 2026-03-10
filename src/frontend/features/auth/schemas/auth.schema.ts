import { z } from 'zod'

import { EmailSchema } from '@/frontend/features/auth/schemas/email.schema'
import { createPasswordSchema } from '@/frontend/features/auth/schemas/password.schema'

const SignUpInput = z
	.object({
		name: z
			.string({ message: 'Name is required' })
			.trim()
			.nonempty({ message: 'Name is required' }),
		email: EmailSchema,
		password: createPasswordSchema('Password'),
		confirmPassword: createPasswordSchema('Confirm password'),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords must match',
				path: ['confirmPassword'],
			})
		}
	})

type SignUpDto = z.infer<typeof SignUpInput>

const SignInInput = z.object({
	email: EmailSchema,
	password: createPasswordSchema('Password'),
})

type SignInDto = z.infer<typeof SignInInput>

export { SignUpInput, SignInInput }
export type { SignUpDto, SignInDto }
