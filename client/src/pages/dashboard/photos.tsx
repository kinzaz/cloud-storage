import { GetServerSidePropsContext, NextPage } from 'next';
import { checkAuth } from '@/utils/checkAuth';
import React from 'react';

import { Files } from '@/modules/Files';
import { ApiFiles } from '@/services';
import { FileItem } from '@/services/dto/files.dto';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Layout } from '@/components/layouts/Layout';

interface Props {
	items: FileItem[];
}

const DashboardPhotos: NextPage<Props> = ({ items }) => {
	return (
		<DashboardLayout>
			<Files items={items} withActions />
		</DashboardLayout>
	);
};
// @ts-ignore
DashboardPhotos.getLayout = (page: React.ReactNode) => {
	return <Layout title='Dashboard / Photos'>{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const authProps = await checkAuth(ctx);

	if ('redirect' in authProps) {
		return authProps;
	}

	try {
		const items = await ApiFiles.getAll('photos');

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

export default DashboardPhotos;
