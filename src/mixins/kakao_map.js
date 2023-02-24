import { mapGetters } from 'vuex'

export default {
	data: () => ({
		kakao_map_status: false,
		kakao_map_position: {
			lat: 37.5230525,
			lng: 126.9247649,
		},
		kakao_init_level: 6,

		kakao_map: null,
		kakao_map_ps: null,
		kakao_map_search_model: '',
		kakao_map_search_address_model: '',

		kakao_map_center_value: 0,
		// center
		kakao_map_zoom: null,
		kakao_map_center: {
			lat: null,
			lng: null,
		},

		// update
		kakao_map_update: 0,

		// search
		kakao_map_search_places_lanlng_result: null,

		// list
		kakao_map_lists: [],

		// marker
		kakao_map_markers: [],
		kakao_map_my_location_marker: null,

		// custom_overlay
		kakao_map_custom_overlay: [],

		// infoWindow
		kakao_map_infoWindow: null,

		// geocoder
		kakao_map_geocoder: null,

		// page
		kakao_map_page: null,
		kakao_map_pagination: null,
		kakao_map_page_total: null,
	}),
	watch: {
		kakao_map_page(val) {
			this.kakao_map_pagination.gotoPage(val)
		},
	},
	computed: {
		...mapGetters(['APP_GET_APP_STATE']),
	},
	created() {},
	mounted() {
		this.kakao_map_start()
	},
	destroyed() {
		this.kakao_map_status = false
	},
	methods: {
		kakao_map_start() {
			const kakaoKey = process.env.VUE_APP_KAKAO_KEY

			const script = document.createElement('script')
			/* global kakao */
			script.onload = () => kakao.maps.load(this.kakao_map_init)
			script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${kakaoKey}&libraries=services`
			// script.src =`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${kakaoKey}&libraries=clusterer`
			document.head.appendChild(script)
		},
		kakao_map_init() {
			console.log('kakao_map_init')
			const container = document.getElementById('kakao_map')
			const options = {
				center: new kakao.maps.LatLng(this.kakao_map_position.lat, this.kakao_map_position.lng),
				level: this.kakao_init_level,
			}

			// 지도를 생성합니다
			this.kakao_map = new kakao.maps.Map(container, options)

			this.kakao_map_status = true

			// 장소 검색 객체를 생성합니다
			// kakao_map_start시 script.src url 맨 뒤에 &libraries=services 넣어주어야 동작
			this.kakao_map_ps = new kakao.maps.services.Places()

			// 중심좌표 이벤트 등록
			this.kakao_map_center_position()

			// 키워드로 장소를 검색합니다
			// this.kakao_map_search_places()
		},

		kakao_map_center_position() {
			// 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
			kakao.maps.event.addListener(this.kakao_map, 'center_changed', () => {
				// 지도의  레벨을 얻어옵니다
				this.kakao_map_zoom = this.kakao_map.getLevel()

				// 지도의 중심좌표를 얻어옵니다
				this.kakao_map_center.lat = this.kakao_map.getCenter().getLat() // 위도
				this.kakao_map_center.lng = this.kakao_map.getCenter().getLng() // 경도
			})
			// 사용자 지도 위치 이동 시점확인 // dragend
			kakao.maps.event.addListener(this.kakao_map, 'dragend', () => {
				console.log('dragend')
				// 지도의  레벨을 얻어옵니다
				this.kakao_map_zoom = this.kakao_map.getLevel()

				// 지도의 중심좌표를 얻어옵니다
				this.kakao_map_center.lat = this.kakao_map.getCenter().getLat() // 위도
				this.kakao_map_center.lng = this.kakao_map.getCenter().getLng() // 경도

				this.kakao_map_center_value += 1
			})

			// // 사용자 지도 스크롤 //zoom_changed
			// kakao.maps.event.addListener(this.kakao_map, 'zoom_changed',() => {
			//     console.log('zoom_changed')
			//     // 지도의  레벨을 얻어옵니다
			//     this.kakao_map_change_zoom = this.kakao_map.getLevel()
			//
			//     // 지도의 중심좌표를 얻어옵니다
			//     this.kakao_map_change_center.lat = this.kakao_map.getCenter().getLat() // 위도
			//     this.kakao_map_change_center.lng = this.kakao_map.getCenter().getLng() // 경도
			//
			//     this.kakao_map_center_value += 1
			// });
		},

		// 키워드로 장소를 검색
		kakao_map_search_places() {
			const keyword = this.kakao_map_search_model

			// 키워드가 없는경우
			if (!keyword.replace(/^\s+|\s+$/g, '')) {
				// alert('찾고자 하는 지역명을 입력해주세요!')
				return false
			}

			// 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
			this.kakao_map_ps.keywordSearch(keyword, this.kakao_map_places_searchCB)
		},
		kakao_map_places_searchCB(data, status, pagination) {
			// console.log(data, status, pagination)
			console.log('kakao_place_search_start')
			const items = {
				data: data,
				status: status,
				pagination: pagination,
			}

			if (status === kakao.maps.services.Status.OK) {
				// pagination 등록
				this.kakao_map_pagination = pagination
				this.kakao_map_page = pagination.current
				this.kakao_map_page_total = pagination.last

				// 정상적으로 검색이 완료됐으면
				// 검색 목록과 마커를 표출합니다
				// this.kakao_map_display_places(data)

				// center 중심 좌표로 이동
				this.kakao_map_location_area_center_position(data)

				return data
			} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
				alert('검색 결과가 존재하지 않습니다.')
				return
			} else if (status === kakao.maps.services.Status.ERROR) {
				alert('검색 결과 중 오류가 발생했습니다.')
				return items
			}
		},
		kakao_map_location_area_center_position(places) {
			const bounds = new kakao.maps.LatLngBounds()

			// 검색 결과 목록에 추가된 항목들을 제거합니다
			this.kakao_map_lists = []

			// 지도에 표시되고 요소들을 제거합니다
			this.kakao_map_lists = []

			for (let i = 0; i < places.length; i++) {
				// console.log(places[i].y, places[i].x)
				// 마커를 생성하고 지도에 표시합니다
				let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x)

				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// LatLngBounds 객체에 좌표를 추가합니다
				bounds.extend(placePosition)
			}
			// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
			this.kakao_map.setBounds(bounds)

			// 지도의  레벨을 얻어옵니다
			this.kakao_map_zoom = this.kakao_map.getLevel()

			// 지도의 중심좌표를 얻어옵니다
			this.kakao_map_center.lat = this.kakao_map.getCenter().getLat() // 위도
			this.kakao_map_center.lng = this.kakao_map.getCenter().getLng() // 경도

			// 지도 데이터 update
			this.kakao_map_update += 1
		},
		kakao_map_display_places(places) {
			const bounds = new kakao.maps.LatLngBounds()

			// 검색 결과 목록에 추가된 항목들을 제거합니다
			this.kakao_map_lists = []

			// 지도에 표시되고 요소들을 제거합니다
			if (this.kakao_map_markers !== []) this.kakao_map_remove_markers()
			if (this.kakao_map_custom_overlay !== []) this.kakao_map_remove_custom_overlay()
			this.kakao_map_lists = []

			for (let i = 0; i < places.length; i++) {
				// console.log(places[i].y, places[i].x)
				// 마커를 생성하고 지도에 표시합니다
				let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x)
				this.kakao_map_create_marker(placePosition, places[i])

				this.kakao_map_create_lists(i, places[i]) //

				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// LatLngBounds 객체에 좌표를 추가합니다
				bounds.extend(placePosition)
			}
			// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
			this.kakao_map.setBounds(bounds)
		},

		// 검색 리스트
		kakao_map_create_lists(index, places) {
			// console.log('kakao_map_create_lists', index, places)
			this.kakao_map_lists.push(places)
			return this.kakao_map_lists
		},

		// markers
		kakao_map_create_marker(position, places) {
			console.log('kakao_map_create_marker', position, places)

			const imageSrc = require('@/assets/logo.svg')
			const imageSize = new kakao.maps.Size(40, 40) // 마커 이미지의 크기
			const imgOptions = {
				// spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
				// spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
				offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
			}
			let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)

			this.kakao_map_my_location_marker = new kakao.maps.Marker({
				position: position, // 마커의 위치
				image: markerImage,
			})
			console.log('this.kakao_map_my_location_marker', this.kakao_map_my_location_marker)

			this.kakao_map_my_location_marker.setMap(this.kakao_map) // 지도 위에 마커를 표출합니다

			// custom overlay 생성
			this.kakao_map_create_custom_overlay(this.kakao_map_my_location_marker, places)
		},
		kakao_map_create_my_location_marker(position, places) {
			console.log('kakao_map_create_marker', position, places)
			if (this.kakao_map_my_location_marker) this.kakao_map_my_location_marker.setMap(null)

			const imageSrc = require('@/assets/logo.svg')
			const imageSize = new kakao.maps.Size(40, 40) // 마커 이미지의 크기
			const imgOptions = {
				// spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
				// spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
				offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
			}
			let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions)

			this.kakao_map_my_location_marker = new kakao.maps.Marker({
				position: position, // 마커의 위치
				image: markerImage,
			})
			console.log('this.kakao_map_my_location_marker', this.kakao_map_my_location_marker)
			console.log('this.kakao_map', this.kakao_map)

			this.kakao_map_my_location_marker.setMap(this.kakao_map) // 지도 위에 마커를 표출합니다

			// custom overlay 생성
			this.kakao_map_create_location_custom_overlay(this.kakao_map_my_location_marker, places)
		},
		kakao_map_create_markers(position, places) {
			// 현재 지도에 표시된 마커 지우기
			if (this.kakao_map_markers.length) this.kakao_map_remove_markers()

			// 마커위치 생성
			const positions = position.map(item => new kakao.maps.LatLng(item.lat, item.lng))
			console.log('positions', positions, places)

			if (positions.length) {
				this.kakao_map_markers = positions.map(
					position =>
						new kakao.maps.Marker({
							map: this.kakao_map,
							position,
						}),
				)

				this.kakao_map_remove_custom_overlay()
				this.kakao_map_markers.forEach((marker, i) => {
					if (places[i] === undefined) {
						places = {
							place_name: '사용자 지정',
							place_url: `https://map.kakao.com/link/to/${position.lat},${position.lng}`,
						}
					}
					// custom_overlay 생성
					this.kakao_map_create_custom_overlay(marker, places[i])
				})
				// // 주변 마커의 위치의 중심 구하기
				// const bounds = positions.reduce(
				//     (bounds, latlng) => bounds.extend(latlng),
				//     new kakao.maps.LatLngBounds()
				// )
				// this.kakao_map.setBounds(bounds)
			}
		},
		kakao_map_remove_markers() {
			for (let i of this.kakao_map_markers) i.setMap(null)
			this.kakao_map_markers = []
		},

		// custom_overlay
		// 사용자 정보창 보여주기
		kakao_map_create_custom_overlay(marker, places) {
			const placeURL =
				places.place_url === undefined
					? `https://map.kakao.com/link/map/${places.place_name},${places.lat},${places.lng}`
					: places.place_url

			// custom Overlay
			let content = ''

			if (this.$route.path.includes('inquire')) {
				// 신청서 작성페이지
				content = `<div class="customoverlay">
					<a onclick="window.interiorListOne('${places.place_corporate_no}')">
						<span class="title">${places.place_name}</span>
					</a>
				</div>`
			} else if (placeURL.includes('http') || this.APP_GET_APP_STATE === 'web') {
				// kakao map page push
				content = `<div class="customoverlay">
					<a href="${placeURL}" target="_blank">
						<span class="title">${places.place_name}</span>
					</a>
				</div>`
			} else {
				// 인테리어점 찾기
				content = `<div class="customoverlay">
					<a onclick="window.interiorPushLink('${placeURL}')">
						<span class="title">${places.place_name}</span>
					</a>
				</div>`
			}

			// const pos = new kakao.maps.LatLng(position)
			// console.log('places', places)

			let customOverlay = new kakao.maps.CustomOverlay({
				position: marker.getPosition(),
				content: content,
				xAnchor: 0.48,
				yAnchor: -1,
			})

			// event 등록
			// new kakao.maps.event.addListener(marker, 'click',() => {
			//     // 새창으로 해당 place_url로 보내기
			//     const tmpWindow = window.open('about:blank')
			//     tmpWindow.location = places.place_url
			//     customOverlay.setMap(null)
			// })
			//
			// new kakao.maps.event.addListener(marker, 'mouseover',() => {
			//     customOverlay.setMap(this.kakao_map)
			// })
			//
			// new kakao.maps.event.addListener(marker, 'mouseout', () => {
			//     customOverlay.setMap(null)
			// })

			console.log('places', places)

			const location = {
				lat: places.lat,
				lng: places.lng,
			}

			new kakao.maps.event.addListener(marker, 'click', () => {
				// 새창으로 해당 place_url로 보내기
				this.kakao_map_pan_to(location)
			})

			// customOverlay생성
			customOverlay.setMap(this.kakao_map)

			this.kakao_map_custom_overlay.push(customOverlay)
		},
		kakao_map_create_location_custom_overlay(marker, places) {
			// 기존 overlay제거
			if (this.kakao_map_custom_overlay.length) this.kakao_map_remove_custom_overlay()

			// custom Overlay
			const content = `<div class="customoverlay">
                  <a>
                    <span class="title">${places.place_name}</span>
                  </a>
            </div>`

			// const pos = new kakao.maps.LatLng(position)
			// console.log('places', places)

			let customOverlay = new kakao.maps.CustomOverlay({
				position: marker.getPosition(),
				content: content,
				xAnchor: 0.48,
				yAnchor: 0.5,
			})

			// event 등록
			new kakao.maps.event.addListener(marker, 'mouseover', () => {
				customOverlay.setMap(this.kakao_map)
			})

			new kakao.maps.event.addListener(marker, 'mouseout', () => {
				customOverlay.setMap(null)
			})

			console.log('places', places)

			const location = {
				lat: places.lat,
				lng: places.lng,
			}

			new kakao.maps.event.addListener(marker, 'click', () => {
				// 새창으로 해당 place_url로 보내기
				this.kakao_map_pan_to(location)
				customOverlay.setMap(null)
			})

			// customOverlay생성
			customOverlay.setMap(this.kakao_map)

			this.kakao_map_custom_overlay.push(customOverlay)
		},
		kakao_map_remove_custom_overlay() {
			for (let i of this.kakao_map_custom_overlay) i.setMap(null)
			this.kakao_map_custom_overlay = []
		},

		// 주소값으로 loglng값 가져오기
		kakao_map_search_places_lanlng(order, success) {
			this.kakao_map_geocoder = new kakao.maps.services.Geocoder()
			// 주소로 좌표를 검색합니다
			this.kakao_map_geocoder.addressSearch(this.kakao_map_search_address_model, (result, status) => {
				console.log('searchPlacesLanLng', result)
				if (order === 'search') {
					success(result)
				} else {
					// 정상적으로 검색이 완료됐으면
					if (status === kakao.maps.services.Status.OK) {
						this.kakao_map_ps.keywordSearch(this.kakao_map_search_address_model, this.kakao_map_places_searchCB)
					} else {
						this.$toastr.info('검색결과가 없습니다.', '검색결과 없음', { timeOut: 1000 })
					}
				}
			})
		},

		// 정보창 보여주기
		kakao_map_create_infoWindow(location, title) {
			console.log('location', location, title)

			// 기존 정보창 삭제
			const iwContent = '<div style="padding:5px; color:#414141;">' + title + '</div>' // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
			const iwPosition = new kakao.maps.LatLng(location.lat, location.lng) // 인포윈도우 표시 위치입니다
			const iwRemoveable = true // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

			this.kakao_map_infoWindow = new kakao.maps.InfoWindow({
				map: this.kakao_map, // 인포윈도우가 표시될 지도
				position: iwPosition,
				content: iwContent,
				removable: iwRemoveable,
			})

			if (this.kakao_map_infoWindow && this.kakao_map_infoWindow.getMap()) {
				//이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
				this.kakao_map.setCenter(this.kakao_map_infoWindow.getPosition())
				return
			}

			this.kakao_map.setCenter(iwPosition)
		},

		// map 이동
		// 중심점 이동시키기
		kakao_map_set_center(location) {
			// 이동할 위도 경도 위치를 생성합니다
			const moveLatLon = new kakao.maps.LatLng(location.lat, location.lng)

			// 지도 중심을 이동 시킵니다
			this.kakao_map.setCenter(moveLatLon)
		},
		kakao_map_pan_to(location) {
			// 이동할 위도 경도 위치를 생성합니다
			// const moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
			const moveLatLon = new kakao.maps.LatLng(location.lat, location.lng)

			// 지도 중심을 부드럽게 이동시킵니다
			// 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
			this.kakao_map.panTo(moveLatLon)
		},

		// 맵 사이즈 조정
		kakao_map_change_size(size) {
			const container = document.getElementById('kakao_map')
			container.style.width = `${size}px`
			container.style.height = `${size}px`
			this.kakao_map.relayout()
		},

		// 맵 코드로 전환 return
		kakao_map_code_transform(code) {
			return new kakao.maps.LatLng(code.lat, code.lng)
		},

		// zoom level 검색거리 산정
		kakao_map_zoom_distance(val) {
			let distance = 500
			switch (val) {
				case 1:
					distance = 20
					break
				case 2:
					distance = 30
					break
				case 3:
					distance = 50
					break
				case 4:
					distance = 100
					break
				case 5:
					distance = 250
					break
				case 6:
					distance = 500
					break
				case 7:
					distance = 1000
					break
				case 8:
					distance = 2000
					break
				case 9:
					distance = 4000
					break
				case 10:
					distance = 8000
					break
				case 11:
					distance = 16000
					break
				case 12:
					distance = 32000
					break
				case 13:
					distance = 64000
					break
				case 14:
					distance = 128000
					break
			}

			return distance * 6
		},
	},
}
