import { prismaClient } from '@/services/prisma.js';

export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();

	if (user) {
		const data = await prismaClient.task.findMany({
			where: { userId: user.userId }
		});

		const tasks = [...data];
		tasks.reverse();
		return { user, tasks };
	}
	return undefined;
};
