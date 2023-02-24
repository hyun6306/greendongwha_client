<template>
	<v-container
		fluid
		fill-height
	>
		<v-row
			class="ma-0 pa-3 fill-height category_table"
			align="start"
		>
			<v-col
				cols="12"
				md="auto"
				class="pa-0 category_table_item"
			>
				<AdminProductCategoryList
					v-model="partModel"
					title="품목"
					:items="ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS"
					@change="changePartItems"
					@update="updateList('part')"
				/>
			</v-col>
			<v-col
				cols="12"
				md="auto"
				class="pa-0 category_table_item"
			>
				<AdminProductCategoryList
					v-model="typeModel"
					title="종류"
					:items="typeItemsFilter"
					@change="changeTypeItems"
					@update="updateList('type')"
				/>
			</v-col>
			<v-col
				cols="12"
				md="auto"
				class="pa-0 category_table_item"
			>
				<AdminProductCategoryList
					v-model="brandModel"
					title="브랜드"
					:items="brandItemsFilter"
					@change="changeBrandItems"
					@update="updateList('brand')"
				/>
			</v-col>
			<v-col
				cols="12"
				md="auto"
				class="pa-0 category_table_item"
			>
				<AdminProductCategoryList
					v-model="productModel"
					title="제품"
					:items="productItemsFilter"
					@change="changeProductItems"
					@update="updateList('product')"
				/>
			</v-col>
			<v-col
				cols="12"
				md="auto"
				class="pa-0 category_table_item"
			>
				<AdminProductCategoryList
					v-model="patternModel"
					title="패턴"
					list-height="730px"
					:items="patternItemsFilter"
					@change="changePatternItems"
					@update="updateList('pattern')"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'
import apiAdmin from '@/api/admin'

export default {
	name: 'AdminProductCategory',
	mixins: [common, admin],
	data: () => ({
		model: [],
		partModel: [],
		typeModel: [],
		brandModel: [],
		productModel: [],
		patternModel: [],
	}),
	computed: {
		...mapGetters([
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS',
		]),
		typeItemsFilter() {
			if (this.partModel.length === 0) return []
			return this.admin_dataFilter(this.partModel, this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS, 'subject_code') || []
		},
		brandItemsFilter() {
			if (this.typeModel.length === 0) return []
			return this.admin_dataFilter(this.typeModel, this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS, 'kind_code') || []
		},
		productItemsFilter() {
			if (this.brandModel.length === 0) return []
			return this.admin_dataFilter(this.brandModel, this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS, 'brand_code') || []
		},
		patternItemsFilter() {
			if (this.productModel.length === 0) return []
			return this.admin_dataFilter(this.productModel, this.ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS, 'goods_code') || []
		},
	},
	watch: {
		partModel(val) {
			if (val.length === 0) this.typeModel = []
		},
		typeModel(val) {
			if (val.length === 0) this.brandModel = []
		},
		brandModel(val) {
			if (val.length === 0) this.productModel = []
		},
		productModel(val) {
			if (val.length === 0) this.patternModel = []
		},
	},
	async created() {
		await this.ADMIN_ACT_PRODUCT_CATEGORY_ITEMS_ALL()
	},
	mounted() {
		// console.log('ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS', this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS)
	},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', 'ADMIN_ACT_PRODUCT_CATEGORY_ITEMS_ALL']),
		changePartItems(items) {
			this.partModel = items
		},
		changeTypeItems(items) {
			this.typeModel = items
		},
		changeBrandItems(items) {
			this.brandModel = items
		},
		changeProductItems(items) {
			this.productModel = items
		},
		changePatternItems(items) {
			this.patternModel = items
		},
		async updateList(items) {
			let listItems = []
			switch (items) {
				case 'part':
					await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS()
					break
				case 'type':
					listItems = ['2', '3', '4', '5']
					break
				case 'brand':
					listItems = ['3', '4', '5']
					break
				case 'product':
					listItems = ['4', '5']
					break
				case 'pattern':
					listItems = ['5']
					break
			}
			if (!listItems.length) return
			for (let i of listItems) {
				await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS(i)
			}
		},
		async getApiCallList(query = '1') {
			this.loading = true
			try {
				const res = await apiAdmin.product.CategoryGet(query)
				console.log(res)
				this.parseData(query, res)
				this.loading = false
			} catch (e) {
				console.log('admin.product.category.Get', e)
			}
		},
	},
}
</script>

<style scoped lang="scss">
.category_table {
	width: 100%;
	&_item {
		width: 20%;
	}
}
</style>
