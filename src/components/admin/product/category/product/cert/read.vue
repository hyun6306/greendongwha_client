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
								title="사용여부"
								:text="readItem.use_yn === 'Y' ? 'ON' : 'OFF'"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="썸네일"
								:text-button="models.thumbnail"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*설명"
								:text="readItem.description"
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
	name: 'AdminProductMasterCertRead',
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		models: {
			thumbnail: null,
		},
	}),
	computed: {},
	watch: {},
	created() {
		this.models.thumbnail = this.readItem.thumbnail
			? {
					text: this.readItem.thumbnail,
					button: {
						text: '링크보기',
						color: 'primary',
						link: this.readItem.thumbnail,
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
				thumbnail: null,
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
