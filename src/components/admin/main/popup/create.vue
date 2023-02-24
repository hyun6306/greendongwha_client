<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="mode === 'create' ? '팝업 등록' : '팝업 수정'"
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
								v-model="models.title"
								title="*제목"
								input
							/>
						</v-col>
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
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="showDate"
								title="*노출기간"
								date-picker
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.location"
								title="*노출위치"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.popup_kind"
								title="*팝업창 종류"
								:radio-group="[
									{ text: '이미지형', value: 'IMAGE' },
									{ text: '에디터형', value: 'EDITOR' },
									{ text: '영상', value: 'VIDEO' },
								]"
								:fill="true"
							/>
						</v-col>
						<v-col
							v-if="models.popup_kind === 'IMAGE'"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.popup_url === null"
								v-model="image_url"
								title="*이미지 등록"
								file
								:fill="true"
								placeholder="jpg / png / gif (사이즈 가이드 : 600*600)"
							/>
							<AdminItemsTableItem
								v-else
								title="이미지"
								:text-button="{
									text: image_url,
									button: {
										text: '이미지 삭제',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="
									models.popup_url = null
									image_url = null
								"
							/>
						</v-col>
						<v-col
							v-if="models.popup_kind === 'EDITOR'"
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*내용"
								:text-button="{
									text: models.content,
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
								v-if="models.popup_kind === 'IMAGE'"
								v-model="models.popuplink_url"
								title="랜딩링크"
								input
								:fill="true"
							/>
							<AdminItemsTableItem
								v-if="models.popup_kind === 'VIDEO'"
								v-model="models.popup_url"
								title="*영상링크"
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
			:edit-contents="models.content"
			@save="contentSave"
			@close="onEditDialog = false"
		/>
		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
const checkValues = {
	IMAGE: ['title', 'location'],
	EDITOR: ['title', 'location', 'content'],
	VIDEO: ['title', 'location', 'popup_url'],
}

import { mapActions, mapGetters } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminMainPopupCreate',
	mixins: [common, admin],
	props: ['dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			popup_kind: 'IMAGE',
			title: null,
			use_yn: 'Y',
			start_date: null,
			end_date: null,
			location: null,
			popup_image: null,
			popuplink_url: null,
			content: null,
			popup_url: null,
		},
		image_url: null,
		showDate: null,
		loading: false,
		link_type_items: [
			{ text: '페이지 이동', value: '1' },
			{ text: '새창 열기', value: '2' },
		],
		onEditDialog: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER', 'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS']),
		allowValue() {
			if (this.showDate === null) return true
			if (this.models.popup_kind === 'IMAGE' && this.image_url === null) return true
			return this.common_allowTextCheck(this.models, checkValues[this.models.popup_kind])
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
	},
	created() {
		if (this.mode === 'edit') this.initData()
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_MAIN_POPUP']),
		resetData() {
			this.models = {}
		},
		async onApiCallItem() {
			this.loading = true

			const startDate = this.common_dateFilter(this.showDate[0])
			const endDate = this.showDate[1] === undefined ? startDate : this.common_dateFilter(this.showDate[1])

			console.log('popup_image', this.models.popup_image)

			const params = {
				popup_kind: this.models.popup_kind,
				title: this.models.title,
				use_yn: this.models.use_yn,
				start_date: startDate,
				end_date: endDate,
				location: this.models.location,
				popuplink_url: this.models.popuplink_url,
				content: this.models.content ?? null,
				popup_url: this.models.popup_url,
			}

			// image 수정 > 필수값이므로 수정만 제공
			if (this.mode === 'create' && this.image_url) params.popup_image = this.image_url
			if (this.mode === 'edit') {
				params.popup_id = this.editItem.popup_id
				if (this.image_url && this.image_url !== this.editItem.popup_url) {
					params.popup_image = this.image_url
				}
			}

			const items = { method: this.mode, params: params }
			console.log('submit', items)
			const res = await this.ADMIN_ACT_MAIN_POPUP(items)
			this.loading = false
			this.$emit('close')
		},
		initData() {
			this.models.division = this.admin_booleanItems.find(item => item.value === this.editItem.division) || null
			this.models.title = this.editItem.title || null
			this.models.location_top = this.editItem.location_top || null
			this.models.location_center = this.editItem.location_center || null
			this.models.link_url = this.editItem.link_url || null
			this.models.link_type = this.link_type_items.find(item => item.value === this.editItem.link_type) || null

			this.showDate = this.editItem.showDate || null

			console.log(this.editItem)
			if (this.editItem.popup_url) {
				this.image_url = this.editItem.popup_url
			} else {
				this.image_url = null
				this.models.popup_image = null
			}

			this.models = {
				popup_kind: this.editItem.popup_kind ?? '',
				title: this.editItem.title ?? '',
				use_yn: this.editItem.use_yn ?? '',
				start_date: this.editItem.start_date ?? '',
				end_date: this.editItem.end_date ?? '',
				location: this.editItem.location ?? '',
				popup_image: this.editItem.popup_image ?? null,
				popuplink_url: this.editItem.popuplink_url ?? null,
				content: this.editItem.content ?? null,
				popup_url: this.editItem.popup_url ?? null,
			}

			this.showDate = this.editItem.showDate ?? null
		},
		contentSave(item) {
			this.models.content = item
		},
	},
}
</script>

<style scoped lang="scss"></style>
