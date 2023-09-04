import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { prisma } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prismaClient } from '@/services/prisma';

export const auth = lucia({
	adapter: prisma(prismaClient, {
		user: 'authUser',
		key: 'authKey',
		session: 'authSession'
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (userData) => {
		return { email: userData.email, name: userData.name };
	}
});
export type Auth = typeof auth;
