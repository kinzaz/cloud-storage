import axios from 'axios';
import { parseCookies } from 'nookies';

export function createAxiosClient({ options }: any) {
	const client = axios.create(options);

	client.interceptors.request.use(
		(config) => {
			const { _token } = parseCookies();
			if (_token) {
				config.headers.Authorization = 'Bearer ' + _token;
			}

			return config;
		},
		(error: any) => {
			return Promise.reject(error);
		}
	);

	return client;
}
