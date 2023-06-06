import { z } from 'zod';

const emailSchema = z
	.string()
	.email({ message: 'Invalid email format' })
	.max(150, { message: 'Email should not exceed 150 characters' });

export const registerSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(150, { message: 'Name should not exceed 150 characters' }),
	email: emailSchema,
	password: z.string().min(6, { message: 'Password should be at least 6 characters long' })
});

export const loginSchema = z.object({
	email: emailSchema
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
