import { fail, redirect } from '@sveltejs/kit';
import { auth } from '@/server/lucia';
import { z } from 'zod';
import type { PageServerLoad, Actions } from './$types';
import { LuciaError } from 'lucia-auth';
import { loginSchema, type LoginFormData } from '@/utils/validators/auth.validators';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.auth.validateUser();
	if (session) throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		if (typeof email !== 'string' || typeof password !== 'string') return fail(400);

		try {
			const loginData: LoginFormData = { email };
			loginSchema.parse(loginData);

			const key = await auth.useKey('email', email, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errorMessage = error.errors[0].message;
				return fail(400, { error: errorMessage });
			}

			if (error instanceof LuciaError) {
				return fail(400, { error: error.message });
			}

			console.error(error);
			return fail(500, { error: 'Something went wrong' });
		}
	}
};
