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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.use_yn"
								title="*사용여부"
								radio
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.main_yn"
								title="*메인노출여부"
								radio
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="themeCodeItems"
								v-model="models.theme_code"
								title="*테마"
								:select="themeCodeItems"
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
								v-model="models.video_url"
								title="*동영상 링크"
								input
								:fill="true"
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
									@click="confirm"
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
									:disabled="allowValue"
									elevation="0"
									@click="confirm"
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

		<!-- editor -->
		<CommonEditorQuillEditorDialog
			v-if="onEditDialog"
			:dialog="onEditDialog"
			:edit-contents="models.description"
			@save="contentSave"
			@close="onEditDialog = false"
		/>

		<CommonLoading v-if="loading" />

		<CommonConfirm
			:dialog="confirmDialog"
			:title="`삭제`"
			:text="confirmText"
			@close="confirmDialog = false"
			@submit="confirmCallback"
		/>
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminDisplayMaruTvCreate',
	mixins: [common, admin],
	props: ['title', 'dialog', 'mode', 'editItem', 'themeCodeItems', 'isExistsMain'],
	data: () => ({
		models: {
			use_yn: 'Y',
			main_yn: 'N',
			theme_code: null,
			title: null,
			video_url: null,
		},
		origin: {},
		onEditDialog: false,
		loading: false,
		confirmDialog: false,
		confirmText: '',
		confirmCallback: () => ({}),
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const requireText = ['title', 'video_url']
			let check = this.common_allowTextCheck(this.models, requireText)
			if (check) return true

			const requireValue = ['use_yn', 'main_yn', 'theme_code']
			check = this.common_allowValueCheck(this.models, requireValue)
			if (check) return true

			return false
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
	},
	async created() {
		if (this.mode === 'edit') this.startDataMapping()
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_DISPLAY_MARU_TV']),
		startDataMapping() {
			this.models = {
				use_yn: this.editItem.use_yn,
				main_yn: this.editItem.main_yn,
				theme_code: this.editItem.theme_code
					? this.common_findItem(this.editItem.theme_code, this.themeCodeItems, 'code')
					: null,
				title: this.editItem.title,
				video_url: this.editItem.video_url,
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				use_yn: null,
				main_yn: null,
				theme_code: null,
				title: null,
				video_url: null,
			}
			this.origin = {}
			this.onEditDialog = false
			this.loading = false
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				use_yn: this.models.use_yn,
				main_yn: this.models.main_yn,
				title: this.models.title,
				video_url: this.models.video_url,
				theme_code: this.models.theme_code?.code || '',
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
			}

			if (this.mode === 'edit') params.knowhow_id = this.editItem.knowhow_id
			const items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_DISPLAY_MARU_TV(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_DISPLAY_MARU_TV', e)
				this.loading = false
			}
		},
		confirm() {
			this.confirmCallback = this.onApiCallItem
			this.confirmDialog = true

			if (this.isExistsMain && this.models.main_yn === 'Y') {
				this.confirmText = '메인 노출을 변경하시겠습니까?'
				return
			}

			if (!this.isExistsMain && this.models.main_yn === 'N') {
				this.confirmText = '메인 노출을 선택 후 등록해주세요'
				this.confirmCallback = () => (this.confirmDialog = false)
				return
			}

			this.confirmText = '등록 하시겠습니까?'
		},
	},
}
</script>

<style scoped lang="scss"></style>
