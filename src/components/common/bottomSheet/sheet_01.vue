<template>
	<v-col
		cols="12"
		align="center"
		class="pt-10"
	>
		<div
			class="bottom_sheet"
			:style="`height:${height}`"
		>
			<v-sheet
				class="text-center"
				:height="height"
			>
				<div class="wrapper">
					<v-row
						class="ma-0"
						align="center"
					>
						<v-col
							cols="12"
							align="start"
							class="pb-0 pt-4 py-1 py-md-4"
						>
							<span class="title mr-2">{{ title }}</span>
							<span class="sub_title pt-2">{{ subTitle }}</span>
						</v-col>
						<!--<v-col
							cols="2"
							align="end"
							class="pb-0"
						>
							<v-btn
								class="mt-2 mr-2"
								icon
								fab
								color="error"
								@click="$emit('close')"
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-col>-->
					</v-row>
					<!-- bottom components -->
					<Component
						:is="componentInstance"
						ref="child"
						:items="items"
						:tab-select="tabSelect"
						@next="$emit('next')"
						@changeHeight="changeHeight"
					/>
				</div>
			</v-sheet>
		</div>
	</v-col>
</template>

<script>
export default {
	name: 'BottomSheet01',
	props: {
		sheet: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '',
		},
		subTitle: {
			type: String,
			default: '',
		},
		items: {
			type: Array,
			default: () => [],
		},
		tabSelect: {
			type: Number,
			default: 0,
		},
		componentsPath: {
			type: String,
			default: '',
		},
	},
	data: () => ({
		height: '220px',
	}),
	computed: {
		componentInstance() {
			return () => import(`@/components/${this.componentsPath}`)
		},
	},
	watch: {
		sheet(val) {
			console.log('sheet', val)
			this.sheetOnOff(val)
		},
	},
	created() {},
	mounted() {
		this.sheetOnOff(this.sheet)
	},
	methods: {
		sheetOnOff(val) {
			const btn = document.querySelector('.bottom_sheet')
			if (!val) {
				btn.className = ''
				setTimeout(() => {
					btn.className = 'bottom_sheet bottom_sheet_area_off'
				}, 1)
			} else {
				btn.className = ''
				setTimeout(() => {
					btn.className = 'bottom_sheet bottom_sheet_area_on'
				}, 1)
			}
		},
		changeHeight(val) {
			this.height = val
			console.log('changeHeight', this.height, val)
		},
	},
}
</script>

<style scoped lang="scss">
.title {
	font-size: 1.8rem;
	font-weight: bold;
	color: #000;
}
.sub_title {
	font-size: 0.85rem;
	font-weight: bold;
	color: $color_gray2;
}
.bottom_sheet {
	width: 100%;
	margin: 0 auto !important;
	//height: 220px;
	background: #fff;
	bottom: 0;
	left: 0;
	position: fixed;
	z-index: 100;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
}
.bottom_sheet_area_on {
	animation: scroll-y-in 1s forwards !important;
}
.bottom_sheet_area_off {
	display: none;
	animation: scroll-y-out 0.5s forwards !important;
}
@keyframes scroll-y-in {
	0% {
		bottom: -220px;
	}
	100% {
		bottom: 0;
	}
}
@keyframes scroll-y-out {
	0% {
		bottom: 0;
		opacity: 100%;
	}
	100% {
		bottom: -220px;
		opacity: 0;
		display: none;
	}
}
@media screen and (max-width: 960px) {
	.sub_title {
		display: none;
	}
}
@media screen and (max-width: 600px) {
	.title {
		font-size: 1.1rem !important;
	}
}
</style>
