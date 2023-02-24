const Calculater = {
	housewarming: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.code = 4
				x.id = i
			})
			return data
		},
	},
	estimate: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.id = i
			})
			// return data.sort((a, b) => (a.regi_date > b.regi_date ? -1 : 1))
			return data.reverse()
		},
	},
	ask: {
		parser(res) {
			let data = [...res]
			data.forEach((x, i) => {
				x.id = i
			})
			return data
		},
	},
}

export default Calculater
