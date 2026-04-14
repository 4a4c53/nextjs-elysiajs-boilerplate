import { z } from 'zod'

const createPasswordSchema = (fieldName: string) => {
	if (typeof fieldName !== 'string' || fieldName.trim() === '') {
		throw new Error('Field name must be a non-empty string')
	}

	return z
		.string({ message: `${fieldName} is required` })
		.trim()
		.nonempty({ message: `${fieldName} is required` })
		.min(8, { message: `${fieldName} must be at least 8 characters long` })
		.max(20, { message: `${fieldName} must be at most 20 characters long` })
		.refine((val) => !val.includes(' '), {
			message: `${fieldName} cannot contain spaces`,
		})
}

export { createPasswordSchema }
