'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import type { SignInDto } from '@/features/auth/schemas/auth.schema'

import { BUTTON_VARIANTS } from '@/shared/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { authClient } from '@/core/auth/client'
import { SignInInput } from '@/features/auth/schemas/auth.schema'
import { SubmitButton } from '@/shared/components/submit-button'
import { cn } from '@/shared/lib/class-name'

function SignInForm() {
	const router = useRouter()
	const [pending, startTransition] = useTransition()

	const form = useForm<SignInDto>({
		resolver: zodResolver(SignInInput),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(payload: SignInDto) {
		startTransition(async () => {
			try {
				const result = await authClient.signIn.email({
					email: payload.email,
					password: payload.password,
				})

				if (result.error) {
					const errorData = result.error

					toast.error(errorData.message, {
						position: 'top-right',
					})
				} else {
					const { user } = result.data
					toast.success(`Welcome back, ${user.name}!`, {
						position: 'top-right',
					})

					form.reset()
					router.push('/')
				}
			} catch {
				toast.error('Login failed', {
					description: 'An unexpected error occurred during login. Please try again later.',
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
								autoFocus={true}
								id="email"
								placeholder="e.g. user@example.com"
								required={true}
								tabIndex={0}
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
							<div className="flex items-center">
								<FieldLabel data-content="*" htmlFor="password">
									Password
								</FieldLabel>
								<Link
									className={cn(
										'ml-auto inline-block text-sm underline-offset-4 hover:underline',
										BUTTON_VARIANTS({ variant: 'link' }),
										'h-auto px-0',
									)}
									href="/forgot-password"
									tabIndex={-1}
								>
									Forgot your password?
								</Link>
							</div>
							<Input
								{...field}
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								id="password"
								placeholder="Enter your password"
								required={true}
								type="password"
							/>
							{fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
						</Field>
					)}
				/>
				<Field>
					<SubmitButton icon="login" isLoading={pending}>
						Login
					</SubmitButton>
				</Field>
			</FieldGroup>
		</form>
	)
}

export { SignInForm }
