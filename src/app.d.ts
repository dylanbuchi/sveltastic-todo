declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('@/server/lucia').Auth;
		type DatabaseUserAttributes = {
			name?: string;
			email?: string;
		};
	}
}

export {};
