import { createSlice } from '@reduxjs/toolkit'

interface IAppState {
	token: string | null
	lifetime: number | null
	expires_at: string | null
	isAuth: boolean
}

const initialState: IAppState = {
	token: null,
	isAuth: false,
	lifetime: null,
	expires_at: null,
}

const { actions: appActions, reducer } = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setData(state, { payload }) {
			state.token = payload.token
			state.lifetime = payload.lifetime
			state.expires_at = payload.expires_at
		},
		setIsAuth(state, { payload }) {
			state.isAuth = payload
		},
		reset(state) {
			state.isAuth = false
			state.token = null
			state.lifetime = null
			state.expires_at = null
		},
	},
})

export { appActions, reducer as default }
