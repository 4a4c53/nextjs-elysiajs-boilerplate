'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import type { SignUpDto } from '@/features/auth/schemas/auth.schema'

import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { authClient } from '@/core/auth/client'
import { SignUpInput } from '@/features/auth/schemas/auth.schema'
import { SubmitButton } from '@/shared/components/submit-button'

function SignUpForm() {
	const router = useRouter()
	const [pending, startTransition] = useTransition()

	const form = useForm<SignUpDto>({
		resolver: zodResolver(SignUpInput),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	function onSubmit(payload: SignUpDto) {
		startTransition(async () => {
			try {
				const result = await authClient.signUp.email({
					name: payload.name,
					email: payload.email,
					password: payload.password,
				})

				if (result.error) {
					const errorData = result.error

					toast.error(errorData.message, {
						position: 'top-right',
					})
				} else {
					toast.success('Welcome! Your account has been created.', {
						position: 'top-right',
					})

					form.reset()
					router.push('/')
				}
			} catch {
				toast.error('Registration failed', {
					description: 'Network error. Please check your connection.',
					position: 'top-right',
				})
			}
		})
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<Controller
					control={form.control}
					name="name"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel data-content="*" htmlFor="name">
								Name
							</FieldLabel>
							<Input
								{...field}
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								autoFocus={true}
								id="name"
								placeholder="e.g. John Doe"
								type="text"
							/>
							{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
						</Field>
					)}
				/>
				<Controller
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel data-content="*" htmlFor="email">
								Email
							</FieldLabel>
							<Input
								{...field}
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								id="email"
								placeholder="e.g. user@example.com"
								type="email"
							/>
							{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
						</Field>
					)}
				/>
				<Controller
					control={form.control}
					name="password"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel data-content="*" htmlFor="password">
								Password
							</FieldLabel>
							<Input
								{...field}
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								id="password"
								placeholder="Enter your password"
								type="password"
							/>
							{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
						</Field>
					)}
				/>
				<Controller
					control={form.control}
					name="confirmPassword"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel data-content="*" htmlFor="confirmPassword">
								Confirm password
							</FieldLabel>
							<Input
								{...field}
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								id="confirmPassword"
								placeholder="Confirm your password"
								type="password"
							/>
							{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
						</Field>
					)}
				/>
				<Field>
					<SubmitButton icon="register" isLoading={pending}>
						Register
					</SubmitButton>
				</Field>
			</FieldGroup>
		</form>
	)
}

export { SignUpForm }
