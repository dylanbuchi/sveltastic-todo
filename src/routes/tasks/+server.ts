import { prismaClient } from '@/services/prisma';

export async function DELETE({ locals, request }) {
	const session = await locals.auth.validate();
	if (!session) return new Response(null, { status: 401 });

	let whereCondition;

	if (request.url.includes('completed')) {
		whereCondition = { userId: session.userId, completed: true };
	} else if (request.url.includes('expired')) {
		const currentDate = new Date();

		whereCondition = {
			dueDate: {
				lt: currentDate
			}
		};
	} else {
		whereCondition = { userId: session.userId };
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
		data: { completed: false, userId: session.userId, title, dueDate }
	});

	return new Response(JSON.stringify(task), { status: 201 });
}
