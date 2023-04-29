import { Extension } from './getColorByExtension';

export const isImage = (ext: Extension) => {
	return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
};
