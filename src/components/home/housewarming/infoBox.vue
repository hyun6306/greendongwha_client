<template>
	<div class="info_box">
		<p class="tit">사례정보</p>
		<v-row class="ma-0 list">
			<v-col
				v-if="items.form_name"
				class="pa-0 d-flex"
				cols="12"
				md="auto"
			>
				<v-col
					class="pa-0 tal list_tit"
					cols="3"
					md="auto"
					>형태</v-col
				>
				<v-col
					class="pa-0 tal cont"
					cols="9"
					md="auto"
					>{{ items.form_name }}</v-col
				>
			</v-col>
			<v-col
				v-if="items.space_name"
				class="pa-0 d-flex"
				cols="12"
				md="auto"
			>
				<v-col
					class="pa-0 tal list_tit"
					cols="3"
					md="auto"
					>공간</v-col
				>
				<v-col
					class="pa-0 tal cont"
					cols="9"
					md="auto"
					>{{ items.space_name }}</v-col
				>
			</v-col>
			<v-col
				v-if="items.spacious_name"
				class="pa-0 d-flex"
				cols="12"
				md="auto"
			>
				<v-col
					class="pa-0 tal list_tit"
					cols="3"
					md="auto"
					>평수</v-col
				>
				<v-col
					class="pa-0 tal cont"
					cols="9"
					md="auto"
					>{{ items.spacious_name }}</v-col
				>
			</v-col>
			<v-col
				v-if="items.brand_name"
				class="pa-0 d-flex"
				cols="12"
				md="auto"
			>
				<v-col
					class="pa-0 tal list_tit"
					cols="3"
					md="auto"
					>시공 제품</v-col
				>
				<v-col
					class="pa-0 tal cont"
					cols="9"
					md="auto"
					>{{ items.brand_name }} {{ items.goods_name }}</v-col
				>
			</v-col>
			<v-col
				v-if="items.familytype_name"
				class="pa-0 d-flex"
				cols="12"
				md="auto"
			>
				<v-col
					class="pa-0 tal list_tit"
					cols="3"
					md="auto"
					>가족형태</v-col
				>
				<v-col
					class="pa-0 tal cont"
					cols="9"
					md="auto"
					>{{ items.familytype_name }}</v-col
				>
			</v-col>
			<v-col
				v-if="items.style_name"
				class="pa-0 d-flex"
				cols="12"
				md="auto"
			>
				<v-col
					class="pa-0 tal list_tit"
					cols="3"
					md="auto"
					>스타일</v-col
				>
				<v-col
					class="pa-0 tal cont"
					cols="9"
					md="auto"
					>{{ items.style_name }}</v-col
				>
			</v-col>
			<v-col
				v-if="items.tone_name"
				class="pa-0 d-flex"
				cols="12"
				md="auto"
			>
				<v-col
					class="pa-0 tal list_tit"
					cols="3"
					md="auto"
					>톤</v-col
				>
				<v-col
					class="pa-0 tal cont"
					cols="9"
					md="auto"
					>{{ items.tone_name }}</v-col
				>
			</v-col>
			<v-col
				v-if="items.address1"
				class="pa-0 d-flex"
				cols="12"
				md="auto"
			>
				<v-col
					class="pa-0 tal list_tit"
					cols="3"
					md="auto"
					>시공 주소</v-col
				>
				<v-col
					class="pa-0 tal cont"
					cols="9"
					md="auto"
					>{{ items.address1 }}</v-col
				>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'HousewarmingInfoBox',
	mixins: [common],
	props: ['items'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.info_box {
	padding: 30px 40px;
	margin-bottom: 20px;
	background-color: #f1f2f3;
	border-radius: 10px;
	.tit {
		padding-bottom: 10px !important;
		margin-bottom: 10px !important;
		font-family: 'NotoSansKR-Bold';
		font-size: 18px;
		color: #262626;
		text-align: left;
		border-bottom: 1px solid #262626;
	}
	.list {
		font-size: 16px;
		.list_tit {
			padding-right: 10px !important;
			font-family: 'NotoSansKR-Regular' !important;
			font-weight: 600;
			color: #5f6062;
			line-height: 1.8 !important;
		}
		.cont {
			padding-right: 30px !important;
			font-family: 'NotoSansKR-Regular' !important;
			font-weight: 600;
			color: #262626;
			line-height: 1.8 !important;
		}
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.info_box {
		padding: 20px 10px;
		margin-bottom: 10px;
		.tit {
			font-size: 16px;
		}
		.list {
			font-size: 13px;
			.list_tit {
				padding-right: 0 !important;
			}
			.cont {
				padding-right: 0 !important;
			}
		}
	}
}
@media all and (max-width: 380px) {
	.info_box {
		padding: 20px 10px;
		margin-bottom: 10px;
		.tit {
			font-size: 16px;
		}
		.list {
			font-size: 13px;
			.list_tit {
				padding-right: 0 !important;
			}
			.cont {
				padding-right: 0 !important;
			}
		}
	}
}
</style>
