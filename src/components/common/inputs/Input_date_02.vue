<template>
	<v-menu
		ref="menu"
		v-model="menu"
		:close-on-content-click="false"
		:return-value.sync="date"
		:disabled="readonly"
		transition="scale-transition"
		offset-y
		persistent
		min-width="auto"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				v-model="dateText"
				prepend-inner-icon="mdi-calendar"
				readonly
				outlined
				hide-details
				dense
				v-bind="attrs"
				:height="height"
				v-on="on"
			></v-text-field>
		</template>
		<v-date-picker
			v-model="model"
			:readonly="readonly"
			color="primary"
			@input="menu = false"
		/>
	</v-menu>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'InputDate02',
	components: {},
	mixins: [model],
	props: {
		label: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		disabled: {},
		readonly: {},
		className: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 44,
		},
	},
	data: () => ({
		date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
		menu: false,
	}),
	computed: {
		dateText() {
			return this.model === null ? null : this.model
		},
	},
	watch: {
		model(val) {
			this.date = val
		},
	},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
:deep(.v-btn .v-btn--active) {
	background-color: $color-primary !important;
}
:deep(.v-input__prepend-inner) {
	margin-top: 0.75rem !important;
}
:deep(.v-text-field__slot) {
	input {
		font-size: 13px !important;
		line-height: 2rem !important;
	}
}
</style>
