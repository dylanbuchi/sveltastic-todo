import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '@/server/lucia';
import { GUEST_BASE_EMAIL } from '$env/static/private';

export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/login');

	return {
		user
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		try {
			const session = await locals.auth.validate();
			if (!session) return fail(401);

			const { user } = await locals.auth.validateUser();

			const isGuest = user?.email && user?.email?.includes(GUEST_BASE_EMAIL);

			await auth.invalidateSession(session.sessionId);
			locals.auth.setSession(null);

			if (isGuest) {
				await auth.deleteUser(user.userId);
			}
		} catch (error) {
			console.error(error);
		}
	}
};
