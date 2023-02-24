<template>
	<v-btn-toggle
		v-model="model"
		multiple
		group
		class="toggle_group_btn"
	>
		<v-btn
			v-for="(item, i) in items"
			:key="i"
			color="#f1f2f3"
		>
			{{ item.code_name }}
		</v-btn>
	</v-btn-toggle>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'ToggleButton03',
	mixins: [model],
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		readonly: {
			type: Boolean,
			default: false,
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
.v-btn-toggle--group > .v-btn.v-btn {
	border-radius: 100px !important;
	font-size: $font_normal;
	color: $color_gray1;
	background-color: #f1f2f3 !important;
	width: 20%;
}
.v-item--active {
	color: $color_green1 !important;
	border: 1px solid $color_green1 !important;
	background-color: $color_white !important;
}
.v-btn--active:hover::before,
.v-btn--active::before {
	opacity: 1;
	background-color: #fff !important;
}
@media all and (max-width: 959px) {
	.v-btn-toggle--group > .v-btn.v-btn {
		border-radius: 30px !important;
		font-size: $font_sm;
		width: 17.5%;
	}
}
@media screen and (max-width: 360px) {
	.toggle_group_btn {
		overflow: scroll;
	}
	.v-btn-toggle--group > .v-btn.v-btn {
		font-size: $font_xs;
	}
}
</style>
