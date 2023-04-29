import { FormBlock } from '@/components/UI/FormBlock';
import { Button, Form, Input, notification } from 'antd';
import { ApiAuth } from '@/services';
import { RegisterFormDTO } from '@/services/dto/auth.dto';
import { setCookie } from 'nookies';

export const RegisterForm = (): JSX.Element => {
	const onSubmit = async (values: RegisterFormDTO) => {
		try {
			const { token } = await ApiAuth.register(values);

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
			console.warn(err);

			notification.error({
				message: 'Error!',
				description: 'Registration error',
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
					label='E-Mail'
					name='email'
					rules={[
						{
							required: true,
							message: 'Please input your E-mail',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Fullname'
					name='fullname'
					rules={[
						{
							required: true,
							message: 'Please input your fullName',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your password',
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
						Регистрация
					</Button>
				</Form.Item>
			</Form>
		</FormBlock>
	);
};
