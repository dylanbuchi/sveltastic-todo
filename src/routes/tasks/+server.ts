import { prismaClient } from '@/services/prisma';
import type { TaskSortOption } from '@/types/tasks.types.js';
import { getSortOptions } from '@/utils/helpers/tasks.helpers.js';

export async function DELETE({ locals, request }) {
	const session = await locals.auth.validate();
	if (!session) return new Response(null, { status: 401 });

	let whereCondition;

	if (request.url.includes('completed')) {
		whereCondition = { userId: session.user.userId, completed: true };
	} else if (request.url.includes('expired')) {
		const currentDate = new Date();

		whereCondition = {
			dueDate: {
				lt: currentDate
			}
		};
	} else {
		whereCondition = { userId: session.user.userId };
	}

	await prismaClient.task.deleteMany({ where: whereCondition });
	return new Response(null, { status: 204 });
}

export async function POST({ locals, request }) {
	const session = await locals.auth.validate();
	if (!session) return new Response(null, { status: 401 });

	const { title, dueDate } = await request.json();

	if (!title || !dueDate) return new Response(null, { status: 400 });

	const task = await prismaClient.task.create({
		data: { completed: false, userId: session.user.userId, title, dueDate }
	});

	return new Response(JSON.stringify(task), { status: 201 });
}

export async function GET({ locals, request }) {
	const session = await locals.auth.validate();
	if (!session) return new Response(null, { status: 401 });

	const { url } = request;
	const parts = url.split('?');
	const sortOption = parts[parts.length - 1] as TaskSortOption;

	const { column, sort } = getSortOptions(sortOption);

	try {
		const data = await prismaClient.task.findMany({
			where: { userId: session.user.userId },
			orderBy: {
				[column]: sort
			}
		});

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		console.log(error);
	}
}
