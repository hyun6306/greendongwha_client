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
								v-model="models.use_yn"
								title="노출여부"
								:select="admin_booleanItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.main_yn"
								title="메인노출여부"
								:select="admin_booleanItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
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
							md="4"
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
							md="8"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="제목"
								input
								:fill="true"
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
				hide="노출순서"
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

		<AdminDisplayMaruTvCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			:theme-code-items="themeCodeItems"
			:is-exists-main="isExistsMain"
			@close="closeDialog"
		/>
		<AdminDisplayMaruTvRead
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
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminDisplayMaruTv',
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
			{ text: 'No', value: 'knowhow_id', width: '30px' },
			{ text: '노출여부', value: 'use_yn', width: '70px' },
			{ text: '메인노출여부', value: 'main_yn', width: '80px' },
			{ text: '테마', value: 'theme_name', width: '70px' },
			{ text: '제목', value: 'title', width: '160px' },
			{ text: '링크', value: 'link', width: '30px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		items: [],
		models: {
			use_yn: null,
			main_yn: null,
			regi_date: null,
			theme_code: null,
			title: null,
		},
		// showDate: null,
		loading: false,
		themeCodeItems: [],
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
		isExistsMain() {
			return this.desserts.filter(x => x.main_yn === 'Y').length > 0
		},
	},
	watch: {
		model(val) {
			console.log('models', val)
		},
	},
	async created() {
		this.getPublicCode()
		await this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS', 'ADMIN_ACT_DISPLAY_MARU_TV']),
		async getPublicCode() {
			// 테마 코드 가져오기
			this.themeCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '401' })
		},
		async getList(params = {}) {
			this.loading = true
			console.log(params)
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_DISPLAY_MARU_TV(items).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			let startDate
			let endDate

			if (this.models.regi_date !== null) {
				startDate = this.common_dateFilter(this.models.regi_date[0])
				endDate = this.models.regi_date[1] === undefined ? startDate : this.common_dateFilter(this.models.regi_date[1])
			} else {
				startDate = null
				endDate = null
			}

			const params = {
				use_yn: this.models.use_yn?.value ?? '',
				main_yn: this.models.main_yn?.value ?? '',
				theme_code: this.models.theme_code?.code ?? '',
				regi_date_s: startDate,
				regi_date_e: endDate,
				title: this.models.title ?? '',
			}
			console.log(params)
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
			console.log('on edit item', this.model)
			this.createDialog = true
		},
		async removeData() {
			this.loading = true
			const params = this.model.map(item => {
				return { knowhow_id: item.knowhow_id }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_DISPLAY_MARU_TV(items).then(() => {
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
