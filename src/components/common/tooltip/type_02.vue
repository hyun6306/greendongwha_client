<template>
	<div>
		<v-tooltip
			v-if="isTooltip && APP_GET_APP_STATE === 'web'"
			top
		>
			<template v-slot:activator="{ on, attrs }">
				<span
					v-bind="attrs"
					class="tootip_text"
					:class="spanClassName"
					v-on="on"
				>
					{{ title }}
				</span>
			</template>
			<span align="center">{{ tooltip }}</span>
		</v-tooltip>
		<span
			v-else
			:class="spanClassName"
			class="tootip_text"
		>
			{{ title }}
		</span>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Tooltip',
	props: {
		title: {
			type: String,
			default: '',
		},
		tooltip: {
			type: String,
			default: '',
		},
		isTooltip: {
			type: Boolean,
			default: false,
		},
		spanClassName: {
			type: String,
			default: '',
		},
	},
	data: () => ({}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE']),
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
@mixin ellipsis_1 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 1 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}
.tootip_text {
	@include ellipsis_1;
}
</style>
