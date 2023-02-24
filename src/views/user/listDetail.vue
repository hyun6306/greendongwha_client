<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col
			cols="12"
			class="pa-0 register_history"
			align="center"
		>
			<v-col
				cols="12"
				class="pa-0"
				align="center"
			>
				<div class="content_title">
					마이페이지
					<p class="sub_title">동화자연마루를 이용해주셔서 감사합니다.</p>
				</div>
			</v-col>

			<UserItemUserInfo />

			<v-col
				class="pa-0"
				cols="12"
				align="center"
			>
				<!-- user -->
				<UserUserEstimateDetail v-if="getPart === '0'" />
				<UserUserQualityDetail v-if="getPart === '1'" />
				<UserUserAsDetail v-if="getPart === '2'" />
				<UserUserQuestionDetail v-if="getPart === '3'" />

				<!-- agency -->
				<UserAgencyHousewarmingDetail v-if="getPart === '4'" />
				<UserAgencyEstimateDetail v-if="getPart === '5'" />
				<UserAgencyAskDetail v-if="getPart === '6'" />
			</v-col>
		</v-col>
	</v-container>
</template>

<script>
export default {
	name: 'UserListDetail',
	data: () => ({}),
	computed: {
		getPart() {
			return this.$route.params.part || null
		},
		partName() {
			let name
			switch (this.getPart) {
				case '0':
					name = '견적상담'
					break
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
					name = '견적상담'
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
