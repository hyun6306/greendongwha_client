import localStorage from '@/utils/localStorage'
import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'

import store from '@/store'
import router from '@/router'

const url = process.env.VUE_APP_API_SERVER

export const caller = {
	get accessToken() {
		// console.log('accessToken', router.currentRoute.fullPath)
		if (router.currentRoute.fullPath.includes('admin') || router.currentRoute.fullPath.includes('master')) {
			return localStorage.xAccessToken.get()
		} else {
			return localStorage.accessToken.get()
		}
	},
	get formConfig() {
		return {
			withCredentials: false,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				// 'Content-Type': 'multipart/form-data',

				// cache setting
				// 'Cache-Control': 'no-cache',
				// 'Access-Control-Max-Age': 3600,

				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Credentials': true,

				Authorization: `Bearer ${this.accessToken}`,
			},
			adapter: cacheAdapterEnhancer(axios.defaults.adapter),
		}
	},
	get jsonConfig() {
		return {
			withCredentials: false,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8',

				// cache setting
				'Cache-Control': 'no-cache',
				// 'Access-Control-Max-Age': 3600,

				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Credentials': true,

				Authorization: `Bearer ${this.accessToken}`,
			},
			adapter: cacheAdapterEnhancer(axios.defaults.adapter),
		}
	},
	async Call(method, path, params, query, conf = 'json', response = 'json') {
		const config = conf !== 'form' ? this.jsonConfig : this.formConfig

		let formData = new FormData()
		if (conf === 'form') {
			for (const key in params) {
				formData.append(key, params[key])
			}
		}

		const responseType = conf !== 'json' ? response : 'json'

		const apiUrl = query !== null ? `${url}/${path}/${query}` : `${url}/${path}`

		let res
		let result

		// console.log('this.accessToken', this.accessToken)
		// console.log('apiUrl',apiUrl)
		console.log('method', method, params, config)

		try {
			if (method === 'GET') {
				res = await axios.get(apiUrl, config, responseType)
			} else if (method === 'POST') {
				if (conf === 'form') res = await axios.post(apiUrl, formData, config, responseType)
				else res = await axios.post(apiUrl, params, config, responseType)
			} else if (method === 'PUT') {
				if (conf === 'form') res = await axios.put(apiUrl, formData, config, responseType)
				else res = await axios.put(apiUrl, params, config, responseType)
			} else if (method === 'DEL') {
				res = await axios.delete(apiUrl, config, responseType)
			}

			console.log('apiRest', res)

			// 조회 오류
			if (res.data.statusCode === 1 && res.data.statusCode !== undefined) {
				console.error('apiRest_error', res)
				return store.commit('APP_MU_DIALOG', {
					dialog: true,
					title: `${res.data.statusCode}`,
					text: `${res.data.responseMessage}`,
				})
			} else {
				result = res.data.data
			}

			// 조회값 없음
			if (res.data.statusCode === 2) result = undefined

			// 토큰 만료
			if (String(res.data.statusCode).substring(1, 0) === '3') {
				// store.commit('APP_MU_DIALOG', {
				//     dialog: true,
				//     title: `${res.data.statusCode}`,
				//     text: `${res.data.responseMessage}`
				// })
				// alert(`${res.data.statusCode} ${router.currentRoute.fullPath}`)
				if (router.currentRoute.fullPath.includes('admin')) {
					return router.push('/splash/admin').catch(() => {})
				} else {
					return router.push('/splash/user').catch(() => {})
				}
			}
		} catch (e) {
			console.log(e)
			return store.commit('APP_MU_DIALOG', {
				dialog: true,
				title: null,
				text: `${e}`,
			})
			// alert(e);
		}

		return result
	},
}
