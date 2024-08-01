import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from './lib/db';
import { getUserById } from './data/user';
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';

export const { auth, handlers, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			// console.log({ user, account });
			//Allow Oauth without email verification
			if (account?.provider !== 'credentials') return true;

			if (!user.id) {
				return false;
			}
			const existingUser = await getUserById(user.id);

			//Prevent sign in without email verification
			if (!existingUser?.emailVerified) return false;

			//TODO Add 2FA Check

			if (existingUser.isTwoFactorEnable) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id
				);
				console.log({ twoFactorConfirmation });

				if (!twoFactorConfirmation) return false;

				//Delete 2FA for next sign in
				await db.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				});
			}

			return true;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;

			token.role = existingUser.role;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnable;

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
			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
});
