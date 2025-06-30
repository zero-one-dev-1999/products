import { useSelector } from '@/hooks/use-selector'

const useAuthContext = () =>
	useSelector(({ App: s }) => ({
		token: s.token,
		lifetime: s.lifetime,
		expires_at: s.expires_at,
		isAuth: s.isAuth,
	}))

export { useAuthContext }
