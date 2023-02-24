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
								title="조회수"
								:text="editItem ? String(editItem.hits) : ''"
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
								v-if="models.image_url === null"
								v-model="image_url"
								title="*대표이미지"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="대표이미지"
								:text-button="{
									text: image_url,
									button: {
										text: '대표이미지 삭제',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="deleteImageUrl"
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
									text: models.description,
									button: {
										text: 'Editor 편집',
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
								v-if="models.attach_url === null"
								v-model="attach_url"
								title="첨부파일"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="첨부파일"
								:text-button="{
									text: attach_url,
									button: {
										text: '첨부파일 삭제',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="
									models.attach_url = null
									attach_url = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="editItem"
								title="등록자"
								:text="editItem.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="editItem"
								title="등록일"
								:text="editItem.regi_date"
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

		<!-- editor -->
		<CommonEditorQuillEditorDialog
			v-if="onEditDialog"
			:dialog="onEditDialog"
			:edit-contents="models.description"
			@save="contentSave"
			@close="onEditDialog = false"
		/>

		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminDisplayKnowHowCreate',
	mixins: [common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			use_yn: 'N',

			theme_code: null,

			image_url: null,
			attach_url: null,

			title: null,
			description: null,
		},
		origin: {},
		onEditDialog: false,
		loading: false,

		image_url: null,
		attach_url: null,

		themeCodeItems: null,

		description: null,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['use_yn', 'theme_code']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['title', 'description']
			check = this.common_allowTextCheck(this.models, checkText)
			if (check) return true

			return this.image_url === null
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
	},
	async created() {
		await this.getPublicCode()
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions([
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			// 노하우 API
			'ADMIN_ACT_DISPLAY_KNOW_HOW',
		]),
		deleteImageUrl() {
			this.models.image_url = null
			this.image_url = null
		},
		async getPublicCode() {
			this.loading = true
			// 테마 코드 가져오기
			this.themeCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '401' })

			if (this.editItem && this.mode === 'edit') {
				this.ADMIN_ACT_DISPLAY_KNOW_HOW({ method: 'detail', query: this.editItem.knowhow_id }).then(res => {
					this.description = res.description
					this.startDataMapping()
				})
			}
			this.loading = false

			console.log('editItem', this.editItem, this.models, this.dialog)
		},
		startDataMapping() {
			this.models = {
				use_yn: this.editItem.use_yn,

				theme_code: this.editItem.theme_code
					? this.common_findItem(this.editItem.theme_code, this.themeCodeItems, 'code')
					: null,

				image_url: this.editItem.image_url,
				attach_url: this.editItem.attach_url,

				title: this.editItem.title,
				description: this.description,
			}

			if (this.editItem.image_url) {
				this.image_url = this.editItem.image_url
			} else {
				this.image_url = null
				this.models.image_url = null
			}
			if (this.editItem.attach_url) {
				this.attach_url = this.editItem.attach_url
			} else {
				this.attach_url = null
				this.models.attach_url = null
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			;(this.models = {
				use_yn: 'N',

				theme_code: null,

				image_url: null,
				attach_url: null,

				title: null,
				description: null,
			}),
				(this.origin = {})
			this.onEditDialog = false
			this.loading = false
			this.image_url = null
			this.attach_url = null
			this.themeCodeItems = null
			this.description = null
		},
		contentSave(content) {
			this.models.description = content
			console.log('contentSave', content)
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				use_yn: this.models.use_yn, // 상태

				theme_code: this.models.theme_code ? this.models.theme_code.code : '', // 테마코드

				title: this.models.title, // 제목
				description: this.models.description, // 내용
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // user id
			}

			// 수정일 경우 hw_id 추가
			if (this.mode === 'edit') {
				params.knowhow_id = this.editItem.knowhow_id
				// description 변경이 없을시 삭제
				if (this.description === this.models.description) {
					delete params['description']
				}
			}

			// image 수정 > 필수값이므로 수정만 제공
			if (this.mode === 'create') params.image = this.image_url
			if (this.mode === 'edit') {
				if (this.image_url !== this.editItem.image_url) {
					params.image = this.image_url
					params.image_url = this.editItem.image_url
				}
			}

			// attach 수정
			if (this.mode === 'create' && this.attach_url !== null) params.attach = this.attach_url
			if (this.mode === 'edit') {
				if (this.attach_url !== this.models.attach_url) params.attach = this.attach_url
				// 기존 첨부파일 삭제
				if (this.editItem.attach_url !== null && this.models.attach_url === null)
					params.attach_url = this.editItem.attach_url
			}

			console.log('params', params)
			const items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_DISPLAY_KNOW_HOW(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_DISPLAY_KNOW_HOW', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
