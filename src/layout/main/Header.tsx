import { Container, IconButton, Stack, Tooltip } from '@mui/material'
import { FC } from 'react'
import Language from './Language'
import FullScreen from './FullScreen'
import Logo from './Logo'
import ThemeMode from './ThemeMode'
import Profile from './Profile'
import { Link } from 'react-router'
import { SEARCH_PRODUCTS_PAGE } from '@/helpers/pages'
import Iconify from '@/components/iconify'
import { useTranslation } from 'react-i18next'

const Header: FC = () => {
	const [t] = useTranslation()
	return (
		<Container sx={{ height: '80px' }}>
			<Stack sx={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<Logo />
				<Stack spacing={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
					<Link to={SEARCH_PRODUCTS_PAGE} style={{ textDecoration: 'none', color: 'inherit' }}>
						<Tooltip title={t('search')}>
							<IconButton>
								<Iconify icon='iconamoon:search' width={32} />
							</IconButton>
						</Tooltip>
					</Link>
					<FullScreen />
					<ThemeMode />
					<Language />
					<Profile />
				</Stack>
			</Stack>
		</Container>
	)
}

export default Header
