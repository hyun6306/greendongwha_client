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
								v-if="HOME_GET_INTERIOR_ESTIMATE_BRAND"
								v-model="models.brand"
								title="브랜드"
								:select="HOME_GET_INTERIOR_ESTIMATE_BRAND"
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
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
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.start_registDate"
								title="견적상담의뢰 등록일"
								date-picker
							/>
						</v-col>
						<v-col
							cols="12"
							md="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.keyword"
								title="고객/인테리어점"
								input
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
			<CommonDataTableGridType02
				v-model="model"
				:headers="headers"
				:desserts="desserts"
				:height="common_tableHeight(450)"
				:loading="loading"
				@open="onReadItem"
			/>
		</v-col>

		<AdminEstimateConsultRead
			v-if="readMode"
			:title="common_title"
			:dialog="readMode"
			:read-item="readItem"
			@close="closeDialog"
		/>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminEstimateConsult',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		desserts: [],
		readItem: {},
		headers: [
			{ text: '브랜드', value: 'brand_name', width: '80px' },
			{ text: '제품', value: 'goods_name', width: '80px' },
			{ text: '고객ID', value: 'consult_id', width: '80px' },
			{ text: '고객이름', value: 'login_name', width: '80px' },
			{ text: '상담의뢰일', value: 'check_date', width: '120px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '120px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			// { text: '수정', value: 'data-edit', width:'30px', sortable: false  },
		],
		models: {
			brand: null,
			goods: null,
			start_registDate: null,
			keyword: null,
		},
		loading: false,
	}),
	computed: {
		...mapGetters([
			// 제품 데이터
			'HOME_GET_INTERIOR_ESTIMATE_BRAND',
			'HOME_GET_INTERIOR_ESTIMATE_PRODUCT',
		]),
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
			// 견적 상담 리스트 가져오기
			'ADMIN_ACT_ESTIMATE_CONSULT_ITEMS',
		]),
		async getData() {
			if (this.HOME_GET_INTERIOR_ESTIMATE_BRAND === null) await this.HOME_ACT_INTERIOR_ESTIMATE_BRAND() // 브랜드
			if (this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT === null) await this.HOME_ACT_INTERIOR_ESTIMATE_PRODUCT() // 제품
		},
		async getList(params = {}) {
			this.loading = true
			await this.ADMIN_ACT_ESTIMATE_CONSULT_ITEMS(params).then(res => {
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			const filterDate = this.common_inputDateFilter(this.models.start_registDate)
			// const responseFilterDate = this.common_inputDateFilter(this.models.result_registDate)

			const params = {
				brand_code: this.models.brand ? this.models.brand.brand_code : '',
				goods_code: this.models.goods ? this.models.goods.goods_code : '',
				regi_date_s: filterDate.startDate,
				regi_date_e: filterDate.endDate,
				keyword: this.models.keyword || '',
			}
			console.log('search', params)

			this.getList(params)
		},
		makeExcelFile() {
			this.common_create_excel(this.common_excel_data_convert(this.desserts, this.headers), '견적상담')
		},
		onReadItem(item) {
			console.log('onReadItem', item)
			this.readItem = item
			this.readMode = true
		},
		closeDialog() {
			this.model = []
			this.readMode = false
			this.searchItems()
		},
	},
}
</script>
