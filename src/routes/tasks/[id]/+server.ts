import { prismaClient } from '@/services/prisma';

export async function PATCH({ locals, request, params }) {
	const session = await locals.auth.validate();
	if (!session) return new Response(null, { status: 401 });

	const body = await request.json();
	const taskId = params.id;

	if (!body || !taskId) return new Response(null, { status: 400 });

	const currentTask = await prismaClient.task.findUnique({ where: { id: taskId } });
	if (!currentTask || currentTask.userId !== session.userId)
		return new Response(null, { status: 404 });

	await prismaClient.task.update({
		data: body,
		where: {
			id: taskId
		}
	});

	return new Response(null, { status: 200, statusText: 'success' });
}

export async function DELETE({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) return new Response(null, { status: 401 });

	const taskId = params.id;

	if (!taskId) return new Response(null, { status: 400 });

	const currentTask = await prismaClient.task.findUnique({ where: { id: taskId } });
	if (!currentTask || currentTask.userId !== session.userId)
		return new Response(null, { status: 404 });

	await prismaClient.task.delete({
		where: {
			id: taskId
		}
	});

	return new Response(null, { status: 200, statusText: 'success' });
}
