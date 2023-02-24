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
								title="상태"
								:text="readItem.use_yn === 'Y' ? 'ON' : 'OFF'"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="조회수"
								:text="String(readItem.hits)"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="테마"
								:text="readItem.theme_name"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="대표이미지"
								:text-button="{
									text: readItem.image_url,
									button: {
										text: '대표이미지',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem.image_url)"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="제목"
								:text="readItem.title"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<CommonLoaderLine01 v-if="loading" />
							<AdminItemsTableItem
								v-else
								title="내용"
								:text-button="{
									text: description,
									button: {
										text: '내용 확인',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="onViewDialog = true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="readItem.attach_url"
								title="첨부파일"
								:text-button="{
									text: readItem.attach_url,
									button: {
										text: '첨부파일 확인',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="common_onLink(readItem.attach_url)"
							/>
							<AdminItemsTableItem
								v-else
								title="첨부파일"
								:text="' '"
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
import { mapActions } from 'vuex'
import admin from '@/mixins/admin'
import common from '@/mixins/common'

export default {
	name: 'AdminDisplayKnowHowRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		onViewDialog: false,
		description: null,
		loading: false,
	}),
	computed: {},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
		this.getDetailData()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_DISPLAY_KNOW_HOW']),
		async getDetailData() {
			this.loading = true
			this.ADMIN_ACT_DISPLAY_KNOW_HOW({ method: 'detail', query: this.readItem.knowhow_id }).then(res => {
				this.loading = false
				this.description = res.description
			})
		},
	},
}
</script>

<style scoped lang="scss"></style>
