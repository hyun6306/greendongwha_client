<template>
	<div class="mb-9">
		<v-col
			cols="12"
			class="table_type01 pa-0"
		>
			<v-row
				v-for="(item, i) in items"
				:key="i"
				class="ma-0"
			>
				<v-col
					cols="4"
					sm="2"
					class="th bc_gr th_bt fw_bold fl_half"
					>{{ item.title }}</v-col
				>
				<v-col
					cols="8"
					sm="10"
					class="td"
					align="start"
				>
					{{ item.text }}
					<CommonTooltipType01
						v-if="item.tooltip"
						:tooltip="item.tooltip"
					/>
				</v-col>
			</v-row>
		</v-col>
	</div>
</template>

<script>
export default {
	name: 'HomeProductDetailInfo',
	components: {},
	props: ['items'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss"></style>
