import { client } from './axiosClient';
import { FileItem } from './dto/files.dto';

type FileType = 'all' | 'photos' | 'trash';

export async function getAll(type: FileType = 'all'): Promise<FileItem[]> {
	return (await client.get('files?type=' + type)).data;
}

export const remove = (ids: number[]): Promise<void> => {
	return client.delete('/files?ids=' + ids);
};

export const uploadFile = async (options: any) => {
	const { onSuccess, onError, file, onProgress } = options;

	const formData = new FormData();
	formData.append('file', file);

	const config = {
		headers: { 'Content-Type': 'multipart/form-data' },
		onProgress: (event: ProgressEvent) => {
			onProgress({ percent: (event.loaded / event.total) * 100 });
		},
	};

	try {
		const { data } = await  client.post('files', formData, config);

		onSuccess();

		return data;
	} catch (err) {
		onError({ err });
	}
};
