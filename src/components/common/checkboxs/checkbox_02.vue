<template>
	<v-btn
		block
		text
		tile
		class="pa-1"
		:block="block"
		:class="className"
		@click="model = !model"
	>
		<v-icon
			v-if="model"
			size="22"
			color="primary"
		>
			check_circle
		</v-icon>
		<v-icon
			v-else
			size="22"
			color="grey"
		>
			check_circle_outline
		</v-icon>
		<div class="pl-1">
			<span
				v-if="subText"
				class="checkbox_text"
			>
				{{ subText }}
			</span>
			<a
				v-if="link"
				class="pl-1 mr-0 pr-0"
				@click="common_newLink(href)"
			>
				{{ link }}
			</a>
			<span
				v-if="text"
				class="checkbox_text"
			>
				{{ text }}
			</span>
		</div>
	</v-btn>
</template>

<script>
import model from '@/mixins/model'
import common from '@/mixins/common'

export default {
	name: 'Checkbox02',
	components: {},
	mixins: [model, common],
	props: {
		subText: {
			type: String,
			default: '',
		},
		link: {
			type: String,
			default: '',
		},
		href: {
			type: String,
			default: '',
		},
		text: {
			type: String,
			default: '',
		},
		className: {
			type: String,
			default: '',
		},
		block: {
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
.checkbox_text {
	display: inline-block;
	font-size: 0.85rem;
	color: #808080;
	line-height: 22px;
}
:deep(.v-btn__content) {
	display: inline-block;
	text-align: left;
	.v-icon {
		float: left;
	}
}
</style>
