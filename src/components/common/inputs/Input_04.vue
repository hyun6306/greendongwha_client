<template>
	<v-text-field
		v-model="inputModel"
		:label="label"
		:placeholder="placeholder"
		:disabled="disabled"
		:readonly="readonly"
		:class="className"
		:height="height"
		:type="type"
		:append-icon="check ? 'mdi-check' : ''"
		:rules="ruleCheck"
		dense
		outlined
		hide-details
	></v-text-field>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'Input04',
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
		ruleName: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 40,
		},
		type: {
			type: String,
			default: '',
		},
	},
	data: () => ({
		inputModel: null,
		rules: {
			required: v => !!v || '최소 2자 이상을 입력해주세요.',
			tel: v => !!v?.match(/^.*(?=^.{10,11}$)(?=.*\d).*$/) || '전화번호를 정확히 입력해 주세요.',
			password: v =>
				!!v?.match(/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=()]).*$/) ||
				'8자리 이상 15자리 이하 특수문자(!@#$%^&+=()) 와 숫자를 반드시 포함해서 만들어 주세요.',
			space: v => !v?.match(/\s/g) || '공백은 허용하지 않습니다.',
			email: v =>
				!!v?.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				) || 'e-mail형식에 맞게 작성해주세요.(ooo@ooo.ooo)',
		},
	}),
	computed: {
		ruleCheck() {
			if (this.passwordValue !== undefined)
				return [this.rules.password, this.passwordValue || '입력한 비밀번호와 동일하지 않습니다.']
			if (this.ruleName === 'password') return [this.rules.required, this.rules.space, this.rules.password]
			if (this.ruleName === 'tel') return [this.rules.required, this.rules.space, this.rules.tel]
			if (this.ruleName === 'email') return [this.rules.required, this.rules.space, this.rules.email]
			return [this.rules.required, this.rules.space]
		},
		check() {
			if (this.passwordValue !== undefined) return this.passwordValue
			if (this.ruleName) return this.rules[this.ruleName](this.inputModel) === true
			return this.rules.required(this.inputModel) === true
		},
	},
	watch: {
		check(val) {
			if (val === false) this.model = null
			console.log('check', val)
		},
		inputModel(val) {
			if (this.check) this.model = val
		},
	},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
.v-input {
	background: #fff !important;
}

:deep(.v-input__slot) {
	fieldset {
		border: 1px solid #ddd !important;
	}
}
:deep(.v-text-field__slot) {
	input {
		font-size: 15px !important;
		line-height: 2rem !important;
	}
}
:deep(.v-label) {
	top: 12px !important;
}
:deep(.v-label--active) {
	transform: translateY(-20px) scale(0.7) !important;
}
</style>
