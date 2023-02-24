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
								title="조회수"
								:text="String(readItem.hits)"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="참여자 수"
								:text="String(readItem.participants_cnt)"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="진행현황"
								:text="readItem.current_status_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="사용여부"
								:text="readItem.use_yn === 'Y' ? 'ON' : 'OFF'"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="대표이미지"
								:text-button="{
									text: readItem.image_url,
									button: {
										text: '대표이미지',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem.image_url)"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이벤트 제목"
								:text="readItem.event_title"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<CommonLoaderLine01 v-if="loading" />
							<AdminItemsTableItem
								v-else
								title="내용"
								:text-button="{
									text: event_desc,
									button: {
										text: '내용 확인',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="onViewDialog = true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="응모팝업 사용"
								:text="readItem.enter_yn === 'Y' ? 'ON' : 'OFF'"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="응모팝업 URL사용"
								:text="readItem.message_url_yn === 'Y' ? 'ON' : 'OFF'"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="당첨 확정 여부"
								:text="readItem.win_yn === 'Y' ? 'ON' : 'OFF'"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록자"
								:text="readItem.regi_userid"
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
					</v-row>
				</v-container>
				<v-row
					class="ma-0"
					align="center"
					justify="end"
				>
					<v-col
						cols="12"
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
				</v-row>
			</v-col>
		</v-card>

		<!-- editor viewer -->
		<CommonEditorQuillViewerDialog
			:dialog="onViewDialog"
			:html="event_desc"
			@close="onViewDialog = false"
		/>
	</v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import admin from '@/mixins/admin'
import common from '@/mixins/common'

export default {
	name: 'AdminMarketingEventRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		onViewDialog: false,
		event_desc: null,
		loading: false,
	}),
	computed: {},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
		this.getDetailData()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_MARKETING_EVENT']),
		async getDetailData() {
			this.loading = true
			this.ADMIN_ACT_MARKETING_EVENT({ method: 'detail', query: this.readItem.event_id }).then(res => {
				console.log('ADMIN_ACT_MARKETING_EVENT', res)
				this.loading = false
				this.event_desc = res.description
			})
		},
	},
}
</script>

<style scoped lang="scss"></style>
