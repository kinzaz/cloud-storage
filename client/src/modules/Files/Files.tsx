import { FileActions } from '@/components/FileAcrions';
import { FileList, FileSelectType } from '@/components/FileList';
import { ApiFiles } from '@/services';
import { FileItem } from '@/services/dto/files.dto';
import { Empty } from 'antd';
import { useState } from 'react';

interface FilesProps {
	items: FileItem[];
	withActions?: boolean;
}

export const Files = ({ items, withActions }: FilesProps): JSX.Element => {
	const [files, setFiles] = useState(items || []);
	const [selectedIds, setSelectedIds] = useState<number[]>([]);

	const onClickRemove = () => {
		setSelectedIds([]);
		setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
		ApiFiles.remove(selectedIds);
	};

	const onClickShare = () => {
		alert('share');
	};

	const onFileSelect = (id: number, type: FileSelectType) => {
		if (type === 'select') {
			setSelectedIds((prev) => [...prev, id]);
		} else {
			setSelectedIds((prev) => prev.filter((_id) => _id !== id));
		}
	};

	return (
		<div>
			{files.length ? (
				<>
					{withActions && (
						<FileActions
							onClickRemove={onClickRemove}
							onClickShare={onClickShare}
							isActive={selectedIds.length > 0}
						/>
					)}
					<FileList items={files} onFileSelect={onFileSelect} />
				</>
			) : (
				<Empty className='empty-block' description='There are no files' />
			)}
		</div>
	);
};
