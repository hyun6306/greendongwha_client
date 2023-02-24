<template>
	<v-card height="470">
		<v-img
			width="100%"
			height="100%"
			:src="require('@/assets/img/home/main/img_my_product.jpg')"
			class="my_product"
			eager
		>
			<div class="head">
				<p class="mb-2 title tac">추천 태그</p>
				<p class="mb-5 subtitle tac">태그를 선택하여 나만의 제품을 추천 받으세요.</p>
			</div>
			<v-container class="pa-0">
				<v-chip-group
					v-model="model"
					column
				>
					<v-chip
						v-for="(item, i) in items"
						:key="i"
						color="white"
						class="hash"
						@click="onClickPushLink(item)"
					>
						{{ item.tag_value }}
					</v-chip>
				</v-chip-group>
			</v-container>
		</v-img>
	</v-card>
</template>

<script>
import common from '@/mixins/common'
import google_analytic from '@/mixins/google_analytic'

export default {
	name: 'HomeMainTag',
	components: {},
	mixins: [common, google_analytic],
	props: ['items'],
	data: () => ({
		model: null,
	}),
	computed: {},
	created() {},
	mounted() {},
	methods: {
		onClickPushLink(item) {
			this.google_analytic_push_event('click_main_tag_button', { button_location: item.tag_value })
			this.common_searchTag(item)
		},
	},
}
</script>

<style lang="scss" scoped>
.my_product {
	padding: 34px !important;
	border-radius: 0 !important;
	box-shadow: none !important;
	.head {
		.title {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 22px !important;
		}
		.subtitle {
			font-family: 'NotoSansKR-Light' !important;
			font-size: 15px !important;
			color: #777 !important;
		}
	}
	.v-chip-group {
		max-width: 300px !important;
	}
	.v-chip.hash {
		font-family: 'NotoSansKR-Regular' !important;
		padding: 10px 20px !important;
		font-size: 16px !important;
		color: #323333 !important;
		border: 1px solid #ccc !important;
		&:hover {
			background-color: #00562f !important;
			color: white !important;
			border: none !important;
		}
	}
}

@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
	.my_product {
		.v-chip.hash {
			font-size: 12px !important;
		}
	}
}
@media all and (max-width: 600px) {
	.my_product {
		.v-chip.hash {
			font-size: 12px !important;
		}
	}
}
</style>
