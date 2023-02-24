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
								title="휴대폰"
								:text="common_number_filter(readItem.hand)"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="문의유형"
								:text="readItem.service_kind_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="품목"
								:text="readItem.subject_name"
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
							class="pa-0"
						>
							<AdminItemsTableItem
								title="우편번호"
								:text="readItem.zipcode"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="주소"
								:text="readItem.address1"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상세주소"
								:text="readItem.address2"
								:fill="true"
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
								title="첨부파일"
								:text-button="file"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="상태"
								:text="readItem.progress_state_name"
								:fill="true"
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
	name: 'AdminCustomQuestionRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		file: {},
		answer: '',
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		checkAnswers() {
			return this.answer?.length
		},
	},
	watch: {
		answer(val) {
			console.log('answer', val)
		},
	},
	created() {
		console.log('this.readItem', this.readItem)

		// 파일 링크가 있는경우
		if (this.readItem.link) {
			this.file = {
				text: this.readItem.link,
				button: {
					text: '파일 확인',
					color: 'primary',
					link: this.readItem.link,
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
		...mapActions(['ADMIN_ACT_CUSTOM_AS']),
		resetData() {
			this.models = {
				status: null,
			}
			this.file = null
		},
		changeStatus(item) {
			console.log(item)
		},
		async onApiCallStatusSave() {
			this.loading = true
			const params = {
				service_id: this.readItem.service_id,
				category: this.readItem.category,
				progress_state: '2', // 1: 문의,  2: 답변완료
				conf_userid: this.AUTH_GET_ADMIN_USER.login_id,
				conf_contents: this.answer,
			}
			const items = { method: 'edit', params: params }

			await this.ADMIN_ACT_CUSTOM_AS(items)
				.then(res => {
					console.log('ADMIN_ACT_CUSTOM_AS', res)
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
