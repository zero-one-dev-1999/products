import { store } from "@/store";
import { appActions } from "@/store/app";
import { toastErrorMessage } from "@/utils/toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	validateStatus: status => status !== 401 && status <= 500,
})

api.interceptors.request.use(config => {
	if (config.withCredentials) {
		const { App } = store.getState()

		if (App.expires_at && new Date() >= new Date(App.expires_at)) {
			store.dispatch(appActions.reset())
		}

		if (App.isAuth) {
			config.headers.set('Authorization', `Bearer ${App.token}`, true)
		}
	}

	return config
})

api.interceptors.response.use(
	response => {
		if (!(response.data instanceof Blob)) {
			if (!response.data.status) {
                toastErrorMessage(response.data.message)
			}

		}

		return response
	},
	error => {
		if (error.response?.status === 401) {
			store.dispatch(appActions.reset())
		}

		return Promise.reject(error)
	},
)

export { API_URL, api as default }