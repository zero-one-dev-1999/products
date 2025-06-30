import { Card, Container, Grid2, MenuItem, Select, SelectChangeEvent, Skeleton, Stack, Typography } from '@mui/material'
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'
import PaginationComponent from '@/components/pagination'
import { productsActions } from '@/store/products'
import { useSelector } from '@/hooks/use-selector'
import { useTranslation } from 'react-i18next'
import { PRODUCTS_URL } from '@/helpers/urls'
import LazyImage from '@/components/image'
import { useDispatch } from 'react-redux'
import api from '@/helpers/api'
import Product from './Product'
import VirtualProducts from './VirtualProducts'

const pageSizeList: number[] = [10, 30, 50, 70, 100, 200]

const Index: FC = () => {
	const [pageSize, setPageSize] = useState<number>(100)
	const dispatch = useDispatch()
	const [t] = useTranslation()

	const { loading, products, page, total_count } = useSelector(({ Products: s }) => ({
		loading: s.loading,
		products: s.data,
		page: s.page,
		total_count: s.total_count,
	}))

	const productsOnStack = useMemo(() => products.filter(product => product.stocks.length), [products])

	const getProducts = async (page: number, size: number) => {
		try {
			dispatch(productsActions.setLoading(true))
			const { data, status } = await api.get(PRODUCTS_URL, { params: { page, size } })

			if (status === 200) {
				dispatch(productsActions.setProducts(data.items))
				dispatch(productsActions.setPage(data.page))
				dispatch(productsActions.setTotalCount(data.total_count))
			}
		} catch (error) {
			console.error(error)
		} finally {
			dispatch(productsActions.setLoading(false))
		}
	}

	const handleChangePagination = (_: ChangeEvent<unknown>, newPage: number) => {
		getProducts(newPage, pageSize)
	}

	const handleChange = (event: SelectChangeEvent) => {
		setPageSize(Number(event.target.value))
		getProducts(page as number, Number(event.target.value))
	}

	useEffect(() => {
		getProducts(1, pageSize)
	}, [])

	return (
		<Container>
			<Typography variant='h3' textAlign={'center'} sx={{ mt: 0, mb: 2 }}>
				{t('products-on-sale')}
			</Typography>
			<Grid2 container spacing={1}>
				{loading ? (
					Array.from({ length: 18 }).map((_, index) => (
						<Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
							<Skeleton component={Card} variant='rectangular' animation='wave' sx={{ py: 10, width: '100%' }} />
						</Grid2>
					))
				) : productsOnStack.length ? (
					<>
						{products.length > 30 ? (
							<Grid2 size={12}>
								<VirtualProducts products={productsOnStack} />
							</Grid2>
						) : (
							productsOnStack.map(product => (
								<Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
									<Product data={product} />
								</Grid2>
							))
						)}

						{page && total_count && (
							<Grid2 size={12}>
								<Stack sx={{ py: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
									<Select size='small' value={`${pageSize}`} onChange={handleChange}>
										{pageSizeList.map(item => (
											<MenuItem key={item} value={`${item}`}>
												{item}
											</MenuItem>
										))}
									</Select>
									<PaginationComponent page={page} handleChange={handleChangePagination} pageCount={Math.ceil(total_count / 100)} />
								</Stack>
							</Grid2>
						)}
					</>
				) : (
					<Grid2 size={12}>
						<Stack
							alignItems='center'
							justifyContent='center'
							sx={{
								height: 'calc(100vh - 220px)',
								textAlign: 'center',
								p: theme => theme.spacing(15, 2),
							}}
						>
							<LazyImage src={'/illustration_empty_content.svg'} alt='no data' height='200' />
							<Typography variant='h5' mt={2} gutterBottom>
								{t('no-data')}
							</Typography>
						</Stack>
					</Grid2>
				)}
			</Grid2>
		</Container>
	)
}

export default Index
