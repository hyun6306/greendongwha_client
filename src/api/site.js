import { caller } from '@/api/caller'

export default {
	userInfo: {
		InteriorListGet() {
			return caller.Call('GET', 'common/auth/signup/corporation/list/get', null, null)
		},
	},
}
