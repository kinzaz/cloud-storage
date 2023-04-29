import Head from 'next/head';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { NextPage } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

const items: TabsProps['items'] = [
	{
		key: '1',
		label: `Sign in`,
		children: <LoginForm />,
	},
	{
		key: '2',
		label: `Sign up`,
		children: <RegisterForm />,
	},
];

const AuthPage: NextPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Dashboard / Auth</title>
			</Head>
			<main>
				<Tabs
					defaultActiveKey='1'
					items={items}
					style={{ width: 400, margin: '50px auto' }}
				/>
			</main>
		</>
	);
};

export default AuthPage;
