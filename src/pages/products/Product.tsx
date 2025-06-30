import { Card, Stack, Typography } from '@mui/material'
import { useModeContext } from '@/theme/modeContext'
import { fNumber } from '@/utils/format-number'
import { FC, useEffect, useState } from 'react'
import { darkMode, lightMode } from './config'
import { IProduct } from '@/store/products'

const Product: FC<{ data: IProduct }> = ({ data: { productName, name, shortDescription, stocks, productProperties, properties } }) => {
	const [styles, setStyles] = useState(lightMode)
	const { mode } = useModeContext()

	useEffect(() => {
		if (mode === 'light') {
			setStyles(lightMode)
		} else {
			setStyles(darkMode)
		}
	}, [mode])

	return (
		<Stack
			p={2}
			component={Card}
			onClick={() => {}}
			sx={{
				height: '100%',
				userSelect: 'none',
				transition: 'all 0.2s ease',
				background: styles.product_card_bg,
				boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
				cursor: 'pointer',
				':active': {
					transform: 'scale(0.95)',
					background: styles.product_card_bg_active,
					boxShadow: '10px 10px 40px rgba(0, 0, 0, 0.1)',
				},
			}}
		>
			<Stack alignItems={'center'}>
				<Typography
					color='GrayText'
					variant='subtitle1'
					sx={{
						mb: 0.5,
						lineHeight: '120%',
						color: styles.sub_color,
					}}
				>
					{productName}
				</Typography>

				<Typography color='GrayText' variant='caption' sx={{ color: styles.sub_color }}>
					{name}
				</Typography>
				<Typography sx={{ color: styles.sub_color }} variant='subtitle2'>
					{properties
						.map(item => `${item.value}`)
						.filter(Boolean)
						.join(', ')}
				</Typography>
				<Typography sx={{ color: styles.sub_color }} variant='subtitle2'>
					{productProperties
						.map(item => `${item.value || false}`)
						.filter(Boolean)
						.join(', ')}
				</Typography>

				<Typography sx={{ color: styles.sub_color }} variant='caption'>
					{shortDescription}
				</Typography>
				<Typography
					variant='h6'
					sx={{
						mb: -0.6,
						mt: 0.5,
						color: styles.sub_color,
					}}
				>
					{fNumber(stocks[0].sellPrice.UZS)} UZS
				</Typography>
			</Stack>
		</Stack>
	)
}

export default Product
