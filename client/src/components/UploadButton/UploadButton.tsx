import React from 'react';
import styles from '@/styles/Home.module.scss';
import { Button, Upload, UploadFile, notification } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ApiFiles } from '@/services';

export const UploadButton: React.FC = () => {
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);

	const onUploadSuccess = async (options: any) => {
		try {
			await ApiFiles.uploadFile(options);
			setFileList([]);
			window.location.reload();
		} catch (err) {
			notification.error({
				message: 'Error!',
				description: 'Failure',
				duration: 2,
			});
		}
	};

	return (
		<Upload
			customRequest={onUploadSuccess}
			fileList={fileList}
			onChange={({ fileList }) => setFileList(fileList)}
			className={styles.upload}
		>
			<Button type='primary' icon={<CloudUploadOutlined />} size='large'>
				Upload files
			</Button>
		</Upload>
	);
};
