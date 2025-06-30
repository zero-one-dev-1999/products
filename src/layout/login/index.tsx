import { Box, Grid2, Stack, useMediaQuery, useTheme } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router'

const LoginLayout: FC = () => {
	const theme = useTheme()

	const matches = useMediaQuery(theme.breakpoints.down('md'))

	return (
		<Grid2 container spacing={2}>
			{!matches && (
				<Grid2 size={{ md: 6 }}>
					<Stack sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} spacing={2}>
						<Box alt='auth' component='img' sx={{ width: '60%' }} src={'/illustration.jpg'} />
					</Stack>
				</Grid2>
			)}

			<Grid2 size={{ xs: 12, md: 6 }}>
				<Stack sx={{ p: 2 }}>
					<Outlet />
				</Stack>
			</Grid2>
		</Grid2>
	)
}

export default LoginLayout
