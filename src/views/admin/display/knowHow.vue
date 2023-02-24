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
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.use_yn"
								title="노출여부"
								:select="admin_booleanItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.theme_code"
								title="테마"
								:select="themeCodeItems"
							/>
						</v-col>

						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.regi_date"
								title="등록일"
								date-picker
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="제목"
								input
							/>
						</v-col>
					</v-row>
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

		<AdminDisplayKnowHowCreate
			v-if="createDialog"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>

		<AdminDisplayKnowHowRead
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
	name: 'AdminDisplayKnowHow',
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
			{ text: '노출여부', value: 'use_yn', width: '60px', sortable: false },
			{ text: '테마', value: 'theme_name', width: '80px' },
			{ text: '제목', value: 'title', width: '100px' },
			{ text: '조회수', value: 'hits', width: '90px' },
			{ text: '등록일', value: 'regi_date', width: '90px' },
			{ text: '처리자', value: 'regi_userid', width: '90px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			theme_code: null,
			regi_date: null,
			use_yn: null,
			title: null,
		},
		loading: false,

		themeCodeItems: [],
	}),
	computed: {
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	async created() {
		await this.getPublicCode()
		await this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions([
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			// 노하우 API
			'ADMIN_ACT_DISPLAY_KNOW_HOW',
		]),
		async getPublicCode() {
			// 테마 코드 가져오기
			this.themeCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '401' })
		},
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_DISPLAY_KNOW_HOW(items).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const filterDate = this.common_inputDateFilter(this.models.regi_date)

			const params = {
				theme_code: this.models.theme_code ? this.models.theme_code.code : '',
				use_yn: this.models.use_yn ? this.models.use_yn?.value : '',
				title: this.models.title || '',
				regi_date_s: filterDate.startDate,
				regi_date_e: filterDate.endDate,
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
		async removeData() {
			console.log('removeData', this.model)
			this.loading = true
			const params = this.model.map(item => {
				return { knowhow_id: item.knowhow_id }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_DISPLAY_KNOW_HOW(items).then(() => {
					this.confirmRemove = false
					this.loading = false
					this.model = []
					this.searchItems()
				})
			} catch (e) {
				console.log(e)
				this.confirmRemove = false
				this.loading = false
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
