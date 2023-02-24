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
								title="*패턴이미지코드"
								:text="models.patternImageCode"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*패턴 이미지"
								:text="models.title"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="패턴 이미지(영문)"
								:text="models.textEnglish"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이미지 URL"
								:text-button="models.imageUrl"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록자"
								:text="models.regi_userId"
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
	name: 'AdminProductCategoryPatternImageRead',
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		models: {
			patternImageCode: null,
			title: null,
			textEnglish: null,
			regi_userId: null,
			regi_date: null,
			imageUrl: null,
		},
	}),
	computed: {},
	watch: {},
	created() {
		console.log('getReadData', this.readItem)

		this.models.patternImageCode = this.readItem.patternImageCode
		this.models.title = this.readItem.title
		this.models.textEnglish = this.readItem.textEnglish
		this.models.regi_userId = this.readItem.regi_userId
		this.models.regi_date = this.readItem.regi_date
		this.models.imageUrl = this.readItem.imageUrl
			? {
					text: this.readItem.imageUrl,
					button: {
						text: '링크보기',
						color: 'primary',
						link: this.readItem.imageUrl,
					},
			  }
			: {}
		console.log('readItem', this.readItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		resetData() {
			this.models = {
				patternImageCode: null,
				title: null,
				textEnglish: null,
				regi_userId: null,
				regi_date: null,
				imageUrl: null,
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
