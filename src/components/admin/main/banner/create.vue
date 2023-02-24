<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="mode === 'create' ? '베너 등록' : '베너 수정'"
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
								v-model="models.contents"
								title="*설명"
								textarea
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.link"
								title="링크"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.image === null"
								v-model="image"
								title="*이미지"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="*이미지"
								:text-button="imageDeleteButton"
								:fill="true"
								@click="
									models.image = null
									image = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.thumbnail === null"
								v-model="thumbnail"
								title="썸네일"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="*썸네일"
								:text-button="thumbnailDeleteButton"
								:fill="true"
								@click="
									models.thumbnail = null
									thumbnail = null
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
		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'

export default {
	name: 'AdminMainBannerCreate',
	mixins: [model, common],
	props: ['dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			showDate: null,
			title: null,
			contents: null,
			thumbnail: null,
			image: null,
			link: null,
		},
		image: null,
		thumbnail: null,
		thumbnailDeleteButton: null,
		imageDeleteButton: null,
		showDate: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['showDate']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['title', 'contents']
			check = this.common_allowTextCheck(this.models, checkText)
			if (check) return true

			return this.image === null
		},
	},
	watch: {
		models(val) {
			console.log('showDate', val)
		},
		showDate(val) {
			console.log('showDate', val)
			this.models.showDate = val
		},
	},
	created() {
		if (this.editItem && this.mode === 'edit') this.startDataMapping()
		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_MAIN_BANNER']),
		startDataMapping() {
			this.models = {
				showDate: this.editItem.showDate,
				title: this.editItem.title,
				contents: this.editItem.contents,
				link: this.editItem.link,
				image: this.editItem.image,
				thumbnail: this.editItem.thumbnail,
			}

			if (this.editItem.thumbnail) {
				this.thumbnail = this.editItem.thumbnail
				this.thumbnailDeleteButton = {
					text: this.editItem.thumbnail,
					button: {
						text: '썸네일 삭제',
						color: 'primary',
					},
				}
			} else {
				this.thumbnail = null
				this.models.thumbnail = null
			}

			if (this.editItem.image) {
				this.image = this.editItem.image
				this.imageDeleteButton = {
					text: this.editItem.image,
					button: {
						text: '이미지 삭제',
						color: 'primary',
					},
				}
			} else {
				this.image = null
				this.models.image = null
			}

			this.showDate = this.editItem.showDate

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				showDate: null,
				title: null,
				contents: null,
				thumbnail: null,
				image: null,
				link: null,
			}
			this.image = null
			this.thumbnail = null
			this.showDate = null
			this.thumbnailDeleteButton = null
			this.imageDeleteButton = null
			this.origin = {}
			this.loading = false
		},
		async onApiCallItem() {
			this.loading = true

			const startDate = this.common_dateFilter(this.models.showDate[0])
			const endDate = this.models.showDate[1] === undefined ? startDate : this.common_dateFilter(this.models.showDate[1])

			const params = {
				title: this.models.title || '',
				contents: this.models.contents || '',
				link_url: this.models.link || '',
				start_date: startDate,
				end_date: endDate,
				regi_userid: this.AUTH_GET_ADMIN_USER.name,
				// banner_id:,
				// banner_kind:,
				// mobile_title:,
				// mobile_contents:,
				// mlink_url:,
				// regi_date: this.moment_today,
				// modify_userid:,
				// modify_date:,
			}
			// console.log('params', params)

			if (this.mode === 'create') {
				// 등록
				// 이미지가 있는 경우 image param을 추가 없는 경우 param명을 넣지 않음
				if (this.image != null) params.mainimage = this.image
				if (this.thumbnail != null) params.thumimage = this.thumbnail
			} else {
				params.id = this.editItem.id
				// 수정
				// image 수정 > 필수값이므로 수정만 제공
				if (this.image != null && this.image !== this.editItem.mainimage_url) {
					params.mainimage = this.image
					params.mainimage_url = this.editItem.mainimage_url
				}

				// thumbnail
				// thumbnail 삭제 > thumimage_url만 보내기
				if (this.thumbnail === null && this.models.thumbnail === null) {
					params.thumimage_url = this.editItem.thumimage_url
				}
				// thumbnail 수정
				// 기존 thumimage_url과 등록할 thumimage 함께 보내기
				if (this.thumbnail != null && this.thumbnail !== this.editItem.thumimage_url) {
					params.thumimage = this.thumbnail
					params.thumimage_url = this.editItem.thumimage_url
				}
			}

			const items = { method: this.mode, params: params }
			console.log('items', items)

			try {
				await this.ADMIN_ACT_MAIN_BANNER(items).then(res => {
					console.log('ADMIN_ACT_MAIN_BANNER', res)
					this.loading = false
					this.$emit('close')
				})
			} catch (e) {
				this.loading = false
				console.log('admin.main.BannerPost/Put', e)
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
