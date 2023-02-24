<template>
	<v-container class="pa-0 d-flex justify-center">
		<v-col
			cols="12"
			class="pa-0 register_history"
			align="center"
		>
			<v-col
				class="pa-0 px-5 px-md-0"
				cols="12"
				align="center"
			>
				<!-- user -->
				<UserUserQualityRegister v-if="getPart == '1'" />
				<UserUserAsRegister v-if="getPart == '2'" />
				<UserUserQuestionRegister v-if="getPart == '3'" />

				<!-- agency -->
				<UserAgencyHousewarmingRegister v-if="getPart === '4'" />
				<UserAgencyEstimateRegister v-if="getPart === '5'" />
				<UserAgencyAskRegister v-if="getPart === '6'" />
			</v-col>
		</v-col>
	</v-container>
</template>

<script>
export default {
	name: 'UserCreate',
	data: () => ({}),
	computed: {
		getPart() {
			return this.$route.params.part || null
		},
		partName() {
			let name
			switch (this.getPart) {
				case '1':
					name = '품질보증'
					break
				case '2':
					name = 'AS'
					break
				case '3':
					name = '1:1문의'
					break
				case '4':
					name = '전문가 집들이'
					break
				case '5':
					name = '견적상담 관리'
					break
				case '6':
					name = '인테리어점 문의'
					break
				default:
					break
			}
			return name || null
		},
	},
	mounted() {
		if (this.getPart === null) this.$router.push('/user')
	},
	methods: {},
}
</script>

<style scoped lang="scss"></style>
