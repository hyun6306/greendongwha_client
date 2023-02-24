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
							md="6"
							lg="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="partModel"
								title="*품목"
								:select="ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							lg="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="typeModel"
								title="*종류"
								:select="admin_typeFilter"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							lg="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="brandModel"
								title="*브랜드"
								:select="admin_brandFilter"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							lg="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.product"
								title="*제품"
								:select="admin_productFilter"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							lg="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.use_yn"
								title="*상태"
								:select="common_booleanItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							lg="3"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="showDate"
								title="*등록일"
								date-picker
							/>
						</v-col>
						<v-col
							cols="12"
							lg="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.title"
								title="*타이틀"
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
			<v-row
				class="ma-0"
				align="center"
			>
				<v-col
					cols="10"
					sm="6"
					md="4"
					xl="3"
					class="pl-0"
				>
					<v-col
						cols="4"
						class="pa-0"
					>
						<v-btn
							color="secondary"
							block
							:disabled="checkModel"
							@click="onCreateItem"
						>
							<v-icon>edit</v-icon>
							<span class="hidden-md-and-down ml-2">수정</span>
						</v-btn>
					</v-col>
				</v-col>
			</v-row>
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

		<AdminProductMasterCreate
			v-if="createDialog"
			v-model="createModel"
			:title="common_title"
			:dialog="createDialog"
			:mode="mode"
			:edit-item="model[0]"
			@close="closeDialog"
		/>
		<AdminProductMasterRead
			v-if="readMode"
			:dialog="readMode"
			:title="common_title"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminProductMaster',
	mixins: [common, admin],
	data: () => ({
		mode: 'read',
		readMode: false,
		model: [],
		desserts: [],
		readItem: {},
		createModel: null,
		createDialog: false,
		createItemDialog: false,
		addItemTitle: null,
		addItem: [],
		confirmRemove: false,
		headers: [
			{ text: 'NO', value: 'number', width: '60px' },
			{ text: '사용', value: 'use_yn', width: '60px' },
			{ text: '품목', value: 'subject_name', width: '70px' },
			{ text: '종류', value: 'kind_name', width: '70px' },
			{ text: '브랜드', value: 'brand_name', width: '100px' },
			{ text: '제품', value: 'goods_name', width: '100px' },
			{ text: '패턴', value: 'pattern_name', width: '70px' },
			{ text: '등록자', value: 'regi_userid', width: '80px' },
			{ text: '등록일', value: 'regi_date', width: '80px' },
			{ text: '보기', value: 'data-read', width: '30px', sortable: false },
			{ text: '수정', value: 'data-edit', width: '30px', sortable: false },
		],
		models: {
			part: null,
			type: null,
			brand: null,
			product: null,
			use_yn: null,
			showDate: null,
			title: null,
		},
		partModel: null,
		typeModel: null,
		brandModel: null,
		showDate: null,
		loading: false,
		items: [],
	}),
	computed: {
		...mapGetters(['ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS']),
		checkModel() {
			return this.model !== undefined ? this.model.length !== 1 : false
		},
	},
	watch: {
		partModel(val) {
			this.models.part = val
			if (this.models.part !== val) this.typeModel = null
		},
		typeModel(val) {
			this.models.type = val
			if (this.models.type !== val) this.brandModel = null
		},
		brandModel(val) {
			this.models.brand = val
			if (this.models.brand !== val) this.models.product = null
		},
		showDate(val) {
			this.models.showDate = val
		},
	},
	created() {
		this.searchItems()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapMutations(['APP_MU_PAGE_NAME']),
		...mapActions(['ADMIN_ACT_PRODUCT_GET_MASTER_ITEMS']),
		async getList(params = {}) {
			this.loading = true
			// test
			await this.ADMIN_ACT_PRODUCT_GET_MASTER_ITEMS(params).then(res => {
				console.log('ADMIN_ACT_PRODUCT_GET_MASTER_ITEMS', res)
				this.desserts = res
				this.loading = false
			})
		},
		searchItems() {
			let startDate
			let endDate

			if (this.models.showDate !== null) {
				startDate = this.common_dateFilter(this.models.showDate[0])
				endDate = this.models.showDate[1] === undefined ? startDate : this.common_dateFilter(this.models.showDate[1])
			} else {
				startDate = null
				endDate = null
			}

			const params = {
				subject_code: this.models.part != null ? this.models.part.subject_code : null,
				kind_code: this.models.type != null ? this.models.type.kind_code : null,
				brand_code: this.models.brand != null ? this.models.brand.brand_code : null,
				goods_code: this.models.product != null ? this.models.product.goods_code : null,
				use_yn: this.models.use_yn != null ? this.models.use_yn.value : null,
				modify_date_s: startDate,
				modify_date_e: endDate,
				title_keyword: this.models.title,
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
		removeData() {
			console.log('removeData', this.model)
			this.confirmRemove = false
		},
		closeDialog() {
			this.model = []
			this.addItem = []
			this.readMode = false
			this.createDialog = false
			this.createItemDialog = false
			this.searchItems()
		},
	},
}
</script>
