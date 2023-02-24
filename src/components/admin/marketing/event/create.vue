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
								v-model="models.use_yn"
								title="*사용여부"
								radio
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.event_date"
								title="*이벤트 기간"
								date-picker
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.result_date"
								title="*당첨자 발표일"
								date-picker-one
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
								title="*대표이미지"
								:text-button="{
									text: image_url,
									button: {
										text: '대표이미지 삭제',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="
									models.image_url = null
									image_url = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="*이벤트 제목"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*이벤트 내용"
								:text-button="{
									text: models.event_desc,
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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.enter_yn"
								title="*응모팝업 사용여부"
								radio
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.message_url_yn"
								:disabled="models.enter_yn === 'N'"
								title="*게시글 URL 사용여부"
								radio
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.win_yn"
								title="*당첨 확정 여부"
								radio
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

		<!-- editor -->
		<CommonEditorQuillEditorDialog
			v-if="onEditDialog"
			:dialog="onEditDialog"
			:edit-contents="models.event_desc"
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
	name: 'AdminMarketingEventCreate',
	mixins: [common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			use_yn: 'N',

			event_date: null,
			result_date: null,

			image_url: null,

			title: null,
			event_desc: null,

			enter_yn: 'N',
			message_url_yn: 'N',

			win_yn: 'N',
		},
		origin: {},
		onEditDialog: false,
		loading: false,

		image_url: null,
		event_desc: null,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['use_yn', 'event_date', 'result_date', 'enter_yn', 'win_yn']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['title', 'event_desc']
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
		if (this.mode === 'edit' && this.editItem) {
			this.loading = true
			this.ADMIN_ACT_MARKETING_EVENT({ method: 'detail', query: this.editItem.event_id }).then(res => {
				this.event_desc = res.description
				this.startDataMapping()
			})
			this.loading = false
		}
		console.log('this.editItem', this.editItem, this.models)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions([
			// 이벤트 API
			'ADMIN_ACT_MARKETING_EVENT',
		]),
		startDataMapping() {
			const eventDate = this.editItem.event_date.split('~')
			console.log('this.editItem', eventDate)
			this.models = {
				use_yn: this.editItem.use_yn,

				event_date: [this.editItem.start_date, this.editItem.end_date],
				result_date: this.editItem.result_date.trim(),

				image_url: this.editItem.image_url,

				title: this.editItem.event_title,
				event_desc: this.event_desc,

				enter_yn: this.editItem.enter_yn,
				message_url_yn: this.editItem.message_url_yn,

				win_yn: this.editItem.win_yn,
			}

			if (this.editItem.image_url) {
				this.image_url = this.editItem.image_url
			} else {
				this.image_url = null
				this.models.image_url = null
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			;(this.models = {
				use_yn: 'N',

				event_date: null,
				result_date: null,

				image_url: null,

				title: null,
				event_desc: null,

				enter_yn: 'N',
				message_url_yn: 'N',

				win_yn: 'N',
			}),
				(this.origin = {})
			this.onEditDialog = false
			this.loading = false
			this.image_url = null
			this.event_desc = null
		},
		contentSave(content) {
			this.models.event_desc = content
		},
		async onApiCallItem() {
			this.loading = true

			const startDate = this.common_dateFilter(this.models.event_date[0])
			const endDate =
				this.models.event_date[1] === undefined ? startDate : this.common_dateFilter(this.models.event_date[1])

			const params = {
				use_yn: this.models.use_yn, // 상태
				win_yn: this.models.win_yn, // 당첨확정 여부
				enter_yn: this.models.enter_yn, // 응모팝업여부
				message_url_yn: this.models.message_url_yn, // 게시글url사용여부

				start_date: startDate, // 이벤트 시작일
				end_date: endDate, // 이벤트 종료일
				result_date: this.common_dateFilter(this.models.result_date), // 이벤트 당첨일

				event_title: this.models.title, // 이벤트 제목
				event_desc: this.models.event_desc, // 이벤트 내용

				regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // user id
			}

			// 수정일 경우 hw_id 추가
			if (this.mode === 'edit') {
				params.event_id = this.editItem.event_id
				// event_desc 변경이 없을시 삭제
				if (this.event_desc === this.models.event_desc) {
					delete params['event_desc']
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

			console.log('params', params)
			const items = { method: this.mode, params: params }

			try {
				await this.ADMIN_ACT_MARKETING_EVENT(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_MARKETING_EVENT', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
