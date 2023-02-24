<template>
	<v-btn
		elevation="0"
		block
		:rounded="rounded"
		:outlined="outlined"
		:color="color"
		:class="className"
		:height="height"
		:to="to"
		:text="text"
		:dark="dark"
		:disabled="disabled"
		:href="href"
		@click="$emit('click')"
	>
		<span
			:class="outlined != undefined ? '' : 'font_white'"
			:style="outlined != undefined ? `color:${colorValue}` : ''"
		>
			{{ name }}
		</span>
	</v-btn>
</template>

<script>
export default {
	name: 'Button01',
	components: {},
	props: ['name', 'color', 'className', 'height', 'outlined', 'rounded', 'to', 'text', 'dark', 'disabled', 'href'],
	data: () => ({}),
	computed: {
		colorValue() {
			let color = this.color
			if (this.color.substring(1, 0) != '#') {
				color = this.$vuetify.theme.themes.light[this.color]
			}
			return color
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.edge {
	border-radius: 0 !important;
}
.edge_5 {
	border-radius: 5px !important;
}
.edge_8 {
	border-radius: 8px !important;
}

.font_white {
	color: #fff !important;
}
.font_black {
	color: #262626 !important;
}

.font_12 {
	font-size: 12px !important;
}
.font_14 {
	font-size: 14px !important;
}
.font_16 {
	font-size: 16px !important;
}
.font_18 {
	font-size: 18px !important;
}

.bold {
	font-family: 'NotoSansKR-Bold' !important;
}
.regular {
	font-family: 'NotoSansKR-Regular' !important;
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.font_14 {
		font-size: 12px !important;
	}
	.font_16 {
		font-size: 12px !important;
	}
	.font_18 {
		font-size: 12px !important;
	}
}
@media all and (max-width: 380px) {
	.font_14 {
		font-size: 12px !important;
	}
	.font_16 {
		font-size: 12px !important;
	}
	.font_18 {
		font-size: 12px !important;
	}
}
</style>
