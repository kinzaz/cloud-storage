import { GetServerSidePropsContext, NextPage } from 'next';
import { Button } from 'antd';

import styles from '@/styles/Profile.module.scss';
import { checkAuth } from '@/utils/checkAuth';
import React from 'react';
import { Layout } from '@/components/layouts/Layout';
import { ApiAuth } from '@/services';
import { User } from '@/services/dto/auth.dto';

interface Props {
	userData: User;
}

const DashboardProfilePage: NextPage<Props> = ({ userData }) => {
	const onClickLogout = () => {
		if (window.confirm('Are you sure you want to logout?')) {
			ApiAuth.logout();
			location.href = '/';
		}
	};

	return (
		<main>
			<div className={styles.root}>
				<h1>My profile</h1>
				<br />
				<p>
					ID: <b>{userData.id}</b>
				</p>
				<p>
					Fullname: <b>{userData.fullName}</b>
				</p>
				<p>
					E-Mail: <b>{userData.email}</b>
				</p>
				<br />
				<Button onClick={onClickLogout} type='primary' danger>
					Logout
				</Button>
			</div>
		</main>
	);
};
// @ts-ignore
DashboardProfilePage.getLayout = (page: React.ReactNode) => {
	return <Layout title='Dashboard / Профиль'>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const authProps = await checkAuth(ctx);

	if ('redirect' in authProps) {
		return authProps;
	}

	const userData = await ApiAuth.getMe();

	return {
		props: {
			userData,
		},
	};
};

export default DashboardProfilePage;
