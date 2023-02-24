<template>
	<div class="custom_input">
		<v-text-field
			v-model="model"
			outlined
			:type="type"
			:label="label"
			:placeholder="placeholder"
			class="mb-6"
		/>
	</div>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'Input01',
	components: {},
	mixins: [model],
	props: {
		label: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
	},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.custom_input {
	:deep(.v-input__slot) {
		border-radius: 0;

		fieldset {
			border: none;
			border-bottom: 2px solid #00582c;
		}
	}

	:deep(.v-input--is-focused .v-input__slot) {
		fieldset {
			border: 0.1em solid #42883d !important;
		}
	}

	:deep(.v-text-field__details) {
		display: none !important;
	}
	:deep(.v-label) {
		padding: 0 5px;
		font-family: 'NotoSansKR-Medium';
		font-size: 14px !important;
		background-color: #fff;
		z-index: 1;
	}
	:deep(.v-label--active) {
		transform: translateY(-28px) scale(1);
	}
	:deep(.v-text-field--outlined > .v-input__control > .v-input__slot) {
		min-height: 46px !important;
	}
}
</style>
