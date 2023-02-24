<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="`${title} 내용 확인`"
				@close="$emit('close')"
			/>
			<v-col class="pa-0 pa-md-3">
				<v-container class="admin_table">
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="ID"
								:text="readItem.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="접수일시"
								:text="readItem.regi_date"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이름"
								:text="readItem.regi_username"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="인테리어점"
								:text="readItem.business_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="휴대폰"
								:text="readItem.hand ? common_number_filter(readItem.hand) : ''"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상태"
								:text="readItem.progress_state_name"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="제목"
								:text="readItem.title"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="내용"
								:text="readItem.contents"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.file === null"
								v-model="file"
								title="첨부파일"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="첨부파일"
								:text-button="fileDeleteButton"
								:fill="true"
								@click="
									models.file = null
									file = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="answer"
								title="답변"
								textarea
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="처리자"
								:text="readItem.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="처리일시"
								:text="readItem.regi_date"
							/>
						</v-col>
					</v-row>
				</v-container>
				<v-row
					class="ma-0"
					align="center"
					justify="end"
				>
					<v-col
						cols="6"
						sm="4"
						md="3"
						lg="2"
					>
						<v-btn
							color="error"
							block
							tile
							elevation="0"
							@click="$emit('close')"
						>
							<v-icon>clear</v-icon>
							<span class="ml-2">닫기</span>
						</v-btn>
					</v-col>
					<v-col
						cols="6"
						sm="4"
						md="3"
						lg="2"
					>
						<v-btn
							color="secondary"
							block
							tile
							elevation="0"
							:disabled="!checkAnswers"
							@click="onApiCallStatusSave"
						>
							<v-icon>save</v-icon>
							<span class="ml-2">저장</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminCustomInteriorQuestionRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		models: {
			file: null,
		},
		file: null,
		fileDeleteButton: {},
		answer: '',
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		checkAnswers() {
			return this.answer?.length
		},
	},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)

		// 파일 링크가 있는경우
		this.models.file = this.readItem.file_url

		if (this.readItem.file_url) {
			this.file = this.readItem.file_url
			this.fileDeleteButton = {
				text: this.readItem.file_url,
				button: {
					text: '파일 삭제',
					color: 'primary',
				},
			}
		}

		// 답변 내용이 있을 경우
		if (this.readItem.conf_contents) {
			this.answer = this.readItem.conf_contents
		}
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_CUSTOM_INTERIOR_QUESTION']),
		resetData() {
			this.models = {
				file: null,
				status: null,
			}
			this.file = null
			this.answer = null
		},
		async onApiCallStatusSave() {
			this.loading = true
			const params = {
				service_id: this.readItem.service_id,
				conf_userid: this.AUTH_GET_ADMIN_USER.login_id,
				conf_contents: this.answer || '', // 답변
				progress_state: this.readItem.progress_state, // 상담상태
			}

			// file 삭제 > file_url만 보내기
			if (this.file === null && this.models.file === null) {
				params.file_url = this.readItem.file_url
			}
			// file 수정
			// 기존 file_url과 등록할 fileurl 함께 보내기
			if (this.file != null && this.file !== this.readItem.file_url) {
				params.fileurl = this.file
				if (this.readItem.file_url) params.file_url = this.readItem.file_url
			}

			const items = { method: 'edit', params: params }

			await this.ADMIN_ACT_CUSTOM_INTERIOR_QUESTION(items)
				.then(res => {
					console.log('ADMIN_ACT_CUSTOM_INTERIOR_QUESTION', res)
					this.loading = false
					this.$emit('close')
				})
				.catch(() => {
					this.loading = false
					this.$emit('close')
				})
		},
	},
}
</script>

<style scoped lang="scss"></style>
