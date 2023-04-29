import { GetServerSidePropsContext, NextPage } from 'next';
import { checkAuth } from '@/utils/checkAuth';
import React from 'react';

import { Files } from '@/modules/Files';
import { ApiFiles } from '@/services';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { FileItem } from '@/services/dto/files.dto';
import { Layout } from '@/components/layouts/Layout';

interface Props {
	items: FileItem[];
}

const DashboardTrash: NextPage<Props> = ({ items }) => {
	return (
		<DashboardLayout>
			<Files items={items} />
		</DashboardLayout>
	);
};
// @ts-ignore
DashboardTrash.getLayout = (page: React.ReactNode) => {
	return <Layout title='Dashboard / Trash'>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const authProps = await checkAuth(ctx);

	if ('redirect' in authProps) {
		return authProps;
	}

	try {
		const items = await ApiFiles.getAll('trash');

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

export default DashboardTrash;
