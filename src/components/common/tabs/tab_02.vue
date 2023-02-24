<template>
	<v-row
		class="ma-0 tab_02_bottom_border"
		justify="center"
	>
		<v-col
			cols="12"
			:md="fill !== undefined ? 0 : 6"
			align-self="center"
			class="pa-0"
		>
			<v-row
				class="ma-0"
				justify="center"
			>
				<v-btn-toggle
					v-model="model"
					mandatory
					class="toggle_btn"
				>
					<v-row class="ma-0">
						<v-col
							v-for="(item, n) in tabItems"
							:key="n"
							:cols="fill !== undefined ? '' : cols !== undefined ? cols : 4"
							align="center"
							class="pa-0 tab_02_btn"
						>
							<v-btn
								elevation="0"
								:color="model === n ? '#010101' : '#eff3f6'"
								block
								@click="pushModel(item, n)"
							>
								<v-icon
									v-if="model === n"
									color="white"
								>
									check
								</v-icon>
								<p
									v-if="typeof item === 'string'"
									:class="model === n ? 'tab_02_btn_active' : ''"
								>
									{{ item }}
								</p>
								<p
									v-if="typeof item === 'object'"
									:class="model === n ? 'tab_02_btn_active' : ''"
								>
									{{ item.title }}
								</p>
							</v-btn>
						</v-col>
					</v-row>
				</v-btn-toggle>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'TypeTab02',
	mixins: [model],
	props: ['tabItems', 'fill', 'cols'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		pushModel(item, n) {
			console.log('pushModel', item, n)
			console.log('pushModel', typeof item === 'object')
			let value

			if (typeof item === 'object') value = item
			else value = n

			this.$emit('submit', value)
		},
	},
}
</script>
<style scoped lang="scss">
.tab_02_bottom_border {
	border-bottom: 1px solid #010101;
}
.tab_02_btn {
	.v-btn {
		border-radius: 0 !important;
		width: 200px !important;
		height: 42px !important;
		font-size: 12px !important;
	}
	p {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 14px;
		color: #5f6062;
	}
}
.tab_02_btn_active {
	color: #fff !important;
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.tab_02_btn {
		.v-btn {
			width: 114px !important;
			height: 36px !important;
		}
		p {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 12px !important;
			color: #5f6062;
		}
	}
}
@media all and (max-width: 380px) {
	.tab_02_btn {
		.v-btn {
			width: 105px !important;
			height: 36px !important;
		}
		p {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 12px !important;
			color: #5f6062;
		}
	}
}
</style>
