import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const SettingsPage = async () => {
	const session = await auth();

	return (
		<div>
			{JSON.stringify(session)}
			<form
				action={async () => {
					'use server';
					await signOut();
				}}
			>
				<p>
					Welcome <span className='font-semibold'>{session?.user.name}!</span>
				</p>
				<Button variant='secondary' type='submit'>
					Sign Out
				</Button>
			</form>
		</div>
	);
};

export default SettingsPage;
