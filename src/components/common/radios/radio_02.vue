<template>
	<v-row
		class="ma-0"
		align="center"
	>
		<v-col
			class="pa-0"
			align="center"
		>
			<v-radio-group
				v-model="model"
				:readonly="readonly"
				:disabled="disabled"
				row
				hide-details
				dense
			>
				<v-radio
					v-for="(item, i) in items"
					:key="i"
					:label="item.text"
					:value="item.value"
				></v-radio>
			</v-radio-group>
		</v-col>
	</v-row>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'Radio02',
	components: {},
	mixins: [model],
	props: ['items', 'readonly', 'disabled'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
.v-input--selection-controls {
	margin-top: 0;
}
</style>
