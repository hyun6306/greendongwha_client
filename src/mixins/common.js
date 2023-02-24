import moment from '@/mixins/moment'
import * as Xlsx from 'xlsx'
import { mapGetters } from 'vuex'

export default {
	mixins: [moment],
	data: () => ({
		common_basic_menus: [
			{
				title: '집들이',
				subMenu: [
					{
						title: '3D 집들이',
						to: '/housewarming/3d',
					},
					{
						title: '전문가 집들이',
						to: '/housewarming/specialist',
					},
				],
			},
			{
				title: '제품',
				subMenu: [
					{
						title: '제품 찾기',
						to: '/product/search',
					},
					{
						title: '주거용',
						to: '/product/dwelling',
					},
					{
						title: '상업용',
						to: '/product/commercial',
					},
					{
						title: '특판문의',
						to: '/product/special',
					},
					{
						title: '카탈로그',
						to: '/site/catalog',
					},
					{
						title: '인증서/시험성적서',
						to: '/site/certificate',
					},
				],
			},
			{
				title: '인테리어',
				subMenu: [
					{
						title: '견적내기',
						to: '/interior/price',
					},
					{
						title: '동화 쇼룸 찾기',
						to: '/interior/showRoom',
					},
					{
						title: '인테리어점 찾기',
						to: '/interior/store',
					},
				],
			},
			{
				title: '커뮤니티',
				subMenu: [
					{
						title: '커뮤니티 홈',
						to: '/community/home',
					},
					{
						title: '노하우',
						to: '/community/knowHow',
					},
					{
						title: '마루잘알TV',
						to: '/community/maruTv',
					},
					{
						title: '마루스타그램',
						to: '/community/instagram',
					},
					// {
					// 	title: '동화s Pick',
					// 	to: '/community/pick',
					// },
					{
						title: '이벤트',
						to: '/community/event',
					},
				],
			},
		],
		common_monthItems: [
			{ text: '01', value: '01' },
			{ text: '02', value: '02' },
			{ text: '03', value: '03' },
			{ text: '04', value: '04' },
			{ text: '05', value: '05' },
			{ text: '06', value: '06' },
			{ text: '07', value: '07' },
			{ text: '08', value: '08' },
			{ text: '09', value: '09' },
			{ text: '10', value: '10' },
			{ text: '11', value: '11' },
			{ text: '12', value: '12' },
		],
		common_timeItems: [
			'09:00~10:00',
			'10:00~11:00',
			'11:00~12:00',
			'12:00~13:00',
			'01:00~02:00',
			'02:00~03:00',
			'03:00~04:00',
			'04:00~05:00',
			'05:00~06:00',
		],
		common_booleanItems: [
			{ text: 'ON', value: 'Y' },
			{ text: 'OFF', value: 'N' },
		],
		common_receiveItems: [
			{ text: '수신', value: 'Y' },
			{ text: '비수신', value: 'N' },
		],
		common_genderItems: [
			{ text: '남성', value: 'M' },
			{ text: '여성', value: 'F' },
		],
		common_localeItems: [
			{ text: '개인 (010)', value: '010' },
			{ text: '인터넷 (070)', value: '070' },
			{ text: '서울 (02)', value: '02' },
			{ text: '경기 (031)', value: '031' },
			{ text: '인천 (032)', value: '032' },
			{ text: '강원 (033)', value: '033' },
			{ text: '충남 (041)', value: '041' },
			{ text: '대전 (042)', value: '042' },
			{ text: '충북 (043)', value: '043' },
			{ text: '세종 (044)', value: '044' },
			{ text: '부산 (051)', value: '051' },
			{ text: '울산 (052)', value: '052' },
			{ text: '대구 (053)', value: '053' },
			{ text: '경북 (054)', value: '054' },
			{ text: '경남 (055)', value: '055' },
			{ text: '전남 (061)', value: '061' },
			{ text: '광주 (062)', value: '062' },
			{ text: '전북 (063)', value: '063' },
			{ text: '제주 (064)', value: '064' },
		],
		common_social_icon_menu: [
			{
				src: require('@/assets/img/login/icon_naver.png'),
				type: 'naver',
			},
			{
				src: require('@/assets/img/login/icon_google.png'),
				type: 'google',
			},
			{
				src: require('@/assets/img/login/icon_kakao.png'),
				type: 'kakao',
			},
		],
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH', 'APP_GET_APP_WIDTH', 'APP_GET_APP_STATE']),
		common_yearItems() {
			const year = []
			for (let i = 1920; i <= this.moment_now_year; i++) year.push({ text: String(i), value: String(i) })
			return year.sort((a, b) => b.value - a.value)
		},
		common_recentlyRouterPath() {
			// 맨뒤 '/' check
			let fullPath = `${this.$route.path}`
			const checkSlash = fullPath.substr(-1)
			if (checkSlash === '/') fullPath = fullPath.slice(0, -1)
			return fullPath
		},
		common_appState() {
			return this.APP_GET_APP_STATE
		},
		common_title() {
			return this.$route.meta.title
		},
		common_menus() {
			let menus = [...this.common_basic_menus]
			let addMenus

			if (this.AUTH_GET_USER_AUTH === 'AGENCY') {
				addMenus = {
					title: '고객지원',
					subMenu: [
						{
							title: '동화 소식',
							to: '/custom/notice',
						},
						{
							title: '인테리어점 공지',
							to: '/custom/interior/notice',
						},
						{
							title: '인테리어점 문의',
							to: '/custom/interior/ask',
						},
					],
				}
			} else {
				addMenus = {
					title: '고객센터',
					subMenu: [
						{
							title: '품질보증',
							to: '/custom/quality',
						},
						{
							title: 'A/S 신청',
							to: '/custom/as',
						},
						{
							title: '1:1 문의',
							to: '/custom/question',
						},
						{
							title: '브랜드스토리',
							to: '/site/brand',
						},
						{
							title: '동화 소식',
							to: '/custom/notice',
						},
					],
				}
			}

			menus.push(addMenus)
			return menus
		},
	},
	methods: {
		common_pushRouter(val) {
			if (val === this.common_recentlyRouterPath) return
			this.$router.push(val)
		},
		common_onLink(item) {
			// 링크 경로 체크
			// click일때는 값 그대로 반환
			if (item === 'click') return this.$emit('click')
			// '/'값일때는 router.push
			if (item.substring(0, 1) === '/') return this.$router.push(item)
			if (item) {
				// http값이 없는 경우 임으로 붙여줌
				const link = item.includes('http') ? item : `https://${item}`
				window.open(link, '_blank')
			} else {
				this.$emit('click')
			}
		},
		common_newLink(item) {
			let route = this.$router.resolve(item)
			window.open(route.href, '_blank')
		},
		common_onDatePeriodFilter(items) {
			let list = []

			// 베너 노출 기간 조회
			items.map(x => (x.state = this.moment_between_cal(x.showDate[0], x.showDate[1])))

			// 노출 베너
			items.filter(x => x.state).forEach(element => list.push(element))

			// 노출되지 않는 베너
			// state > false filter Data List push
			items.filter(x => !x.state).map(x => (x.priority = null))
			items.filter(x => !x.state).forEach(element => list.push(element))

			return list
		},
		common_dateFilter(item) {
			// data '-'값 제거
			return item.replaceAll('-', '')
		},
		common_nullFilter(item) {
			// null check
			return item !== 'null' ? item : ''
		},
		common_textEnter(val) {
			// text 줄바꿈 인지 기능
			return val != null ? val.split('\n').join('<br />') : null
		},
		common_findItem(item, allItems, value) {
			// value에 해당하는 item배열 찾기
			return allItems.find(x => x[value] === item)
		},
		common_filterItem(item, allItems, code) {
			// item[code]에 해당하는 데이터 filter
			return allItems.filter(x => x[code] === item[code])
		},
		common_tableHeight(height) {
			// 1280 width 이상일 경우 100%로 전환
			// console.log('screen.height',`${screen.height} - ${height}px`)
			// return this.APP_GET_APP_WIDTH > 1280 ? '100%': `${height}px`
			return this.APP_GET_APP_WIDTH > 1280 ? `${screen.height - height}px` : `${height}px`
		},
		common_scrollTop(id) {
			// id에 해당하는 요소 scrollTop = 0 설정
			let scroll
			if (id[0] === '.') {
				scroll = document.querySelectorAll(id)[0]
			} else {
				scroll = document.querySelector(id)
			}
			console.log('scroll', scroll, scroll.scrollTop)
			this.$nextTick(() => {
				scroll.scrollTop = 0
			})
		},
		common_scrollToTop() {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		},
		common_scrollToRight(target) {
			const scroll = document.querySelector(target)
			setTimeout(() => {
				scroll.scrollLeft += 1000
			}, 100)
		},
		common_moveScroll(target, offsetValue = 30) {
			this.$vuetify.goTo(target, {
				duration: 1000,
				offset: offsetValue,
				easing: 'easeInQuad',
			})
		},
		common_openPrivate() {
			// 개인정보 이용동의 페이지 open
			let route = this.$router.resolve({ path: `/site/userInfo` })
			window.open(route.href, '_blank')
		},
		common_publicCodeDataFilter(selectItems, childItems, childCode, filterCode) {
			// 선택한 코드의 code와 매칭되는 item filter
			// childCode 그룹 안에 있는 code 검색

			let filter = []
			if (selectItems === undefined) return filter
			// 선택된 code 추출
			const code = selectItems.map(x => x[filterCode])
			let childCopyItems = JSON.parse(JSON.stringify(childItems))

			// code 반복
			code.forEach(element => {
				childCopyItems.forEach(item => {
					// console.log('common_publicCodeDataFilter', x[childCode], element)
					// childCode안의 데이터 확인
					item[childCode].forEach(childItem => {
						// 같은 filterCode 확인
						// 같은 아이디가 있는 경우 push(X)
						if (childItem === element && filter.some(x => x.id === item.id) === false) {
							return filter.push(item)
						}
					})
				})
			})
			console.log('common_publicCodeDataFilter', filter)
			return filter === [] ? childItems : filter
		},
		// excel export
		common_excel_data_convert(data, header) {
			// data > header text로 변환
			let arr = []
			data.forEach(element => {
				let obj = {}
				for (let i in element) {
					const filter = header.find(x => x.value === i)
					if (filter !== undefined) {
						// console.log(i, filter.text, element[filter.value])
						obj[filter.text] = element[filter.value]
					}
				}
				arr.push(obj)
			})
			return arr
		},
		common_create_excel(data, name) {
			const workBook = Xlsx.utils.book_new()
			const workSheet = Xlsx.utils.json_to_sheet(data)
			Xlsx.utils.book_append_sheet(workBook, workSheet, name)
			Xlsx.writeFile(workBook, `${name}_${this.moment_today}.xlsx`)
		},
		// product filter
		common_product_filter_items(items, selectModel) {
			// title 이름순으로 sort
			const data = items.sort((a, b) => (a.title < b.title ? 1 : -1))

			let filterKey
			switch (selectModel) {
				case '랜덤순':
					data.sort(() => Math.random() - 0.5)
					break
				case '인기순':
					filterKey = 'hits'
					data.map(x => (x.hits = Number(x.hits)))
					break
				case '스크랩':
					filterKey = 'scrap_cnt'
					data.map(x => (x.scrap_cnt = Number(x.scrap_cnt)))
					break
				default:
					filterKey = 'start_date'
					break
			}
			// filterKey순으로 sort
			const sortData = data.sort((a, b) => (a[filterKey] < b[filterKey] ? 1 : -1))
			// console.log( 'filterItems scrap', filterKey, sortData, data.map(x=> x.scrap_cnt) )
			// console.log( 'filterItems hit', filterKey, sortData, data.map(x=> x.hits) )
			// console.log( 'filterItems date', filterKey, sortData, data.map(x=> x.start_date) )
			return sortData
		},
		common_product_filter_code(modelItems, modelCode, productItems, productCode) {
			// console.log('common_product_filter_code',modelItems, modelCode, productItems, productCode)
			const modelArr = modelItems.map(x => x[modelCode]) // modelCode 추출
			return productItems.filter(x => modelArr.includes(x[productCode])) // modelItems안에 modelCode에 속한 productItems 추출
		},
		common_product_filter_tag(modelItems, productItems) {
			const modelArr = modelItems.map(x => x.text) // 추출

			let items = []
			productItems.forEach(x => {
				// 추출된 item check > text를 가지고 있다면 추가
				modelArr.forEach(element => {
					if (x.tags.includes(element)) items.push(x)
				})
			})

			return items
		},
		common_number_filter(num, type) {
			let formatNum = ''

			// 특수문자 제거
			const reg = /[^\w\sㄱ-힣]|[\_]/g
			num = num.replace(reg, '')

			// 11 이상 숫자
			if (num.length > 11) {
				return num
			}
			// 5자리 숫자
			if (num.length === 5) {
				if (type === 'date') {
					formatNum = num.replace(/(\d{4})(\d{1})/, `$1년 0$2월`)
				}
			}
			// 6자리 숫자
			else if (num.length === 6) {
				if (type === 'date') {
					formatNum = num.replace(/(\d{4})(\d{2})/, `$1년 $2월`)
				}
			}
			// 11자리 숫자
			else if (num.length === 11) {
				if (type === 'password') {
					formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3')
				}
				if (type === 'business') {
					formatNum = num.replace(/(\d{3})(\d{2})(\d{6})/, '$1-$2-$3')
				} else {
					formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
				}
			}
			// 8자리 숫자
			else if (num.length === 8) {
				if (type === 'date') {
					formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3')
				} else {
					formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2')
				}
			}
			// 그 외 숫자
			else {
				// 02 or 010 = 가운데 숫자 $2 숫자 늘어나게 replace
				formatNum = num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
			}

			return formatNum
		},
		common_phoneCall(number) {
			location.href = 'tel:' + number
		},
		common_prevItem(items, selectIndex) {
			const item = items.findIndex(item => item.id === selectIndex)
			if (item === 0) return {}
			const prev = item - 1
			return items[prev]
		},
		common_nextItem(items, selectIndex) {
			const next = items.findIndex(item => item.id === selectIndex) + 1
			if (next >= items.length) return {}
			return items[next]
		},
		common_link_pusher(item) {
			console.log('item', item)
			let link = '/'

			if (item.exphw_id) {
				// 전문가 집들이
				link = `/housewarming/specialist/detail/${item.exphw_id}`
			} else if (item.hw_id) {
				// 3D 집들이
				link = `/housewarming/3d/detail/${item.hw_id}`
			} else if (item.knowhow_id) {
				// 노하우
				link = `/community/knowHow/detail/${item.knowhow_id}`
			} else if (item.product_id) {
				// 제품
				link = `/product/detail/${item.product_id}`
			} else if (item.con_id) {
				// 나만의 제품찾기
				switch (item.con_gubun) {
					case 'master':
						link = `/product/detail/${item.con_id}`
						break
					case 'housewarming':
						link = `/housewarming/3d/detail/${item.con_id}`
						break
					case 'exphousewarming':
						link = `/housewarming/specialist/detail/${item.con_id}`
						break
					case 'knowhow':
						link = `/community/knowHow/detail/${item.con_id}`
						break
					case 'corporation':
						link = `/interior/store/detail/${item.con_id}`
						break
					case 'event':
						link = `/community/event/detail/${item.con_id}`
						break
				}
			}

			// console.log('link', link)
			this.$router.push(link).catch(() => {})
		},
		common_searchTag(item) {
			// console.log('item', item)
			this.$router.push(`/product/search?type=tag&id=${item.tag_id}`)
		},
		common_inputDateFilter(item) {
			if (typeof item === 'object' && item != null) {
				const startDate = this.common_dateFilter(item[0]) || null
				const endDate = item[1] === undefined ? startDate : this.common_dateFilter(item[1])

				return { startDate: startDate, endDate: endDate }
			} else {
				return { startDate: null, endDate: null }
			}
		},
		common_allowTextCheck(origin, checkItems) {
			console.log(origin)
			for (let i of checkItems) {
				if (origin[i] === null || !origin[i].trim()?.length) return true
			}
			return false
		},
		common_allowValueCheck(origin, checkItems) {
			for (let i of checkItems) {
				if (origin[i] === null) return true
			}
			return false
		},
		// count만큼 반복 > 해당되는값 찾기
		common_forValueFind(origin, checkName, count) {
			let item = null
			for (let i = 0; i < count; i++) {
				const checkValue = origin[`${checkName}${i + 1}`]
				switch (typeof checkValue) {
					case 'string':
						if (checkValue.length) item = origin[`${checkName}${i + 1}`]
						break
					default:
						if (checkValue) item = origin[`${checkName}${i + 1}`]
						break
				}
			}
			return item
		},
		common_touchScroll(slider) {
			let isDown = false
			let startX
			let scrollLeft

			slider.addEventListener('mousedown', e => {
				isDown = true
				slider.classList.add('active')
				startX = e.pageX - slider.offsetLeft
				scrollLeft = slider.scrollLeft
			})
			slider.addEventListener('mouseleave', () => {
				isDown = false
				slider.classList.remove('active')
			})
			slider.addEventListener('mouseup', () => {
				isDown = false
				slider.classList.remove('active')
			})
			slider.addEventListener('mousemove', e => {
				if (!isDown) return
				e.preventDefault()
				const x = e.pageX - slider.offsetLeft
				const walk = (x - startX) * 3 //scroll-fast
				slider.scrollLeft = scrollLeft - walk
				// console.log(walk);
			})
		},
	},
}
