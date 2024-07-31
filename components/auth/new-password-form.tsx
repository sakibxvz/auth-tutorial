'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NewPasswordSchema } from '../../schemas';

import { CardWrapper } from './card-wrapper';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/actions/new-password';

export const NewPasswordForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setSuccess('');
		setError('');

		if (!token) {
			setError('Missing Token!');
			return;
		}

		startTransition(() => {
			newPassword(values, token).then((data) => {
				setSuccess(data?.success);
				setError(data?.error);
			});
		});

		console.log(values);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<CardWrapper
			headerLabel='Enter a new password'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												{...field}
												placeholder='******'
												type={showPassword ? 'text' : 'password'}
												disabled={isPending}
											/>
											<Button
												variant='outline'
												type='button'
												onClick={togglePasswordVisibility}
												className='absolute pr-1 right-2.5 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer'
												disabled={isPending}
											>
												{showPassword ? <FaEye /> : <FaEyeSlash />}
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												{...field}
												placeholder='******'
												type={showConfirmPassword ? 'text' : 'password'}
												disabled={isPending}
											/>
											<Button
												variant='outline'
												type='button'
												onClick={toggleConfirmPasswordVisibility}
												className='absolute pr-1 right-2.5 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer'
												disabled={isPending}
											>
												{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type='submit' className='w-full' disabled={isPending}>
						Reset Password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
