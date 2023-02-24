import * as adminMixins from '@/mixins/admin'

// 스크랩 subText
function scrap_filter_subText(type) {
	let subText = ''
	switch (type) {
		case 'master':
			subText = '제품'
			break
		case 'housewarming':
			subText = '3D 집들이'
			break
		case 'exphousewarming':
			subText = '전문가 집들이'
			break
		case 'knowhow':
			subText = '노하우'
			break
		case 'event':
			subText = '이벤트'
			break
		case 'corporation':
			subText = '인테리어'
			break
	}
	return subText
}

const Calculater = {
	scrap: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.id = x.scrap_code
				x.image = x.scrap_image_url ? x.scrap_image_url : require('@/assets/img/etc/no_image.jpg')
				x.title = x.scrap_title
				x.subText = scrap_filter_subText(x.scrap_kind)
			})
			return data.reverse()
		},
	},
	estimate: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.code = 0
				x.id = i
				x.status = x.consult_state
					? adminMixins.export_admin_estimate_consult_statusItems.find(item => item.value === x.consult_state)
					: ''
			})
			return data.reverse()
		},
	},
	quality: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.code = 1
				x.id = i
				x.date = x.purchase_date.replace(/(\d{4})(\d{2})/, `$1.$2`)
				x.title = `${x.guarantee_no}`
				x.name = `${x.purchase_date}-${x.goods_name}`
			})
			return data
		},
	},
	as: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				let date = x.regi_date.split(' ')[0].split('-')
				x.code = 2
				x.id = i
				x.date = `${date[0]}.${date[1]}`
			})
			return data
		},
	},
	question: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				let date = x.regi_date.split(' ')[0].split('-')
				x.code = 3
				x.id = i
				x.date = `${date[0]}.${date[1]}`
			})
			return data
		},
	},
}

export default Calculater
