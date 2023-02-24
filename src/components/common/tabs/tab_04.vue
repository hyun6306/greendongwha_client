<template>
	<v-tabs
		v-model="model"
		active-class="tab_active"
		color="primary"
		hide-slider
		center-active
		:grow="grow"
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
			<div v-else-if="item.title">
				<p>{{ item.title }}</p>
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
	name: 'TypeTab04',
	components: {},
	mixins: [model],
	props: {
		tabItems: {
			type: Array,
			default: () => [],
		},
		className: {
			type: String,
			default: '',
		},
		grow: {
			type: Boolean,
			default: true,
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
.v-tabs {
	:deep(.v-slide-group__prev) {
		display: none !important;
	}
	.v-tab {
		position: relative;
		border-right: 1px solid #ccc;
		border-top: 1px solid #ccc;
		background: $color_gray3;
		&:first-child {
			border-left: 1px solid #ccc;
		}
		p {
			font-weight: $fw_regular;
			font-size: $font_lg;
			color: $color_gray2 !important;
			word-break: keep-all;
		}
	}

	.tab_active.v-tab {
		background: white;
		border-top: 2px solid $color_gray1;
		p {
			font-weight: $fw_bold !important;
			color: $color_gray2 !important;
			font-weight: bold;
		}
	}
}

.full_border {
	.v-tabs {
		border-top: 2px solid $color_gray1;
	}
}

.green {
	.tab_active.v-tab {
		border-top: 2px solid #78C046;
		p {
			color: #78C046 !important;
		}
	}
}

@media all and (max-width: 600px) {
	.v-tabs {
		:deep(.v-tabs-bar){
			height: 32px !important;
		}
		.v-tab {
			p {
				font-weight: $fw_normal;
				font-size: $font_sm !important;
			}
		}
	}
}
</style>
