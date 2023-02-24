<template>
	<v-row
		class="ma-0 pt-1"
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
				v-model="fileModel"
				multiple
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				outlined
				hide-details
				dense
				height="40"
				:show-size="1000"
				@change="fileChange"
			/>
		</v-col>
		<v-col v-if="model !== null && model.length">
			<v-chip-group
				active-class="primary--text"
				column
			>
				<v-chip
					v-for="(file, i) in model"
					:key="i"
					close
					class="pa-3"
					@click:close="remove(file)"
				>
					<v-row class="ma-0 name_area">
						<v-col
							v-if="file.name"
							cols="11"
							class="pa-0 image_name"
						>
							<span>{{ file.name }}</span>
						</v-col>
						<v-col
							v-else
							cols="1"
							class="pa-0 image_name"
						>
							<span>{{ file.split('/').pop().split('-').pop() }}</span>
						</v-col>
					</v-row>
				</v-chip>
			</v-chip-group>
		</v-col>
	</v-row>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'InputFile02',
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
	},
	data: () => ({
		fileModel: null,
	}),
	computed: {},
	watch: {
		// model(val){
		//     console.log('model', val)
		// }
	},
	created() {
		this.model = []
	},
	mounted() {},
	methods: {
		fileChange(event) {
			if (event === null) return
			for (let element of event) {
				if (element.name.length > 50) {
					this.$toastr.error('파일이름을 50자 이내로 지정해주세요.', '파일이름 오류', { timeOut: 2500 })
					return this.$refs.fileUpload.reset()
				}
				if (element.size > 200000000) {
					this.$toastr.error('전송할 수 있는 크기 범위를 넘었습니다.', '파일 크기 오류', { timeOut: 2500 })
					return this.$refs.fileUpload.reset()
				}
				this.model.push(element)
			}
		},
		remove(item) {
			this.model.splice(this.model.indexOf(item), 1)
			this.model = [...this.model]
		},
	},
}
</script>
<style scoped lang="scss">
.image_name {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 280px;
	max-width: 280px;
}
@media screen and (max-width: 1280px) {
	.image_name {
		min-width: 250px;
		max-width: 250px;
	}
}
@media screen and (max-width: 768px) {
	.image_name {
		min-width: 200px;
		max-width: 200px;
	}
}
@media screen and (max-width: 600px) {
	.image_name {
		min-width: 150px;
		max-width: 150px;
	}
}
@media screen and (max-width: 500px) {
	.image_name {
		min-width: 100px;
		max-width: 100px;
	}
}
@media screen and (max-width: 400px) {
	.image_name {
		min-width: 50px;
		max-width: 50px;
	}
}
</style>
