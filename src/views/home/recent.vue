<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col
			cols="12"
			align="center"
			class="pa-0"
		>
			<h2 class="content_title">{{ common_title }}</h2>
		</v-col>

		<v-col
			cols="12"
			class="pa-0"
			align="center"
		>
			<div
				v-if="APP_GET_RECENT_PRODUCT.length"
				class="wrapper px-5 px-lg-0"
			>
				<!-- 제품리스트 -->
				<v-col
					cols="12"
					align="center"
					class="pa-0"
				>
					<v-row
						class="ma-0 mt-10 mb-3"
						align="center"
					>
						<v-col
							cols="6"
							class="pa-0"
							align="start"
						>
							전체 <strong>{{ APP_GET_RECENT_PRODUCT.length }}</strong
							>개
						</v-col>
					</v-row>
					<div class="card_align">
						<v-row
							class="ma-0"
							justify="center"
						>
							<CommonCardMenuGroup02
								:menu-type="'scrap'"
								:card-menu="filterShowItems"
								@submit="onClickProduct"
							/>
						</v-row>
					</div>
				</v-col>
				<div
					v-if="APP_GET_RECENT_PRODUCT.length > showItemsCount"
					class="pt-3"
					align="center"
				>
					<CommonButtonsButton02
						:name="`더보기 (${showItemsCount}/${APP_GET_RECENT_PRODUCT.length})`"
						class-name="btn_more"
						color="#70b341"
						outlined
						@click="showItemsCount += 16"
					/>
				</div>
			</div>
			<div
				v-else
				class="wrapper pa-5 px-lg-0"
			>
				<p>최근 본 상품이 없습니다.</p>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeProductRecent',
	mixins: [common],
	data: () => ({
		showItemsCount: 16,
	}),
	computed: {
		...mapGetters([
			'APP_GET_RECENT_PRODUCT', // 최근본 제품 item
		]),
		filterShowItems() {
			return this.common_product_filter_items(this.APP_GET_RECENT_PRODUCT).slice(0, this.showItemsCount)
		},
	},
	watch: {},
	created() {},
	mounted() {},
	destroyed() {},
	methods: {
		onClickProduct(item) {
			this.common_link_pusher(item)
		},
	},
}
</script>

<style scoped lang="scss">
.sm_select {
	border: 1px solid #ccc;
	max-width: 80px !important;
	:deep(.v-text-field__details) {
		display: none !important;
	}
	:deep(.v-input__control) {
		min-height: 25px !important;
	}
	:deep(.v-input__append-inner) {
		display: none !important;
	}
	:deep(.v-input__slot) {
		padding: 0 5px !important;
		margin-bottom: 0 !important;
		box-shadow: none !important;
	}
	:deep(.v-select__selection) {
		text-align: center;
		font-size: 13px !important;
	}
	:deep(.v-select__selections) input {
		display: none !important;
	}
}
</style>
