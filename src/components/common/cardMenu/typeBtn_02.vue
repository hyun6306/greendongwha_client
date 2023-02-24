<template>
	<!-- 컨텐츠 토글버튼 -->
	<v-btn-toggle
		v-model="model"
		mandatory
		class="d-inline flex"
	>
		<v-row
			class="ma-0"
			justify="start"
		>
			<v-col
				v-for="(item, n) in typeItems"
				:key="n"
				:cols="customCols ? customCols : 4"
				:sm="customCols"
				align="center"
				class="pa-0 type_btn_02"
			>
				<v-btn
					:color="model === n ? 'primary' : 'white'"
					:outlined="model === n"
					elevation="0"
					class="btn_toggle pa-0"
				>
					<v-col
						align="center"
						class="pa-0"
					>
						<p
							class="type_btn_02_text"
							:class="model === n ? 'type_btn_02_text_select' : ''"
						>
							{{ item.title }}
						</p>
					</v-col>
				</v-btn>
			</v-col>
		</v-row>
	</v-btn-toggle>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'TypeBtn02',
	mixins: [model],
	props: ['typeItems', 'cols'],
	data: () => ({}),
	computed: {
		customCols() {
			if (this.cols) return this.cols
			return 4
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.type_btn_02 {
	.v-btn {
		width: 100%;
		height: 48px;
		background-color: #f7f7f7;
		border: 1px solid #ccc;
		border-radius: 0;
		&:hover {
			background-color: #eee;
		}
	}
	.v-btn.v-item--active.v-btn--active.primary {
		background-color: #fff !important;
		border: 1px solid #00582c !important;
	}
	.type_btn_02_text {
		font-family: 'NotoSansKR-Regular';
		font-size: 16px;
		color: #767676;
		&_select {
			font-family: 'NotoSansKR-Bold' !important;
			color: #00582c;
		}
	}
}
@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.type_btn_02 {
		.v-btn {
			height: 45px !important;
		}
		.type_btn_02_text {
			font-size: 15px !important;
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.type_btn_02 {
		.v-btn {
			height: 40px !important;
		}
		.type_btn_02_text {
			font-size: 14px !important;
		}
	}
}
@media all and (max-width: 380px) {
	.type_btn_02 {
		.v-btn {
			height: 40px !important;
		}
		.type_btn_02_text {
			font-size: 14px !important;
		}
	}
}
</style>
