import { destroyCookie } from 'nookies';
import { client } from './axiosClient';
import {
	LoginFormDTO,
	LoginResponseDTO,
	RegisterFormDTO,
	RegisterResponseDTO,
	User,
} from './dto/auth.dto';

export async function register(
	values: RegisterFormDTO
): Promise<RegisterResponseDTO> {
	return (await client.post('auth/register', values)).data;
}

export async function login(values: LoginFormDTO): Promise<LoginResponseDTO> {
	return (await client.post('auth/login', values)).data;
}

export async function getMe(): Promise<User> {
	return (await client.get('users/me')).data;
}

export function logout(): void {
	destroyCookie(null, '_token', { path: '/' });
}
