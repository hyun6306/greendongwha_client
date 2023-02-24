<template>
	<!--
        [확인사항]
		1. 버튼타입 : 초기값       (class="btn_basic")
        2. 버튼타입 : 기본확인형   (class="btn_large")
        3. 버튼타입 : 내부옵션형   (class="btn_small")
		4. 버튼타입 : 더보기형     (class="btn_more)
		5. 버튼타입 : 업로드형     (class="btn_upload")
		6. 특수컬러 ,라운드효과 :  (내부에 직접적용)
    -->

	<v-btn
		elevation="0"
		:rounded="rounded"
		:outlined="outlined"
		:color="color"
		:class="className === '' ? 'btn_basic' : className"
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
	name: 'Button02',
	components: {},
	props: {
		name: {
			type: String,
			default: '',
		},
		color: {
			type: String,
			default: 'primary',
		},
		className: {
			type: String,
			default: '',
		},
		outlined: {},
		rounded: {},
		to: {
			type: String,
			default: '',
		},
		text: {},
		dark: {},
		disabled: {},
		href: {
			type: String,
			default: '',
		},
	},
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
.font_white {
	color: #fff !important;
}
.font_black {
	color: #262626 !important;
}
.edge_4 {
	border-radius: 4px !important;
}
.v-btn--outlined {
	border: 1px solid #ccc !important;
}

.btn_basic {
	min-width: 140px !important;
	height: 46px !important;
	border-radius: 5px !important;
	font-size: 16px !important;
	:deep(.v-btn__content) {
		span {
			font-family: 'NotoSansKR-Regular' !important;
		}
	}
	&.v-btn--rounded {
		border-radius: 50px !important;
	}
}

.btn_large {
	min-width: 225px !important;
	height: 60px !important;
	border-radius: 5px !important;
	font-size: 18px !important;
	:deep(.v-btn__content) {
		span {
			font-family: 'NotoSansKR-Bold' !important;
		}
	}
	&.v-btn--rounded {
		border-radius: 50px !important;
	}
}

.btn_small {
	min-width: 90px !important;
	height: 26px !important;
	border-radius: 5px !important;
	font-size: 13px !important;
	:deep(.v-btn__content) {
		span {
			font-family: 'NotoSansKR-Regular' !important;
		}
	}
	&.v-btn--rounded {
		border-radius: 50px !important;
	}
	&.v-size--default {
		height: 26px !important;
	}
}

.btn_more {
	min-width: 140px !important;
	height: 46px !important;
	border-radius: 10px !important;
	font-size: 14px !important;
	background-color: #fff !important;
	:deep(.v-btn__content) {
		span {
			font-family: 'NotoSansKR-Regular' !important;
			color: #5f6062 !important;
		}
	}
	&.v-btn--outlined {
		border: 1px solid #ccc;
	}
}

.btn_upload {
	min-width: 100px !important;
	height: 34px !important;
	border-radius: 0 !important;
	border: 1px solid #ccc !important;
	:deep(.v-btn__content) {
		span {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 12px !important;
			color: #262626 !important;
		}
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.btn_basic {
		min-width: 100px !important;
		height: 36px !important;
		border-radius: 5px !important;
		font-size: 13px !important;
		&.v-btn--rounded {
			border-radius: 50px !important;
		}
	}

	.btn_large {
		min-width: 140px !important;
		height: 46px !important;
		font-size: 14px !important;
	}

	.btn_more {
		min-width: 120px !important;
		height: 40px !important;
		font-size: 12px !important;
	}
}
@media all and (max-width: 380px) {
	.btn_basic {
		min-width: 100px !important;
		height: 36px !important;
		font-size: 13px !important;
	}

	.btn_large {
		min-width: 140px !important;
		height: 46px !important;
		font-size: 14px !important;
	}

	.btn_more {
		min-width: 120px !important;
		height: 40px !important;
		font-size: 12px !important;
	}
}
</style>
