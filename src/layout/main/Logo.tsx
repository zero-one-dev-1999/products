import Iconify from '@/components/iconify'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router'

const Logo: FC = () => {
	return (
		<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing={1}>
				<Iconify icon='logos:shopify' width={48} />
				<Typography variant='h3' mt={0.4}>
					Marketplace
				</Typography>
			</Stack>
		</Link>
	)
}

export default Logo
