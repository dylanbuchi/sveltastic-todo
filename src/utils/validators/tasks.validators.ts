import * as z from 'zod';

export const taskJsonSchema = z.object({
	id: z.string(),
	title: z.string(),
	completed: z.boolean(),
	dueDate: z.string().transform((str) => new Date(str))
});
