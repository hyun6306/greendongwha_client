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
								title="구분"
								:text="readItem.notice_kind_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="중요여부"
								:text="readItem.important"
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
							<CommonLoaderLine01 v-if="loading" />
							<AdminItemsTableItem
								v-else
								title="내용"
								:text-button="{
									text: contents,
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
							class="pa-0"
						>
							<AdminItemsTableItem
								title="첨부파일1"
								:text-button="file1"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="첨부파일2"
								:text-button="file2"
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
				</v-row>
			</v-col>
		</v-card>

		<!-- editor viewer -->
		<CommonEditorQuillViewerDialog
			:dialog="onViewDialog"
			:html="contents"
			@close="onViewDialog = false"
		/>
	</v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminCustomNoticeRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		onViewDialog: false,
		file1: {},
		file2: {},
		contents: null,
		loading: false,
	}),
	computed: {},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)

		if (this.readItem.file_url1) {
			this.file1 = {
				text: this.readItem.file_url1,
				button: {
					text: '파일 확인',
					color: 'primary',
					link: this.readItem.file_url1,
				},
			}
		}
		if (this.readItem.file_url2) {
			this.file2 = {
				text: this.readItem.file_url2,
				button: {
					text: '파일 확인',
					color: 'primary',
					link: this.readItem.file_url2,
				},
			}
		}
		this.getDetailData()
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_CUSTOM_NOTICE']),
		async getDetailData() {
			this.loading = true
			this.ADMIN_ACT_CUSTOM_NOTICE({ method: 'detail', query: this.readItem.notice_id }).then(res => {
				this.loading = false
				this.contents = res.description
			})
		},
		resetData() {
			this.onViewDialog = false
			this.file1 = {}
			this.file2 = {}
		},
	},
}
</script>

<style scoped lang="scss"></style>
