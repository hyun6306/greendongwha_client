export default {
	methods: {
		google_analytic_push_event(eventName, variable) {
			// google analytics
			// 상단으로 검색
			if (window.gtag) {
				window.gtag('event', eventName, variable)
				console.log('ga push', eventName, variable)
			}
		},
	},
}
