import { client } from '@/services/axiosClient';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { ApiAuth } from '@/services';

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
	const { _token } = nookies.get(ctx);
	client.defaults.headers.Authorization = 'Bearer ' + _token;

	try {
		await ApiAuth.getMe();

		return {
			props: {},
		};
	} catch (err) {
		return {
			redirect: {
				destination: '/dashboard/auth',
				permanent: false,
			},
		};
	}
};
