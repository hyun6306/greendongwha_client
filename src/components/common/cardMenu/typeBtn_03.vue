<template>
	<v-btn-toggle
		v-model="model"
		mandatory
		class="d-inline flex"
	>
		<v-row
			class="ma-0"
			justify="center"
		>
			<v-col
				v-for="(item, n) in typeItems"
				:key="n"
				:cols="cols !== undefined ? cols : 4"
				align="center"
				class="pa-0 type_btn_03"
			>
				<v-btn
					:color="model === n ? 'primary' : 'white'"
					:outlined="model === n ? false : true"
					elevation="0"
					class="btn_toggle pa-0"
				>
					<v-col
						align="start"
						class="pa-0 px-5"
					>
						<v-icon
							size="22"
							:color="model === n ? 'white' : 'grey'"
							class="mb-1 hidden-sm-and-down"
						>
							check_circle_outline
						</v-icon>
						<span
							class="type_btn_03_text"
							:class="model === n ? 'type_btn_03_text_select' : ''"
						>
							{{ item.title }}
						</span>
					</v-col>
				</v-btn>
			</v-col>
		</v-row>
	</v-btn-toggle>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'TypeBtn03',
	mixins: [model],
	props: ['typeItems', 'cols'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.type_btn_03 {
	.v-btn {
		border-radius: 0 !important;
		width: 100%;
		height: 50px !important;
		background-color: #fff !important;
	}
	.v-btn.primary {
		background-color: #42883d !important;
	}
	.type_btn_03_text {
		color: $color_primary !important;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 16px !important;
		color: #262626 !important;
		&_select {
			font-family: 'NotoSansKR-Bold' !important;
			color: #fff !important;
		}
	}
}

// 빠른견적내기
.fast {
	.v-btn {
		height: 36px !important;
	}
	:deep(.v-icon) {
		display: none !important;
	}
	.type_btn_03_text {
		font-size: 14px !important;
	}
}

@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
}
@media all and (max-width: 600px) {
	.type_btn_03 {
		.type_btn_03_text {
			font-size: 13px !important;
		}
	}
}
</style>
