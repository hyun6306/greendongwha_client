export default {
	data: () => ({
		geolocation_status: 100, // 0=정상 1=권한X 2=브라우저가 위치 불러오지 못함 3=타임아웃 100=위치정보 조회 하지 않은상태
		geolocation_position: {
			lat: 37.5230525,
			lng: 126.9247649,
		},
		geolocation_position_all: null,
		geolocation_options: {
			// 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
			// 그러나 이 기능은 배터리 지속 시간에 영향을 미친다.
			enableHighAccuracy: false, // 대략적인 값이라도 상관 없음: 기본값

			// 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자,
			// 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
			maximumAge: 30000, // 5분이 지나기 전까지는 수정되지 않아도 됨

			// 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
			// 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
			timeout: 15000, // 15초 이상 기다리지 않는다.
		},
		geolocation_watch_id: null,
		geolocation_location_status: false,
	}),
	watch: {},
	computed: {},
	created() {},
	mounted() {},
	beforeDestroy() {
		this.geolocation_status = 1
		if (this.geolocation_watch_id !== null) this.geolocation_cancel()
	},
	methods: {
		async geolocation_once() {
			// 간단히 한번만 내 위치 확인
			if (navigator.geolocation) {
				await navigator.geolocation.getCurrentPosition(
					this.geolocation_get,
					this.geolocation_fail,
					this.geolocation_options,
				)
				// 위치 조회 후 상태값 리셋
				this.geolocation_status = 100
			} else {
				this.$toastr.error('이 브라우저에서는 Geolocation이 지원되지 않습니다.', 'Geolocation 오류', { timeOut: 2500 })
			}
		},
		geolocation_get(position) {
			console.log(position)
			this.geolocation_position_all = position
			this.geolocation_position = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			}
			this.geolocation_status = 0
		},
		geolocation_fail(error) {
			// 오류 객체에는 수치 코드와 텍스트 메시지가 존재한다.
			console.log(error)
			let text
			let status

			switch (error.code) {
				case 1:
					text = '사용자가 위치 정보를 공유 권한을 제공하지 않음'
					status = error.code
					break
				case 2:
					text = '브라우저가 위치를 가져올 수 없음.'
					status = error.code
					break
				case 3:
					text = '타임아웃이 발생됨.'
					status = error.code
					break
			}
			this.geolocation_status = status
			console.error('geolocation_fail', text)
			this.$toastr.error(text, error, { timeOut: 1500 })
		},
		geolocation_cancel() {
			const res = navigator.geolocation.clearWatch(this.geolocation_watch_id)
			this.$toastr.error(`${this.geolocation_watch_id} 연결을 취소요청 하였습니다.`, res, { timeOut: 2500 })
		},
	},
}
