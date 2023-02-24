<template>
	<div>
		<v-col
			cols="6"
			class="pa-0 pt-6 pl-3 pr-3 mb-5"
		>
			<div
				class="d-flex justify-center"
				align="center"
				style="border: 1px solid #0ff"
			>
				<div>
					<a
						:href="require('@/assets/img/admin/category/guarantee.jpg')"
						download
					>
						<v-btn>
							<span>다운로드</span>
						</v-btn>
					</a>
				</div>

				<CommonButtonsButton02
					name="테스트 첫번째"
					class-name="btn_large"
					color="#23b76d"
					class="mr-1"
				/>
				<CommonButtonsButton02
					name="테스트 두번째"
					class-name="btn_large"
					color="#198df9"
					class="mr-1"
				/>
				<CommonButtonsButton02
					name="테스트 세번째"
					class-name="btn_more"
					color="#ff7e00"
				/>
			</div>
		</v-col>
		<br /><br /><br />

		<div class="pa-5">
			<CommonCardMenuCardInteriorSelect />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Test2',
	data: () => ({
		tab: 0,
	}),
	computed: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss"></style>
