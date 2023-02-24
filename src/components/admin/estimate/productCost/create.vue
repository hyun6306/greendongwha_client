<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="800"
	>
		<v-card class="pa-0">
			<AdminItemsTitle
				:title="mode === 'create' ? `${title} 등록` : `${title} 수정`"
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
								v-if="HOME_GET_INTERIOR_ESTIMATE_BRAND"
								v-model="models.brand"
								title="*브랜드"
								:select="HOME_GET_INTERIOR_ESTIMATE_BRAND"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.goods"
								title="*제품"
								:select="productItemsFilter"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.unit_price"
								title="*단가"
								input
								:input-type="'number'"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.removal_cost"
								title="*철거비 단가"
								input
								:input-type="'number'"
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
	name: 'AdminEstimateProductCostCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			brand: null,
			goods: null,
			unit_price: null,
			removal_cost: null,
		},
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters([
			'AUTH_GET_ADMIN_USER',
			// 제품 데이터
			'HOME_GET_INTERIOR_ESTIMATE_BRAND',
			'HOME_GET_INTERIOR_ESTIMATE_PRODUCT',
		]),
		productItemsFilter() {
			if (this.models.brand === null) return []
			return this.common_filterItem(this.models.brand, this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT, 'brand_code') || []
		},
		allowValue() {
			const checkValue = ['brand', 'goods']
			let check = this.common_allowValueCheck(this.models, checkValue)
			if (check) return true

			const checkText = ['unit_price', 'removal_cost']
			return this.common_allowTextCheck(this.models, checkText)
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
	},
	created() {
		if (this.editItem && this.mode === 'edit') this.startDataMapping()
		console.log('editItem', this.editItem, this.models, this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT)
	},
	async mounted() {
		// 브랜드, 제품 데이터 가져오기
		await this.getData()
	},
	destroyed() {
		this.resetData()
	},
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
		startDataMapping() {
			this.models = {
				brand:
					{
						brand_code: this.editItem.brand_code,
						brand_name: this.editItem.brand_name,
						text: this.editItem.brand_name,
					} || null,
				goods:
					{
						brand_code: this.editItem.brand_code,
						goods_code: this.editItem.goods_code,
						goods_name: this.editItem.goods_name,
						text: this.editItem.goods_name,
					} || null,
				unit_price: this.editItem.unit_price,
				removal_cost: this.editItem.removal_cost,
			}
			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				brand: null,
				goods: null,
				unit_price: null,
				removal_cost: null,
			}
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				goods_code: this.models.goods.goods_code,
				unit_price: this.models.unit_price,
				removal_cost: this.models.removal_cost,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
			}

			console.log('parmas', params)

			try {
				const items = { method: this.mode, params: params }
				await this.ADMIN_ACT_ESTIMATE_PRODUCT_PRICE(items).then(() => {
					this.loading = false
					this.$emit('close')
				})
			} catch (e) {
				console.log('admin.estimate.ProductPriceGet', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
