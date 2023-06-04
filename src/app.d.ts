declare global {
	namespace App {
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
		}
	}
}

/// <reference types="lucia-auth" />
declare global {
	namespace Lucia {
		type Auth = import('@/server/lucia').Auth;
		type UserAttributes = {
			name?: string;
			email?: string;
		};
	}
}

export {};
