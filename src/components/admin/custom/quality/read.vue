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
								:text="readItem.conf_state_name"
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
								title="고객 연락처"
								:text="common_number_filter(readItem.regi_userhand)"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="구입일"
								:text="readItem.purchase_date"
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
								title="비고"
								:text="readItem.bigo"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="품질보증번호"
								:text="readItem.guarantee_no"
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
								:text="readItem.conf_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록일"
								:text="readItem.regi_date"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.status"
								title="상태수정"
								:radio-group="admin_quality_statusItems"
								:fill="true"
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
	name: 'AdminCustomQualityRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		models: {
			status: null,
		},
	}),
	computed: {
		checkStatus() {
			return this.models.status === this.readItem.conf_state
		},
	},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
		this.models = {
			status: this.readItem.conf_state,
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
		},
		onApiCallStatusSave() {
			console.log(this.models)
			const item = {
				guarantee_id: this.readItem.guarantee_id,
				data_status_quality: { value: this.models.status },
			}
			this.$emit('save', item)
			this.$emit('close')
		},
	},
}
</script>

<style scoped lang="scss"></style>
