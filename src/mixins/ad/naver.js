export default {
	data: () => ({}),
	watch: {},
	computed: {},
	created() {
		// const scriptElem = document.createElement('script')
		//
		// // script download
		// scriptElem.src = `https://wcs.naver.net/wcslog.js`
		//
		// document.head.appendChild(scriptElem)
	},
	mounted() {},
	methods: {
		ad_naver_changeScript(type, value) {
			var _nasa = {}
			if (window.wcs) {
				_nasa['cnv'] = window.wcs.cnv(String(type), String(value)) // ( 전환유형, 전환가치 )
				window.wcs_do(_nasa)
				console.log('ad_naver_changeScript', type, value)
				console.log('ad_naver_changeScript', window.wcs.cnv)
				console.log('ad_naver_changeScript', window.wcs_do)
			}
		},
	},
}
