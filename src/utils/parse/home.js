// 만단위로 숫자 삭제
function ten_thousand(item) {
	const filter = item.split('')
	filter.splice(-4)
	return Number(filter.join('')).toLocaleString('ko-KR')
}

// 집들이 공통태그 취합
function public_code_mix(item) {
	let text = ''
	if (item.familytype_name?.length) text = text + item.familytype_name
	if (item.spacious_name?.length) text = text + ' | ' + item.spacious_name
	if (item.style_name?.length) text = text + ' | ' + item.style_name
	if (item.space_name?.length) text = text + ' | ' + item.space_name
	if (item.form_name?.length) text = text + ' | ' + item.form_name
	return text
}

const Calculater = {
	main: {
		banner: {
			parser(res) {
				let data = []
				res.forEach((x, i) => {
					if (x.mainimage_url !== null) {
						x.src = x.mainimage_url
						data.push(x)
					}
				})
				return data
			},
		},
		simpleEstimate: {
			parser(res) {
				let data = { ...res }

				// 만단위로 숫자 삭제
				data.est_cost_min = ten_thousand(res.est_cost_min)
				data.est_cost = ten_thousand(res.est_cost)
				data.est_cost_max = ten_thousand(res.est_cost_max)
				data.removal_cost = ten_thousand(res.removal_cost)

				return data
			},
		},
		housewarming: {
			house3d: {
				parser(res) {
					let data = [...res]
					data.forEach((x, i) => {
						x.id = x.hw_id
						x.image = x.image_url ? x.image_url : require('@/assets/img/etc/no_image.jpg')
						x.scrap_code = 'housewarming'
						x.tags = x.tags.map(x => x.tag_value)
					})
					return data
				},
			},
			special: {
				parser(res) {
					let data = [...res]
					data.forEach((x, i) => {
						x.id = x.exphw_id
						x.image = x.image_url ? x.image_url : require('@/assets/img/etc/no_image.jpg')
						x.scrap_code = 'exphousewarming'
						x.tags = x.tags.map(x => x.tag_value)
					})
					return data
				},
			},
		},
		bestProduct: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i
					x.image = x.rep_image_url ? x.rep_image_url : require('@/assets/img/etc/no_image.jpg')
				})
				return data
			},
		},
		searchTags: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i
				})
				return data
			},
		},
		popularProduct: {
			parser(res) {
				let result = []
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.product_id
					x.image =
						x.rep_image_url == null || x.rep_image_url == undefined || x.rep_image_url == ''
							? require('@/assets/img/etc/no_image.jpg')
							: x.rep_image_url
					// flag
					x.flagItems = []
					// if( x.new_YN === 'Y' ) x.flagItems.push('신제품')
					if (x.popItem_YN === 'Y') x.flagItems.push('BEST')
					// title
					x.title = `${x.brand_name} ${x.goods_name} ${x.pattern_name}`
					x.tags = x.tags.map(x => x.tag_value)
					x.scrap_code = 'master'
				})

				// 품목별로 filter item
				const subject = data.map(x => x.subject_code)
				const set = new Set(subject)
				const setArr = [...set]
				// 바닥재 "SC_00001"
				result.push([
					...res
						.filter(item => item.subject_code === setArr[0])
						.sort((a, b) => (Number(a.hits) > Number(b.hits) ? -1 : 1)),
				])
				// 벽재 "SC_00003"
				result.push([
					...res
						.filter(item => item.subject_code === setArr[1])
						.sort((a, b) => (Number(a.hits) > Number(b.hits) ? -1 : 1)),
				])

				return result
			},
		},
		recommendProduct: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.product_id
					x.image =
						x.rep_image_url == null || x.rep_image_url == undefined || x.rep_image_url == ''
							? require('@/assets/img/etc/no_image.jpg')
							: x.rep_image_url
					x.name = `${x.brand_name} ${x.goods_name}`
				})
				return data.sort((a, b) => (a.recommend_priority < b.recommend_priority ? -1 : 1))
			},
		},
	},
	housewarming: {
		house3d: {
			parser(res) {
				let data = [...res]

				data.forEach((x, i) => {
					x.id = x.hw_id
					x.image = x.image_url ? x.image_url : require('@/assets/img/etc/no_image.jpg')
					x.tags = x.tags.map(x => x.tag_value)
					x.kind_name = '3D 집들이'
					x.subTitle = public_code_mix(x)
				})
				return data
			},
			pop(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.hw_id
					x.link = '3d'
					x.image = x.image_url ? x.image_url : require('@/assets/img/etc/no_image.jpg')
					x.features = '3D 집들이'
					x.path = `${x.spacious_name} ${x.style_name.length ? '| ' + x.style_name : ''} ${
						x.form_name.length ? '| ' + x.form_name : ''
					}`
				})
				return data
			},
		},
		special: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.exphw_id
					x.image = x.image_url ? x.image_url : require('@/assets/img/etc/no_image.jpg')
					x.tags = x.tags.map(x => x.tag_value)
					x.kind_name = '전문가 집들이'
					x.subTitle = public_code_mix(x)
				})
				return data
			},
			pop(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.exphw_id
					x.link = 'special'
					x.image = x.image_url ? x.image_url : require('@/assets/img/etc/no_image.jpg')
					x.features = '전문가 집들이'
					x.path = `${x.addr_cut} ${x.spacious_name.length ? '| ' + x.spacious_name : ''}`
					x.name = x.business_name
				})
				return data
			},
		},
	},
	interior: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.id = i
				x.kakao_map = {
					lat: x.latitude,
					lng: x.longitude,
				}
				if (x.buildtype) {
					x.buildItems = x.buildtype.map(x => x.code_name)
					x.filter_items = x.buildtype.map(x => x.code)
				}
				x.is_img = x.company_picurl?.length
				x.company_picurl = x.company_picurl?.length
					? x.company_picurl
					: require('@/assets/img/home/interior/img_store_empty.png')
			})
			return data
		},
		simple_price_parser(res) {
			let data = { ...res }

			// 만단위로 숫자 삭제
			data.est_cost_min = ten_thousand(res.est_cost_min)
			data.est_cost = ten_thousand(res.est_cost)
			data.est_cost_max = ten_thousand(res.est_cost_max)
			data.removal_cost = ten_thousand(res.removal_cost)

			return data
		},
		showRoom: {
			list(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i
					x.address = `${x.showroom_addr1} ${x.showroom_addr2}`
				})
				return data
			},
		},
	},
	product: {
		total_parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.id = x.con_id
				x.image =
					x.img_url == null || x.img_url == undefined || x.img_url == ''
						? require('@/assets/img/etc/no_image.jpg')
						: x.img_url
				// flag
				x.flagItems = []
				// if( x.new_YN === 'Y' ) x.flagItems.push('신제품')
				if (x.popItem_YN === 'Y') x.flagItems.push('BEST')
				// title
				x.kind_name = x.con_line1
				x.title = x.con_line2
				x.subTitle = x.con_line3
				x.tags = x.tags.map(x => x.tag_value)
			})

			return data
		},
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				// x.id = i+1
				x.id = x.product_id
				x.image =
					x.rep_image_url == null || x.rep_image_url == undefined || x.rep_image_url == ''
						? require('@/assets/img/etc/no_image.jpg')
						: x.rep_image_url
				// flag
				x.flagItems = []
				// if( x.new_YN === 'Y' ) x.flagItems.push('신제품')
				if (x.popItem_YN === 'Y') x.flagItems.push('BEST')
				// title
				x.title = `${x.brand_name} ${x.goods_name} ${x.pattern_name}`
				x.tags = x.tags.map(x => x.tag_value)
				// x.text  = `${x.subject_name} > ${x.kind_name} > ${x.brand_name}`

				// x.code_kind_name = kindItems.find(item => item.value === x.code_kind).text
			})
			const sortData = data.sort((a, b) => (a.release_date < b.release_date ? 1 : -1))
			console.log('sortData', sortData)

			return data
		},
		detail_parser(res) {
			let data = JSON.parse(JSON.stringify(res))

			// flagItems
			data.flagItems = []
			if (data.popitem_yn === 'Y') data.flagItems.push('인기제품')
			if (data.new_yn === 'Y') data.flagItems.push('신제품')
			// data.tags = data.tags.map(x => x.tag_value)

			return data
		},
		popular_parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.id = x.con_id
				x.image =
					x.img_url == null || x.img_url == undefined || x.img_url == ''
						? require('@/assets/img/etc/no_image.jpg')
						: x.img_url
				// flag
				x.flagItems = []
				// if( x.new_YN === 'Y' ) x.flagItems.push('신제품')
				if (x.popItem_YN === 'Y') x.flagItems.push('BEST')
				// title
				x.kind_name = x.con_line1
				x.title = x.con_line2
				x.subTitle = x.con_line3
				x.tags = x.tags.map(x => x.tag_value)
			})
			const sortData = data.sort((a, b) => (Number(a.hits) < Number(b.hits) ? 1 : -1))

			// // 종류별로 filter item
			// let result = []
			//
			// const subject  = sortData.map(x => x.con_gubun)
			// const set = new Set(subject)
			// const setArr = [...set]
			//
			// setArr.forEach(element =>{
			//     result.push([...res.filter(item => item.con_gubun === element)])
			// })

			return sortData
		},
	},
	community: {
		knowhow: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.knowhow_id
					x.image =
						x.image_url == null || x.image_url == undefined || x.image_url === ''
							? require('@/assets/img/etc/no_image.jpg')
							: x.image_url
					x.subTitle = x.code_name
					x.date = `${x.regi_date.split('-')[0]}년 ${x.regi_date.split('-')[1]}월 ${x.regi_date
						.split('-')[2]
						.substring(0, 2)}일`
					x.kind_name = '노하우'
				})
				const sortData = data.sort((a, b) => (a.regi_date < b.regi_date ? 1 : -1))
				return sortData
			},
			pop(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.knowhow_id
					x.image = x.image_url ? x.image_url : require('@/assets/img/etc/no_image.jpg')
					x.subTitle = x.name
					x.path = x.name
				})
				const sortData = data.sort((a, b) => (a.regi_date < b.regi_date ? 1 : -1))
				return sortData
			},
		},
		event: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.event_id
					x.state = x.current_status_name
					x.title = x.event_title
					x.image = x.image_url ? x.image_url : require('@/assets/img/etc/no_image.jpg')
					x.date = `기간: ${x.start_date} ~ ${x.end_date}`
					x.result = `당첨자발표: ${x.result_date}`
				})
				const sortData = data.sort((a, b) => (a.result_date < b.result_date ? 1 : -1))
				console.log('sortData', sortData)

				return sortData
			},
		},
	},
	custom: {
		notice: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.notice_id
				})

				// 중요
				const importantItems = data
					.filter(item => item.important_yn === 'Y')
					.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
				// 일반
				const nomalItems = data
					.filter(item => item.important_yn !== 'Y')
					.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))

				return [...importantItems, ...nomalItems]
			},
		},
		interiorNotice: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = x.notice_id
				})

				return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			},
		},
	},
}

export default Calculater
