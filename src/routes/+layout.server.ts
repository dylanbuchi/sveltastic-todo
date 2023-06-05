import { prismaClient } from '@/services/prisma.js';

export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();

	if (user) {
		const tasks = (
			await prismaClient.task.findMany({
				where: { userId: user.userId }
			})
		).toReversed();
		return { user, tasks };
	}
	return undefined;
};
