import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
	role: 'ADMIN' | 'USER';
	id: string;
	email:string
	isTwoFactorEnabled: boolean;
	isOAuth: boolean;
};

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from 'next-auth/jwt';
import { boolean } from 'zod';

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** Role Token */
		role?: 'ADMIN' | 'USER';
	}
}
