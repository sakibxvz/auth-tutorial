'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RegisterSchema } from '../../schemas';

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
import { register } from '../../actions/register';

export const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			name:''
		},
	});
	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setSuccess('');
		setError('');
		startTransition(() => {
			register(values).then((data) => {
				setSuccess(data.success);
				setError(data.error);
			});
		});
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<CardWrapper
			headerLabel='Create an account'
			backButtonLabel="Already have an account?"
			backButtonHref='/auth/login'
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Jhon Doe'
											type='text'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='john.doe@example.com'
											type='email'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												className='pr-0'
												{...field}
												placeholder='*******'
												type={showPassword ? 'text' : 'password'}
												disabled={isPending}
											/>
											<Button
												variant='outline'
												type='button'
												onClick={togglePasswordVisibility}
												className='absolute pr-1 right-2.5 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer '
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
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type='submit' className='w-full' disabled={isPending}>
						Create an account
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
