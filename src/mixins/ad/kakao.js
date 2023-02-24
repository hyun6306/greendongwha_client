export default {
	data: () => ({
		ad_kakao_id: '608676623249160179',
	}),
	watch: {},
	computed: {},
	created() {
		// const scriptElem = document.createElement('script')
		//
		// // script download
		// // scriptElem.onload = () => this.ad_kakao_homePageScript()
		// scriptElem.src = `https://t1.daumcdn.net/adfit/static/kp.js`
		//
		// document.head.appendChild(scriptElem)
	},
	mounted() {},
	methods: {
		// ad_kakao
		ad_kakao_homePageScript() {
			// 홈페이지 진입 스크립트
			if (window.kakaoPixel) window.kakaoPixel(this.ad_kakao_id).pageView()
		},
		ad_kakao_pageScript(pageName) {
			// 페이지 접근 스크립트
			if (window.kakaoPixel) window.kakaoPixel(this.ad_kakao_id).pageView(pageName)
		},
		ad_kakao_clickScript(pageId, tagName) {
			let params = { tag: tagName }
			if (pageId !== null) params.id = pageId

			// 클릭 스크립트
			if (window.kakaoPixel) window.kakaoPixel(this.ad_kakao_id).addToWishList(params)
		},
		ad_kakao_addToCart(pageId, tagName) {
			let params = { tag: tagName }
			if (pageId !== null) params.id = pageId

			// 견적접근시 스크립트
			if (window.kakaoPixel) window.kakaoPixel(this.ad_kakao_id).addToCart(params)
		},
	},
}
