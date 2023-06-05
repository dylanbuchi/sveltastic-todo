import { fail, redirect } from '@sveltejs/kit';
import { auth } from '@/server/lucia';
import type { PageServerLoad, Actions } from './$types';

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
			const key = await auth.useKey('email', email, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch {
			// invalid email/password
			return fail(400);
		}
	}
};