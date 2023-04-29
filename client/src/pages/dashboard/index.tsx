import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import { FileItem } from '@/services/dto/files.dto';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Files } from '@/modules/Files';
import { Layout } from '@/components/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import { ApiFiles } from '@/services';

interface Props {
	items: FileItem[];
}

const DashboardPage: NextPage<Props> = ({ items }) => {
	return (
		<DashboardLayout>
			<Files items={items} withActions />
		</DashboardLayout>
	);
};

// @ts-ignore
DashboardPage.getLayout = (page: React.ReactNode) => {
	return <Layout title='Dashboard / Main'>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const authProps = await checkAuth(ctx);

	if ('redirect' in authProps) {
		return authProps;
	}

	try {
		const items = await ApiFiles.getAll();

		return {
			props: {
				items,
			},
		};
	} catch (err) {
		console.log(err);
		return {
			props: { items: [] },
		};
	}
};

export default DashboardPage;
