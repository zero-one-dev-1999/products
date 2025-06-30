import { useAuthContext } from './use-auth-context'
import { Navigate } from 'react-router-dom'
import { FC, PropsWithChildren } from 'react'
import { PRODUCTS_PAGE } from '@/helpers/pages'

const GuestGuard: FC<PropsWithChildren> = ({ children }) => {
	const { isAuth } = useAuthContext()

	if (isAuth) {
		return <Navigate to={PRODUCTS_PAGE} />
	}

	return <>{children}</>
}

export default GuestGuard
