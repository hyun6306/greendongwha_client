import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	data: () => ({
		scrap_detail_count: '0',
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER', 'AUTH_GET_USER_AUTH', 'USER_GET_SCRAP']),
		scrap_check() {
			let check = 'post'
			if (this.USER_GET_SCRAP?.length) {
				const group = this.USER_GET_SCRAP.filter(x => x.scrap_kind === this.scrap_get_meta)
				if (group?.length) {
					const scrapItem = group.find(x => x.scrap_code === this.scrap_get_query)
					if (scrapItem) check = 'del'
				}
			}
			return check
		},
		scrap_get_query() {
			return this.$route.params.id || null
		},
		scrap_get_meta() {
			return this.$route.meta.scrapCode || null
		},
	},
	watch: {},
	created() {
		if (this.scrap_get_query !== null && this.AUTH_GET_USER_AUTH === 'USER') this.scrap_detail_count_call()
	},
	activated() {
		if (this.scrap_get_query !== null && this.AUTH_GET_USER_AUTH === 'USER') this.scrap_detail_count_call()
	},
	methods: {
		...mapMutations(['APP_MU_SNACKBAR']),
		...mapActions(['USER_ACT_SCRAP']),
		scrap_check_list(code, meta = this.scrap_get_meta) {
			let check = 'post'
			if (this.USER_GET_SCRAP?.length) {
				const group = this.USER_GET_SCRAP.filter(x => x.scrap_kind === meta)
				if (group?.length) {
					const scrapItem = group.find(x => x.scrap_code === code)
					if (scrapItem) check = 'del'
				}
			}
			return check
		},
		async scrap_call(code, type, meta) {
			console.log('this.code', code, meta)
			console.log('this.AUTH_GET_USER', this.AUTH_GET_USER.login_id)
			console.log('this.scrap_get_query', this.scrap_get_query)
			console.log('this.scrap_get_meta', this.scrap_get_meta)
			console.log('this.USER_GET_SCRAP', this.USER_GET_SCRAP)

			// 로그인 상태 체크
			if (this.AUTH_GET_USER.login_id === undefined) {
				return this.APP_MU_SNACKBAR({
					title: '로그인이 필요합니다.',
					action: {
						name: '로그인',
						link: '/login',
					},
				})
			}

			const metaInfo = meta ? meta : this.scrap_get_meta

			// scrap data 체크
			if (metaInfo === undefined || metaInfo === null) {
				return this.APP_MU_SNACKBAR({
					title: '스크랩 할 수 없는 항목입니다.',
					action: {},
				})
			}

			// id check
			if (this.scrap_get_query !== null) code = this.scrap_get_query

			const items = {
				method: type === 'list' ? this.scrap_check_list(code, metaInfo) : this.scrap_check,
				params: {
					login_id: this.AUTH_GET_USER.login_id,
					scrap_kind: metaInfo,
					scrap_code: code,
				},
			}

			console.log('params', items)

			await this.USER_ACT_SCRAP(items).then(res => {
				console.log('this.USER_ACT_SCRAP', res)
				let check = type === 'list' ? this.scrap_check_list(code, metaInfo) : this.scrap_check
				let title = check === 'post' ? '스크랩이 등록되었습니다.' : '스크랩이 삭제되었습니다.'
				this.APP_MU_SNACKBAR({
					title: title,
					action: {
						name: '스크랩보기',
						link: '/user',
					},
				})
				if (this.scrap_get_query !== null) this.scrap_detail_count_call()
			})
		},
		async scrap_detail_count_call() {
			const items = {
				method: 'getCount',
				params: {
					scrap_kind: this.scrap_get_meta,
					scrap_code: this.scrap_get_query,
				},
			}

			console.log('params', items)

			await this.USER_ACT_SCRAP(items).then(res => {
				console.log('count', res)
				// 스크랩 count 반영
				this.scrap_detail_count = res
			})
		},
		scrap_push_link(val) {
			let path
			switch (val.scrap_kind) {
				case 'master':
					path = `/product/detail/${val.scrap_code}`
					break
				case 'housewarming':
					path = `/housewarming/3d/detail/${val.scrap_code}`
					break
				case 'exphousewarming':
					path = `/housewarming/specialist/detail/${val.scrap_code}`
					break
				case 'knowhow':
					path = `/community/knowHow/detail/${val.scrap_code}`
					break
				case 'corporation':
					path = `/interior/store/detail/${val.scrap_code}`
					break
				case 'showroom':
					path = `/interior/showRoom/detail/${val.scrap_code}`
					break
				case 'event':
					path = `/community/event/detail/${val.scrap_code}`
					break
			}
			this.$router.push(path)
		},
	},
}
