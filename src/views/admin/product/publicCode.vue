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
								v-model="models.code_kind"
								title="*코드 구분"
								:select="ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.code_name"
								title="*코드이름"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="showDate"
								title="*노출기간"
								date-picker
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

		<AdminProductPublicCodeCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>
		<AdminProductPublicCodeRead
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
import { mapActions, mapGetters } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminProductPublicCode',
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
			{ text: '코드구분', value: 'group_name', width: '100px' },
			{ text: '코드값', value: 'code_name', width: '70px' },
			{ text: '비고', value: 'bigo', width: '70px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		items: [
			{
				priority: 1,
				codeType: 'type',
				codeName: '코드이름1',
				codeValue: '코드1 value',
				etc: '비고 값',
				user: '김동화',
				regi_date: '2020-01-21',
			},
			{
				priority: 2,
				codeType: 'type',
				codeName: '코드이름2',
				codeValue: '코드2 value',
				etc: '비고 값',
				user: '김동화',
				regi_date: '2020-01-21',
			},
		],
		models: {
			code_kind: null,
			code_name: null,
		},
		showDate: null,
		loading: false,
	}),
	computed: {
		...mapGetters([
			'AUTH_GET_ADMIN_USER',
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS',
		]),
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
	},
	watch: {
		model(val) {
			console.log('models', val)
		},
	},
	async created() {
		await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_GROUP_ITEMS()
		console.log('ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS', this.ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS)
		this.getList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions([
			'ADMIN_ACT_PRODUCT_PUBLIC_CODE_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_GROUP_ITEMS',
		]),
		async getList(params = { group_code: '' }) {
			this.loading = true
			await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS(params).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			let startDate
			let endDate

			if (this.showDate !== null) {
				startDate = this.common_dateFilter(this.showDate[0])
				endDate = this.showDate[1] === undefined ? startDate : this.common_dateFilter(this.showDate[1])
			} else {
				startDate = null
				endDate = null
			}

			const params = {
				group_code: this.models.code_kind != null ? this.models.code_kind.group_code : '',
				code: this.models.code_name != null ? this.models.code_name : null,
				modify_date_s: startDate,
				modify_date_e: endDate,
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
			// console.log('removeData', this.model)
			this.loading = true
			const params = this.model.map(item => {
				return { group_code: item.group_code, code: item.code }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_PRODUCT_PUBLIC_CODE_ITEMS(items).then(() => {
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
			this.createPatternDialog = false
			this.searchItems()
		},
	},
}
</script>
