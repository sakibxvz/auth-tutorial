'use client';

import { admin } from '@/actions/admin';
import RoleGate from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

const AdminPage = () => {
	const onApiRouteClick = () => {
		fetch('/api/admin').then((response) => {
			if (response.ok) {
				toast.success('Allowed API Route');
			} else {
				toast.error('Forbidden API Route');
			}
		});
    };
    const onServerActionClick = () =>{
        admin().then((data) => {
            if (data.success) {
                toast.success('Allowed Server Action');
            } else if(data.error) {
                toast.error('Forbidden Server Action');
            }
        })
    }
	return (
		<Card className='w-[600px]'>
			<CardHeader>
				<p className='text-2xl font-semibold text-center'>🔐 Admin</p>
			</CardHeader>
			<CardContent className=''>
				<RoleGate allowedRole={UserRole.ADMIN}>
					<FormSuccess message='You are allowd to see this content' />
				</RoleGate>
				<div className='mt-5 flex flex-row items-center justify-between rounded-lg border p-3 shadow-md '>
					<p className='text-sm font-medium'>Admin-only API Route</p>
					<Button onClick={onApiRouteClick}>Click to test</Button>
				</div>
				<div className='mt-5 flex flex-row items-center justify-between rounded-lg border p-3 shadow-md '>
					<p className='text-sm font-medium'>Admin-only Server Action</p>
					<Button onClick={onServerActionClick}>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default AdminPage;
