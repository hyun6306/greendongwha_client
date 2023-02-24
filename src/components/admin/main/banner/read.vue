<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				title="배너 내용 확인"
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
								title="노출순위"
								:text="models.priority"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*노출기간"
								:text="models.showDate"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*제목"
								:text="models.title"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*설명"
								:text="models.contents"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*링크"
								:text-button="linkItems"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*이미지"
								:button="imageItem"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="썸네일"
								:button="thumbnailItem"
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
								:text="models.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록일"
								:text="models.regi_date"
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
	</v-dialog>
</template>

<script>
export default {
	name: 'AdminMainBannerRead',
	props: ['dialog', 'readItem'],
	data: () => ({
		models: {
			priority: null,
			showDate: null,
			title: null,
			contents: null,
			image: null,
			link: null,
			thumbnail: null,
			regi_userid: null,
			regi_date: null,
		},
		linkItems: null,
		thumbnailItem: null,
		imageItem: null,
	}),
	computed: {},
	watch: {},
	created() {
		console.log('getReadData', this.readItem)
		this.models.priority = String(this.readItem.priority)
		this.models.showDate = this.readItem.showDate.join('~')
		this.models.title = this.readItem.title
		this.models.image = this.readItem.image
		this.models.contents = this.readItem.contents
		this.models.link = this.readItem.link
		this.models.thumbnail = this.readItem.thumbnail
		this.models.regi_userid = this.readItem.regi_userid
		this.models.regi_date = this.readItem.regi_date

		this.linkItems = {
			text: this.readItem.link,
			button: {
				text: '링크보기',
				color: 'primary',
				link: this.readItem.link,
			},
		}

		this.thumbnailItem = {
			text: '썸네일 이미지 확인',
			color: 'primary',
			link: this.readItem.thumbnail,
		}

		this.imageItem = {
			text: '이미지 확인',
			color: 'primary',
			link: this.readItem.image,
		}
		console.log('readItem', this.readItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		resetData() {
			this.models = {
				priority: null,
				showDate: null,
				title: null,
				content: null,
				image: null,
				link: null,
				thumbnail: null,
				user: null,
				regi_date: null,
			}
			this.linkItems = null
			this.thumbnailItem = null
			this.imageItem = null
		},
	},
}
</script>

<style scoped lang="scss"></style>
