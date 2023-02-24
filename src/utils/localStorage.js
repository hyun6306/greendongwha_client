const from = key => {
	const str = localStorage.getItem(key)
	if (str === null) {
		return null
	}

	try {
		return JSON.parse(str)
	} catch (e) {
		return str
	}
}

const to = (key, value) => localStorage.setItem(key, value)
const remove = key => localStorage.removeItem(key)

const call = {
	userInfo: {
		set(info) {
			to('user-info', info)
		},
		get() {
			return from('user-info')
		},
		del() {
			remove('user-info')
		},
	},
	accessToken: {
		set(token) {
			to('access-token', token)
		},
		get() {
			return from('access-token')
		},
		del() {
			remove('access-token')
		},
	},
	refreshToken: {
		set(token) {
			to('refresh-token', token)
		},
		get() {
			return from('refresh-token')
		},
		del() {
			remove('refresh-token')
		},
	},
	xAccessToken: {
		set(token) {
			to('x-access-token', token)
		},
		get() {
			return from('x-access-token')
		},
		del() {
			remove('x-access-token')
		},
	},
	xRefreshToken: {
		set(token) {
			to('x-refresh-token', token)
		},
		get() {
			return from('x-refresh-token')
		},
		del() {
			remove('x-refresh-token')
		},
	},
	clearAll() {
		localStorage.clear()
	},
}

export default call
