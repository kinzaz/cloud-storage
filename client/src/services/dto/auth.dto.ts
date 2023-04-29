export interface LoginFormDTO {
	email: string;
	password: string;
}

export type RegisterFormDTO = LoginFormDTO & { fullName: string };

export interface LoginResponseDTO {
	token: string;
}

export type RegisterResponseDTO = LoginResponseDTO;

export interface User {
	id: number;
	email: string;
	fullName: string;
}
