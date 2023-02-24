<template>
	<v-col
		:id="tagId"
		:cols="cols"
		class="pa-0 tag_area"
		align="start"
	>
		<div
			v-for="(item, i) in items"
			:key="i"
			class="pa-2 mr-2 mb-1 tag_item"
		>
			<span class="pl-2">{{ item.text }}</span>
			<v-btn
				icon
				height="20"
				width="20"
				class="ml-2 pr-2"
				@click="$emit('delete', item)"
			>
				<v-icon small>clear</v-icon>
			</v-btn>
		</div>
	</v-col>
</template>

<script>
export default {
	name: 'TagType01',
	components: {},
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		tagId: {
			type: String,
			default: 'tagArea',
		},
		cols: {
			type: Number,
			default: 10,
		},
	},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.tag_area {
	height: 100%;
	float: left;
}
.tag_item {
	display: inline-block;
	background-color: #eafadf;
	border-radius: 50px;
}
@media all and (min-width: 600px) and (max-width: 959px) {
	.tag_area {
		overflow: auto;
		flex-direction: row;
		height: 45px;
		width: 100%;
		white-space: nowrap;
	}
}
@media all and (max-width: 600px) {
	.tag_area {
		overflow: auto;
		flex-direction: row;
		height: 45px;
		max-width: 100%;
		white-space: nowrap;
	}
}
</style>
