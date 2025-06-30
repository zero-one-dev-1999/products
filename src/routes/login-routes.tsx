import { LOGIN_PAGE } from '@/helpers/pages'
import Loadable from '@/components/loadable'
import GuestGuard from '@/auth/guest-guard'
import { Navigate } from 'react-router-dom'
import { lazy } from 'react'

const LoginLayout = Loadable(lazy(() => import('@/layout/login')))
const LoginPage = Loadable(lazy(() => import('@/pages/auth/login')))

const LoginRoutes = {
	path: '/',
	children: [
		{
			path: '/',
			element: (
				<GuestGuard>
					<LoginLayout />
				</GuestGuard>
			),
			children: [
				{
					path: '*',
					element: <Navigate replace to={LOGIN_PAGE} />,
				},
				{
					path: '/',
					element: <Navigate replace to={LOGIN_PAGE} />,
				},
				{
					path: LOGIN_PAGE,
					element: <LoginPage />,
				},
			],
		},
	],
}

export default LoginRoutes
