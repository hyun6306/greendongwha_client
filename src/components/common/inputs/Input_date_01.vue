<template>
	<v-dialog
		v-model="menu"
		:return-value.sync="date"
		persistent
		width="290px"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				v-model="dateRangeText"
				prepend-inner-icon="mdi-calendar"
				dense
				readonly
				outlined
				hide-details
				v-bind="attrs"
				:height="height"
				v-on="on"
			></v-text-field>
		</template>
		<v-date-picker
			v-model="dateModel"
			range
			:readonly="readonly"
			color="primary"
		>
			<v-spacer></v-spacer>
			<v-btn
				text
				color="primary"
				@click="cancel"
			>
				취소
			</v-btn>
			<v-btn
				text
				color="primary"
				@click="confirm"
			>
				확인
			</v-btn>
		</v-date-picker>
	</v-dialog>
</template>

<script>
import model from '@/mixins/model'
import moment from '@/mixins/moment'

export default {
	name: 'InputDate01',
	components: {},
	mixins: [model, moment],
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
			default: 40,
		},
	},
	data: () => ({
		date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
		menu: false,
		dateModel: null,
	}),
	computed: {
		dateRangeText() {
			return this.dateModel === null ? (this.model === null ? null : this.model.join(' ~ ')) : this.dateModel.join(' ~ ')
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		confirm() {
			this.model = this.moment_date_sort(this.dateModel)
			this.menu = false
		},
		cancel() {
			this.dateModel = null
			this.menu = false
		},
	},
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
