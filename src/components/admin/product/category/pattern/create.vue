<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="1000"
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
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.use_yn"
								title="*사용여부"
								radio
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
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
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="productModel"
								title="*제품"
								:select="admin_productFilter"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.pattern_name"
								title="*패턴 이름"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.pattern_engname"
								title="패턴(영문)"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="models.pattern_url === null"
								v-model="pattern_url"
								title="패턴 이미지"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="패턴 이미지"
								:text-button="patternUrlDeleteButton"
								:fill="true"
								@click="
									models.pattern_url = null
									pattern_url = null
								"
							/>
						</v-col>
					</v-row>
				</v-container>
				<v-row
					class="ma-0"
					align="center"
					justify="center"
				>
					<!--                    <v-col cols="2" md="3" v-if="mode === 'edit'">
                        <v-btn
                            color="olive"
                            block
                            dark
                            @click="onAddPatternImage"
                        >
                            <v-icon>mdi-image-plus</v-icon>
                            <span class="ml-2 hidden-md-and-down">패턴 이미지</span>
                        </v-btn>
                    </v-col>
                    <v-spacer v-if="mode === 'edit'"/>-->
					<v-col
						cols="8"
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
									:disabled="!editValue"
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
	name: 'AdminProductCategoryPatternCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		models: {
			use_yn: 'Y',
			part: null,
			type: null,
			brand: null,
			product: null,
			pattern_name: null,
			pattern_engname: null,
			pattern_url: null,
		},
		pattern_url: null,
		partModel: null,
		typeModel: null,
		brandModel: null,
		productModel: null,
		patternUrlDeleteButton: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS', 'AUTH_GET_ADMIN_USER']),
		allowValue() {
			const checkValue = ['use_yn', 'part', 'type', 'brand', 'product', 'pattern_name']
			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}

			const checkImage = ['pattern_url']
			for (let i of checkImage) {
				if (this[i] === null) return true
			}
			return false
		},
		editValue() {
			const checkValue = ['use_yn', 'part', 'type', 'brand', 'product', 'pattern_name', 'pattern_engname']
			for (let i of checkValue) {
				if (this.models[i] != this.origin[i]) return true
			}

			const checkImage = ['pattern_url']
			for (let i of checkImage) {
				if (this[i] != this.origin[i]) return true
			}

			return false
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
		...mapActions(['ADMIN_ACT_PRODUCT_CATEGORY_ITEMS']),
		startDataMapping() {
			console.log('startDataMapping')

			const product = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS, this.editItem, 'goods_code')
			const brand = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS, product, 'brand_code')
			const type = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS, brand, 'kind_code')
			const part = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS, type, 'subject_code')

			this.partModel = part
			this.typeModel = type
			this.brandModel = brand
			this.productModel = product

			this.models = {
				use_yn: this.editItem.use_yn,
				part: this.partModel,
				type: this.typeModel,
				brand: this.brandModel,
				product: this.productModel,
				pattern_name: this.editItem.pattern_name,
				pattern_engname: this.editItem.pattern_engname,
				pattern_url: this.editItem.pattern_url,
			}

			if (this.editItem.pattern_url.length && this.editItem.pattern_url) {
				this.pattern_url = this.editItem.pattern_url
				this.patternUrlDeleteButton = {
					text: this.editItem.pattern_url,
					button: {
						text: '이미지 삭제',
						color: 'primary',
					},
				}
			} else {
				this.pattern_url = null
				this.models.pattern_url = null
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				use_yn: 'N',
				part: null,
				type: null,
				brand: null,
				product: null,
				pattern_name: null,
				pattern_engname: null,
				pattern_url: null,
			}
			this.pattern_url = null
			this.partModel = null
			this.typeModel = null
			this.brandModel = null
			this.productModel = null
			this.origin = {}
			this.loading = false
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				use_yn: this.models.use_yn,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
				subject_code_5: this.partModel.subject_code,
				kind_code_5: this.typeModel.kind_code,
				brand_code_5: this.brandModel.brand_code,
				goods_code_5: this.productModel.goods_code,
				pattern_name_5: this.models.pattern_name,
				pattern_engname_5: this.models.pattern_engname,
			}

			if (this.mode === 'create') {
				// 등록
				// 이미지가 있는 경우 image param을 추가 없는 경우 param명을 넣지 않음
				if (this.pattern_url != null) params.pattern_img_5 = this.pattern_url
			} else {
				// 수정
				params.pattern_code_5 = this.editItem.pattern_code

				// pattern_url
				// pattern_url 삭제 > pattern_url만 보내기
				if (this.pattern_url === null && this.models.pattern_url === null) {
					params.pattern_url_5 = this.editItem.pattern_url
				}
				// pattern_url 수정
				// 기존 pattern_url과 등록할 pattern_url 함께 보내기
				if (this.pattern_url != null && this.pattern_url !== this.editItem.pattern_url) {
					params.pattern_img_5 = this.pattern_url
					params.pattern_url_5 = this.editItem.pattern_url
				}
			}

			console.log('params', params)

			try {
				const items = { params: params, query: '5', method: this.mode }
				await this.ADMIN_ACT_PRODUCT_CATEGORY_ITEMS(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('admin.product.CategoryPost_Put/5', e)
				this.loading = false
			}
		},
		onAddPatternImage() {
			this.$emit('onAddPatternImage', this.editItem)
		},
	},
}
</script>

<style scoped lang="scss"></style>
