import { Button, Card, Container, Grid2, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { FC, useCallback, useEffect, useState } from 'react'
import { PRODUCTS_PAGE } from '@/helpers/pages'
import { useTranslation } from 'react-i18next'
import { PRODUCTS_URL } from '@/helpers/urls'
import { IProduct } from '@/store/products'
import Iconify from '@/components/iconify'
import LazyImage from '@/components/image'
import { Link } from 'react-router'
import { debounce } from 'lodash'
import api from '@/helpers/api'
import Product from './Product'

const Index: FC = () => {
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
	const [products, setProducts] = useState<IProduct[]>([])
	const [text, setText] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [t] = useTranslation()

	const getProducts = async () => {
		try {
			setLoading(true)
			const { data, status } = await api.get(PRODUCTS_URL)
			if (status === 200) {
				setProducts(data.items)
				setFilteredProducts(data.items)
			}
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const delayFunction = useCallback(
		debounce(value => {
			setFilteredProducts(
				products
					.filter(product => product.productName.toLowerCase().includes(value.toLowerCase()))
					.sort((prod1, prod2) => {
						const indexProd1 = prod1.productName.toLowerCase().indexOf(value.toLowerCase())
						const indexProd2 = prod2.productName.toLowerCase().indexOf(value.toLowerCase())

						return indexProd1 - indexProd2
					}),
			)
		}, 500),
		[products],
	)

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value)
		delayFunction(e.target.value)
	}

	useEffect(() => {
		getProducts()
	}, [])

	return (
		<Container>
			<Stack direction='row' justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 2 }} spacing={2}>
				<Link to={PRODUCTS_PAGE}>
					<Button color='info' variant='outlined' sx={{ minWidth: '30px', padding: '10px', borderRadius: '50%' }}>
						<Iconify icon='ic:round-arrow-back' width={28} />
					</Button>
				</Link>
				<TextField
					value={text}
					onChange={handleChangeInput}
					placeholder={t('search')}
					sx={{ width: '50%' }}
					slotProps={{
						input: {
							endAdornment: <Iconify icon='tdesign:search' width={25} />,
						},
					}}
				/>
			</Stack>
			<Grid2 container spacing={1}>
				{loading ? (
					Array.from({ length: 30 }).map((_, index) => (
						<Grid2 key={index} size={4}>
							<Skeleton component={Card} variant='rectangular' animation='wave' sx={{ py: 5, width: '100%' }} />
						</Grid2>
					))
				) : filteredProducts.length ? (
					<>
						{filteredProducts.map(product => (
							<Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
								<Product data={product} />
							</Grid2>
						))}
					</>
				) : (
					<Grid2 size={12}>
						<Card>
							<Stack
								alignItems='center'
								justifyContent='center'
								sx={{
									height: 500,
									textAlign: 'center',
									p: theme => theme.spacing(20, 2),
								}}
							>
								<LazyImage src={'/illustration_empty_content.svg'} alt='no data' height='200' />
								<Typography variant='h5' mt={2} gutterBottom>
									{t('no-products')}
								</Typography>
							</Stack>
						</Card>
					</Grid2>
				)}
			</Grid2>
		</Container>
	)
}

export default Index
