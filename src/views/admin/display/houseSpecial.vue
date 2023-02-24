<template>
	<v-container fluid>
		<v-col class="pa-1 pb-0">
			<v-row
				class="ma-0"
				align="center"
			>
				<v-col cols="12">
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.final_appstate"
								title="상태"
								:select="admin_quality_statusItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.business_name"
								title="업체명"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.corporate_no"
								title="사업자번호"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.registDate"
								title="등록일"
								date-picker
							/>
						</v-col>
						<v-col
							cols="12"
							md="8"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.search_keyword"
								title="제목"
								input
								:fill="true"
							/>
						</v-col>
					</v-row>
				</v-col>
				<v-row class="ma-0">
					<v-col
						align="start"
						class="pt-0 md-pl-4"
					>
						<v-btn
							dark
							tile
							elevation="0"
							color="primary"
							@click="makeExcelFile"
						>
							<v-icon class="md-pr-2">mdi-download</v-icon>
							<p class="hidden-md-and-down">excel download</p>
						</v-btn>
					</v-col>
					<v-col
						align="end"
						class="pt-0"
					>
						<v-btn
							dark
							tile
							elevation="0"
							color="olive"
							@click="searchItems"
						>
							<v-icon class="pr-2">search</v-icon>
							<p>검색</p>
						</v-btn>
					</v-col>
				</v-row>
			</v-row>
		</v-col>
		<v-col class="pa-4 px-md-4 pt-0">
			<AdminItemsTableTopbar
				:check-remove-model="checkRemoveModel"
				:desserts-length="desserts.length"
				:hide="'노출순서'"
				@callCreate="onCreateItem()"
				@callConfirmRemove="confirmRemove = true"
			/>
			<CommonDataTableGridType02
				v-model="model"
				:headers="headers"
				:desserts="desserts"
				:height="common_tableHeight(500)"
				:loading="loading"
				@open="onReadItem"
				@edit="onEditItem"
			/>
		</v-col>

		<AdminDisplayHouseSpecialCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>

		<AdminDisplayHouseSpecialRead
			v-if="readMode"
			:title="common_title"
			:dialog="readMode"
			:read-item="readItem"
			@close="closeDialog"
		/>

		<CommonConfirm
			:dialog="confirmRemove"
			:title="`${common_title} 삭제`"
			:text="`선택하신 목록이 모두 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
			@close="confirmRemove = false"
			@submit="removeData"
		/>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminDisplayHouseSpecial',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		desserts: [],
		readItem: {},
		createModel: null,
		createDialog: false,
		confirmRemove: false,
		headers: [
			{ text: '상태', value: 'status', width: '60px', sortable: false },
			{ text: '평형', value: 'spacious_name', width: '80px' },
			{ text: '가족형태', value: 'familytype_name', width: '100px' },
			{ text: '톤', value: 'tone_name', width: '80px' },
			{ text: '스타일', value: 'style_name', width: '90px' },
			{ text: '특성', value: 'feature_name', width: '80px' },
			{ text: '형태', value: 'form_name', width: '80px' },
			{ text: '인테리어점', value: 'business_name', width: '110px' },
			{ text: '사업자번호', value: 'corporate_no', width: '110px' },
			{ text: '제목', value: 'title', width: '80px' },
			{ text: '조회수', value: 'hits', width: '90px' },
			{ text: '등록일', value: 'regi_date', width: '90px' },
			{ text: '처리자', value: 'modify_userid', width: '90px' },
			{ text: '처리일', value: 'app_date', width: '90px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			final_appstate: null,
			business_name: null,
			corporate_no: null,
			registDate: null,
			search_keyword: null,
		},
		loading: false,
	}),
	computed: {
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	created() {
		this.getList()
	},
	async mounted() {},
	destroyed() {},
	methods: {
		...mapActions([
			// 전문가 집들이 API
			'ADMIN_ACT_DISPLAY_HOUSE_SPECIAL',
		]),
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_DISPLAY_HOUSE_SPECIAL(items).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const filterDate = this.common_inputDateFilter(this.models.registDate)

			const params = {
				final_appstate: this.models.final_appstate ? this.models.final_appstate.value : '',
				business_name: this.models.business_name || '',
				corporate_no: this.models.corporate_no || '',
				modify_date_s: filterDate.startDate,
				modify_date_e: filterDate.endDate,
				search_keyword: this.models.search_keyword || '',
			}
			console.log('search', params)

			this.getList(params)
		},
		onCreateItem() {
			this.mode = 'create'
			this.createDialog = true
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readMode = true
		},
		onEditItem(item) {
			this.model = [item]
			this.mode = 'edit'
			this.createDialog = true
		},
		makeExcelFile() {
			this.common_create_excel(this.common_excel_data_convert(this.desserts, this.headers), '전문가 집들이')
		},
		async removeData() {
			console.log('removeData', this.model)
			this.loading = true
			const params = this.model.map(item => {
				return { exphw_id: item.exphw_id }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_DISPLAY_HOUSE_SPECIAL(items).then(() => {
					this.confirmRemove = false
					this.loading = false
					this.model = []
					this.searchItems()
				})
			} catch (e) {
				console.log(e)
				this.confirmRemove = false
			}
		},
		closeDialog() {
			this.model = []
			this.readMode = false
			this.createDialog = false
			this.searchItems()
		},
	},
}
</script>
