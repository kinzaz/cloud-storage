import { LoginFormDTO } from '@/services/dto/auth.dto';
import { FormBlock } from '@/components/UI/FormBlock';
import { Button, Form, Input, notification } from 'antd';
import { ApiAuth } from '@/services';
import { setCookie } from 'nookies';

export const LoginForm = (): JSX.Element => {
	const onSubmit = async (values: LoginFormDTO) => {
		try {
			const { token } = await ApiAuth.login(values);

			notification.success({
				message: 'Success!',
				description: 'Go to dashboard...',
				duration: 2,
			});

			setCookie(null, '_token', token, {
				path: '/',
			});

			location.href = '/dashboard';
		} catch (err) {
			console.warn('LoginForm', err);

			notification.error({
				message: 'Error!',
				description: 'Invalid login or password',
				duration: 2,
			});
		}
	};

	return (
		<FormBlock>
			<Form
				name='basic'
				labelCol={{
					span: 8,
				}}
				onFinish={onSubmit}
			>
				<Form.Item
					label='E-mail'
					name='email'
					rules={[{ required: true, message: 'Please input your E-mail!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type='primary' htmlType='submit'>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</FormBlock>
	);
};
