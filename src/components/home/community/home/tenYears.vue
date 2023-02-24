<template>
	<div class="mb-5 mx-0 mx-lg-3">
		<v-col
			class="px-6 py-3 warranty item clickCursor"
			@click="$router.push('/custom/quality')"
		>
			<div class="circle" />
			<v-row class="ma-0">
				<v-col
					class="pa-0"
					cols="8"
					align-self="center"
				>
					<p class="mb-1 mb-sm-3 tit">품질보증등록</p>
					<p class="sub_txt">최대 10년 품질 보증 서비스</p>
				</v-col>
				<v-col
					class="pa-0"
					cols="4"
					align="right"
				>
					<v-img
						:src="require('@/assets/img/community/icon_years.png')"
						max-width="120"
						height="100%"
					/>
				</v-col>
			</v-row>
		</v-col>
	</div>
</template>

<script>
export default {
	name: 'CommunityHomeTenYears',
	components: {},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.warranty.item {
	position: relative;
	border-radius: 16px;
	background-color: #dcede2;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	overflow: hidden;
	.tit {
		font-size: $font_lg;
		font-weight: $fw_bold;
	}
	.circle {
		position: absolute;
		right: -170px;
		top: -20px;
		width: 350px;
		height: 350px;
		background-color: #fff;
		border-radius: 50%;
		opacity: 0.5;
	}
}

@media all and (max-width: 1264px) {
	.warranty.item {
		border-radius: 0 !important;
	}
}
@media all and (max-width: 380px) {
	.warranty.item {
		.tit {
			font-size: $font_normal !important;
		}
	}
}
</style>
