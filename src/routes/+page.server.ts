import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '@/server/lucia';
import { GUEST_BASE_EMAIL } from '$env/static/private';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) throw redirect(302, '/login');

	return {
		user: session.user
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		try {
			const session = await locals.auth.validate();
			if (!session) return fail(401);

			const isGuest = session.user?.email && session.user?.email?.includes(GUEST_BASE_EMAIL);

			await auth.invalidateSession(session.sessionId);
			locals.auth.setSession(null);

			if (isGuest) {
				await auth.deleteUser(session.user.userId);
			}
		} catch (error) {
			console.error(error);
		}
	}
};
