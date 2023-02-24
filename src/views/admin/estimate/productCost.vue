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
								v-if="HOME_GET_INTERIOR_ESTIMATE_BRAND"
								v-model="models.brand"
								title="브랜드"
								:select="HOME_GET_INTERIOR_ESTIMATE_BRAND"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.goods"
								title="제품"
								:select="productItemsFilter"
							/>
						</v-col>
						<v-col
							cols="12"
							md="4"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.regi_date"
								title="견적상담의뢰 등록일"
								date-picker-one
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

		<AdminEstimateProductCostCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>

		<AdminEstimateProductCostRead
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
	name: 'AdminEstimateProductCost',
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
			{ text: '브랜드', value: 'brand_name', width: '80px' },
			{ text: '제품', value: 'goods_name', width: '80px' },
			{ text: '단가', value: 'unit_price', width: '80px' },
			{ text: '철거비단가', value: 'removal_cost', width: '80px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			brand: null,
			goods: null,
			regi_date: null,
		},
		loading: false,
	}),
	computed: {
		...mapGetters([
			// 제품 데이터
			'HOME_GET_INTERIOR_ESTIMATE_BRAND',
			'HOME_GET_INTERIOR_ESTIMATE_PRODUCT',
		]),
		checkRemoveModel() {
			return this.model !== null ? this.model.length > 0 : false
		},
		productItemsFilter() {
			if (this.models.brand === null) return []
			return this.common_filterItem(this.models.brand, this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT, 'brand_code') || []
		},
	},
	created() {
		this.getList()
	},
	async mounted() {
		// 브랜드, 제품 데이터 가져오기
		await this.getData()
	},
	destroyed() {},
	methods: {
		...mapActions([
			// 브랜드, 제품 데이터 가져오기
			'HOME_ACT_INTERIOR_ESTIMATE_BRAND',
			'HOME_ACT_INTERIOR_ESTIMATE_PRODUCT',
			// 제품단가 API
			'ADMIN_ACT_ESTIMATE_PRODUCT_PRICE',
		]),
		async getData() {
			if (this.HOME_GET_INTERIOR_ESTIMATE_BRAND === null) await this.HOME_ACT_INTERIOR_ESTIMATE_BRAND() // 브랜드
			if (this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT === null) await this.HOME_ACT_INTERIOR_ESTIMATE_PRODUCT() // 제품
		},
		async getList(params = {}) {
			this.loading = true
			const items = { method: 'search', params: params }
			await this.ADMIN_ACT_ESTIMATE_PRODUCT_PRICE(items).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const params = {
				brand_code: this.models.brand ? this.models.brand.brand_code : '',
				goods_code: this.models.goods ? this.models.goods.goods_code : '',
				regi_date: this.models.regi_date ? this.common_dateFilter(this.models.regi_date) : '',
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
				return { goods_code: item.goods_code }
			})

			console.log(params)
			try {
				const items = { method: 'delete', params: params }
				await this.ADMIN_ACT_ESTIMATE_PRODUCT_PRICE(items).then(() => {
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
