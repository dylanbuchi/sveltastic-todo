import { fail, redirect } from '@sveltejs/kit';
import { auth } from '@/server/lucia';
import { z } from 'zod';
import type { PageServerLoad, Actions } from './$types';
import { LuciaError } from 'lucia';
import { generateRandomString } from 'lucia/utils';

import { loginSchema, type LoginFormData } from '@/utils/validators/auth.validators';
import { GUEST_BASE_EMAIL, GUEST_PASSWORD } from '$env/static/private';
import { prismaClient } from '@/services/prisma';
import { guestTaskTitles } from '@/utils/constants/tasks.constants';
import { getRandomNumber } from '@/utils/helpers/numbers.helpers';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();

		const isGuest = request.url.includes('guest');

		const email = isGuest ? `${generateRandomString(12)}${GUEST_BASE_EMAIL}` : form.get('email');

		const password = isGuest ? GUEST_PASSWORD : form.get('password');

		if (typeof email !== 'string' || typeof password !== 'string') return fail(400);

		if (isGuest) {
			await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email,
					password
				},
				attributes: {
					email
				}
			});
		}

		try {
			const loginData: LoginFormData = { email };
			loginSchema.parse(loginData);

			const key = await auth.useKey('email', email, password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});

			if (isGuest) {
				const tasks = guestTaskTitles.map((title, index) => {
					const dueDate = new Date();
					dueDate.setDate(dueDate.getDate() + getRandomNumber(1, 10));

					return {
						title,
						dueDate,
						completed: index % 2 === 1,
						userId: session.user.userId
					};
				});

				await prismaClient.task.createMany({
					data: tasks
				});
			}
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
