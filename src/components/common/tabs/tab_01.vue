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
	name: 'TypeTab01',
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
	.v-tab {
		p {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 15px;
			color: #a0a1a5 !important;
			word-break: keep-all;
		}
		border-bottom: 3px solid #a0a1a5;
	}
	:deep(.v-slide-group.v-item-group > .v-slide-group__next),
	:deep(.v-slide-group.v-item-group > .v-slide-group__prev) {
		display: none;
	}

	.tab_active.v-tab {
		p {
			font-family: 'NotoSansKR-Bold' !important;
			color: #262626 !important;
		}
	}
}

.margin_0 {
	margin: 0 !important;
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.v-tabs {
		.v-tab {
			p {
				font-size: 13px;
			}
		}
	}
}
@media all and (max-width: 380px) {
	.v-tabs {
		.v-tab {
			p {
				font-size: 13px;
			}
		}
	}
}
</style>
