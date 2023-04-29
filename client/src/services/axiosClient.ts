import { createAxiosClient } from './createAxiosClient';

export const client = createAxiosClient({
	options: {
		baseURL: process.env.BASE_URL,
		timeout: 300000,
		headers: {
			'Content-Type': 'application/json',
		},
	},
});
