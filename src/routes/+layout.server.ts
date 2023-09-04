import { prismaClient } from '@/services/prisma.js';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session?.user) {
		const data = await prismaClient.task.findMany({
			where: { userId: session.user.userId }
		});

		const tasks = [...data];
		tasks.reverse();

		return { user: session.user, tasks };
	}
	return undefined;
};
