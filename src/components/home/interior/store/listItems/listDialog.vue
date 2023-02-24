<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		persistent
		no-click-animation
		transition="dialog-top-transition"
	>
		<v-sheet
			class="pa-0 ma-0"
			color="white"
		>
			<v-row
				class="ma-0 popup_title_area"
				justify="center"
				align="center"
			>
				<v-col
					cols="2"
					align="center"
					class="pr-0"
				>
					<v-btn
						icon
						dark
						@click="$emit('close')"
					>
						<v-icon>arrow_back_ios</v-icon>
					</v-btn>
				</v-col>
				<v-col
					cols="10"
					class="popup_title pl-0"
				>
					검색 리스트
				</v-col>
			</v-row>
			<v-col class="pa-0 popup_contents">
				<HomeInteriorStoreListItemsTabGroup
					v-model="model"
					:current-path="currentPath"
					:total-count="totalCount"
					:filter-interior-items="filterInteriorItems"
					:filter-expert-items="filterExpertItems"
					:show-items-count="showItemsCount"
					@showCount="$emit('showCount')"
				/>
			</v-col>
		</v-sheet>
	</v-dialog>
</template>

<script>
import model from '@/mixins/model'
import common from '@/mixins/common'

export default {
	name: 'HomeInteriorStoreListItemsListDialog',
	mixins: [common, model],
	props: {
		dialog: {
			type: Boolean,
			default: false,
		},
		currentPath: {
			type: String,
			default: '',
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
			default: 0,
		},
	},
	data: () => ({}),
	computed: {},
	watch: {
		dialog(val) {
			console.log('dialog', val)
			// if (val) this.common_scrollTop('.interior_list_area')
		},
	},
	async created() {},
	mounted() {},
	destroyed() {},
	updated() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.v-dialog__content {
	z-index: 21 !important;
}
.popup {
	&_title {
		font-size: 1.2rem;
		font-weight: bold;
		color: white;

		&_area {
			width: 100%;
			z-index: 1;
			top: 0;
			position: fixed;
			background-color: $color_green1;
		}
	}
	&_contents {
		margin-top: 50px;
	}
}
</style>
