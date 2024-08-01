import * as z from 'zod';

export const SettingsSchema = z.object({
	name: z.optional(z.string()),
});

export const LoginSchema = z.object({
	email: z.string().email({}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
	code: z.optional(z.string()),
});

export const ResetSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
});

export const NewPasswordSchema = z
	.object({
		password: z.string().min(6, 'Password must be at least 6 characters long'),
		confirmPassword: z
			.string()
			.min(6, 'Confirm Password must be at least 6 characters long'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export const RegisterSchema = z.object({
	email: z.string().email({
		message: 'Emails is required',
	}),
	password: z.string().min(6, {
		message: 'Minimum 6 characters required',
	}),
	name: z.string().min(3, {
		message: 'Minimum 3 characters required',
	}),
});
