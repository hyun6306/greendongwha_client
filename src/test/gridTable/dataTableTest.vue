<template>
	<div>
		<v-switch v-model="allowDrag" label="Draggable"></v-switch>
		<v-data-table
			ref="myTable"
			v-model="selected"
			:headers="activeHeaders"
			:items="desserts"
			:page.sync="page"
			:items-per-page="itemsPerPage"
			@page-count="pageCount = $event"
			hide-default-footer
			item-key="id"
			class="elevation-1"
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
									item.locked ? "mdi-pin-outline" : "mdi-pin-off-outline"
								}}</v-icon>
						</template>

						<template #item.carbs="{ item }">
							{{ item.carbs }}
							<v-icon>{{
									item.carbs > 80
										? "mdi-speedometer"
										: item.carbs > 45
											? "mdi-speedometer-medium"
											: "mdi-speedometer-slow"
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
import DataTableRowHandler from "./dataTableRowHandler.vue";
import draggable from "vuedraggable";

export default {
	components: {
		draggable,
		DataTableRowHandler,
	},
	data() {
		return {
			allowDrag: true,
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			selected: [],
			headers: [
				{ text: "Lock", value: "lock", width: "50px", sortable: false },
				{
					text: "Dessert (100g serving)",
					align: "start",
					sortable: false,
					value: "name",
				},
				{ text: "Calories", value: "calories" },
				{ text: "Fat (g)", value: "fat" },
				{ text: "Carbs (g)", value: "carbs" },
				{ text: "Protein (g)", value: "protein" },
				{ text: "Iron (%)", value: "iron" },
			],
			desserts: [
				{
					id:1,
					name: "Frozen Yogurt",
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0,
					iron: "1%",
					locked: false,
				},
				{
					id:2,
					name: "Ice cream sandwich",
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
					iron: "1%",
					locked: true,
				},
				{
					name: "Eclair",
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
					iron: "7%",
					locked: false,
				},
				{
					name: "Cupcake",
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
					iron: "8%",
					locked: false,
				},
				{
					name: "Gingerbread",
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9,
					iron: "16%",
					locked: false,
				},
				{
					name: "Jelly bean",
					calories: 375,
					fat: 0.0,
					carbs: 94,
					protein: 0.0,
					iron: "0%",
					locked: false,
				},
				{
					name: "Lollipop",
					calories: 392,
					fat: 0.2,
					carbs: 98,
					protein: 0,
					iron: "2%",
					locked: false,
				},
				{
					name: "Honeycomb",
					calories: 408,
					fat: 3.2,
					carbs: 87,
					protein: 6.5,
					iron: "45%",
					locked: false,
				},
				{
					name: "Donut",
					calories: 452,
					fat: 25.0,
					carbs: 51,
					protein: 4.9,
					iron: "22%",
					locked: true,
				},
				{
					name: "KitKat",
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7,
					iron: "6%",
					locked: false,
				},
			],
		};
	},
	computed: {
		activeHeaders() {
			return this.headers.filter((h) => {
				if (!this.allowDrag && h.value === "lock") {
					return false;
				}
				return true;
			});
		},
	},
	watch:{
		desserts(val){
			console.log('desserts', val)
		},
		selected(val){
			console.log('selected', val)
		}
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
			return item.calories > 500
				? "cal-high"
				: item.calories > 400
					? "cal-medium"
					: "cal-low";
		},
		onCloneCallback(item) {
			// Create a fresh copy of item
			const cloneMe = JSON.parse(JSON.stringify(item));
			console.log('cloneMe', cloneMe)
			return cloneMe;
		},
		onMoveCallback(evt, originalEvent) {
			const item = evt.draggedContext.element;
			const itemIdx = evt.draggedContext.futureIndex;

			console.log("onMoveCallback");

			if (item.locked) {
				return false;
			}

			return true;
		},
		onDropCallback(items) {
			console.log('onDropCallback', this.desserts)
			console.log("onDropCallback", items);
		},
	},
};
</script>

<style>
.cal-high {
	background-color: hotpink;
}
.cal-medium {
	background-color: lightpink;
}
.cal-low {
	background-color: lightgoldenrodyellow;
}
</style>
