<template>
	<div>
		<v-row
			class="ma-0 pt-3 pt-md-0"
			align="center"
		>
			<v-col
				v-if="currentPath === 'page'"
				cols="12"
				lg="5"
				md="7"
				align="center"
				class="pa-0"
			>
				<CommonTabsTab03
					v-model="model"
					:tab-items="mapTabItems"
				/>
			</v-col>
			<v-col
				v-if="currentPath === 'page'"
				class="pa-0 hidden-sm-and-down"
				:lg="currentPath !== 'page' ? 12 : 7"
				:md="currentPath !== 'page' ? 12 : 5"
				align="end"
			>
				조건에맞는 시공업체 <span>{{ totalCount }}개</span>
			</v-col>
		</v-row>

		<v-col
			class="pa-0"
			:class="`${currentPath === 'page' ? '' : 'pt-2 pt-md-0'}`"
		>
			<v-tabs-items v-model="model">
				<v-tab-item
					class="list_board"
					:style="`height:${listHeight}`"
				>
					<!-- 인테리어점 리스트 -->
					<HomeInteriorStoreListItemsList
						:tab="model"
						:filter-items="filterInteriorItems"
						:show-items-count="showItemsCount"
						@showCount="$emit('showCount')"
					/>
				</v-tab-item>

				<v-tab-item
					class="list_board"
					:style="`height:${listHeight}`"
				>
					<!-- 전문가 집들이 리스트 -->
					<HomeInteriorStoreListItemsList
						:tab="model"
						:filter-items="filterExpertItems"
						:show-items-count="showItemsCount"
						@showCount="$emit('showCount')"
					/>
				</v-tab-item>
			</v-tabs-items>
		</v-col>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import model from '@/mixins/model'

export default {
	name: 'HomeInteriorStoreListItemsTabGroup',
	mixins: [model],
	props: {
		currentPath: {
			type: String,
			default: 'page',
		},
		totalCount: {
			type: Number,
			default: 0,
		},
		filterInteriorItems: {
			type: Array,
			default: () => [],
		},
		filterExpertItems: {
			type: Array,
			default: () => [],
		},
		showItemsCount: {
			type: Number,
			default: 16,
		},
	},
	data: () => ({
		mapTabItems: ['인테리어점', '전문가 집들이'],
	}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE']),
		listHeight() {
			return this.APP_GET_APP_STATE !== 'web' ? '100vh' : this.currentPath === 'page' ? '560px' : '610px'
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
.list_board {
	overflow-y: scroll;
	-ms-overflow-style: none !important;
	&::-webkit-scrollbar {
		display: none;
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
