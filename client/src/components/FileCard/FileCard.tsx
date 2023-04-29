import React from 'react';
import styles from './styles.module.scss';
import { getExtensionFromFileName } from '@/utils/getExtensionFromFileName';
import { getColorByExtension } from '@/utils/getColorByExtension';
import { FileTextOutlined } from '@ant-design/icons';
import { isImage } from '@/utils/isImage';
import Image from 'next/image';

interface FileCardProps {
	filename: string;
	originalName: string;
}

export const FileCard: React.FC<FileCardProps> = ({
	originalName,
	filename,
}) => {
	const ext = getExtensionFromFileName(filename);
	const imageUrl =
		ext && isImage(ext) ? 'http://localhost:7777/' + filename : '';

	const color = getColorByExtension(ext);
	const classColor = styles[color];

	return (
		<div className={styles.root}>
			<div className={styles.icon}>
				<i className={classColor}>{ext}</i>
				{isImage(ext) ? (
					// <img className={styles.image} src={imageUrl} alt='File' />
					<Image
						width={100}
						height={100}
						src={imageUrl}
						alt='file'
						className={styles.image}
					/>
				) : (
					<FileTextOutlined />
				)}
			</div>
			<span>{originalName}</span>
		</div>
	);
};
