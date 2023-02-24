<template>
	<v-col
		cols="12"
		align="center"
		class="mt-15 product_banner2"
	>
		<v-img
			class="pa-0 px-6 py-3"
			width="100%"
			height="260"
			eager
			:src="require('@/assets/img/product/banner_02.png')"
		>
			<v-img
				class="pa-0 mt-6"
				width="90"
				height="20"
				eager
				:src="require('@/assets/img/product/icon_white_logo.png')"
			/>
			<p class="mt-2 mb-2 mb-sm-5">친환경에 대한 노력으로 가치 있는 제품을 만들다.</p>
			<span class="mb-3 mb-sm-6">
				1948년 설립된 동화기업은 대한민국 NO.1목질 전문 기업입니다.<br />
				최고의 설비와 기술력을 바탕으로 국내 주거환경에 가장 적합한 제품을 통해 당신의 행복한 내일을 만들겠습니다.
			</span>
			<v-col
				cols="6"
				sm="4"
				md="2"
				class="pa-0"
			>
				<CommonButtonsButton01
					name="특판문의하기 >"
					class-name="edge_8 font_14 fw_bold white"
					height="36"
					to="/product/special"
				/>
			</v-col>
		</v-img>
	</v-col>
</template>

<script>
export default {
	name: 'HomeProductDetailSpecial',
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
.product_banner2 {
	word-break: keep-all;
	p {
		font-family: 'NanumMyeongjo' !important;
		font-size: 30px !important;
		color: #d2e5c2;
	}
	span {
		display: inline-block !important;
		color: #fff !important;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 15px !important;
		line-height: 1.5 !important;
	}
	:deep(.v-btn__content) span {
		color: #0d483e !important;
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.product_banner2 {
		p {
			font-size: 18px !important;
		}
		span {
			font-size: 11px !important;
		}
		.v-btn {
			height: 36px !important;
		}
		:deep(.v-btn__content) span {
			font-size: 12px !important;
		}
	}
}
@media all and (max-width: 380px) {
	.product_banner2 {
		p {
			font-size: 18px !important;
		}
		span {
			font-size: 11px !important;
		}
		.v-btn {
			height: 36px !important;
		}
		:deep(.v-btn__content) span {
			font-size: 12px !important;
		}
	}
}
</style>
