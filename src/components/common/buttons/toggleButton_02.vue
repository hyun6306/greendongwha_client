<template>
	<v-btn-toggle
		v-model="model"
		multiple
		color="primary"
		class="w100"
	>
		<v-row
			v-if="APP_GET_APP_STATE !== 'web'"
			class="ma-0"
		>
			<v-col
				v-for="(item, i) in items"
				:key="i"
				cols="6"
				class="pa-0"
			>
				<v-btn
					block
					outlined
					class="item"
				>
					{{ item.title }}
				</v-btn>
			</v-col>
		</v-row>
		<v-btn
			v-for="(item, i) in items"
			v-else
			:key="i"
			outlined
			class="item px-4"
		>
			{{ item.title }}
		</v-btn>
	</v-btn-toggle>
</template>

<script>
import { mapGetters } from 'vuex'
import model from '@/mixins/model'

export default {
	name: 'ToggleButton01',
	mixins: [model],
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE']),
	},
	watch: {
		model(val) {
			this.items.map(x => {
				x.active = false
				return x
			})
			if (val?.length) {
				for (let i of val) {
					this.items[i].active = true
				}
			}
			console.log('model', this.items)
		},
	},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
:deep(.v-input--selection-controls__input) {
	margin-top: 4px !important;
}
.v-btn--active {
	color: #fff !important;
	font-weight: bold !important;
	background: #44883d !important;
}
.item {
	background-color: #fff;
	cursor: pointer;
	.txt {
		color: #262626;
		font-size: 14px;
		font-family: 'NotoSansKR-Regular';
	}
}
</style>
