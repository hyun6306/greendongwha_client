<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="mode === 'create' ? `${title} 등록` : `${title} 수정`"
				@close="$emit('close')"
			/>
			<v-col class="pa-3 pa-md-5">
				<v-container class="admin_table">
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.important"
								title="*중요여부"
								:select="admin_notice_importantItems"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="*제목"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*내용"
								:text-button="{
									text: models.contents,
									button: {
										text: 'Editor 열기',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="onEditDialog = true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.file1 === null"
								v-model="file1"
								title="첨부파일1"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="첨부파일1"
								:text-button="file1DeleteButton"
								:fill="true"
								@click="
									models.file1 = null
									file1 = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.file2 === null"
								v-model="file2"
								title="첨부파일2"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="첨부파일2"
								:text-button="file2DeleteButton"
								:fill="true"
								@click="
									models.file2 = null
									file2 = null
								"
							/>
						</v-col>
					</v-row>
				</v-container>
				<v-row
					class="ma-0"
					align="center"
					justify="center"
				>
					<v-col
						cols="12"
						md="6"
						class="pl-0"
					>
						<v-row class="ma-0">
							<v-col cols="6">
								<v-btn
									color="error"
									block
									tile
									elevation="0"
									@click="$emit('close')"
								>
									<v-icon>clear</v-icon>
									<span class="ml-2">취소</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'create'"
								cols="6"
							>
								<v-btn
									color="primary"
									block
									tile
									elevation="0"
									:disabled="allowValue"
									@click="onApiCallItem"
								>
									<v-icon>add</v-icon>
									<span class="ml-2">등록</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'edit'"
								cols="6"
							>
								<v-btn
									color="secondary"
									block
									tile
									elevation="0"
									:disabled="allowValue"
									@click="onApiCallItem"
								>
									<v-icon>edit</v-icon>
									<span class="ml-2">수정</span>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-card>
		<CommonEditorQuillEditorDialog
			v-if="onEditDialog"
			:dialog="onEditDialog"
			:edit-contents="models.contents"
			@save="contentSave"
			@close="onEditDialog = false"
		/>
		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminCustomInteriorNoticeCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			division: null,
			important: null,
			title: null,
			contents: null,
			file1: null,
			file2: null,
		},
		contents: null,
		file1: null,
		file2: null,
		file1DeleteButton: null,
		file2DeleteButton: null,
		onEditDialog: false,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['important']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['title', 'contents']
			return this.common_allowTextCheck(this.models, checkText)
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
		contents(val) {
			this.contents = val
		},
	},
	created() {
		if (this.editItem && this.mode === 'edit') {
			this.loading = true
			this.ADMIN_ACT_CUSTOM_NOTICE({ method: 'detail', query: this.editItem.notice_id }).then(res => {
				this.contents = res.description
				this.startDataMapping()
			})
			this.loading = false
		}
		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_CUSTOM_NOTICE']),
		startDataMapping() {
			this.models = {
				important: this.admin_notice_importantItems.find(item => item.value === this.editItem.important_yn),
				title: this.editItem.title,
				contents: this.contents,
				file1: this.editItem.file_url1,
				file2: this.editItem.file_url2,
			}

			if (this.editItem.file_url1) {
				this.file1 = this.editItem.file_url1
				this.file1DeleteButton = {
					text: this.editItem.file_url1,
					button: {
						text: '파일 삭제',
						color: 'primary',
					},
				}
			} else {
				this.file1 = null
				this.models.file1 = null
			}

			if (this.editItem.file_url2) {
				this.file2 = this.editItem.file_url2
				this.file2DeleteButton = {
					text: this.editItem.file_url2,
					button: {
						text: '파일 삭제',
						color: 'primary',
					},
				}
			} else {
				this.file2 = null
				this.models.file2 = null
			}

			this.startDate = this.editItem.startDate

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				important: null,
				title: null,
				contents: null,
				startDate: null,
				file1: null,
				file2: null,
			}
			this.file1 = null
			this.file2 = null
			this.file1DeleteButton = null
			this.file2DeleteButton = null
			this.onEditDialog = false
			this.origin = {}
			this.contents = null
			this.startDate = null
		},
		contentSave(item) {
			this.models.contents = item
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				notice_kind: '3', // 1:공지사항(일반사용자)  2:동화뉴스,  3: 공지사항(인테리어점)
				title: this.models.title || '',
				contents: this.models.contents || '',
				important_yn: this.models.important?.value || '',
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // 등록자ID
			}

			if (this.mode === 'create') {
				// 등록
				// 이미지가 있는 경우 image param을 추가 없는 경우 param명을 넣지 않음
				if (this.file1 != null) params.fileurl1 = this.file1
				if (this.file2 != null) params.fileurl2 = this.file2
			} else {
				params.notice_id = this.editItem.notice_id

				// contents 변경이 없을시 삭제
				if (this.contents === this.models.contents) {
					delete params['contents']
				}

				// file1 삭제 > file_url1만 보내기
				if (this.file1 === null && this.models.file1 === null) {
					params.file_url1 = this.editItem.file_url1
				}
				// file1 수정
				// 기존 file_url1과 등록할 fileurl1 함께 보내기
				if (this.file1 != null && this.file1 !== this.editItem.file_url1) {
					params.fileurl1 = this.file1
					if (this.editItem.file_url1) params.file_url1 = this.editItem.file_url1
				}

				// file2 삭제 > file_url2만 보내기
				if (this.file2 === null && this.models.file2 === null) {
					params.file_url2 = this.editItem.file_url2
				}
				// file2 수정
				// 기존 file_url2과 등록할 fileurl2 함께 보내기
				if (this.file2 != null && this.file2 !== this.editItem.file_url2) {
					params.fileurl2 = this.file2
					if (this.editItem.file_url2) params.file_url2 = this.editItem.file_url2
				}
			}

			console.log('params', params)
			const items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_CUSTOM_NOTICE(items).then(() => {
					this.loading = false
					this.$emit('close')
				})
			} catch (e) {
				console.log('ADMIN_ACT_CUSTOM_NOTICE', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
