const Calculater = {
	reference: {
		catalog: {
			parser(res) {
				let data = [...res]
				data.forEach((x, i) => {
					x.id = i
					x.subject_code = x.catalogue_mapping.length ? x.catalogue_mapping[0].subject_code : null
					x.subject_name = x.catalogue_mapping.length ? x.catalogue_mapping[0].subject_name : null
				})
				return data
			},
		},
	},
}

export default Calculater
