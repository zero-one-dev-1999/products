import { Button, Grid2, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { Form, useFormik, FormikProvider } from 'formik'
import FormikInput from '@/components/input/FormikInput'
import { toastSuccessMessage } from '@/utils/toast'
import { useDispatch } from '@/hooks/use-dispatch'
import { useTranslation } from 'react-i18next'
import { LOGIN_URL } from '@/helpers/urls'
import Iconify from '@/components/iconify'
import { appActions } from '@/store/app'
import { FC, useState } from 'react'
import api from '@/helpers/api'
import * as Yup from 'yup'

interface IFormValues {
	username: string
	password: string
}

const LoginPage: FC = () => {
	const dispatch = useDispatch()
	const [t] = useTranslation()
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleLogin = async (payload: IFormValues) => {
		const params = new URLSearchParams()
		params.append('_username', payload.username)
		params.append('_password', payload.password)
		params.append('_subdomain', 'toko')

		try {
			setLoading(true)
			const response = await api.post(LOGIN_URL, params.toString(), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Accept: 'application/json',
				},
				withCredentials: false,
			})

			if (response.status === 200) {
				dispatch(appActions.setIsAuth(true))
				dispatch(appActions.setData(response.data))
				toastSuccessMessage(t('successfully-logged-in'))
			}
		} catch (error) {
			// console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required(),
			password: Yup.string().required(),
		}),
		onSubmit: (values: IFormValues) => handleLogin(values),
	})

	return (
		<FormikProvider value={formik}>
			<Form
				autoComplete='off'
				onSubmit={e => {
					e.preventDefault()
					formik.handleSubmit(e)
				}}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						e.preventDefault()
					}
				}}
			>
				<Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }} spacing={2}>
					<Stack>
						<Typography textAlign={'center'} variant='h3' mb={4}>
							{t('sign-in')}
						</Typography>
						<Grid2 container spacing={2}>
							<Grid2 size={12}>
								<FormikInput field='username' size='medium' label={t('username')} />
							</Grid2>
							<Grid2 size={12}>
								<FormikInput
									field='password'
									size='medium'
									label={t('password')}
									type={showPassword ? 'text' : 'password'}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
													<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Grid2>
						</Grid2>
						<Button disabled={loading} type='submit' variant='contained' color='success' sx={{ my: 4 }} size='large'>
							{t('sign-in')}
						</Button>
					</Stack>
				</Stack>
			</Form>
		</FormikProvider>
	)
}

export default LoginPage
