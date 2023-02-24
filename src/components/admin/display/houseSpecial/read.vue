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
					<h3 class="py-3 pl-2">< 작성자 정보 ></h3>

					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="인테리어점"
								:text="readItem.business_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="대표"
								:text="readItem.boss_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="사업자 번호"
								:text="readItem.corporate_no"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="회사 전화"
								:text="readItem.company_tel"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="회사 ID"
								:text="readItem.login_id"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="이름"
								:text="readItem.manager_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="휴대폰"
								:text="readItem.manager_hand"
							/>
						</v-col>
					</v-row>

					<h3 class="py-3 pl-2">< 콘텐츠 정보 ></h3>

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
							class="pa-0"
						>
							<AdminItemsTableItem
								title="수정 의견"
								:text-button="{
									text: readItem.app_desc,
									button: {
										text: '수정로그 확인',
										color: 'primary',
									},
								}"
								:fill="true"
								@click="logDialog = true"
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
								title="가족형태"
								:text="readItem.familytype_name"
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
								title="제품특성"
								:text="readItem.feature_name"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="형태"
								:text="readItem.form_name"
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
								title="시공주소"
								:text="`${readItem.zipcode} ) ${readItem.address1}`"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="지도 코드 (위도)"
								:text="readItem.latitude"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="지도 코드 (경도)"
								:text="readItem.longitude"
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
										text: '내용확인',
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
								:text="readItem.product_path"
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
								:text="readItem.modify_userid"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="처리일"
								:text="readItem.app_modify_date"
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

		<CommonDialogTableDialog
			v-if="logDialog"
			:title="'수정이력 확인'"
			:dialog="logDialog"
			:items="logData"
			@close="logDialog = false"
		/>

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
	name: 'AdminDisplayHouseSpecialRead',
	mixins: [common, admin],
	props: ['title', 'dialog', 'readItem'],
	data: () => ({
		logDialog: false,
		onViewDialog: false,
		description: null,
		loading: false,
	}),
	computed: {
		logData() {
			let data = []
			this.readItem.expapproval_list.forEach(element => {
				let item = {}
				let state = this.admin_quality_statusItems.find(x => x.value === element.app_state).text
				item.title = `${state} | ${element.modify_date} `
				item.contents = `${element.app_desc}`
				data.push(item)
			})
			return data
		},
		tagsFilterItems() {
			return this.readItem.tags.length > 0 ? this.readItem.tags.map(x => x.tag_value) : []
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
		...mapActions(['ADMIN_ACT_DISPLAY_HOUSE_SPECIAL']),
		async getDetailData() {
			this.loading = true
			this.ADMIN_ACT_DISPLAY_HOUSE_SPECIAL({ method: 'detail', query: this.readItem.exphw_id }).then(res => {
				this.loading = false
				this.description = res.description
			})
		},
	},
}
</script>

<style scoped lang="scss"></style>
