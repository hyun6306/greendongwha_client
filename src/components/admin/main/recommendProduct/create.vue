<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="mode === 'create' ? '추천제품 등록' : '추천제품 수정'"
				@close="$emit('close')"
			/>
			<v-col class="pa-3 pa-md-5">
				<v-container class="admin_table">
					<v-row class="ma-0 admin_table_area">
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="partModel"
								title="*품목"
								:select="ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS"
								:readonly="mode === 'edit' ? true : false"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="typeModel"
								title="*종류"
								:select="admin_typeFilter"
								:readonly="mode === 'edit' ? true : false"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="brandModel"
								title="*브랜드"
								:select="admin_brandFilter"
								:readonly="mode === 'edit' ? true : false"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="productModel"
								title="*제품"
								:select="admin_productFilter"
								:readonly="mode === 'edit' ? true : false"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="patternModel"
								title="*패턴명"
								:select="admin_patternFilter"
								:readonly="mode === 'edit' ? true : false"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.recommend_imgyn"
								title="*이미지 노출"
								:select="common_booleanItems"
							/>
						</v-col>
					</v-row>
				</v-container>
				<v-row
					class="ma-0"
					align="center"
					justify="center"
				>
					<v-col
						cols="12"
						md="6"
						class="pl-0"
					>
						<v-row class="ma-0">
							<v-col cols="6">
								<v-btn
									color="error"
									block
									tile
									elevation="0"
									@click="$emit('close')"
								>
									<v-icon>clear</v-icon>
									<span class="ml-2">취소</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'create'"
								cols="6"
							>
								<v-btn
									color="primary"
									block
									tile
									elevation="0"
									:disabled="allowValue"
									@click="onApiCallItem"
								>
									<v-icon>add</v-icon>
									<span class="ml-2">등록</span>
								</v-btn>
							</v-col>
							<v-col
								v-if="mode === 'edit'"
								cols="6"
							>
								<v-btn
									color="secondary"
									block
									tile
									elevation="0"
									:disabled="allowValue"
									@click="onApiCallItem"
								>
									<v-icon>edit</v-icon>
									<span class="ml-2">수정</span>
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-card>
		<CommonLoading v-if="loading" />
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'AdminMainRecommendProductCreate',
	mixins: [model, common, admin],
	props: ['dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			part: null,
			type: null,
			brand: null,
			product: null,
			pattern: null,
			recommend_imgyn: null,
		},
		partModel: null,
		typeModel: null,
		brandModel: null,
		productModel: null,
		patternModel: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS', 'AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['part', 'type', 'brand', 'product', 'pattern', 'recommend_imgyn']
			return this.common_allowValueCheck(this.models, checkValue)
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
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
			if (this.models.brand !== val) this.productModel = null
		},
		productModel(val) {
			this.models.product = val
			if (this.models.product !== val) this.patternModel = null
		},
		patternModel(val) {
			this.models.pattern = val
		},
	},
	created() {
		if (this.editItem && this.mode === 'edit') this.startDataMapping()
		console.log('editItem', this.editItem)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_MAIN_RECOMMEND_PRODUCT']),
		startDataMapping() {
			const pattern = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS, this.editItem, 'pattern_code')
			const product = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS, pattern, 'goods_code')
			const brand = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS, product, 'brand_code')
			const type = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS, brand, 'kind_code')
			const part = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS, type, 'subject_code')

			this.partModel = part
			this.typeModel = type
			this.brandModel = brand
			this.productModel = product
			this.patternModel = pattern

			this.models = {
				part: this.partModel,
				type: this.typeModel,
				brand: this.brandModel,
				product: this.productModel,
				pattern: this.patternModel,
				recommend_imgyn: this.common_booleanItems.find(item => item.value === this.editItem.recommend_imgyn),
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				part: null,
				type: null,
				brand: null,
				product: null,
				pattern: null,
				recommend_imgyn: null,
			}
			this.partModel = null
			this.typeModel = null
			this.brandModel = null
			this.productModel = null
			this.patternModel = null
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true
			let params = {}

			if (this.mode === 'create') {
				params = {
					recommend_imgyn: this.models.recommend_imgyn.value,
					subject_code: this.partModel.subject_code,
					kind_code: this.typeModel.kind_code,
					brand_code: this.brandModel.brand_code,
					goods_code: this.productModel.goods_code,
					pattern_code: this.patternModel.pattern_code,
					regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // user id
				}
			} else {
				params = {
					recommend_imgyn: this.models.recommend_imgyn.value,
					product_id: this.editItem.product_id,
					regi_userid: this.AUTH_GET_ADMIN_USER.login_id, // user id
				}
			}

			const items = { method: this.mode, params: params }

			console.log('params', items)

			try {
				await this.ADMIN_ACT_MAIN_RECOMMEND_PRODUCT(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('ADMIN_ACT_MAIN_RECOMMEND_PRODUCT', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
