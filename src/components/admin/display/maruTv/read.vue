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
								title="*노출여부"
								:text="readItem.use_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*메인노출여부"
								:text="readItem.main_yn"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*제목"
								:text="readItem.title"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="*동영상 링크"
								:text="readItem.video_url"
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

		<!-- editor viewer -->
		<CommonEditorQuillViewerDialog
			:dialog="onViewDialog"
			:html="description"
			@close="onViewDialog = false"
		/>
	</v-dialog>
</template>

<script>
export default {
	name: 'AdminDisplayMaruTvRead',
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		onViewDialog: false,
		description: null,
	}),
	computed: {},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
	},
	mounted() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss"></style>
