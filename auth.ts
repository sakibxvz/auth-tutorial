import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from './lib/db';
import { getUserById } from './data/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
	callbacks: {
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;

			token.role = existingUser.role;
			return token;
		},
		async session({ token, session }) {
			console.log({ sessionToken: token });
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				session.user.role = token.role;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
});
