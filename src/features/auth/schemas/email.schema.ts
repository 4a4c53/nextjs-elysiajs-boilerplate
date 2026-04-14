import { z } from 'zod'

const EmailSchema = z
	.email({ message: 'Invalid email address' })
	.nonempty({
		message: 'Email is required',
	})
	.refine(
		(val) => {
			const [localPart] = val.split('@')
			return /^[a-zA-Z0-9._-]+$/.test(localPart)
		},
		{
			message: 'Email local part can only contain letters, numbers, dots, underscores, and hyphens',
		},
	)

export { EmailSchema }
