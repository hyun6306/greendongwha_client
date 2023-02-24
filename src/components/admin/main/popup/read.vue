<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				title="팝업 내용 확인"
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
								title="제목"
								:text="readItem.title"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="사용여부"
								:text="readItem.use_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="노출기간"
								:text="readItem.showDate.join(' ~ ')"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="노출위치"
								:text="readItem.location"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="팝업창 종류"
								:text="readItem.popup_kind"
								:fill="true"
							/>
						</v-col>
						<v-col
							v-if="readItem.popup_kind === 'IMAGE'"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이미지"
								:text-button="{
									text: readItem.popup_url,
									button: {
										text: '이미지',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem.popup_url)"
							/>
						</v-col>
						<v-col
							v-if="readItem.popup_kind === 'IMAGE' && readItem.popuplink_url"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="랜딩링크"
								:text-button="{
									text: readItem.popuplink_url,
									button: {
										text: '링크보기',
										color: 'primary',
										link: readItem.popuplink_url,
									},
								}"
								:fill="true"
							/>
						</v-col>
						<v-col
							v-if="readItem.popup_kind === 'VIDEO'"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="영상링크"
								:text="readItem.popup_url"
								:fill="true"
							/>
						</v-col>
						<v-col
							v-if="readItem.popup_kind === 'EDITOR'"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="내용"
								:text-button="{
									text: readItem.content,
									button: {
										text: 'Viewer 열기',
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
		<CommonEditorQuillViewerDialog
			:dialog="onViewDialog"
			:html="readItem.content"
			@close="onViewDialog = false"
		/>
	</v-dialog>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'AdminMainPopupRead',
	mixins: [common],
	props: ['dialog', 'readItem'],
	data: () => ({
		onViewDialog: false,
	}),
	computed: {},
	watch: {},
	created() {
		console.log('readItem', this.readItem)
	},
	mounted() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss"></style>
