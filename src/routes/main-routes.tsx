import { PRODUCTS_PAGE, SEARCH_PRODUCTS_PAGE } from '@/helpers/pages'
import Loadable from '@/components/loadable'
import { Navigate } from 'react-router-dom'
import AuthGuard from '@/auth/auth-guard'
import { lazy } from 'react'

const DashboardLayout = Loadable(lazy(() => import('@/layout/main')))
const ProductsPage = Loadable(lazy(() => import('@/pages/products')))
const SearchProductsPage = Loadable(lazy(() => import('@/pages/search-products')))

const MainRoutes = {
	path: '/',
	children: [
		{
			path: '/',
			element: (
				<AuthGuard>
					<DashboardLayout />
				</AuthGuard>
			),
			children: [
				{
					path: '*',
					element: <Navigate replace to={PRODUCTS_PAGE} />,
				},
				{
					path: '/',
					element: <Navigate replace to={PRODUCTS_PAGE} />,
				},
				{
					path: PRODUCTS_PAGE,
					element: <ProductsPage />,
				},
				{
					path: SEARCH_PRODUCTS_PAGE,
					element: <SearchProductsPage />,
				},
			],
		},
	],
}

export default MainRoutes
