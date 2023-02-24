<template>
	<div>
		<router-view />
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import ad_kakao from '@/mixins/ad/kakao'

export default {
	name: 'App',
	mixins: [ad_kakao],
	data: () => ({}),
	created() {
		window.addEventListener('resize', this.handleResize)
		window.addEventListener('scroll', this.handleScroll)
		window.addEventListener('load', this.handlePageLoad)
		// ad_kakao
		this.ad_kakao_homePageScript()
	},
	mounted() {
		this.handleResize()
		this.handleScroll()
	},
	destroyed() {
		window.removeEventListener('resize', this.handleResize)
		window.removeEventListener('scroll', this.handleScroll)
	},
	methods: {
		...mapMutations(['APP_MU_APP_STATE', 'APP_MU_APP_WIDTH', 'APP_MU_SCROLL_BOTTOM', 'APP_MU_PAGE_LOAD']),
		handleResize() {
			const width = window.innerWidth
			let state = 'web'
			if (600 > width) {
				state = 'mobile'
			} else if (width < 768) {
				state = 'tablet'
			}
			this.APP_MU_APP_STATE(state)
			this.APP_MU_APP_WIDTH(width)
		},
		handleScroll() {
			let bottomOfWindow =
				document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 250
			if (bottomOfWindow) this.APP_MU_SCROLL_BOTTOM(1)
		},
		handlePageLoad() {
			this.APP_MU_PAGE_LOAD(true)
		},
	},
}
</script>
