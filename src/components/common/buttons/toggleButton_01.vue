<template>
	<v-btn-toggle
		v-model="model"
		multiple
		color="olive accent-3"
		class="pa-0 ma-0"
		:style="`width: 100%`"
	>
		<v-col
			v-if="APP_GET_APP_STATE !== 'web'"
			cols="12"
			md="auto"
			class="pa-0"
		>
			<v-btn
				v-for="(item, i) in items"
				:key="i"
				:width="width"
				block
			>
				<v-col
					class="pa-0"
					align="start"
				>
					<v-checkbox
						v-model="item.active"
						:label="item.title"
					></v-checkbox>
				</v-col>
			</v-btn>
		</v-col>
		<v-btn
			v-for="(item, i) in items"
			v-else
			:key="i"
			:width="width"
		>
			<v-checkbox
				v-model="item.active"
				:label="item.title"
			></v-checkbox>
		</v-btn>
	</v-btn-toggle>
</template>

<script>
import { mapGetters } from 'vuex'
import model from '@/mixins/model'

export default {
	name: 'ToggleButton01',
	mixins: [model],
	props: ['items', 'width'],
	data: () => ({}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE']),
	},
	watch: {
		model(val) {
			console.log('model', val)
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
</style>
