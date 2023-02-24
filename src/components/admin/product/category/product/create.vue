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
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="brandModel"
								title="*브랜드"
								:select="admin_brandFilter"
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.goods_name"
								title="*제품 이름"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.goods_engname"
								title="제품(영문)"
								input
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.tooltip"
								title="툴팁"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.slogan"
								title="슬로건"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.description"
								title="제품설명"
								input
								:fill="true"
							/>
						</v-col>
						<v-col
							cols="12"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-if="banner_url === null"
								v-model="banner_url"
								title="특장점 이미지"
								file
								:fill="true"
							/>
							<AdminItemsTableItem
								v-else
								title="특장점 이미지"
								:text-button="clipUrlDeleteButton"
								:fill="true"
								@click="
									banner_url = null
									models.banner_url = null
								"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.guarantee_year"
								title="*품질보증 기간"
								:radio-group="admin_category_product_guaranteeItems"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="미리보기"
								:text-button="guaranteeImageButton"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.special_yn"
								title="*특판문의"
								radio
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								title="미리보기"
								:text-button="specialImageButton"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.best_yn"
								title="*BEST"
								radio
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="pa-0"
						>
							<AdminItemsTableItem
								v-model="models.new_yn"
								title="*NEW"
								radio
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
	name: 'AdminProductCategoryProductCreate',
	mixins: [model, common, admin],
	props: ['title', 'dialog', 'mode', 'editItem'],
	data: () => ({
		guaranteeImageButton: {
			text: '10년 보증 이미지',
			button: {
				text: '10년 보증 이미지',
				color: 'primary',
				link: require('@/assets/img/admin/category/guarantee.jpg'),
			},
		},
		specialImageButton: {
			text: '특판 이미지',
			button: {
				text: '특판 이미지',
				color: 'primary',
				link: require('@/assets/img/admin/category/special.jpg'),
			},
		},
		models: {
			use_yn: 'N',
			part: null,
			type: null,
			brand: null,
			goods_name: null,
			goods_engname: null,
			tooltip: null,
			slogan: null,
			description: null,
			banner_url: null,
			guarantee_year: '0',
			special_yn: 'N',
			new_yn: 'N',
			best_yn: 'N',
		},
		partModel: null,
		typeModel: null,
		brandModel: null,
		banner_url: null,
		clipUrlDeleteButton: null,
		origin: {},
		loading: false,
	}),
	computed: {
		...mapGetters([
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'AUTH_GET_ADMIN_USER',
		]),
		allowValue() {
			const checkValue = ['use_yn', 'part', 'type', 'brand', 'goods_name']
			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}
			return false
		},
		editValue() {
			const checkValue = [
				'use_yn',
				'part',
				'type',
				'brand',
				'goods_name',
				'goods_engname',
				'slogan',
				'description',
				'banner_url',
			]

			for (let i of checkValue) {
				if (this.models[i] != this.origin[i]) return true
			}

			return false
		},
	},
	watch: {
		models(val) {
			console.log('models', val)
		},
		partModel(val) {
			console.log('partModel', val)
			this.models.part = val
			if (this.models.part !== val) this.typeModel = null
		},
		typeModel(val) {
			console.log('typeModel', val)
			this.models.type = val
			if (this.models.type !== val) this.brandModel = null
		},
		brandModel(val) {
			console.log('brandModel', val)
			this.models.brand = val
		},
	},
	created() {
		if (this.editItem && this.mode === 'edit') this.startDataMapping()
		console.log('editItem', this.editItem, this.mode)
	},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_CATEGORY_ITEMS']),
		startDataMapping() {
			const brand = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS, this.editItem, 'brand_code')
			const type = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS, brand, 'kind_code')
			const part = this.admin_dataFind(this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS, type, 'subject_code')

			this.partModel = part
			this.typeModel = type
			this.brandModel = brand

			this.models = {
				use_yn: this.editItem.use_yn,
				part: part,
				type: type,
				brand: brand,
				goods_name: this.editItem.goods_name,
				goods_engname: this.editItem.goods_engname,
				tooltip: this.editItem.tooltip,
				slogan: this.editItem.title,
				description: this.editItem.description,
				banner_url: this.editItem.banner_url,
				guarantee_year: this.editItem.guarantee_year,
				special_yn: this.editItem.specialadd_yn,
				new_yn: this.editItem.new_yn,
				best_yn: this.editItem.best_yn,
			}

			if (this.editItem.banner_url.length && this.editItem.banner_url) {
				this.banner_url = this.editItem.banner_url
				this.clipUrlDeleteButton = {
					text: this.editItem.banner_url,
					button: {
						text: '이미지 삭제',
						color: 'primary',
					},
				}
			} else {
				this.banner_url = null
				this.models.banner_url = null
			}

			this.origin = JSON.parse(JSON.stringify(this.models))
		},
		resetData() {
			this.models = {
				use_yn: 'N',
				part: null,
				type: null,
				brand: null,
				goods_name: null,
				goods_engname: null,
				tooltip: null,
				slogan: null,
				description: null,
				banner_url: null,
				guarantee_year: '0',
				special_yn: 'N',
				new_yn: 'N',
				best_yn: 'N',
			}
			this.partModel = null
			this.typeModel = null
			this.brandModel = null
			this.banner_url = null
			this.origin = {}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				use_yn: this.models.use_yn,
				regi_userid: this.AUTH_GET_ADMIN_USER.login_id,
				brand_code_4: this.brandModel.brand_code,
				goods_name_4: this.models.goods_name,
				goods_engname_4: this.models.goods_engname,
				tooltip_4: this.models.tooltip,
				title_4: this.models.slogan,
				description_4: this.models.description,
				guarantee_year_4: this.models.guarantee_year,
				specialadd_yn_4: this.models.special_yn,
				new_yn_4: this.models.new_yn,
				best_yn_4: this.models.best_yn,
			}

			if (this.mode === 'create') {
				// 등록
				// 이미지가 있는 경우 image param을 추가 없는 경우 param명을 넣지 않음
				if (this.banner_url != null) params.banner_img_4 = this.banner_url
			} else {
				// 수정
				params.subject_code_4 = this.partModel.subject_code
				params.kind_code_4 = this.typeModel.kind_code
				params.goods_code_4 = this.editItem.goods_code

				// banner_url
				// banner_url 삭제 > banner_url만 보내기
				if (this.banner_url === null && this.models.banner_url === null) {
					params.banner_url_4 = this.editItem.banner_url
				}

				// banner_url 수정 > 필수값이므로 수정만 제공
				if (this.banner_url != null && this.banner_url !== this.editItem.banner_url) {
					params.banner_img_4 = this.banner_url
					params.banner_url_4 = this.editItem.banner_url
				}
			}

			console.log('params', params)

			try {
				const items = { params: params, query: '4', method: this.mode }
				await this.ADMIN_ACT_PRODUCT_CATEGORY_ITEMS(items)
				this.loading = false
				this.$emit('close')
			} catch (e) {
				console.log('admin.product.CategoryPost_Put/4', e)
				this.loading = false
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
