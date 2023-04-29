import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './style.module.scss';

interface FromBlockProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const FormBlock = ({
	children,
	...props
}: FromBlockProps): JSX.Element => {
	return (
		<div {...props} className={styles.root}>
			{children}
		</div>
	);
};
