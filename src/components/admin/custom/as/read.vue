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
								title="상태"
								:text="readItem.progress_state_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="ID"
								:text="readItem.login_id"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이름"
								:text="readItem.name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="휴대폰"
								:text="readItem.hand"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="분류"
								:text="readItem.kind_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="접수일시"
								:text="readItem.receipt_date"
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
								v-model="models.status"
								title="상태수정"
								:radio-group="admin_as_statusItems"
								:fill="true"
							/>
						</v-col>
						<v-col
							v-if="models.status !== 0"
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="처리자"
								:text="models.treat_userid"
							/>
						</v-col>
						<v-col
							v-if="models.status !== 0"
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="처리일시"
								:text="models.treat_date"
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
							:disabled="checkStatus"
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
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminCustomAsRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		models: {
			status: null,
		},
		file: null,
	}),
	computed: {
		checkStatus() {
			return this.models.status === this.readItem.status
		},
	},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
		this.models = {
			status: this.readItem.progress_state,
		}
		console.log('this.models', this.models)
		if (this.readItem?.file_url) {
			this.file = {
				text: this.readItem.file_url,
				button: {
					text: '파일 확인',
					color: 'primary',
					link: this.readItem.file_url,
				},
			}
		}
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		resetData() {
			this.models = {
				status: null,
			}
			this.file = null
		},
		onApiCallStatusSave() {
			console.log(this.models)
			const item = {
				service_id: this.readItem.service_id,
				category: this.readItem.category,
				hand: this.readItem.hand,
				data_status_as: { value: this.models.status },
			}
			this.$emit('save', item)
			this.$emit('close')
		},
	},
}
</script>

<style scoped lang="scss"></style>
