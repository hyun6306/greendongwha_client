<template>
	<v-row
		class="ma-0"
		align="center"
	>
		<v-col
			cols="12"
			sm="4"
			md="3"
			lg="2"
			class="pa-0"
		>
			<CommonButtonsButton01
				name="파일선택"
				color="#9fa1a4"
				class-name="olive"
				height="40"
				:disabled="readonly"
				@click="$refs.fileUpload.$refs.input.click()"
			/>
		</v-col>
		<v-col
			cols="12"
			sm="8"
			md="9"
			lg="10"
			class="pa-0 pl-2 d-none d-sm-flex"
		>
			<v-file-input
				ref="fileUpload"
				v-model="model"
				:multiple="multiple"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				outlined
				hide-details
				dense
				height="40"
				:show-size="1000"
				@change="fileChange"
			>
				<template v-slot:selection="{ index, text }">
					<v-chip
						v-if="index < 2"
						color="primary accent-4"
						dark
						label
						small
					>
						{{ text }}
					</v-chip>

					<span
						v-else-if="index === 2"
						class="text-overline grey--text text--darken-3 mx-2"
						>+{{ model.length - 2 }} File(s)</span
					>
				</template>
			</v-file-input>
		</v-col>
	</v-row>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'InputFile01',
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
		multiple: {
			type: Boolean,
			default: false,
		},
		disabled: {},
		readonly: {},
		removeIcon: {
			type: Boolean,
			default: false,
		},
		hideIcon: {},
	},
	data: () => ({
		fileModel: null,
	}),
	computed: {},
	watch: {
		model(val) {
			console.log('first file', val)
		},
	},
	created() {},
	mounted() {
		if (this.hideIcon !== undefined) {
			let select = document.getElementsByClassName('v-input__icon--prepend')
			for (let element of select) {
				element.innerHTML = ''
			}
		}
	},
	methods: {
		fileChange(event) {
			console.log(event)
			if (event === null) return
			if (event.name.length > 50) {
				this.$toastr.error('파일이름을 50자 이내로 지정해주세요.', '파일이름 오류', { timeOut: 2500 })
				return this.$refs.fileUpload.reset()
			}
			if (event.size > 200000000) {
				this.$toastr.error('전송할 수 있는 크기 범위를 넘었습니다.', '파일 크기 오류', { timeOut: 2500 })
				return this.$refs.fileUpload.reset()
			}
			if (this.imageTypeCheck(event.type)) {
				this.$toastr.error('첨부할 수 없는 파일형식 입니다.', '파일 오류', { timeOut: 2500 })
				return this.$refs.fileUpload.reset()
			}
		},
		imageTypeCheck(type) {
			let check = true
			switch (type) {
				case 'image/png':
					check = false
					break
				case 'image/jpg':
					check = false
					break
				case 'image/jpeg':
					check = false
					break
				case 'image/webp':
					check = false
					break
				case 'image/gif':
					check = false
					break
				case 'application/pdf':
					check = false
					break
			}
			return check
		},
	},
}
</script>
<style scoped lang="scss">
:deep(.v-input__slot) {
	fieldset {
		border: 1px solid #ddd !important;
	}
}
</style>
