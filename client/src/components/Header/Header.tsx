import React from 'react';
import { Layout, Avatar, Menu, Popover, Button } from 'antd';
import styles from './styles.module.scss';
import { CloudOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { ApiAuth } from '@/services';

export const Header: React.FC = () => {
	const router = useRouter();
	const selectedMenu = router.pathname;

	const onClickLogout = () => {
		if (window.confirm('Are you sure you want logout?')) {
			ApiAuth.logout();
			location.href = '/';
		}
	};

	return (
		<Layout.Header className={styles.root}>
			<div className={styles.headerInner}>
				<div className={styles.headerLeft}>
					<h2>
						<CloudOutlined />
						Cloud Storage
					</h2>

					<Menu
						className={styles.topMenu}
						theme='dark'
						mode='horizontal'
						defaultSelectedKeys={[selectedMenu]}
						onSelect={({ key }) => router.push(key)}
						items={[
							{ key: '/dashboard', label: 'Main' },
							{ key: '/dashboard/profile', label: 'Profile' },
						]}
					/>
				</div>

				<div className={styles.headerRight}>
					<Popover
						trigger='click'
						content={
							<Button onClick={onClickLogout} type='primary' danger>
								Выйти
							</Button>
						}
					>
						<Avatar>A</Avatar>
					</Popover>
				</div>
			</div>
		</Layout.Header>
	);
};
