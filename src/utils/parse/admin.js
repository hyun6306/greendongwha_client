import * as adminMixins from '@/mixins/admin'
import moment from 'moment'

function moment_filter(date) {
	return moment(date).format('YYYY-MM-DD')
}

const Calculater = {
	basic_array: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.id = i
			})
			return data
		},
	},
	// 메인 관리
	main: {
		// 메인 베너
		banner: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.showDate = [moment_filter(x.start_date), moment_filter(x.end_date)]
					x.thumbnail = x.thumimage_url
					x.image = x.mainimage_url
					x.link = x.link_url
					x.regi_userId = x.regi_userid
				})
				return data.sort((a, b) => (a.priority > b.priority ? 1 : -1))
			},
		},
		// 베스트제품
		bestProduct: {
			best: {
				parser(res) {
					let data = [...res]
					data.forEach((x, i) => {
						x.id = i
						x.product_name = `${x.subject_name} > ${x.kind_name} > ${x.brand_name} > ${x.goods_name} > ${x.pattern_name}`
					})
					return data
				},
			},
			hit: {
				parser(res) {
					let data = [...res]
					data.forEach((x, i) => {
						x.id = i
					})
					return data
				},
			},
		},
		// 추천 제품
		recommendProduct: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i
					x.show = x.recommend_priority === 1 ? '노출' : ''
				})
				return data.sort((a, b) => (a.priority > b.priority ? 1 : -1))
			},
		},
		// 추천 검색어
		recommendSearch: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i
					x.priority = x.listorder
					x.link = x.link_url
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		// 팝업
		popup: {
			parser(res) {
				let data = [...res]
				const concatPeriod = (start, end) => {
					return `${moment_filter(start)} ~ ${moment_filter(end)}`
				}
				data.forEach(x => {
					x.id = x.popup_id
					x['data-period'] = concatPeriod(x.start_date, x.end_date)
					x.showDate = [moment(x.start_date).format('YYYY-MM-DD'), moment(x.end_date).format('YYYY-MM-DD')]
					x.popup_image = x.popup_image ?? null
				})
				return data
			},
		},
	},
	// 제품 관리
	product: {
		category_data: {
			parser(query, res) {
				let data = [...res]
				switch (query.substring(0, 1)) {
					// 품목
					case '1':
						data.forEach(x => {
							x.category_id = 'subject'
							x.title = x.subject_name
							x.text = `${x.use_kind === '1' ? '주거용' : '상업용'} ${x.subject_name}`
							x.partCode = x.subject_code
						})
						data = data.sort((a, b) => (a.priority > b.priority ? 1 : -1))
						break
					// 종류
					case '2':
						data.forEach(x => {
							x.category_id = 'kind'
							x.text = x.kind_name
							x.typeCode = x.kind_code
						})
						break
					// 브랜드
					case '3':
						data.forEach(x => {
							x.category_id = 'brand'
							x.text = x.brand_name
							x.brandCode = x.brand_code
						})
						data.sort((a, b) => (a.priority > b.priority ? 1 : -1))
						break
					// 제품
					case '4':
						data.forEach(x => {
							x.category_id = 'goods'
							x.text = x.goods_name
							x.productCode = x.goods_code
						})
						break
					// 패턴
					case '5':
						data.forEach(x => {
							x.category_id = 'pattern'
							x.text = x.pattern_name
							x.patternCode = x.pattern_code
						})
						break
				}
				return data
			},
			product_parser(method, res) {
				let data = [...res]
				switch (method) {
					// 특장점
					case 'CC_101_001':
						data.forEach(x => {
							x.id = x.detail_id
							x.thumbnail = x.thumbnail_url
							x.image = x.image_url
						})
						break
					// 구조
					case 'CC_101_002':
						data.forEach(x => {
							x.id = x.detail_id
							x.thumbnail = x.thumbnail_url
							x.image = x.image_url
						})
						break
					// 그 외
					default:
						data.forEach(x => {
							x.id = x.detail_id
							x.thumbnail = x.thumbnail_url
						})
						break
				}
				return data
			},
		},
		public_code_data: {
			parser(res) {
				let data = [...res]
				// const kindItems = store.getters.ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS
				data.forEach((x, i) => {
					x.id = i + 1
					x.text = x.code_name
					// x.code_kind_name = kindItems.find(item => item.value === x.code_kind).text
				})

				// 101 수정되지 않는 코드 filter
				const filter = data.filter(item => item.group_code.substring(0, 1) !== '1')
				return filter
			},
			group_parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i + 1
					x.text = x.group_name
				})
				// 101 수정되지 않는 코드 filter
				const filter = data.filter(item => item.group_code.substring(0, 1) !== '1')
				return filter
			},
		},
		tag_data: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.tag_id !== undefined ? x.tag_id : i + 1
				})
				return data
			},
		},
		master_data: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.number = i + 1
					x.id = x.product_id
					x.release_date = x.release_date !== '' && x.release_date != null ? moment_filter(x.release_date) : null
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
	},
	// 자료 관리
	reference: {
		// 인증서 / 시험성적서
		certification: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.docu_id
					x.docu_kind = x.docu_kind
						? adminMixins.export_admin_certification_divisionItems.find(item => item.value === x.docu_kind)
						: ''
					x.showDate = [moment(x.auth_from).format('YYYY-MM-DD'), moment(x.auth_to).format('YYYY-MM-DD')]
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		// 카탈로그
		catalog: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.catalogue_id
					if (x.catalogue_mapping.length) {
						x.subject_code = x.catalogue_mapping[0].subject_code
						x.subject_name = x.catalogue_mapping[0].subject_name
						x.kind_code = x.catalogue_mapping[0].subject_code
						x.kind_name = x.catalogue_mapping[0].kind_name
					}
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
	},
	// 고객 센터
	custom: {
		special: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.special_id
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		quality: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.guarantee_id
					x.purchase_date = x.purchase_date.replace(/(\d{4})(\d{2})/, `$1년 $2월`)
					x.data_status_quality = x.conf_state
						? adminMixins.export_admin_quality_statusItems.find(item => item.value === x.conf_state)
						: ''
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		as: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i
					x.data_status_as = x.progress_state
						? adminMixins.export_admin_as_statusItems.find(item => item.value === x.progress_state)
						: ''
					x.link = x.file_url
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		notice: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.notice_id
					x.file = x.file_url1
					x.link = x.file_url2
					x.important = x.important_yn
						? adminMixins.export_admin_notice_importantItems.find(item => item.value === x.important_yn).text
						: ''
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		interiorQuestion: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.service_id
				})
				return data.reverse()
			},
		},
	},
	// 전시 관리
	display: {
		// 3D집들이
		house_3D: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.hw_id
					x.status = x.use_yn ? adminMixins.export_admin_booleanItems.find(item => item.value === x.use_yn).text : ''
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		// 전문가 집들이
		house_special: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.exphw_id
					x.status = x.app_state
						? adminMixins.export_admin_quality_statusItems.find(item => item.value === x.app_state).text
						: ''
					x.product_path = `${x.use_kind === '1' ? '주거용' : '상업용'} ${x.subject_name} > ${x.kind_name} > ${
						x.brand_name
					} > ${x.goods_name} > ${x.pattern_name}`
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		// 노하우
		konw_how: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.knowhow_id
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		// 동화 쇼룸
		show_room: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.showroom_id
					x.status = x.showroom_yn
						? adminMixins.export_admin_booleanItems.find(item => item.value === x.showroom_yn).text
						: ''
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		// 노하우
		maru_tv: {
			parser(res) {
				if (!res) return []
				let data = [...res]
				data.forEach(x => {
					x.id = x.knowhow_id
					x.link = x.video_url
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
	},
	// 견적 관리
	estimate: {
		exclusive_area: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.text = `${x.py_area}평 ( ${x.exclusive_area}㎡ )`
				})
				return data
			},
		},
		room_count: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.text = `${x.roomcount} 개`
				})
				return data
			},
		},
		brand: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.text = x.brand_name
				})
				return data
			},
		},
		product: {
			parser(res, checkList) {
				let data = []
				res.forEach((x, i) => {
					const check = checkList.find(item => item.goods_code === x.goods_code)
					if (check && check.use_yn === 'Y') {
						x.text = x.goods_name
						data.push(x)
					}
				})
				return data
			},
		},
		// 견적관리리스트
		estimate_list: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.est_id
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		// 견적상담리스트
		estimate_consult_list: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.consult_id
					x.consult_state = x.consult_state
						? adminMixins.export_admin_estimate_consult_statusItems.find(item => item.value === x.consult_state).text
						: ''
					x.address = `${x.zipcode}) ${x.address1} ${x.address2}`
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
	},
	// 마케팅
	marketing: {
		// 이벤트
		event: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.event_id
					x.event_date = `${moment(x.start_date).format('YYYY-MM-DD')} ~ ${moment(x.end_date).format('YYYY-MM-DD')}`

					if (x.participating_user.length) {
						x.participating_user.forEach(user => {
							user.status = user.win_yn
								? adminMixins.export_admin_event_winStatusItems.find(item => item.value === user.win_yn)
								: ''
							user.data_status_event = user.win_yn
						})
					}
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
	},
	// 회원관리
	user: {
		// 회원관리
		user: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i
					x.status = x.leave_date === null ? '정상' : '탈퇴'
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		// 인테리어 회원관리
		interior: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i
					x.join_state = x.app_state
						? adminMixins.export_admin_user_interior_statusItems.find(item => item.value == x.app_state).text
						: ''
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
		// 스크랩 리스트
		scrap: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.scrap_id
				})
				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
	},
	// 관리자 관리
	admin: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.id = i
			})
			return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
		},
	},
}

export default Calculater
