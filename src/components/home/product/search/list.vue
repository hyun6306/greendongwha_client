<template>
	<div>
		<!-- 전체 -->
		<v-col
			v-if="model === 0"
			class="pa-0"
		>
			<div v-if="totalItems.length">
				<template v-for="(item, i) in totalItems">
					<v-col
						v-if="item.length"
						:key="i"
						align="center"
						class="total_items_area px-0 py-10"
					>
						<h2 class="pb-10">{{ totalSubTitle(item[0].con_gubun) }}</h2>
						<CommonCardMenuGroup02
							:menu-type="'product'"
							:card-menu="item"
							@submit="onClickProduct"
						/>
						<CommonButtonsButton02
							:name="`${totalSubTitle(item[0].con_gubun)} 더보기`"
							class-name="btn_more"
							color="#70b341"
							outlined
							@click="changeTab(item[0].con_gubun)"
						/>
					</v-col>
				</template>
			</div>
			<div v-else>
				<v-col
					cols="12"
					align="center"
					class="pt-10"
				>
					<h3>검색결과가 존재하지 않습니다.</h3>
				</v-col>
			</div>
		</v-col>
		<!-- 제품 / 3D 집들이 / 전문가 집들이 -->
		<v-col
			v-else
			class="pa-0"
		>
			<div v-if="filterItems.length">
				<v-row
					class="mx-0 my-5"
					align="center"
				>
					<v-col
						cols="6"
						class="py-0"
						align="start"
					>
						전체 <strong>{{ filterItems.length }}</strong>
						개
					</v-col>
					<v-col
						cols="6"
						class="py-0 tawr"
						align="end"
					>
						<v-select
							v-model="selectModel"
							:items="searchItems"
							label="Solo field"
							dense
							prepend-inner-icon="list"
							solo
							class="sm_select"
						></v-select>
					</v-col>
				</v-row>
				<CommonCardMenuGroup02
					:menu-type="'product'"
					:card-menu="filterShowItems"
					@submit="onClickProduct"
				/>
				<div
					v-if="filterCount > showItemsCount"
					class="py-3 pb-5"
					align="center"
				>
					<CommonButtonsButton02
						:name="`더보기 (${showItemsCount}/${filterCount})`"
						class-name="btn_more"
						color="#70b341"
						outlined
						@click="showItemsCount += 16"
					/>
				</div>
			</div>
			<div v-else>
				<v-col
					cols="12"
					align="center"
					class="pt-10"
				>
					<h3>검색결과가 존재하지 않습니다.</h3>
				</v-col>
			</div>
		</v-col>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'

export default {
	name: 'HomeProductSearchList',
	mixins: [model, common],
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		selectModel: '최신순',
		searchItems: ['최신순', '인기순', '스크랩'],

		showItemsCount: 16,
		filterCount: 0,
	}),
	computed: {
		...mapGetters([
			'APP_GET_SCROLL_BOTTOM', // 스크롤 EVENT
		]),
		totalItems() {
			if (!this.items.length) return []
			const productItems = this.items.filter(x => x.con_gubun === 'master').slice(0, 8) || []
			const housewarmingItems = this.items.filter(x => x.con_gubun === 'housewarming').slice(0, 8) || []
			const expHousewarmingItems = this.items.filter(x => x.con_gubun === 'exphousewarming').slice(0, 8) || []

			return [[...productItems], [...housewarmingItems], [...expHousewarmingItems]]
		},
		filterItems() {
			let items = []
			switch (this.model) {
				case 1:
					items = this.items.filter(x => x.con_gubun === 'master')
					break
				case 2:
					items = this.items.filter(x => x.con_gubun === 'housewarming')
					break
				case 3:
					items = this.items.filter(x => x.con_gubun === 'exphousewarming')
					break
			}
			return items
		},
		filterShowItems() {
			return this.common_product_filter_items(this.filterItems, this.selectModel).slice(0, this.showItemsCount)
		},
	},
	watch: {
		APP_GET_SCROLL_BOTTOM() {
			if (this.showItemsCount < this.filterItems.length) this.showItemsCount += 16
		},
		totalItems(val) {
			console.log('totalItems', val)
		},
	},
	created() {},
	mounted() {},
	methods: {
		changeTab(val) {
			switch (val) {
				case 'master':
					this.model = 1
					break
				case 'housewarming':
					this.model = 2
					break
				case 'exphousewarming':
					this.model = 3
					break
			}
		},
		totalSubTitle(val) {
			let title = ''
			switch (val) {
				case 'master':
					title = '제품'
					break
				case 'housewarming':
					title = '3D 집들이'
					break
				case 'exphousewarming':
					title = '전문가 집들이'
					break
			}
			return title
		},
		onClickProduct(val) {
			// console.log('onClickProduct',val)
			let link = ''
			switch (val.con_gubun) {
				case 'master':
					link = `/product/detail/${val.id}`
					break
				case 'housewarming':
					link = `/housewarming/3d/detail/${val.id}`
					break
				case 'exphousewarming':
					link = `/housewarming/specialist/detail/${val.id}`
					break
			}
			this.$router.push(link)
		},
	},
}
</script>
<style scoped lang="scss">
.total_items_area {
	border-bottom: 1px solid #ccc;
	&:last-child {
		border-bottom: 0;
	}
}
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
	:deep(.v-select__selections)input {
		display: none !important;
	}
}
</style>
