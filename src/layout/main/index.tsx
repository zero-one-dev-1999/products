import { FC } from 'react'
import Header from './Header'
import { Box, Divider, Stack } from '@mui/material'
import { Outlet } from 'react-router'

const DashboardLayout: FC = () => {
	return (
		<>
			<Stack sx={{ height: '80px' }}>
				<Header />
			</Stack>

			<Divider sx={{ borderStyle: 'dashed' }} />
			<Divider sx={{ borderStyle: 'dashed' }} />
			<Box
				sx={{
					px: { sm: 2, lg: 4 },
					pb: 2,
					mt: 2,
					height: 'calc(100vh - 106px)',
					overflowY: 'auto',
					scrollbarWidth: 'thin',
				}}
			>
				<Outlet />
			</Box>
		</>
	)
}

export default DashboardLayout
