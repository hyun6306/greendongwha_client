<template>
	<div>
		<v-data-table
			ref="myTable"
			v-model="selected"
			:headers="activeHeaders"
			:items="desserts"
			:page.sync="page"
			:items-per-page="itemsPerPage"
			hide-default-footer
			item-key="id"
			class="elevation-1"
			@page-count="pageCount = $event"
		>
			<template #body="props">
				<draggable
					:list="props.items"
					tag="tbody"
					:disabled="!allowDrag"
					:move="onMoveCallback"
					:clone="onCloneCallback"
					@end="onDropCallback(props.items)"
				>
					<data-table-row-handler
						v-for="(item, index) in props.items"
						:key="index"
						:item="item"
						:headers="activeHeaders"
						:item-class="getClass(item)"
					>
						<template #item.lock="{ item }">
							<v-icon @click="item.locked = item.locked ? false : true">{{
								item.locked ? 'mdi-pin-outline' : 'mdi-pin-off-outline'
							}}</v-icon>
						</template>

						<template #item.carbs="{ item }">
							{{ item.carbs }}
							<v-icon>{{
								item.carbs > 80
									? 'mdi-speedometer'
									: item.carbs > 45
									? 'mdi-speedometer-medium'
									: 'mdi-speedometer-slow'
							}}</v-icon>
						</template>
					</data-table-row-handler>
				</draggable>
			</template>
		</v-data-table>
		<div class="text-center pt-2">
			<v-pagination
				v-model="page"
				:length="pageCount"
			></v-pagination>
		</div>
	</div>
</template>

<script>
import model from '@/mixins/model'

import DataTableRowHandler from '../../../test/gridTable/dataTableRowHandler.vue'
import draggable from 'vuedraggable'

export default {
	components: {
		draggable,
		DataTableRowHandler,
	},
	mixins: [model],
	props: {
		headers: {
			type: Array,
			default: () => [],
		},
		desserts: {
			type: Array,
			default: () => [],
		},
		allowDrag: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			selected: [],
		}
	},
	computed: {
		activeHeaders() {
			return this.headers.filter(h => {
				if (!this.allowDrag && h.value === 'lock') {
					return false
				}
				return true
			})
		},
	},
	watch: {
		desserts(val) {
			console.log('desserts', val)
		},
		selected(val) {
			console.log('selected', val)
		},
	},
	methods: {
		// customSort(
		//   items /*: any[]*/,
		//   sortBy /*: string[]*/,
		//   sortDesc /*: boolean[]*/,
		//   locale /*: string*/,
		//   customSorters /*?: Record<string, compareFn>*/
		// ) {
		//   return sortBy.length === 0
		//     ? items.sort((a, b) => a.name.localeCompare(b.name, locale))
		//     : sortItems.apply(this.$refs.myTable, arguments);
		// },
		getClass(item) {
			return item.calories > 500 ? 'cal-high' : item.calories > 400 ? 'cal-medium' : 'cal-low'
		},
		onCloneCallback(item) {
			// Create a fresh copy of item
			const cloneMe = JSON.parse(JSON.stringify(item))
			console.log('cloneMe', cloneMe)
			return cloneMe
		},
		onMoveCallback(evt, originalEvent) {
			const item = evt.draggedContext.element
			const itemIdx = evt.draggedContext.futureIndex

			console.log('onMoveCallback')

			if (item.locked) {
				return false
			}

			return true
		},
		onDropCallback(items) {
			this.model = items
			console.log('onDropCallback', this.desserts)
			console.log('onDropCallback', items)
		},
	},
}
</script>

<style scoped lang="scss">
:deep(.v-data-table-header) {
	background-color: #ededed;
}
:deep(.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th) {
	color: #000 !important;
	font-size: 1rem;
}
:deep(.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content) {
	box-shadow: none;
	background-color: #f1f8f3;
}
</style>
