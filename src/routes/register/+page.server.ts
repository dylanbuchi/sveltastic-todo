import { fail, redirect } from '@sveltejs/kit';
import { auth } from '@/server/lucia';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { LuciaError } from 'lucia-auth';
import { registerSchema, type RegisterFormData } from '@/utils/validators/auth.validators';
import { prismaClient } from '@/services/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.auth.validateUser();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();

		const name = form.get('name');
		const email = form.get('email');
		const password = form.get('password');

		if (typeof email !== 'string' || typeof name !== 'string' || typeof password !== 'string') {
			return fail(400);
		}

		try {
			const registerData: RegisterFormData = { name, email, password };

			registerSchema.parse(registerData);

			const existingUser = await prismaClient.authUser.findUnique({
				where: {
					email: email
				}
			});

			if (existingUser) {
				return fail(400, { error: 'Email already exists' });
			}

			const user = await auth.createUser({
				primaryKey: {
					providerId: 'email',
					providerUserId: email,
					password
				},
				attributes: {
					email,
					name
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errorMessage = error.errors[0].message;
				return fail(400, { error: errorMessage });
			}

			if (error instanceof LuciaError) {
				return fail(400, { error: error.message });
			}
			return fail(400);
		}
	}
};
