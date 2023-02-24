<template>
	<v-tabs
		v-model="model"
		background-color="transparent"
		active-class="tab_active"
		color="primary"
		grow
		show-arrows
		:class="className"
	>
		<v-tab
			v-for="(item, i) in tabItems"
			:key="i"
		>
			<div v-if="item.number">
				<p>{{ item.number }}</p>
				<p>{{ item.text }}</p>
			</div>
			<div v-else>
				<p>{{ item }}</p>
			</div>
		</v-tab>
	</v-tabs>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'TypeTab03',
	components: {},
	mixins: [model],
	props: ['tabItems', 'className'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
.v-tabs {
	:deep(.v-slide-group.v-item-group > .v-slide-group__next),
	:deep(.v-slide-group.v-item-group > .v-slide-group__prev) {
		display: none;
	}
	:deep(.v-tabs-slider) {
		display: none !important;
	}

	.v-tab {
		position: relative;
		p {
			font-weight: $fw_regular;
			font-size: $font_lg;
			color: $color_font !important;
			word-break: keep-all;
		}
		&:after {
			display: block;
			content: '';
			position: absolute;
			top: 15px;
			right: 0;
			width: 1px;
			height: 20px;
			background-color: #ccc;
		}
		&:last-child {
			&:after {
				display: none !important;
			}
		}
	}

	.tab_active.v-tab {
		p {
			font-weight: $fw_bold !important;
			color: $color_green1 !important;
		}
	}
}
</style>
