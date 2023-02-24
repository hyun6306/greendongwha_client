<template>
	<div class="list_area">
		<v-col
			cols="12"
			class="pa-0 interior_list_area"
			align="start"
		>
			<v-col
				v-for="(items, i) in filterShowItems"
				:key="i"
				class="pa-1"
			>
				<!-- 인테리어점 리스트 -->
				<CommonCardMenuCardInterior
					v-if="tab === 0"
					:item="items"
				/>
				<!-- 전문가 집들이 리스트 -->
				<CommonCardMenuCardHouse
					v-else
					:item="items"
				/>
			</v-col>

			<div
				v-if="filterItems.length > showItemsCount"
				class="btn_bar pt-5"
				align="center"
			>
				<CommonButtonsButton02
					:name="`더보기 (${showItemsCount}/${filterItems.length})`"
					class-name="btn_more"
					color="#70b341"
					outlined
					@click="$emit('showCount')"
				/>
			</div>

			<!-- 내용없음 -->
			<div
				v-if="filterItems.length === 0"
				class="pa-5 no_filter"
				align="center"
			>
				<v-icon
					x-large
					class="mb-3"
				>
					error_outline
				</v-icon>
				<p>검색하신 조건에 대한 검색결과가 없습니다.</p>
			</div>
		</v-col>
	</div>
</template>

<script>
export default {
	name: 'HomeInteriorStoreListItemsList',
	props: ['tab', 'filterItems', 'showItemsCount'],
	data: () => ({}),
	computed: {
		filterShowItems() {
			return this.filterItems.slice(0, this.showItemsCount) || []
		},
	},
	watch: {},
	async created() {},
	mounted() {},
	destroyed() {},
	updated() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.list_area {
	margin-bottom: 50%;
}
.no_filter {
	.v-icon {
		color: #a0a1a5;
	}
	p {
		font-size: $font_lg;
		color: $color_gray1;
		word-break: keep-all;
	}
}

@media all and (max-width: 959px) {
	.no_filter {
		p {
			font-size: $font_sm;
		}
	}
}
</style>
