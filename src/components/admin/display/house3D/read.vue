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
								:text="readItem.status"
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
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="평형"
								:text="readItem.spacious_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="톤"
								:text="readItem.tone_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="스타일"
								:text="readItem.style_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="가족형태"
								:text="readItem.familytype_name"
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
								v-model="tagsFilterItems"
								title="태그"
								tag-chips
								:fill="true"
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
								title="제품"
								:text="pathFilter"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="등록일"
								:text="readItem.regi_date"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="처리자"
								:text="readItem.regi_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="처리일"
								:text="readItem.convert_date"
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
	name: 'AdminDisplayHouse3DRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		onViewDialog: false,
		description: null,
		loading: false,
	}),
	computed: {
		tagsFilterItems() {
			return this.readItem.tags.length > 0 ? this.readItem.tags.map(x => x.tag_value) : []
		},
		pathFilter() {
			return (
				`${this.readItem.use_kind_name} ${this.readItem.subject_name} > ${this.readItem.kind_name} > ${this.readItem.brand_name} > ${this.readItem.goods_name}` ||
				''
			)
		},
	},
	watch: {},
	created() {
		console.log('this.readItem', this.readItem)
		this.getDetailData()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_DISPLAY_HOUSE_3D']),
		async getDetailData() {
			this.loading = true
			this.ADMIN_ACT_DISPLAY_HOUSE_3D({ method: 'detail', query: this.readItem.hw_id }).then(res => {
				this.loading = false
				this.description = res.description
			})
		},
	},
}
</script>

<style scoped lang="scss"></style>
